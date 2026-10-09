import { sitemapEntries, urlsetXml, XML_HEADERS } from '@/lib/sitemaps'

export const dynamicParams = false

export function generateStaticParams() {
  return [0, 1, 2, 3].map((id) => ({ file: `${id}.xml` }))
}

export async function GET(request, { params }) {
  const { file } = await params
  const id = Number(String(file).replace('.xml', ''))
  return new Response(urlsetXml(sitemapEntries(id)), { headers: XML_HEADERS })
}
