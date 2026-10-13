// JSON-LD builders. Objects only — serialised with JSON.stringify in <JsonLd>,
// never templated as strings. Every URL is absolute (SITE.url + path).
// Emails are deliberately NOT included (spam-scraper hygiene); phone is.
import { SITE, CATEGORIES, PRODUCTS, FAQS } from '../config/site.js'
import { productImageSeo, imageObject } from './imageSeo.js'
import { PRODUCT_KEYWORDS } from '../config/product-keywords.js'

const logo = () => `${SITE.url}/images/logo.svg`

export function postalAddress() {
  const a = SITE.address
  return { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postcode, addressCountry: a.country }
}

export function organizationSchema() {
  const prices = PRODUCTS.map((p) => p.price)
  return {
    '@context': 'https://schema.org',
    '@type': ['Store', 'Organization'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: logo(),
    image: logo(),
    description: SITE.brandStatement,
    foundingDate: SITE.founded,
    foundingLocation: { '@type': 'Place', name: SITE.foundedPlace },
    address: postalAddress(),
    telephone: SITE.phoneIntl,
    taxID: SITE.abn,
    areaServed: { '@type': 'Country', name: 'Australia' },
    numberOfItems: PRODUCTS.length,
    priceRange: '$$',
    currenciesAccepted: SITE.currency,
    paymentAccepted: 'PayID, Bank transfer, Cryptocurrency',
    knowsAbout: ['Halal meat', 'Wholesale halal meat', ...CATEGORIES.map((c) => c.kw)],
    brand: { '@type': 'Brand', name: SITE.name },
    openingHoursSpecification: SITE.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
    contactPoint: { '@type': 'ContactPoint', telephone: SITE.phoneIntl, contactType: 'customer service', areaServed: 'AU', availableLanguage: 'English' },
    makesOffer: {
      '@type': 'AggregateOffer',
      priceCurrency: SITE.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: PRODUCTS.length,
    },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: `${SITE.url}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function speakableSchema(path, selectors) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE.url}${path}`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: selectors },
  }
}

export function faqSchema(faqs = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

// crumbs: [{ name, path }] — Home is prepended automatically.
export function breadcrumbSchema(crumbs) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE.url}${c.path}` })),
  }
}

export function productSchema(p) {
  const cat = CATEGORIES.find((c) => c.slug === p.cat)
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: `${p.short} ${p.desc}`,
    image: p.images.map((img) => imageObject(`${SITE.url}/images/products/${img}`, productImageSeo(p))),
    sku: p.slug,
    // Keyword data: the product's focus keyword plus its supporting keywords (src/config/product-keywords.js).
    keywords: [p.focus, ...(PRODUCT_KEYWORDS[p.imageSlug] || []).map((k) => k.kw)].join(', '),
    category: cat?.name,
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/product/${p.slug}/`,
      price: p.price.toFixed(2),
      priceCurrency: SITE.currency,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE.url}/#organization` },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: SITE.flatShip, currency: SITE.currency },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: SITE.delivery.handlingDays[0], maxValue: SITE.delivery.handlingDays[1], unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: SITE.delivery.transitDays[0], maxValue: SITE.delivery.transitDays[1], unitCode: 'DAY' },
        },
      },
      // Mirrors the published Refund & Returns Policy: no change-of-mind returns on fresh meat
      // (faulty/incorrect items are replaced or refunded under the ACL — see /refund/).
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AU',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        url: `${SITE.url}/refund/`,
      },
    },
  }
}

export function offerCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${SITE.name} — halal meat range`,
    url: `${SITE.url}/halal-meat-shop/`,
    numberOfItems: PRODUCTS.length,
    itemListElement: CATEGORIES.map((c) => ({ '@type': 'OfferCatalog', name: c.name, url: `${SITE.url}${c.path}` })),
  }
}

export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}/images/og-v2.webp`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', name: SITE.name, url: `${SITE.url}/` },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: logo() } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
    about: { '@type': 'Thing', name: post.kw },
    ...(post.keywords ? { keywords: post.keywords.map((k) => k.kw).join(', ') } : {}),
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#localbusiness`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    image: logo(),
    address: postalAddress(),
    telephone: SITE.phoneIntl,
    priceRange: '$$',
    openingHoursSpecification: SITE.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
  }
}
