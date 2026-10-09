import { SITE, NAV, CATEGORIES, PRODUCTS, subSlug } from '../config/site.js'

// Minimal data for the client-side Header — keeps the full catalogue out of the browser bundle.
// Only subcategories that actually have products are listed (empty ones have no section to link to).
export const headerProps = {
  siteName: SITE.name,
  nav: NAV,
  categories: CATEGORIES.map(({ slug, name, subcategories }) => ({
    slug,
    name,
    subs: subcategories
      .filter((sub) => PRODUCTS.some((p) => p.cat === slug && p.sub === sub))
      .map((sub) => ({ name: sub, id: subSlug(sub) })),
  })),
}
