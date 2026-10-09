// Optional customer accounts. Guests can always check out without one.
//
// Storage: Upstash Redis hash `hmd:users` keyed by lowercase email.
// Passwords: scrypt with a per-user random salt — never stored in plain text.
// Sessions: stateless signed cookie (HMAC-SHA256 with SESSION_SECRET), httpOnly,
// Secure, SameSite=Lax. A password change bumps `pwv`, invalidating old sessions.
import { scrypt, randomBytes, timingSafeEqual, createHmac } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { REPLY } from '../config/site.js'
import { getRedis, parse } from './redis.js'

const scryptAsync = promisify(scrypt)
const NS = REPLY.orderPrefix.toLowerCase()
const USERS = `${NS}:users`
export const SESSION_COOKIE = `${NS}_session`
const SESSION_DAYS = 30

export function accountsEnabled() {
  return Boolean(getRedis() && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32)
}

export const normaliseEmail = (e) => String(e || '').trim().toLowerCase()
export const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || ''))

async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const buf = await scryptAsync(String(password), salt, 64)
  return { salt, hash: buf.toString('hex') }
}

export async function verifyPassword(user, password) {
  const { hash } = await hashPassword(password, user.salt)
  const a = Buffer.from(hash, 'hex')
  const b = Buffer.from(user.hash, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function getUser(email) {
  const redis = getRedis()
  if (!redis) return null
  const raw = await redis.hget(USERS, normaliseEmail(email))
  return raw ? parse(raw) : null
}

async function putUser(user) {
  await getRedis().hset(USERS, { [user.email]: JSON.stringify(user) })
}

export async function createUser({ name, email, phone, password }) {
  const key = normaliseEmail(email)
  if (await getUser(key)) return { error: 'exists' }
  const { salt, hash } = await hashPassword(password)
  const user = {
    id: 'U' + randomBytes(6).toString('hex').toUpperCase(),
    email: key,
    name: String(name || '').trim().slice(0, 120),
    phone: String(phone || '').trim().slice(0, 40),
    address: '',
    salt,
    hash,
    pwv: 1,
    createdAt: new Date().toISOString(),
  }
  await putUser(user)
  return { user }
}

export async function updateUser(email, patch) {
  const user = await getUser(email)
  if (!user) return null
  const allowed = ['name', 'phone', 'address']
  for (const k of allowed) if (k in patch) user[k] = String(patch[k] ?? '').trim().slice(0, k === 'address' ? 300 : 120)
  await putUser(user)
  return user
}

export async function setPassword(email, password) {
  const user = await getUser(email)
  if (!user) return null
  const { salt, hash } = await hashPassword(password)
  user.salt = salt
  user.hash = hash
  user.pwv = (user.pwv || 1) + 1
  await putUser(user)
  return user
}

export const publicUser = (u) => (u ? { email: u.email, name: u.name, phone: u.phone, address: u.address, createdAt: u.createdAt } : null)

// ── Sessions ──────────────────────────────────────────────────────────────
const b64 = (s) => Buffer.from(s).toString('base64url')
const unb64 = (s) => Buffer.from(s, 'base64url').toString()
const sign = (payload) => createHmac('sha256', process.env.SESSION_SECRET).update(payload).digest('base64url')

export function makeSessionToken(user) {
  const exp = Date.now() + SESSION_DAYS * 86400000
  const payload = `${b64(user.email)}.${user.pwv || 1}.${exp}`
  return `${payload}.${sign(payload)}`
}

export async function readSession() {
  if (!accountsEnabled()) return null
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 4) return null
  const [em, pwv, exp, sig] = parts
  const payload = `${em}.${pwv}.${exp}`
  const expected = sign(payload)
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  if (Date.now() > Number(exp)) return null
  const user = await getUser(unb64(em))
  if (!user || String(user.pwv || 1) !== pwv) return null
  return user
}

export async function setSessionCookie(user) {
  const store = await cookies()
  store.set(SESSION_COOKIE, makeSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 86400,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
}

// ── Brute-force protection: 10 failed logins per email per 15 minutes ─────
export async function tooManyAttempts(email) {
  const n = await getRedis().get(`${NS}:loginfail:${normaliseEmail(email)}`)
  return Number(n || 0) >= 10
}

export async function recordFailedLogin(email) {
  const key = `${NS}:loginfail:${normaliseEmail(email)}`
  const redis = getRedis()
  const n = await redis.incr(key)
  if (n === 1) await redis.expire(key, 900)
}

export async function clearFailedLogins(email) {
  await getRedis().del(`${NS}:loginfail:${normaliseEmail(email)}`)
}

// ── Password reset tokens (1 hour, single use) ────────────────────────────
export async function createResetToken(email) {
  const token = randomBytes(32).toString('hex')
  await getRedis().set(`${NS}:reset:${token}`, normaliseEmail(email), { ex: 3600 })
  return token
}

export async function consumeResetToken(token) {
  if (!/^[a-f0-9]{64}$/.test(String(token || ''))) return null
  const redis = getRedis()
  const key = `${NS}:reset:${token}`
  const email = await redis.get(key)
  if (!email) return null
  await redis.del(key)
  return email
}
