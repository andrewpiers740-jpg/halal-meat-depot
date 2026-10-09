import { searchProducts, toPublicProduct } from '@/lib/catalog'
import { json } from '@/lib/apiHeaders'
import { SITE } from '@/config/site'

export async function GET(request) {
  const u = new URL(request.url).searchParams
  const items = searchProducts({ query: u.get('q') || '', category: u.get('category') || undefined, limit: u.get('limit') || 200 })
  return json({ currency: SITE.currency, halalCertifiedBy: SITE.certifier, count: items.length, products: items.map((p) => toPublicProduct(p)) })
}
