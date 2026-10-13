import { SITE, PRODUCTS, CATEGORIES, POSTS } from '../config/site.js'
import { LASTMOD } from '../config/lastmod.js'

// Split sitemap: /sitemap.xml index → /sitemap/0..3.xml (pages, products,
// categories, blog). Product entries carry <image:image>. Every noindex page
// (cart, checkout, account, search, thank-you, order/*, admin) is excluded.
export const STATIC_PAGES = ['/', '/halal-meat-shop/', '/wagyu-steak/', '/halal-meat-wholesale/', '/whole-lamb-aqeeqah-qurbani/', '/halal-certified-meat/', '/about/', '/contact/', '/faq/', '/blog/', '/halal-meat-delivery/', '/refund/', '/terms/', '/privacy/']

export function sitemapEntries(id) {
  const now = new Date().toISOString()
  // Real change dates from scripts/lastmod.mjs (falls back to now for a URL it has not seen yet).
  const lm = (path) => LASTMOD[path]?.date || now
  if (id === 1) return PRODUCTS.map((p) => ({ loc: `${SITE.url}/product/${p.slug}/`, lastmod: lm(`/product/${p.slug}/`), images: p.images.map((i) => `${SITE.url}/images/products/${i}`) }))
  if (id === 2) return CATEGORIES.map((c) => ({ loc: `${SITE.url}${c.path}`, lastmod: lm(c.path) }))
  if (id === 3) return POSTS.map((p) => ({ loc: `${SITE.url}/blog/${p.slug}/`, lastmod: new Date(p.updated || p.date).toISOString() }))
  return STATIC_PAGES.map((path) => ({ loc: `${SITE.url}${path}`, lastmod: lm(path) }))
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

export function urlsetXml(entries) {
  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${esc(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n${(e.images || []).map((i) => `    <image:image>\n      <image:loc>${esc(i)}</image:loc>\n    </image:image>\n`).join('')}  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`
}

export const XML_HEADERS = { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }
