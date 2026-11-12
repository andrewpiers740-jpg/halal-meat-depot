// ★ SINGLE SOURCE OF TRUTH ★
// Every route, meta tag, JSON-LD block, sitemap entry, nav link, email, agent
// file and API response derives from this file (+ products.js / content.js).
// The domain appears in exactly ONE place: SITE.domain. To go live, change that
// one line, rebuild and push — never find-and-replace a domain across files.

export { CATEGORIES, PRODUCTS, productBySlug, categoryBySlug, categoryPath, productsInCategory, IMAGE_VERSION, categoryImage, subSlug } from './products.js'
export { PAGE_SEO, POST_SEO, containsFocus, focusWords, containsExact, exactWords, POWER_WORDS, powerWordCount } from './seo.js'
export { POSTS, FAQS, postBySlug } from './content.js'

export const SITE = {
  name: 'Halal Meat Depot',
  brand: 'Halal Meat Depot',
  tagline: 'Certified halal meat at depot prices, delivered Australia-wide',
  domain: 'halalmeatdepot.com.au', // the ONLY place the domain is written
  // Vercel's Domains dashboard already redirects www → apex (308), so
  // vercel.json must NOT add its own www rule (two rules = redirect loop risk).
  wwwRedirectHandledByPlatform: true,
  get domainPending() {
    return this.domain === 'DOMAIN.com'
  },
  // While the domain is pending, absolute URLs (canonicals, schema, sitemap,
  // agent files) use the live Vercel production URL so they never point at a
  // domain we don't own. Once `domain` is set, it wins everywhere.
  get host() {
    if (!this.domainPending) return this.domain
    return (typeof process !== 'undefined' && process.env?.VERCEL_PROJECT_PRODUCTION_URL) || this.domain
  },
  get url() {
    return `https://${this.host}`
  },
  target: 'vercel', // 'vercel' | 'static'
  locale: 'en-AU',
  lang: 'en',
  currency: 'AUD',
  country: 'AU',

  founded: '2021',
  foundedPlace: 'Greenacre, Sydney, NSW, Australia',
  certifier: 'Halal Control Australia',
  // Owner-supplied certificate (assets/halal-certificate.jpg → npm run images).
  certificate: {
    number: 'HSS 027843',
    validUntil: '2 April 2027',
    image: '/images/halal-certificate-v1.webp',
    full: '/images/halal-certificate-v1.jpg',
    width: 848,
    height: 1216,
  },

  // Official business email — receives every order, contact and wholesale
  // enquiry (unless overridden by ORDER_EMAIL / CONTACT_EMAIL / WHOLESALE_EMAIL).
  // Always rendered entity-encoded via <Email /> — never as plain text.
  email: 'sales@halalmeatdepot.com.au',
  // "Halal Meat Depot" is a registered business name of this entity.
  legalName: 'AUSBD HALAL FOODS PTY LTD',
  get legalLine() {
    return `${this.name} is a business name of ${this.legalName} (ABN ${this.abn})`
  },
  phone: '0489 989 442',
  // International form for machine-readable data (schema.org), tel: and WhatsApp links.
  phoneIntl: '+61 489 989 442',
  phoneRaw: '61489989442',
  abn: '27 093 995 629',
  abnUrl: 'https://abr.business.gov.au/ABN/View?abn=27093995629',
  address: {
    street: '43 Banksia Rd',
    locality: 'Greenacre',
    region: 'NSW',
    postcode: '2190',
    country: 'AU',
  },
  get addressLine() {
    const a = this.address
    return `${a.street}, ${a.locality} ${a.region} ${a.postcode}`
  },
  hours: [
    { days: 'Monday – Saturday', opens: '06:00', closes: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    { days: 'Sunday', opens: '07:00', closes: '16:00', schema: ['Sunday'] },
  ],

  // Order rules
  minOrder: 250,
  freeShipOver: 500,
  flatShip: 25,
  // Delivery times (owner, 2026-10-13): standard "Free Delivery" 2–5 days in transit; orders are packed
  // and dispatched once payment clears (0–1 day). Used on product pages and in Product schema.
  // "Priority Delivery" (owner, 2026-10-13) is priced by distance — zones, prices and times live in
  // src/config/delivery.js and feed checkout, totals, the delivery page and Product schema.
  delivery: { transitDays: [2, 5], handlingDays: [0, 1] },
  cryptoDiscountPct: 10,
  deliveryArea: 'Australia-wide',
  // tawk.to live chat. The property ID is public (it is in the embed script), so it lives here, not in an env var.
  tawk: { propertyId: '6aef669d7b17683c37891769', widgetId: 'default' },
  pickupAvailable: false, // delivery only — the depot address is the business address, not a pickup point

  gscCode: 'sGGRSb0Z8dIct0rg_qApLhQTsEuBv0EfbPp8hIErqwM', // Google Search Console (URL-prefix property, HTML tag) — added 2026-10-13
  bingCode: '00105D0B4F58136BEF6025904E01ABAF', // Bing Webmaster Tools (meta tag) — added 2026-10-13
  indexNowKey: 'b7f3c2e9a1d84f6c9e2b5a7d3c1f8e4a',
  // Official social profiles (owner-supplied, resolved to canonical profile URLs) — add real URLs only
  sameAs: [
    'https://www.facebook.com/profile.php?id=61594376379964',
    'https://www.tiktok.com/@halal.meat.depot',
    'https://www.pinterest.com.au/halalmeatdepot/',
  ],

  brandStatement:
    'Halal Meat Depot is a Greenacre, Sydney-based halal meat supplier established in 2021, offering beef, lamb, goat, chicken, camel, duck, kangaroo and water buffalo certified halal by Halal Control Australia. Halal Meat Depot delivers Australia-wide and specialises in bulk packs, whole carcasses and wholesale cartons for households, restaurants and caterers at depot prices.',
}

// Payment methods — PayID, bank transfer and crypto only. The crypto discount
// is applied automatically at checkout and recalculated on the server.
export const PAYMENT_METHODS = [
  {
    id: 'payid',
    label: 'PayID',
    note: 'Instant bank payment using our PayID.',
    discountPct: 0,
    opening: 'Please pay {amount} by PayID using the details below.',
    closing: 'Use {ref} as the payment description so we can match your payment.',
  },
  {
    id: 'bank_transfer',
    label: 'Bank transfer',
    note: 'Direct deposit into our business account.',
    discountPct: 0,
    opening: 'Please transfer {amount} to the bank account below.',
    closing: 'Use {ref} as the payment reference. Transfers between banks can take up to one business day to clear.',
  },
  {
    id: 'crypto',
    label: 'Cryptocurrency',
    note: `${SITE.cryptoDiscountPct}% off your meat total — applied automatically.`,
    discountPct: SITE.cryptoDiscountPct,
    opening: 'Please send {amount} worth of cryptocurrency to the wallet below.',
    closing: 'Send on the network shown only, and reply with your transaction ID and order number {ref}.',
  },
]

// Reply Portal / email config — every email, WhatsApp message, payment-terms
// line and admin accent reads from here. Nothing in the portal hardcodes a
// colour, currency, prefix, method or location.
export const REPLY = {
  brand: { primary: '#9F1D24', headerDark: '#1A0D0E' },
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  orderPrefix: 'HMD',
  channels: { email: SITE.email, whatsapp: SITE.phoneRaw },
  headerTagline: 'Certified Halal Meat · Greenacre, Sydney',
  dispatchLine: 'Your order is packed chilled and dispatched once payment clears — we confirm your delivery date with you.',
  paymentMethods: PAYMENT_METHODS,
}

export const FORMS = {
  provider: 'smtp',
  smtpFrom: `${SITE.name} <${SITE.email}>`, // SMTP_FROM env var overrides
  resendFrom: '',
  turnstileSiteKey: '',
  // Orders and enquiries all go to the business email. CONTACT_EMAIL /
  // ORDER_EMAIL / WHOLESALE_EMAIL env vars override without a code change.
  destinations: { contact: SITE.email, order: SITE.email, wholesale: SITE.email },
}

// Floating support chat (src/components/SupportChat.jsx). Contact values come from SITE; the three quick answers
// restate the shipping, payment and refund policies already published on the site — keep them in step with
// /meat-box-delivery/, the FAQ and /refund/.
export const CHAT = {
  quick: [
    {
      icon: 'truck',
      q: 'Where is my order?',
      a: `Orders are packed chilled and dispatched once payment clears, and we confirm your delivery date by email or WhatsApp. Standard delivery takes ${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days: free on orders over $${SITE.freeShipOver}, otherwise $${SITE.flatShip}.`,
      href: '/meat-box-delivery/',
    },
    {
      icon: 'card',
      q: 'How do I pay?',
      a: `We accept PayID, bank transfer and cryptocurrency (${SITE.cryptoDiscountPct}% off your meat total). After you order we send the payment details for your chosen method.`,
      href: '/faq-check-halal-food/',
    },
    {
      icon: 'help',
      q: 'Returns & refunds',
      a: 'Report a problem within 48 hours of delivery with your order number and photos. Damaged, spoiled, incorrect or missing items are replaced or refunded. We cannot accept change-of-mind returns on fresh meat.',
      href: '/refund/',
    },
  ],
}

export const WHOLESALE_TIERS = [
  {
    name: 'Trade Cartons',
    who: 'Restaurants, cafés, takeaways and caterers ordering cartons as they need them.',
    points: [
      `Order online from the Wholesale Cartons range — $${SITE.minOrder} minimum order`,
      `Free delivery on orders over $${SITE.freeShipOver}`,
      `${SITE.cryptoDiscountPct}% off when you pay in cryptocurrency`,
    ],
  },
  {
    name: 'Weekly Accounts',
    who: 'Kitchens with regular weekly volume who want a standing order.',
    points: ['A price sheet for your regular cuts', 'Standing weekly orders scheduled with you', 'Cutting and packing to your specification'],
    highlight: true,
  },
  {
    name: 'Bulk & Event Lots',
    who: 'Butchers, community groups and large events.',
    points: ['Whole lamb and goat carcasses by the lot', 'Large curry-cut packs for weddings and functions', 'Quotes for large one-off orders'],
  },
]

// Compliance language — scanned across the whole build by scripts/crosscheck.mjs.
// Authority: Australian Consumer Law (misleading claims, s18/s29 ACL) — the
// business has confirmed only its certifier, not slaughter method or other
// certifiers, so those claims must not appear.
// Government and industry bodies that regulate or set standards for the meats we sell,
// cited (with links) on category, product and certification pages. None of them issues
// halal certification for meat sold within Australia — our certifier is SITE.certifier.
// cats: category slugs the body applies to, or 'all'.
export const REGULATORS = [
  {
    name: 'Food Standards Australia New Zealand (FSANZ)',
    url: 'https://www.foodstandards.gov.au/',
    role: 'Sets the Australia New Zealand Food Standards Code, including the national standard for producing and processing meat.',
    cats: 'all',
  },
  {
    name: 'NSW Food Authority',
    url: 'https://www.foodauthority.nsw.gov.au/industry/meat',
    role: 'Licenses and audits meat businesses in New South Wales, from abattoirs and processors to wholesalers and retailers.',
    cats: 'all',
  },
  {
    name: 'Department of Agriculture, Fisheries and Forestry (DAFF)',
    url: 'https://www.agriculture.gov.au/biosecurity-trade/export/controlled-goods/meat/exporting-halal-red-meat-and-products',
    role: 'Runs the Australian Government Authorised Halal Program, which regulates halal red meat exported from Australia.',
    cats: ['beef', 'lamb', 'goat', 'camel', 'water-buffalo', 'offal', 'wholesale-cartons'],
  },
  {
    name: 'AUS-MEAT',
    url: 'https://www.ausmeat.com.au/',
    role: 'Maintains the national meat language — the standard cut descriptions and marble scores used across the Australian meat industry.',
    cats: ['beef', 'lamb', 'goat', 'water-buffalo', 'offal', 'wholesale-cartons'],
  },
  {
    name: 'Meat & Livestock Australia (MLA)',
    url: 'https://www.mla.com.au/',
    role: "The red meat industry's research, development and marketing body for cattle, sheep and goat meat.",
    cats: ['beef', 'lamb', 'goat', 'offal', 'wholesale-cartons'],
  },
  {
    name: 'NSW Kangaroo Management Program',
    url: 'https://www.environment.nsw.gov.au/topics/animals-and-plants/wildlife-management/kangaroo-management',
    role: 'Regulates the sustainable commercial harvest of kangaroos in New South Wales.',
    cats: ['kangaroo'],
  },
]
export const regulatorsFor = (cat) => REGULATORS.filter((r) => r.cats === 'all' || r.cats.includes(cat))

export const COMPLIANCE = {
  bannedTerms: [
    'hand-slaughtered', 'hand slaughtered', 'non-stunned', 'zabiha certified', 'hand zabiha',
    'HCAA', 'AFIC', 'ANIC', 'Halal Certification Authority Australia', 'Australian Federation of Islamic Councils',
    'Imams Council', 'NSW Halal Board', 'NSW Halal Authority', 'NSW-FA-49210', 'AU884',
    'web3forms', 'MSA graded',
    'free pickup', 'pick up for free', 'pickup from our', // delivery only — no pickup (owner, 2026-10-09)
  ],
}

export const NAV = [
  { href: '/halal-meat-shop-near-me/', label: 'Shop' },
  { href: '/halal-meat-manufacturers-wholesale/', label: 'Wholesale' },
  { href: '/halal-food-australia-certified-meat/', label: 'Halal Certification' },
  { href: '/about-halal-butcher/', label: 'About' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact-halal-butcher-near-me/', label: 'Contact' },
]
