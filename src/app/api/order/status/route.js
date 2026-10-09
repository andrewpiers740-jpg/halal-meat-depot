// Guest order tracking: requires BOTH the order number and the email on the
// order, so an order number alone reveals nothing.
import { getOrder } from '@/lib/orderStore'
import { ORDER_REF_RE } from '@/lib/order'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const url = new URL(request.url)
  const id = String(url.searchParams.get('id') || '').trim().toUpperCase()
  const email = String(url.searchParams.get('email') || '').trim().toLowerCase()
  if (!ORDER_REF_RE.test(id) || !email) return Response.json({ ok: false, error: 'Enter your order number and email.' }, { status: 400 })
  const o = await getOrder(id).catch(() => null)
  if (!o || o.customerEmail !== email) return Response.json({ ok: false, error: 'We could not find an order with those details.' }, { status: 404 })
  return Response.json({
    ok: true,
    order: { orderNumber: o.orderNumber, createdAt: o.createdAt, status: o.status, amountDue: o.amountDue, paymentLabel: o.paymentLabel, items: o.items.map((i) => ({ name: i.name, quantity: i.quantity })) },
  })
}
