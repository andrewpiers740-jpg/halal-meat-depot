import { checkAdminPasscode } from '@/lib/adminAuth'
import { getOrder, markOrderSent } from '@/lib/orderStore'
import { parsePaymentDetail, paymentMethodParts, findMethod } from '@/lib/order'
import { sendMail } from '@/lib/mailer'
import { paymentDetailsEmail } from '@/utils/emailTemplates'
import { waLinkTo, waMessageText, waPaymentDetailsMessage } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const { orderNumber, methodId, detail } = await request.json().catch(() => ({}))
  const order = await getOrder(String(orderNumber || ''))
  if (!order) return Response.json({ ok: false, error: 'Order not found.' }, { status: 404 })
  if (!findMethod(methodId)) return Response.json({ ok: false, error: 'Choose a payment method.' }, { status: 400 })
  const fields = parsePaymentDetail(detail)
  if (!fields.length) return Response.json({ ok: false, error: 'Paste the payment details first.' }, { status: 400 })

  const parts = paymentMethodParts(methodId, order.amountDue, order.orderNumber)
  const base = new URL(request.url).origin
  const mail = paymentDetailsEmail({ orderNumber: order.orderNumber, amountDue: order.amountDue, customerName: order.customerName, opening: parts.opening, closing: parts.closing, fields }, base)
  const sent = await sendMail({ to: order.customerEmail, ...mail })

  await markOrderSent(order.orderNumber, { methodId, fields, sentAt: new Date().toISOString() })

  const waBody = waPaymentDetailsMessage({ orderNumber: order.orderNumber, amountDue: order.amountDue, opening: parts.opening, closing: parts.closing, fields })
  return Response.json({
    ok: true,
    emailed: sent.sent,
    emailError: sent.sent ? null : sent.reason,
    waLink: waLinkTo(order.customerPhone, waBody),
    waText: waMessageText(waBody),
  })
}
