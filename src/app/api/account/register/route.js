import { accountsEnabled, createUser, setSessionCookie, publicUser, isEmail } from '@/lib/accounts'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  const b = await request.json().catch(() => ({}))
  if (b.botcheck) return Response.json({ ok: true })
  const name = String(b.name || '').trim()
  const email = String(b.email || '').trim()
  const password = String(b.password || '')
  if (name.length < 2) return Response.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
  if (!isEmail(email)) return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  if (password.length < 8) return Response.json({ ok: false, error: 'Password must be at least 8 characters.' }, { status: 400 })
  const { user, error } = await createUser({ name, email, phone: b.phone, password })
  if (error === 'exists') return Response.json({ ok: false, error: 'An account with this email already exists. Sign in or reset your password.' }, { status: 409 })
  await setSessionCookie(user)
  return Response.json({ ok: true, user: publicUser(user) })
}
