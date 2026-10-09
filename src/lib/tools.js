// MCP tool definitions — the ONE source for both the live /api/mcp endpoint
// and the generated .well-known/mcp/server-card.json (so they cannot drift).
// Read-only plus draft: an agent may search and prepare a cart; a human always
// completes the order. No tool captures payment or changes server state.
import { SITE, WHOLESALE_TIERS, productBySlug } from '../config/site.js'
import { toPublicProduct, searchProducts, publicCategories, policies } from './catalog.js'
import { computeTotals } from './order.js'

export const TOOLS = [
  {
    name: 'search_products',
    description: `Search the ${SITE.name} catalogue of halal meat (beef, lamb, goat, chicken, camel, duck, kangaroo, water buffalo, wholesale cartons). Returns matching products with price in AUD, pack size and product URL.`,
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words to match, e.g. "goat curry" or "chicken thigh"' },
        category: { type: 'string', description: 'Optional category slug, e.g. "lamb"' },
        max_price: { type: 'number', description: 'Optional maximum pack price in AUD' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full details for one product by slug: description, pack size, price, images, availability and URL.',
    inputSchema: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] },
  },
  {
    name: 'list_categories',
    description: 'List product categories with descriptions, subcategories and product counts.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_policies',
    description: 'Get ordering policies: minimum order, delivery fee and free-delivery threshold, delivery area, payment methods, crypto discount, GST and halal certification.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_wholesale_info',
    description: 'Get wholesale account tiers for restaurants, caterers and bulk buyers, and how to apply.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'create_order_draft',
    description: 'Prepare a cart for a human to review and complete. Returns totals and a cart URL with the items pre-filled. Does not place an order or take payment.',
    inputSchema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: { type: 'object', properties: { slug: { type: 'string' }, quantity: { type: 'integer', minimum: 1 } }, required: ['slug', 'quantity'] },
        },
        payment_method: { type: 'string', enum: ['payid', 'bank_transfer', 'crypto'] },
      },
      required: ['items'],
    },
  },
]

export async function runTool(name, args = {}) {
  switch (name) {
    case 'search_products':
      return searchProducts({ query: args.query, category: args.category, maxPrice: args.max_price }).map((p) => toPublicProduct(p))
    case 'get_product': {
      const p = productBySlug(String(args.slug || ''))
      return p ? toPublicProduct(p, { full: true }) : { error: 'not-found' }
    }
    case 'list_categories':
      return publicCategories()
    case 'get_policies':
      return policies()
    case 'get_wholesale_info':
      return { tiers: WHOLESALE_TIERS, apply: `${SITE.url}/wholesale/`, cartons: `${SITE.url}/shop/wholesale-cartons/` }
    case 'create_order_draft': {
      const lines = (Array.isArray(args.items) ? args.items : []).map((i) => ({ slug: String(i.slug), qty: Number(i.quantity) }))
      const totals = computeTotals(lines, { paymentMethod: args.payment_method })
      const add = totals.items.map((i) => `${i.slug}:${i.quantity}`).join(',')
      return {
        ...totals,
        currency: SITE.currency,
        cartUrl: `${SITE.url}/cart/?add=${encodeURIComponent(add)}`,
        note: 'A human must open the cart URL and complete checkout. Payment details are sent by email after the order is placed.',
      }
    }
    default:
      return { error: 'unknown-tool' }
  }
}
