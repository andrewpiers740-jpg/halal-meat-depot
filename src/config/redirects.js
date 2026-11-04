// Redirect tables (moved out of site.js 2026-11-04): site.js is imported by client components, and these
// top-level expressions kept the 35 KB blog-moves map in every page bundle. Only next.config.mjs imports this file.
import { PRODUCTS as ALL_PRODUCTS, CATEGORIES as ALL_CATEGORIES } from './products.js'
import { POST_MOVES_V4 } from './post-v4-index.js'

// Old URLs of pages and posts that moved (keyword URLs). Kept here, not in seo.js: seo.js is reached by client bundles.
const PAGE_MOVES_BASE = {
  // Keyword map v4 (owner, 2026-11-02): pages moved to their new primary keyword.
  '/halal-meat-shop/': '/halal-meat-shop-near-me/',
  '/halal-meat-wholesale/': '/halal-meat-manufacturers-wholesale/',
  '/halal-meat-delivery/': '/meat-box-delivery/',
  '/halal-certified-meat/': '/halal-food-australia-certified-meat/',
  '/about/': '/about-halal-butcher/',
  '/contact/': '/contact-halal-butcher-near-me/',
  '/faq/': '/faq-check-halal-food/',
  '/shop/': '/halal-meat-shop-near-me/',
  '/wholesale/': '/halal-meat-manufacturers-wholesale/',
  '/aqeeqah-qurbani/': '/whole-lamb-aqeeqah-qurbani/',
  '/shipping/': '/meat-box-delivery/',
  '/halal-certification/': '/halal-food-australia-certified-meat/',
  // Blog posts moved so the slug carries the exact file keyword (2026-10-13).
  '/blog/what-halal-certification-means-australia/': '/blog/halal-meat-australia-certification/',
  '/blog/goat-curry-cuts-guide/': '/blog/goat-meat-curry-cuts-guide/',
  '/blog/cooking-camel-buffalo-kangaroo/': '/blog/cooking-camel-meat-buffalo-kangaroo/',
  '/blog/lamb-cuts-guide/': '/blog/lamb-cuts-australia-guide/',
}

// Earlier moves that point at a post v4 moved again go straight to the final URL (no redirect chains).
const MOVES = {
  ...Object.fromEntries(Object.entries(PAGE_MOVES_BASE).map(([a, b]) => [a, POST_MOVES_V4[b] || b])),
  ...POST_MOVES_V4,
}

// Product pages that were removed from the catalogue → where their old URLs now go
// (301, applied in next.config.mjs). Keep entries so indexed/shared links never 404.
export const RETIRED_PRODUCTS = {
  'camel-curry-pieces-bone-in': '/shop/camel/',
  'camel-hump': '/shop/camel/',
  'camel-striploin-steaks': '/product/camel-steak-near-me-porterhouse/',
  'camel-ribs-and-shoulder': '/product/buy-camel-meat-neck-disc-bone/',
  'camel-stir-fry-strips': '/product/australia-camel-meat-diced-boneless/',
  'camel-shoulder-boneless': '/product/australia-camel-meat-diced-boneless/',
  'buffalo-striploin-steaks': '/product/buffalo-steak-price-porterhouse/',
  'buffalo-striploin-whole': '/product/buffalo-steak-price-porterhouse/',
  'buffalo-rump-steaks': '/shop/water-buffalo/',
  'buffalo-curry-cut-bone-in': '/shop/water-buffalo/',
  'buffalo-short-ribs': '/product/ribs-asado-buffalo/',
  'buffalo-stir-fry-strips': '/product/buffalo-meat-for-sale-diced-boneless/',
  'whole-pekin-ducks': '/product/whole-duck-size-20-23/',
  'whole-pekin-duck-single': '/product/whole-duck-size-20-23/',
  'duck-halves': '/product/whole-duck-size-20-23/',
  'duck-breast-fillets-skin-on': '/product/duck-breast-near-me-fillets/',
  'duck-breast-fillets-bulk-pack': '/product/duck-breast-near-me-fillets/',
  'duck-maryland': '/product/duck-meat-near-me-legs/',
  'duck-leg-meat-boneless': '/product/duck-meat-near-me-legs/',
  'duck-wings': '/shop/duck/',
  'duck-giblets': '/product/buy-duck-liver/',
  'kangaroo-fillet': '/shop/kangaroo/',
  'kangaroo-steaks': '/product/buy-kangaroo-meat-loin-fillet/',
  'kangaroo-loin-medallions': '/product/buy-kangaroo-meat-loin-fillet/',
  'diced-kangaroo': '/shop/kangaroo/',
  'kangaroo-stir-fry-strips': '/shop/kangaroo/',
  'beef-rump-whole': '/shop/beef/',
  'beef-rib-eye-on-the-bone': '/shop/beef/',
  'diced-beef-boneless': '/shop/beef/',
  'wagyu-scotch-fillet-mb8-9': '/shop/beef/',
  'beef-striploin-whole': '/shop/beef/',
  'beef-rump-cap-picanha': '/shop/beef/',
  'beef-eye-fillet-medallions': '/shop/beef/',
  'beef-scotch-fillet-whole': '/shop/beef/',
  'beef-sirloin-steaks-boneless': '/shop/beef/',
  'beef-brisket-bone-in-curry-cut': '/shop/beef/',
  'beef-plate-short-ribs': '/shop/beef/',
  'lean-beef-mince': '/shop/beef/',
  'beef-kofta-mince': '/shop/beef/',
  'wagyu-topside-mb8-9': '/shop/beef/',
  'beef-shin-boneless': '/shop/beef/',
  'beef-marrow-bones-cut': '/shop/beef/',
  'lamb-leg-boneless': '/shop/lambs-for-sale/',
  'lamb-shoulder-bone-in': '/shop/lambs-for-sale/',
  'lamb-curry-pieces': '/shop/lambs-for-sale/',
  'lamb-chump-chops': '/shop/lambs-for-sale/',
  'lamb-forequarter-whole': '/shop/lambs-for-sale/',
  'lamb-hindquarter-whole': '/shop/lambs-for-sale/',
  'lamb-neck-chops': '/shop/lambs-for-sale/',
  'lamb-easy-carve-leg': '/shop/lambs-for-sale/',
  'lamb-shoulder-boneless-rolled': '/shop/lambs-for-sale/',
  'lamb-shanks-frenched': '/shop/lambs-for-sale/',
  'lamb-mansaf-pieces': '/shop/lambs-for-sale/',
  'lamb-biryani-cut-leg-and-shoulder': '/shop/lambs-for-sale/',
  'lamb-kofta-mince': '/shop/lambs-for-sale/',
  'goat-curry-cut-bone-in': '/shop/goat/',
  'diced-goat-boneless': '/shop/goat/',
  'goat-shoulder-bone-in': '/shop/goat/',
  'goat-cutlets-and-chops': '/shop/goat/',
  'goat-ribs': '/shop/goat/',
  'goat-shanks-and-stew-pieces': '/shop/goat/',
  'goat-mandi-pieces': '/shop/goat/',
  'goat-mince': '/shop/goat/',
  'goat-leg-boneless': '/shop/goat/',
  'goat-neck-chops': '/shop/goat/',
  'whole-chickens-size-16': '/shop/chicken/',
  'chicken-curry-cut-bone-in': '/shop/chicken/',
  'free-range-whole-chickens': '/shop/chicken/',
  'whole-chickens-size-12': '/shop/chicken/',
  'chicken-spatchcocks': '/shop/chicken/',
  'chicken-schnitzel-slices': '/shop/chicken/',
  'chicken-thigh-cutlets-bone-in': '/shop/chicken/',
  'chicken-wingettes-and-drumettes': '/shop/chicken/',
  'chicken-drumsticks-skinless': '/shop/chicken/',
  'corn-fed-whole-chickens': '/shop/chicken/',
  'free-range-chicken-breast-fillets': '/shop/chicken/',
  'kangaroo-fillets': '/shop/kangaroo/',
  'kangaroo-loin-fillets-500g-pack': '/shop/kangaroo/',
  'kangaroo-topside': '/shop/kangaroo/',
  'kangaroo-mince': '/shop/kangaroo/',
  'kangaroo-burgers': '/shop/kangaroo/',
  'kangaroo-sausages': '/shop/kangaroo/',
  'kangaroo-tail': '/shop/kangaroo/',
}

