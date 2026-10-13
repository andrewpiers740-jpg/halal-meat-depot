// Focus keywords and keyword URLs (owner rule, 2026-10-13): every indexable page has a
// UNIQUE focus keyword that appears in its SEO title, meta description and slug.
// Keywords come from the owner's Semrush exports (docs/seo-strategy-report.md). Where the
// best keyword wasn't in the old slug the URL changed; every old URL 301s via REDIRECTS.
// Products not listed here use their own name as the focus keyword (see focusFromName).

// Products — keyed by the ORIGINAL slug (image files keep that name). `slug` only where the
// URL changed. Owner rule (2026-10-13): product/category primary keywords must be Transactional
// or Commercial intent (Semrush), preferring high volume and low KD. `intent` records the source:
//   T / C / I,T / I,C … = Semrush intent of that exact keyword
//   'T*' = buying form of the product name ("buy … online") — no Semrush data for that exact phrase
// Products not listed use their own name (a product-name search is a buying search; no Semrush data).
export const PRODUCT_SEO = {
  'beef-eye-fillet-steaks': { focus: 'beef eye fillet', intent: 'I,T', vol: 2400, kd: 18 },
  'beef-scotch-fillet-steaks': { focus: 'scotch fillet ribeye', intent: 'I,T', vol: 110, kd: 10, slug: 'scotch-fillet-ribeye-steaks' },
  'beef-herb-and-garlic-sausages': { focus: 'sausages', intent: 'I,T', vol: 5400, kd: 23 },
  'beef-tongue': { focus: 'beef tongue', intent: 'I,T', vol: 1000, kd: 14 },
  'beef-porterhouse-steaks': { focus: 'sirloin steak beef', intent: 'I,T', vol: 4400, kd: 17, slug: 'sirloin-steak-beef-porterhouse' },
  'beef-oxtail': { focus: 'oxtail', intent: 'I,T', vol: 4400, kd: 24 },
  'extra-lean-beef-mince': { focus: 'extra lean beef mince', intent: 'I,C', vol: 2400, kd: 19 },
  'lamb-cutlets-frenched': { focus: 'lamb cutlets price', intent: 'T', vol: 320, kd: 8, slug: 'frenched-lamb-cutlets-price' },
  'premium-beef-mince': { focus: 'premium beef mince', intent: 'I,C', vol: 320, kd: 6 },
  'chicken-feet': { focus: 'chicken feet', intent: 'I,T', vol: 3600, kd: 18 },
  'beef-flank-steak': { focus: 'flank steak beef', intent: 'I,T', vol: 3600, kd: 21, slug: 'flank-steak-beef' },
  'beef-chuck-steak': { focus: 'beef chuck meat', intent: 'I,T', vol: 1000, kd: 13, slug: 'beef-chuck-meat-steak' },
  'beef-oyster-blade-steaks': { focus: 'flat iron steak beef', intent: 'I,T', vol: 2400, kd: 15, slug: 'flat-iron-steak-beef-oyster-blade' },
  'beef-liver': { focus: 'beef liver meat', intent: 'I,C', vol: 70, kd: 2, slug: 'beef-liver-meat' },
  'beef-chuck-and-brisket-burgers': { focus: 'beef patties', intent: 'I,C', vol: 1000, kd: 11, slug: 'beef-patties-chuck-and-brisket' },
  'lamb-mince': { focus: 'ground lamb meat', intent: 'C', vol: 170, kd: 23, slug: 'ground-lamb-meat-mince' },
  'kangaroo-rump-steaks': { focus: 'kangaroo steak', intent: 'C', vol: 2900, kd: 15, slug: 'kangaroo-steak-rump' },
  'beef-brisket-whole': { focus: 'buy beef brisket', intent: 'T', vol: 260, kd: 11, slug: 'buy-beef-brisket-whole' },
  'beef-t-bone-steaks': { focus: 'beef steak t-bone', intent: 'I,T', vol: 2400, kd: 19, slug: 'beef-steak-t-bone' },
  'dry-aged-new-york-strip-bone-in': { focus: 'dry aged beef online', intent: 'C', vol: 70, kd: 4, slug: 'dry-aged-beef-online-new-york-strip' },
  'chicken-thigh-fillets': { focus: 'chicken thigh price', intent: 'T', vol: 210, kd: 12, slug: 'chicken-thigh-price-fillets' },
  'beef-soup-bones': { focus: 'beef bones', intent: 'I,C', vol: 880, kd: 9, slug: 'beef-bones-for-soup' },
  'beef-new-york-strip-bone-in': { focus: 'beef new york steak', intent: 'I,T', vol: 1900, kd: 11, slug: 'beef-new-york-steak-bone-in' },
  'roast-beef-joint': { focus: 'buy roast beef online', intent: 'T', vol: 170, kd: 6, slug: 'buy-roast-beef-online-joint' },
  'chicken-necks': { focus: 'chicken necks', intent: 'C', vol: 880, kd: 8 },
  'beef-marrow-bones': { focus: 'marrow bones', intent: 'I,C', vol: 720, kd: 10 },
  'chicken-frames': { focus: 'chicken frames', intent: 'I,C', vol: 720, kd: 10 },
  'beef-rump-steaks': { focus: 'rump beef', intent: 'I,T', vol: 390, kd: 17, slug: 'rump-beef-steaks' },
  'diced-beef': { focus: 'buy diced beef online', intent: 'T', vol: 70, kd: 3, slug: 'buy-diced-beef-online' },
  'wagyu-scotch-fillet-steaks-mb5': { focus: 'wagyu beef ribeye steak', intent: 'I,C', vol: 390, kd: 16, slug: 'wagyu-beef-ribeye-steak-mb5' },
  'whole-duck-size-20-23': { focus: 'whole duck', intent: 'C', vol: 590, kd: 11 },
  'chicken-maryland': { focus: 'buy chicken maryland online', intent: 'T', vol: 70, kd: 3, slug: 'buy-chicken-maryland-online' },
  'beef-cheeks': { focus: 'buy beef cheeks', intent: 'T', vol: 170, kd: 12, slug: 'buy-beef-cheeks' },
  'diced-lamb-boneless': { focus: 'diced lamb', intent: 'I,C', vol: 590, kd: 11 },
  'beef-cocktail-kebabs': { focus: 'kebab skewers', intent: 'C', vol: 720, kd: 22, slug: 'beef-kebab-skewers' },
  'beef-short-ribs': { focus: 'buy beef short ribs', intent: 'T', vol: 50, kd: 8, slug: 'buy-beef-short-ribs' },
  'buffalo-rib-eye-steak': { focus: 'buffalo steak', intent: 'C', vol: 70, kd: 16, slug: 'buffalo-steak-rib-eye' },
  'whole-mutton-carcass': { focus: 'mutton meat', intent: 'I,T', vol: 210, kd: 15, slug: 'whole-mutton-meat-carcass' },
  'wagyu-eye-fillet-steaks-mb5': { focus: 'wagyu eye fillet', intent: 'I,C', vol: 260, kd: 7 },
  'wagyu-porterhouse-steaks-mb5': { focus: 'wagyu beef porterhouse', intent: 'C', vol: 170, kd: 8, slug: 'wagyu-beef-porterhouse-steaks-mb5' },
  'wagyu-brisket-mb9': { focus: 'wagyu beef brisket', intent: 'I,C', vol: 90, kd: 8, slug: 'wagyu-beef-brisket-mb9' },
  'black-angus-beef-rump-whole-mb3-4': { focus: 'whole beef rump', intent: 'C', vol: 210, kd: 4, slug: 'whole-beef-rump-black-angus-mb3-4' },
  'goat-leg-bone-in': { focus: 'goat leg', intent: 'I,T', vol: 170, kd: 9 },
  'angus-beef-scotch-fillet-steaks-mb3-4': { focus: 'black angus beef ribeye', intent: 'I,C', vol: 50, kd: 5, slug: 'black-angus-beef-ribeye-steaks-mb3-4' },
  'wagyu-texan-chilli-sausages': { focus: 'wagyu beef sausages', intent: 'I,T', vol: 110, kd: 6, slug: 'wagyu-beef-sausages-texan-chilli' },
  'beef-eye-fillet-whole': { focus: 'whole beef fillet', intent: 'I,C', vol: 90, kd: 15, slug: 'whole-beef-fillet' },
  'whole-beef': { focus: 'whole beef', intent: 'I,C', vol: 70, kd: 0 },
  'beef-asado-ribs': { focus: 'asado cut ribs', intent: 'I,T', vol: 20, kd: 6, slug: 'beef-asado-cut-ribs' },
  'diced-goat-bone-in': { focus: 'diced goat', intent: 'C', vol: 20, kd: 4 },
  'buffalo-tomahawk': { focus: 'buffalo tomahawk steak', intent: 'C', vol: 20, kd: 6, slug: 'buffalo-tomahawk-steak' },
  'camel-tomahawk': { focus: 'camel tomahawk steak', intent: 'I,T', vol: 20, kd: 7, slug: 'camel-tomahawk-steak' },
  'duck-mince': { focus: 'minced duck meat', intent: 'C', vol: 20, kd: 9, slug: 'minced-duck-meat' },
  'lamb-and-rosemary-sausages': { focus: 'halal lamb sausages', intent: 'T', vol: 20, kd: 4, slug: 'halal-lamb-sausages-rosemary' },
  // exact product name is Informational in the data → buying form instead
  // Owner decision (2026-10-13): the exact file keyword replaces a made-up "buy … online" phrase, even
  // though Semrush marks it Informational (ownerOk lets it past the T/C rule). Old URLs 301 via prevSlugs.
  'lamb-neck': { focus: 'lamb neck', intent: 'I', vol: 1000, kd: 9, ownerOk: true, prevSlugs: ['buy-lamb-neck-online'] },
  'gravy-beef': { focus: 'gravy beef', intent: 'I', vol: 2900, kd: 14, ownerOk: true, prevSlugs: ['buy-gravy-beef-online'] },
  'beef-rump-cap': { focus: 'beef rump cap', intent: 'I', vol: 590, kd: 13, ownerOk: true, prevSlugs: ['buy-beef-rump-cap-online'] },
  'chicken-livers': { focus: 'chicken livers', intent: 'I', vol: 590, kd: 11, ownerOk: true, prevSlugs: ['buy-chicken-livers-online'] },
  // Owner fallback rule (2026-10-13): exact file keywords with KD 0–29 for products that had none.
  'lamb-leg-bone-in': { focus: 'leg of lamb for sale', intent: 'T', vol: 90, kd: 10, slug: 'leg-of-lamb-for-sale-bone-in' },
  'buffalo-t-bone-steak': { focus: 'buffalo t bone steak', intent: 'C', vol: 10, kd: 4 },
}

