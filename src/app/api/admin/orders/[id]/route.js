import { checkAdminPasscode } from '@/lib/adminAuth'
import { getOrder, deleteOrder, saveOrder } from '@/lib/orderStore'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const { id } = await params
  const order = await getOrder(id)
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 })
  return Response.json({ ok: true, order })
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const { id } = await params
  await deleteOrder(id)
  return Response.json({ ok: true })
}

// PATCH { status } — manual status change from the order page.
export async function PATCH(request, { params }) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const { id } = await params
  const { status } = await request.json().catch(() => ({}))
  if (!['pending', 'payment-sent', 'payment-confirmed'].includes(status)) return Response.json({ ok: false, error: 'bad-status' }, { status: 400 })
  const order = await getOrder(id)
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 })
  order.status = status
  await saveOrder(order)
  return Response.json({ ok: true, order })
}
