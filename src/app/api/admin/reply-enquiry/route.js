import { checkAdminPasscode } from '@/lib/adminAuth'
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore'
import { sendMail } from '@/lib/mailer'
import { enquiryReplyEmail } from '@/utils/emailTemplates'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const { id, reply } = await request.json().catch(() => ({}))
  const enquiry = await getEnquiry(String(id || ''))
  if (!enquiry) return Response.json({ ok: false, error: 'Enquiry not found.' }, { status: 404 })
  const text = String(reply || '').trim()
  if (text.length < 2) return Response.json({ ok: false, error: 'Write a reply first.' }, { status: 400 })
  const sent = await sendMail({ to: enquiry.email, ...enquiryReplyEmail({ name: enquiry.name, reply: text, originalMessage: enquiry.message }) })
  if (!sent.sent) return Response.json({ ok: false, error: sent.reason === 'not-configured' ? 'Email sending is not set up yet (SMTP settings missing).' : 'Email failed to send.' }, { status: 503 })
  await markEnquiryReplied(enquiry.id)
  return Response.json({ ok: true })
}
