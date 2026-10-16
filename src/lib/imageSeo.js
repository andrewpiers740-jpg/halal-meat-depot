import { SITE, containsExact } from '../config/site.js'

// Image SEO (owner rule, 2026-10-13): the focus keyword of the product or page an image
// belongs to appears in the image's alt, title, caption and description.
//   alt / title → attributes on the <img>
//   caption     → visible <figcaption> (and ImageObject.caption)
//   description → ImageObject.description in the page's JSON-LD
// Enforced by scripts/crosscheck.mjs (F6–F7).

const cap = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase())
const halal = (f) => (/\bhalal\b/i.test(f) ? f : `halal ${f}`)

export function productImageSeo(p) {
  const named = containsExact(p.name, p.focus)
  const subject = named ? `Halal ${p.name}` : `${cap(halal(p.focus))} (${p.name})`
  const caption = `${subject}, ${p.unit}`
  return {
    alt: `${subject} — ${p.unit}, certified halal by ${SITE.certifier}`,
    title: named ? `Halal ${p.name}` : cap(halal(p.focus)),
    caption,
    description: `${caption}. ${p.short} Certified halal by ${SITE.certifier} and delivered Australia-wide by ${SITE.name}.`,
  }
}

export function categoryImageSeo(c) {
  const subject = c.slug === 'wholesale-cartons' ? 'Meat boxes and bulk halal meat cartons' : cap(halal(c.focus))
  return {
    alt: `${subject} from ${SITE.name}, Greenacre, Sydney`,
    title: subject,
    caption: subject,
    description: `${subject}: ${c.tagline}. Certified halal by ${SITE.certifier} and delivered Australia-wide.`,
  }
}

// ImageObject for JSON-LD (Product.image, WebPage.primaryImageOfPage, …).
export function imageObject(url, seo, extra = {}) {
  return { '@type': 'ImageObject', url, contentUrl: url, name: seo.title, caption: seo.caption, description: seo.description, ...extra }
}

// Blog post photos (owner request 2026-10-16): four openly licensed photos per post, credited in the caption.
// The post's focus keyword leads the alt, title, caption and description (F6–F7).
export function postImageSeo(post, img, i) {
  const subject = post.kw.charAt(0).toUpperCase() + post.kw.slice(1)
  const caption = `${subject}: ${img.alt}`
  const credit = `Photo: ${img.creator || 'unknown'}, ${img.license}`
  return {
    alt: caption,
    title: `${subject} (photo ${i + 1} of ${post.images?.length || 4})`,
    caption,
    credit,
    description: `${caption}. Illustrative photo for the ${SITE.name} guide "${post.title}". ${credit}.`,
  }
}
