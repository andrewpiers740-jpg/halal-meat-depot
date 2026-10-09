import { accountsEnabled, readSession, verifyPassword, setPassword, setSessionCookie } from '@/lib/accounts'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  const user = await readSession()
  if (!user) return Response.json({ ok: false, error: 'Please sign in again.' }, { status: 401 })
  const b = await request.json().catch(() => ({}))
  if (!(await verifyPassword(user, String(b.current || '')))) return Response.json({ ok: false, error: 'Your current password is incorrect.' }, { status: 400 })
  if (String(b.next || '').length < 8) return Response.json({ ok: false, error: 'New password must be at least 8 characters.' }, { status: 400 })
  const updated = await setPassword(user.email, b.next)
  await setSessionCookie(updated) // other sessions are signed out by the pwv bump
  return Response.json({ ok: true })
}
