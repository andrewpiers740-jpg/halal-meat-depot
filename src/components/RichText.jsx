import Link from 'next/link'
import { Fragment } from 'react'

// Renders [anchor](/path/) as real links inside plain text.
function inline(text) {
  const out = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      m[2].startsWith('/') ? (
        <Link key={m.index} href={m[2]}>
          {m[1]}
        </Link>
      ) : (
        <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer">
          {m[1]}
        </a>
      )
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export default function RichText({ blocks }) {
  return blocks.map(([type, content], i) => (
    <Fragment key={i}>
      {type === 'h2' && <h2>{content}</h2>}
      {type === 'h3' && <h3>{content}</h3>}
      {type === 'p' && <p>{inline(content)}</p>}
      {type === 'ul' && (
        <ul>
          {content.map((li, j) => (
            <li key={j}>{inline(li)}</li>
          ))}
        </ul>
      )}
    </Fragment>
  ))
}
