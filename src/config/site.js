// ★ SINGLE SOURCE OF TRUTH ★
// Every route, meta tag, JSON-LD block, sitemap entry, nav link, email, agent
// file and API response derives from this file (+ products.js / content.js).
// The domain appears in exactly ONE place: SITE.domain. To go live, change that
// one line, rebuild and push — never find-and-replace a domain across files.

export { CATEGORIES, PRODUCTS, productBySlug, categoryBySlug, productsInCategory, IMAGE_VERSION, categoryImage } from './products.js'
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

  // Official business email — receives every order, contact and wholesale
  // enquiry (unless overridden by ORDER_EMAIL / CONTACT_EMAIL / WHOLESALE_EMAIL).
  // Always rendered entity-encoded via <Email /> — never as plain text.
  email: 'sales@halalmeatdepot.com.au',
  // "Halal Meat Depot" is a registered business name of this entity.
  legalName: 'AUSBD HALAL FOODS PTY LTD',
  get legalLine() {
    return `${this.name} is a business name of ${this.legalName} (ABN ${this.abn})`
  },
  phone: '+61 489 989 442',
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
  cryptoDiscountPct: 10,
  deliveryArea: 'Australia-wide',
  pickupAvailable: false, // delivery only — the depot address is the business address, not a pickup point

  gscCode: '', // Google Search Console verification — set when GSC is connected
  bingCode: '',
  indexNowKey: 'b7f3c2e9a1d84f6c9e2b5a7d3c1f8e4a',
  sameAs: [], // official social profiles — add real URLs only

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

export const CHAT = {
  channels: [{ type: 'whatsapp', value: SITE.phoneRaw }],
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
export const COMPLIANCE = {
  bannedTerms: [
    'hand-slaughtered', 'hand slaughtered', 'non-stunned', 'zabiha certified', 'hand zabiha',
    'HCAA', 'AFIC', 'ANIC', 'Halal Certification Authority Australia', 'Australian Federation of Islamic Councils',
    'Imams Council', 'NSW Halal Board', 'NSW Halal Authority', 'NSW-FA-49210', 'AU884',
    'web3forms', 'organic', 'grass-fed', 'MSA graded',
    'free pickup', 'pick up for free', 'pickup from our', // delivery only — no pickup (owner, 2026-10-09)
  ],
}

export const NAV = [
  { href: '/shop/', label: 'Shop' },
  { href: '/wholesale/', label: 'Wholesale' },
  { href: '/halal-certification/', label: 'Halal Certification' },
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
]
