import Link from 'next/link'
import { Fragment } from 'react'
import Email from './Email'

// Renders [anchor](/path/) as real links inside plain text, and {{email}} as
// the entity-encoded business email link.
function inline(text) {
  if (text.includes('{{email}}')) {
    return text.split('{{email}}').flatMap((part, i) => (i === 0 ? inline(part) : [<Email key={`e${i}`} />, ...inline(part)]))
  }
  return linkify(text)
}

function linkify(text) {
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

// insert: { [blockIndex]: node } renders extra content (e.g. a photo) before that block.
export default function RichText({ blocks, insert = {} }) {
  return blocks.map(([type, content, id], i) => (
    <Fragment key={i}>
      {insert[i]}
      {type === 'h2' && <h2 id={id}>{content}</h2>}
      {type === 'h3' && <h3>{content}</h3>}
      {type === 'p' && <p>{inline(content)}</p>}
      {type === 'table' && (
        <div className="table-wrap">
          <table className="data-table">
            {content.caption && <caption>{content.caption}</caption>}
            <thead>
              <tr>
                {content.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
