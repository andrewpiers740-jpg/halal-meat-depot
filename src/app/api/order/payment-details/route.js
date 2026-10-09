// Public — the order number is the access token (the same detail the customer
// already received by email). Returns only what that email contained.
import { getOrder } from '@/lib/orderStore'
import { ORDER_REF_RE, paymentMethodParts } from '@/lib/order'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const id = String(new URL(request.url).searchParams.get('id') || '').trim().toUpperCase()
  if (!ORDER_REF_RE.test(id)) return Response.json({ ok: false, error: 'bad-id' }, { status: 400 })
  const o = await getOrder(id).catch(() => null)
  if (!o) return Response.json({ ok: false, error: 'not-found' }, { status: 404 })
  if (!o.paymentDetails) return Response.json({ ok: true, ready: false, orderNumber: o.orderNumber })
  const parts = paymentMethodParts(o.paymentDetails.methodId, o.amountDue, o.orderNumber)
  return Response.json({
    ok: true,
    ready: true,
    orderNumber: o.orderNumber,
    amountDue: o.amountDue,
    methodLabel: parts.label,
    opening: parts.opening,
    closing: parts.closing,
    fields: o.paymentDetails.fields,
    status: o.status,
  })
}
