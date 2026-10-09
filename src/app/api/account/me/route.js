import { accountsEnabled, readSession, updateUser, publicUser } from '@/lib/accounts'
import { listOrders } from '@/lib/orderStore'

export const dynamic = 'force-dynamic'

const orderSummary = (o) => ({
  orderNumber: o.orderNumber,
  createdAt: o.createdAt,
  status: o.status,
  amountDue: o.amountDue,
  paymentLabel: o.paymentLabel,
  fulfilment: o.fulfilment,
  items: o.items.map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit, slug: i.slug })),
})

export async function GET() {
  if (!accountsEnabled()) return Response.json({ enabled: false, user: null })
  const user = await readSession()
  if (!user) return Response.json({ enabled: true, user: null })
  const orders = (await listOrders()).filter((o) => o.userId === user.id || o.customerEmail === user.email).map(orderSummary)
  return Response.json({ enabled: true, user: publicUser(user), orders })
}

export async function PATCH(request) {
  if (!accountsEnabled()) return Response.json({ ok: false, error: 'accounts-disabled' }, { status: 503 })
  const user = await readSession()
  if (!user) return Response.json({ ok: false, error: 'not-signed-in' }, { status: 401 })
  const body = await request.json().catch(() => ({}))
  const updated = await updateUser(user.email, { name: body.name, phone: body.phone, address: body.address })
  return Response.json({ ok: true, user: publicUser(updated) })
}
