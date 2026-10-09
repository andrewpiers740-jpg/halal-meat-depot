import { checkAdminPasscode } from '@/lib/adminAuth'
import { listEnquiries, isEnquiryStoreConfigured } from '@/lib/enquiryStore'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const denied = checkAdminPasscode(request)
  if (denied) return denied
  return Response.json({ ok: true, storeConfigured: isEnquiryStoreConfigured(), enquiries: await listEnquiries() })
}
