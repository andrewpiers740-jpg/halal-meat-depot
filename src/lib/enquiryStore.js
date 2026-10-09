import { REPLY } from '../config/site.js'
import { getRedis, isStoreConfigured, parse } from './redis.js'

const KEY = `${REPLY.orderPrefix.toLowerCase()}:enquiries`

export const isEnquiryStoreConfigured = isStoreConfigured

export function generateEnquiryId() {
  const t = Date.now().toString(36)
  const r = Math.random().toString(36).slice(2, 6)
  return `ENQ-${(t + r).slice(-8).toUpperCase()}`
}

export async function saveEnquiry(enquiry) {
  const redis = getRedis()
  if (!redis) return false
  await redis.hset(KEY, { [enquiry.id]: JSON.stringify(enquiry) })
  return true
}

export async function listEnquiries() {
  const redis = getRedis()
  if (!redis) return []
  const all = await redis.hgetall(KEY)
  if (!all) return []
  return Object.values(all)
    .map(parse)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getEnquiry(id) {
  const redis = getRedis()
  if (!redis) return null
  const raw = await redis.hget(KEY, id)
  return raw ? parse(raw) : null
}

export async function markEnquiryReplied(id) {
  const e = await getEnquiry(id)
  if (!e) return
  e.status = 'replied'
  e.repliedAt = new Date().toISOString()
  await saveEnquiry(e)
}

export async function deleteEnquiry(id) {
  const redis = getRedis()
  if (!redis) return
  await redis.hdel(KEY, id)
}
