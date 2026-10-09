import { SITE } from '@/config/site'
import { json } from '@/lib/apiHeaders'

export async function GET() {
  const u = SITE.url
  return json({
    ucp: '1.0',
    site: `${u}/`,
    ordering: 'human-assisted',
    services: [
      { id: 'catalog', type: 'catalog', url: `${u}/api/products/`, description: 'Full product catalogue (JSON)' },
      { id: 'search', type: 'search', url: `${u}/api/search/?q={query}`, description: 'Search products and guides (JSON)' },
      { id: 'categories', type: 'catalog', url: `${u}/api/categories/`, description: 'Categories with product counts (JSON)' },
      { id: 'mcp', type: 'mcp', url: `${u}/api/mcp/`, description: 'MCP server (Streamable HTTP) with search and order-draft tools' },
      { id: 'checkout', type: 'commerce', url: `${u}/checkout/`, description: 'Human checkout — website or WhatsApp' },
    ],
  })
}
