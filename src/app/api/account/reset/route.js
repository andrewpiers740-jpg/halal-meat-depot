import { accountsEnabled, consumeResetToken, setPassword, setSessionCookie, clearFailedLogins } from '@/lib/accounts'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  const b = await request.json().catch(() => ({}))
  if (String(b.password || '').length < 8) return Response.json({ ok: false, error: 'Password must be at least 8 characters.' }, { status: 400 })
  const email = await consumeResetToken(b.token)
  if (!email) return Response.json({ ok: false, error: 'This reset link has expired or was already used. Please request a new one.' }, { status: 400 })
  const user = await setPassword(email, b.password)
  if (!user) return Response.json({ ok: false, error: 'Account not found.' }, { status: 404 })
  await clearFailedLogins(email)
  await setSessionCookie(user)
  return Response.json({ ok: true })
}
