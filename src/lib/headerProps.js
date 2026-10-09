import { SITE, NAV, CATEGORIES } from '../config/site.js'

// Minimal data for the client-side Header — keeps the full catalogue out of the browser bundle.
export const headerProps = { siteName: SITE.name, nav: NAV, categories: CATEGORIES.map(({ slug, name }) => ({ slug, name })) }