// Categories — keyed by category id (products reference the id; only the URL changes).
export const CATEGORY_SEO = {
  beef: { focus: 'halal beef', urlSlug: 'halal-beef', intent: 'C', vol: 210, kd: 12 },
  lamb: { focus: 'lamb', urlSlug: 'lamb', intent: 'I,T', vol: 12100, kd: 19 },
  goat: { focus: 'goat meat for sale', urlSlug: 'goat-meat-for-sale', intent: 'T', vol: 40, kd: 8 },
  chicken: { focus: 'halal chicken', urlSlug: 'halal-chicken', intent: 'C', vol: 1300, kd: 15 },
  camel: { focus: 'camel meat australia', urlSlug: 'camel-meat-australia', intent: 'I,C', vol: 50, kd: 8 },
  duck: { focus: 'duck meat', urlSlug: 'duck-meat', intent: 'C', vol: 880, kd: 11 },
  kangaroo: { focus: 'kangaroo meat for sale', urlSlug: 'kangaroo-meat-for-sale', intent: 'T', vol: 110, kd: 9 },
  'water-buffalo': { focus: 'buffalo meat', urlSlug: 'buffalo-meat', intent: 'I,C', vol: 590, kd: 8 },
  offal: { focus: 'beef organ meat', urlSlug: 'offal-beef-organ-meat', intent: 'C', vol: 90, kd: 16 },
  'wholesale-cartons': { focus: 'meat boxes', urlSlug: 'bulk-meat-boxes', intent: 'C', vol: 720, kd: 21 },
}

