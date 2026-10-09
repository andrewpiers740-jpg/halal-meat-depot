import { accountsEnabled, getUser, createResetToken } from '@/lib/accounts'
import { sendMail, isMailerConfigured } from '@/lib/mailer'
import { passwordResetEmail } from '@/utils/emailTemplates'

export const dynamic = 'force-dynamic'

// Always answers the same way, whether or not the email has an account —
// so the endpoint can't be used to discover who is a customer.
export async function POST(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  if (!isMailerConfigured()) {
    return Response.json({ ok: false, error: 'Password reset by email is not available yet. Please contact us on WhatsApp.' }, { status: 503 })
  }
  const b = await request.json().catch(() => ({}))
  const user = await getUser(String(b.email || ''))
  if (user) {
    const token = await createResetToken(user.email)
    const link = `${new URL(request.url).origin}/account/reset-password/?token=${token}`
    await sendMail({ to: user.email, ...passwordResetEmail({ name: user.name, link }) })
  }
  return Response.json({ ok: true })
}
