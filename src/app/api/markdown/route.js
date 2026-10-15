// Markdown version of any public page, for AI agents (see src/proxy.js). It renders the page's own
// HTML and converts its <main> content, so the markdown always matches what people see.
// Not for search engines: noindex, and a canonical Link header points at the HTML page.

export const dynamic = 'force-dynamic'

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'", ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', middot: '·' }
const decode = (s) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (ENT[e.toLowerCase()] !== undefined) return ENT[e.toLowerCase()]
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
    return m
  })
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

function toMarkdown(html, origin) {
  let h = html
    .replace(/<(script|style|noscript|svg|template|button|form|select|textarea)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
  h = h.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${'#'.repeat(+n)} ${text(t)}\n\n`)
  h = h.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    const label = text(t)
    if (!label) return ' '
    const abs = href.startsWith('/') ? origin + href : href
    return ` [${label}](${decode(abs)}) `
  })
  h = h.replace(/<li\b[^>]*>/gi, '\n- ').replace(/<\/(p|div|section|article|ul|ol|li|tr|table|figure|figcaption|dl|dd|dt|header|footer|aside|nav|blockquote)>/gi, '\n')
  h = h.replace(/<br\s*\/?>/gi, '\n').replace(/<(p|div|section|tr|table|figcaption|dd|dt)\b[^>]*>/gi, '\n')
  h = h.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${text(t)}**`)
  h = decode(h.replace(/<[^>]+>/g, ' '))
  return h
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n- \n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function GET(request) {
  const { origin } = new URL(request.url)
  // Set by src/proxy.js (a rewritten route handler still sees the page's own URL).
  const path = request.headers.get('x-markdown-path') || '/'
  // Same-origin page paths only.
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/api/')) return new Response('Not found', { status: 404 })
  const target = new URL(path, origin)
  if (target.origin !== origin) return new Response('Not found', { status: 404 })

  const res = await fetch(target, { headers: { accept: 'text/html' }, redirect: 'follow' })
  const html = await res.text()
  if (!res.ok || !/text\/html/.test(res.headers.get('content-type') || '')) return new Response('Not found', { status: res.status === 200 ? 404 : res.status })
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) return new Response('Not found', { status: 404 })

  const title = text((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '')
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || '')
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/i) || [])[1] || target.href
  const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || html
  const body = toMarkdown(main, origin)
  const md = `# ${title}\n\n${desc ? `> ${desc}\n\n` : ''}Source: ${canonical}\n\n${body}\n`

  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
      Vary: 'Accept',
      'X-Robots-Tag': 'noindex',
      Link: `<${canonical}>; rel="canonical"`,
      'x-markdown-tokens': String(Math.ceil(md.length / 4)),
    },
  })
}