// Static pages that moved to keyword URLs.
export const PAGE_MOVES = {
  '/shop/': '/halal-meat-shop/',
  '/wholesale/': '/halal-meat-wholesale/',
  '/aqeeqah-qurbani/': '/whole-lamb-aqeeqah-qurbani/',
  '/shipping/': '/halal-meat-delivery/',
  '/halal-certification/': '/halal-certified-meat/',
  // Blog posts moved so the slug carries the exact file keyword (2026-10-13).
  '/blog/what-halal-certification-means-australia/': '/blog/halal-meat-australia-certification/',
  '/blog/goat-curry-cuts-guide/': '/blog/goat-meat-curry-cuts-guide/',
  '/blog/cooking-camel-buffalo-kangaroo/': '/blog/cooking-camel-meat-buffalo-kangaroo/',
  '/blog/lamb-cuts-guide/': '/blog/lamb-cuts-australia-guide/',
}

// Focus keywords for static pages (the homepage has no slug, so only title + meta apply).
export const PAGE_SEO = {
  '/': 'halal meat',
  '/wagyu-steak/': 'wagyu steak',
  '/halal-meat-shop/': 'halal meat shop',
  '/halal-meat-wholesale/': 'halal meat wholesale',
  '/whole-lamb-aqeeqah-qurbani/': 'whole lamb',
  '/halal-meat-delivery/': 'halal meat delivery',
  '/halal-certified-meat/': 'halal certified meat',
  '/about/': 'about',
  '/contact/': 'contact',
  '/faq/': 'faq',
  '/blog/': 'blog',
  '/refund/': 'refund',
  '/terms/': 'terms',
  '/privacy/': 'privacy',
}

