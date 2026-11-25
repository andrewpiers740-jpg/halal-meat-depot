import { SITE } from '@/config/site'
import { searchProducts, searchPosts, toPublicProduct } from '@/lib/catalog'

// "Search for Agents": GET /.well-known/search?q={query} (rewritten here by next.config.mjs).
// Returns the same results as /api/search/ as Markdown so an agent can search the whole site
// instead of crawling it. Read-only and public — it exposes nothing the website does not already show.
export async function GET(request) {
  const q = (new URL(request.url).searchParams.get('q') || '').trim().slice(0, 120)
  const products = q ? searchProducts({ query: q, limit: 20 }).map((p) => toPublicProduct(p)) : []
  const posts = q ? searchPosts(q).slice(0, 10) : []
  const lines = [`# Search results for: ${q || '(empty query)'}`, '']
  if (!q) lines.push('Add a query, for example `/.well-known/search?q=lamb`.', '')
  else if (!products.length && !posts.length) lines.push('No matching products or articles.', '')
  if (products.length) {
    lines.push(`## Products (${products.length})`, '')
    for (const p of products) {
      const kg = p.pricePerKg ? ` (about $${Number(p.pricePerKg).toFixed(2)}/kg)` : ''
      lines.push(`- [${p.name}](${p.url}) — $${Number(p.price).toFixed(2)} ${SITE.currency}, ${p.unit}${kg}`)
    }
    lines.push('')
  }
  if (posts.length) {
    lines.push(`## Articles (${posts.length})`, '')
    for (const a of posts) lines.push(`- [${a.title}](${a.url})`)
    lines.push('')
  }
  lines.push('---', `Prices are in ${SITE.currency}. Orders are placed on the website; full catalogue: ${SITE.url}/llms.txt`)
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Accept-Query': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
