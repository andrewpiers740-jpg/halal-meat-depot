import { REPLY } from '@/config/site'
import { toWhatsAppNumber } from '@/lib/whatsapp'

// Internal hand-off to WhatsApp (2026-11-09). Public pages link HERE instead of straight to wa.me: WhatsApp answers
// crawlers (Semrush) with HTTP 429 because the same link sits on hundreds of pages, which showed up as 586 "broken
// external links". The number always comes from config, never from the request, so this can't be an open redirect.
// 2026-11-12: this path is now ALLOWED in robots.txt (213 per-product links were reported as "blocked from crawling").
// It answers 200 + noindex with a client-side hop to wa.me, so crawlers see no redirect to wa.me and no 429.
export const dynamic = 'force-dynamic'

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export function GET(request) {
  const text = (new URL(request.url).searchParams.get('text') || '').slice(0, 8000)
  const number = toWhatsAppNumber(REPLY.channels.whatsapp)
  const to = `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
  const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Opening WhatsApp</title><meta http-equiv="refresh" content="0;url=${esc(to)}"></head><body style="font-family:system-ui,sans-serif;padding:2rem"><p>Opening WhatsApp chat with Halal Meat Depot…</p><script>location.replace(${JSON.stringify(to).replace(/</g, '\\u003c')})</script></body></html>`
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' },
  })
}
