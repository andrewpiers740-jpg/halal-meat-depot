import { SITE } from '../config/site.js'

export const BUILD_TIME = new Date().toISOString()

// Every page's metadata goes through here: canonical, OG + Twitter (kept in
// sync with the description), og:updated_time, robots. Titles ≤60 chars and
// descriptions 110–158 chars are enforced by scripts/crosscheck.mjs.
export function pageMeta({ title, description, path = '/', image, noindex = false, type = 'website' }) {
  const url = `${SITE.url}${path}`
  const img = image || `${SITE.url}/images/og-v2.webp`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE.name,
      locale: 'en_AU',
      title,
      description,
      url,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
    other: { 'og:updated_time': BUILD_TIME },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
