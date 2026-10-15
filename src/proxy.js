import { NextResponse } from 'next/server'

// Markdown for Agents: a request whose Accept header PREFERS text/markdown over text/html gets a
// markdown version of the page (rendered by /api/markdown/). Browsers and crawlers that send
// text/html — even alongside text/markdown at a lower q — keep getting the normal HTML page.
// The matcher only invokes this proxy when the Accept header mentions text/markdown at all,
// so ordinary page requests never pay for it.
export function proxy(request) {
  if (!prefersMarkdownOverHtml(request.headers.get('accept') || '')) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = '/api/markdown/'
  url.search = ''
  // The page path travels in a request header: a rewritten route handler sees the original URL.
  const headers = new Headers(request.headers)
  headers.set('x-markdown-path', request.nextUrl.pathname)
  return NextResponse.rewrite(url, { request: { headers } })
}

// q-values matter: "text/html, text/markdown;q=0.9" prefers HTML. Missing q = 1.
function prefersMarkdownOverHtml(accept) {
  let md = -1
  let html = -1
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim().toLowerCase())
    let q = 1
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p)
      if (m) q = parseFloat(m[1])
    }
    if (type === 'text/markdown') md = Math.max(md, q)
    if (type === 'text/html') html = Math.max(html, q)
  }
  return md > 0 && md > html
}

export const config = {
  matcher: [
    {
      // Pages only — not API routes, Next assets, images, discovery files or anything with a file extension.
      source: '/((?!api/|_next/|images/|js/|\\.well-known/|.*\\.[a-zA-Z0-9]+$).*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }],
    },
  ],
}
