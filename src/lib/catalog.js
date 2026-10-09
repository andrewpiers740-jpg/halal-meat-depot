// One product shape for every consumer — /search/, the JSON API and the MCP
// tools all serialise through toPublicProduct(), so agents never see three
// subtly different product objects.
import { SITE, CATEGORIES, PRODUCTS, POSTS, categoryBySlug } from '../config/site.js'

export function productUrl(p) {
  return `${SITE.url}/product/${p.slug}/`
}

export function toPublicProduct(p, { full = false } = {}) {
  const cat = categoryBySlug(p.cat)
  const out = {
    slug: p.slug,
    name: p.name,
    price: p.price,
    currency: SITE.currency,
    unit: p.unit,
    pricePerKg: p.perKg,
    category: p.cat,
    categoryName: cat?.name,
    subcategory: p.sub,
    short: p.short,
    halalCertifiedBy: SITE.certifier,
    availability: 'InStock',
    url: productUrl(p),
  }
  if (full) {
    out.description = p.desc
    out.images = p.images.map((img) => `${SITE.url}/images/products/${img}`)
  }
  return out
}

export function searchProducts({ query = '', category, maxPrice, limit = 50 } = {}) {
  const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean)
  return PRODUCTS.filter((p) => {
    if (category && p.cat !== category) return false
    if (maxPrice && p.price > Number(maxPrice)) return false
    if (!terms.length) return true
    const hay = `${p.name} ${p.short} ${p.sub} ${p.cat} ${categoryBySlug(p.cat)?.name}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  }).slice(0, Math.max(1, Math.min(200, Number(limit) || 50)))
}

export function searchPosts(query = '') {
  const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return POSTS.filter((p) => {
    const hay = `${p.title} ${p.excerpt} ${p.kw}`.toLowerCase()
    return terms.every((t) => hay.includes(t))
  }).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, url: `${SITE.url}/blog/${p.slug}/` }))
}

export function publicCategories() {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.tagline,
    subcategories: c.subcategories,
    productCount: PRODUCTS.filter((p) => p.cat === c.slug).length,
    url: `${SITE.url}/shop/${c.slug}/`,
  }))
}

export function policies() {
  return {
    currency: SITE.currency,
    minimumOrder: SITE.minOrder,
    freeDeliveryOver: SITE.freeShipOver,
    flatDeliveryFee: SITE.flatShip,
    deliveryArea: SITE.deliveryArea,
    pickup: SITE.pickupAvailable ? `Free pickup from ${SITE.addressLine}` : null,
    paymentMethods: ['PayID', 'Bank transfer', 'Cryptocurrency'],
    cryptoDiscount: `${SITE.cryptoDiscountPct}% off the meat total when paying in cryptocurrency`,
    gst: 'Fresh, unprocessed meat is GST-free in Australia.',
    halalCertification: `All products are certified halal by ${SITE.certifier}.`,
    ordering: 'Orders are completed by a human: the customer checks out on the website or WhatsApp, then receives payment details by email.',
    shippingPolicy: `${SITE.url}/shipping/`,
    refundPolicy: `${SITE.url}/refund/`,
  }
}
