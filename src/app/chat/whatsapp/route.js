import { REPLY } from '@/config/site'
import { toWhatsAppNumber } from '@/lib/whatsapp'

// Internal hand-off to WhatsApp (2026-11-09). Public pages link HERE instead of straight to wa.me: WhatsApp answers
// crawlers (Semrush) with HTTP 429 because the same link sits on hundreds of pages, which showed up as 586 "broken
// external links". Visitors are redirected straight on with the pre-filled message. The number always comes from
// config, never from the request, so this can't be used as an open redirect. /chat/ is disallowed in robots.txt.
export const dynamic = 'force-dynamic'

export function GET(request) {
  const text = (new URL(request.url).searchParams.get('text') || '').slice(0, 8000)
  const number = toWhatsAppNumber(REPLY.channels.whatsapp)
  const to = `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
  return new Response(null, { status: 302, headers: { Location: to, 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' } })
}
