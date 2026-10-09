import { SITE, PRODUCTS } from '@/config/site'
import { toPublicProduct, publicCategories, policies } from '@/lib/catalog'
import { json } from '@/lib/apiHeaders'

// Live ACP catalogue. Ordering stays human-assisted: agents can prepare a cart
// (create_order_draft) but a person completes checkout.
export async function GET() {
  return json({
    protocol: { name: 'acp', version: '0.1.0' },
    merchant: { name: SITE.name, url: `${SITE.url}/` },
    ordering: 'human-assisted',
    currency: SITE.currency,
    policies: policies(),
    categories: publicCategories(),
    products: PRODUCTS.map((p) => toPublicProduct(p)),
  })
}
