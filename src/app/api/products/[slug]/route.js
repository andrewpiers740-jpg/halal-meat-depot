import { productBySlug, PRODUCTS } from '@/config/site'
import { toPublicProduct } from '@/lib/catalog'
import { json } from '@/lib/apiHeaders'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function GET(request, { params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return json({ error: 'not-found' }, { status: 404 })
  return json(toPublicProduct(p, { full: true }))
}
