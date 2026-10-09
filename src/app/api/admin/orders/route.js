import { checkAdminPasscode } from '@/lib/adminAuth'
import { listOrders, deleteAllOrders, isOrderStoreConfigured } from '@/lib/orderStore'
import { isMailerConfigured } from '@/lib/mailer'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  const orders = await listOrders()
  return Response.json({ ok: true, storeConfigured: isOrderStoreConfigured(), mailerConfigured: isMailerConfigured(), orders })
}

export async function DELETE(request) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  await deleteAllOrders()
  return Response.json({ ok: true })
}
