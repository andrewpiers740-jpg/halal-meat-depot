import {
  accountsEnabled,
  getUser,
  verifyPassword,
  setSessionCookie,
  publicUser,
  tooManyAttempts,
  recordFailedLogin,
  clearFailedLogins,
} from '@/lib/accounts'

export const dynamic = 'force-dynamic'

const GENERIC = 'Email or password is incorrect.'

export async function POST(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  const b = await request.json().catch(() => ({}))
  const email = String(b.email || '').trim()
  const password = String(b.password || '')
  if (!email || !password) return Response.json({ ok: false, error: GENERIC }, { status: 400 })
  if (await tooManyAttempts(email)) {
    return Response.json({ ok: false, error: 'Too many attempts. Please wait 15 minutes or reset your password.' }, { status: 429 })
  }
  const user = await getUser(email)
  if (!user || !(await verifyPassword(user, password))) {
    await recordFailedLogin(email)
    return Response.json({ ok: false, error: GENERIC }, { status: 401 })
  }
  await clearFailedLogins(email)
  await setSessionCookie(user)
  return Response.json({ ok: true, user: publicUser(user) })
}
