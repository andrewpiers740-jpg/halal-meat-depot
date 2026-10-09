// Server-only JSON-LD. The schema is a JS object, serialised here — never a
// hand-templated JSON string. `<` is escaped so a value can never close the tag.
export default function JsonLd({ data }) {
  const blocks = Array.isArray(data) ? data : [data]
  return blocks.map((b, i) => (
    <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, '\\u003c') }} />
  ))
}