// Blog posts — keyed by post slug.
export const POST_SEO = {
  'halal-meat-australia-certification': 'halal meat australia',
  'guide-to-halal-beef-cuts': 'halal beef cuts',
  'goat-meat-curry-cuts-guide': 'goat meat',
  'cooking-camel-meat-buffalo-kangaroo': 'camel meat',
  'lamb-cuts-australia-guide': 'lamb cuts australia',
  'scotch-fillet-vs-porterhouse-vs-eye-fillet': 'scotch fillet vs porterhouse',
  'slow-cooked-beef-cheeks': 'slow cooked beef cheeks',
  'lamb-casserole-recipe': 'lamb casserole recipe',
  'slow-roast-lamb-slow-cooker': 'slow roast lamb slow cooker',
  'chicken-maryland-recipes': 'chicken maryland recipes',
  'sirloin-vs-porterhouse-vs-rump': 'sirloin vs porterhouse',
  '30-minute-beef-mince-recipes': '30 minute beef mince recipes',
  'beef-bolar-blade-roast-recipe': 'beef bolar blade roast recipe',
  'beef-oyster-blade-steak-recipe': 'beef oyster blade steak recipe',
  'slow-cooked-lamb-shanks': 'slow cooked lamb shanks',
  'best-beef-cut-for-roasting': 'best beef cut for roasting',
  'best-bones-for-bone-broth': 'best bones for bone broth',
  'gravy-beef-vs-chuck': 'gravy beef vs chuck',
  'best-beef-for-stir-fry': 'best beef for stir fry',
  'best-temperature-to-smoke-beef-brisket': 'best temperature to smoke beef brisket',
}

// Default focus keyword for a product with no keyword data: its own name.
export const focusFromName = (name) => name.toLowerCase().replace(/\s*\(([^)]*)\)/g, ' $1').replace(/[+%]/g, '').replace(/\s+/g, ' ').trim()

// Word-level normaliser shared by the build check: "Cattleman's" ≈ "cattleman-s", "&" ≈ "and", plural ≈ singular.
export const focusWords = (t) =>
  String(t).toLowerCase().replace(/&amp;/g, 'and').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean).map((w) => w.replace(/(?<!s)s$/, ''))
export const containsFocus = (text, focus) => ` ${focusWords(text).join(' ')} `.includes(` ${focusWords(focus).join(' ')} `)

// EXACT keyword match (owner rule, 2026-10-13): the keyword's words, unmodified and in order —
// no plural folding, no "&" → "and". Only case and punctuation between words are ignored, so
// "Buffalo T-Bone Steak" carries "buffalo t bone steak" and "Lamb & Rosemary" carries "lamb & rosemary".
export const exactWords = (t) =>
  String(t).toLowerCase().replace(/&amp;/g, '&').replace(/&#x27;|&#39;|[’‘]/g, "'").replace(/[^a-z0-9']+/g, ' ').replace(/(^| )'|'( |$)/g, ' ').trim()
export const containsExact = (text, kw) => ` ${exactWords(text)} `.includes(` ${exactWords(kw)} `)

// SEO power words (owner rule, 2026-10-13): every SEO title carries 1–2 of these. Only words that
// are true of what we sell — no "cheapest", "#1", "award-winning" (Australian Consumer Law).
export const POWER_WORDS = ['fresh', 'premium', 'certified', 'best', 'easy', 'ultimate', 'complete', 'quick', 'simple', 'essential', 'expert', 'tender', 'delicious']
export const powerWordCount = (title) => exactWords(title).split(' ').filter((w) => POWER_WORDS.includes(w)).length
