import { SITE } from '@/config/site'
import { XML_HEADERS } from '@/lib/sitemaps'

export const dynamic = 'force-static'

// Sitemap index → the four child sitemaps at /sitemap/0..3.xml
export function GET() {
  const now = new Date().toISOString()
  const children = [0, 1, 2, 3].map((id) => `  <sitemap>\n    <loc>${SITE.url}/sitemap/${id}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`).join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${children}\n</sitemapindex>\n`, { headers: XML_HEADERS })
}
