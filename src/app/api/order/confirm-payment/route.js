// Public — customer uploads a payment screenshot. Emails the shop with the
// file attached and marks the order payment-confirmed. Returns only {ok}.
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore'
import { ORDER_REF_RE } from '@/lib/order'
import { sendMail, destination } from '@/lib/mailer'
import { paymentConfirmationNoticeEmail } from '@/utils/emailTemplates'

export const dynamic = 'force-dynamic'

const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const MAX = 4 * 1024 * 1024

export async function POST(request) {
  let form
  try {
    form = await request.formData()
  } catch {
    return Response.json({ ok: false, error: 'bad-form' }, { status: 400 })
  }
  const id = String(form.get('id') || '').trim().toUpperCase()
  const note = String(form.get('note') || '').slice(0, 500)
  const file = form.get('file')
  if (!ORDER_REF_RE.test(id)) return Response.json({ ok: false, error: 'Invalid order number.' }, { status: 400 })
  if (!file || typeof file === 'string') return Response.json({ ok: false, error: 'Please choose a screenshot to upload.' }, { status: 400 })
  if (!TYPES.includes(file.type)) return Response.json({ ok: false, error: 'Please upload a JPG, PNG, WebP or HEIC image.' }, { status: 400 })
  if (file.size > MAX) return Response.json({ ok: false, error: 'The image must be 4MB or smaller.' }, { status: 400 })

  const order = await getOrder(id).catch(() => null)
  if (!order) return Response.json({ ok: false, error: 'We could not find that order.' }, { status: 404 })

  const buf = Buffer.from(await file.arrayBuffer())
  const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
  const mail = paymentConfirmationNoticeEmail({ orderNumber: id, note }, new URL(request.url).origin)
  const sent = await sendMail({
    to: destination('order'),
    replyTo: order.customerEmail,
    ...mail,
    attachments: [{ filename: `${id}-payment.${ext}`, content: buf, contentType: file.type }],
  })
  await markPaymentConfirmed(id).catch(() => {})
  return Response.json({ ok: true, emailed: sent.sent })
}
