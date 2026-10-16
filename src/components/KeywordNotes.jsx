import RichText from './RichText'
import { CATEGORY_KEYWORDS, PAGE_KEYWORDS } from '@/config/support-keywords'

// Short copy block that carries a category's or page's supporting keywords (src/config/support-keywords.js).
export default function KeywordNotes({ category, path }) {
  const entry = category ? CATEGORY_KEYWORDS[category] : PAGE_KEYWORDS[path]
  if (!entry) return null
  return (
    <section className="card card--tint prose" style={{ marginBottom: 24, maxWidth: 'none' }} aria-labelledby="kw-notes-title">
      <h2 id="kw-notes-title" style={{ marginTop: 0 }}>{entry.title}</h2>
      <RichText blocks={entry.copy.map((t) => ['p', t])} />
    </section>
  )
}
