// Entity-encoded mailto link (&#64; / &#46;) — browsers display and open it
// normally, simple scrapers can't harvest it. No config import, so it is safe
// to use inside client components; server code should use <Email />.
// Exported so server components can pass an already-encoded address as a prop
// to client components (props are serialised into the page HTML).
export const encodeEmail = (s) => String(s).replace(/@/g, '&#64;').replace(/\./g, '&#46;')
const encode = encodeEmail

export default function EmailLink({ address, className = '', style }) {
  if (!address) return null
  const enc = encode(address)
  return <span style={style} dangerouslySetInnerHTML={{ __html: `<a href="mailto:${enc}"${className ? ` class="${className}"` : ''}>${enc}</a>` }} />
}
