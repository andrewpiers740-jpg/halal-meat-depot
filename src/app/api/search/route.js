import { searchProducts, searchPosts, toPublicProduct } from '@/lib/catalog'
import { json } from '@/lib/apiHeaders'

export async function GET(request) {
  const q = new URL(request.url).searchParams.get('q') || ''
  return json({ query: q, products: q.trim() ? searchProducts({ query: q }).map((p) => toPublicProduct(p)) : [], posts: searchPosts(q) })
}
