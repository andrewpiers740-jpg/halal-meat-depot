// Blog keyword map v4 (owner, 2026-11-02), applied post by post as each one's copy is written.
// A post switches to v4 only when it has an entry in POST_COPY_V4 (new title, meta, lead sentence and the added
// sections that carry its secondaries and reach 1,500+ words). Data only — no imports from content.js or seo.js.
import { POST_KEYWORDS_V4 } from './post-keywords-v4.js'
import { POST_COPY_V4 } from './post-copy-v4.js'

// slug before v4 → { slug, kw, keywords, ...copy }
export const POST_V4 = Object.fromEntries(
  Object.entries(POST_KEYWORDS_V4)
    .filter(([old]) => POST_COPY_V4[old])
    .map(([old, k]) => [old, { ...k, ...POST_COPY_V4[old] }]),
)

// Old post URL → new post URL, for the 301s and for resolving older links.
export const POST_MOVES_V4 = Object.fromEntries(
  Object.entries(POST_V4)
    .filter(([old, v]) => !v.isNew && v.slug !== old)
    .map(([old, v]) => [`/blog/${old}/`, `/blog/${v.slug}/`]),
)

// Apply v4 to a post object (existing posts only; new posts are written in full in posts-v4-*.js).
export function applyPostV4(p) {
  const v = POST_V4[p.slug]
  if (!v || v.isNew) return { ...p, imageSlug: p.slug }
  const body = [...p.body]
  // Lead sentence with the new focus keyword goes at the start of the first paragraph (first 10% of the post).
  const first = body.findIndex((b) => b[0] === 'p')
  if (v.lead && first >= 0) body[first] = ['p', `${v.lead} ${body[first][1]}`]
  // Added sections go before the post's closing section (its last H2), so the call to action stays last.
  const last = body.map((b) => b[0]).lastIndexOf('h2')
  body.splice(last > 0 ? last : body.length, 0, ...v.add)
  return {
    ...p,
    imageSlug: p.slug,
    prevSlug: v.slug !== p.slug ? p.slug : undefined,
    slug: v.slug,
    title: v.title,
    seoTitle: v.seoTitle,
    excerpt: v.excerpt,
    kw: v.kw,
    keywords: v.keywords.map(({ kw, intent, vol, kd }) => ({ kw, intent, vol, kd })),
    v4: true,
    body,
  }
}