// Where an old URL lives now (keyword URLs, src/config/seo.js). Used for every 301 and to
// point retired-product redirects straight at the final page (no redirect chains).
export function currentPath(path) {
  if (MOVES[path]) return MOVES[path]
  const shop = path.match(/^\/shop\/([^/]+)\/(#.*)?$/)
  if (shop) {
    const c = ALL_CATEGORIES.find((x) => x.slug === shop[1] || x.urlSlug === shop[1] || x.prevUrlSlugs?.includes(shop[1]))
    if (c) return c.path + (shop[2] || '')
  }
  const prod = path.match(/^\/product\/([^/]+)\/$/)
  if (prod) {
    const p = ALL_PRODUCTS.find((x) => x.oldSlug === prod[1] || x.prevSlugs?.includes(prod[1]))
    if (p) return `/product/${p.slug}/`
  }
  return path
}

// Every permanent redirect (applied in next.config.mjs).
// Blog posts retired 2026-10-27 (no qualifying keyword): 301 to the blog index
const RETIRED_POSTS = ['slow-cooked-lamb-shanks','beef-curry-recipe','rogan-josh-with-beef','beef-pasta-bake','fried-rice-and-beef','marinated-lamb-chops','how-do-you-cook-lamb-cutlets','lamb-shank-soup','diced-lamb-recipes','slow-cooked-lamb-chops','how-to-cook-lamb-ribs-in-oven','lamb-chop-casserole','slow-cooked-goat-recipes','recipe-for-goat-leg','chicken-thigh-slow-cooker-meals']

export const REDIRECTS = [
  ...Object.entries(MOVES).map(([source, destination]) => ({ source, destination })),
  ...ALL_CATEGORIES.filter((c) => c.urlSlug !== c.slug).map((c) => ({ source: `/shop/${c.slug}/`, destination: c.path })),
  ...ALL_CATEGORIES.flatMap((c) => (c.prevUrlSlugs || []).filter((s) => s !== c.slug).map((s) => ({ source: `/shop/${s}/`, destination: c.path }))),
  ...ALL_PRODUCTS.filter((p) => p.oldSlug).map((p) => ({ source: `/product/${p.oldSlug}/`, destination: `/product/${p.slug}/` })),
  ...ALL_PRODUCTS.flatMap((p) => (p.prevSlugs || []).map((s) => ({ source: `/product/${s}/`, destination: `/product/${p.slug}/` }))),
  ...RETIRED_POSTS.map((slug) => ({ source: `/blog/${slug}/`, destination: '/blog/' })),
  ...Object.entries(RETIRED_PRODUCTS).map(([slug, dest]) => ({ source: `/product/${slug}/`, destination: currentPath(dest) })),
]
