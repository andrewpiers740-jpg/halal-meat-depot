import { SITE, containsFocus } from '../config/site.js'
import { PRODUCT_ABOUT } from '../config/product-about.js'
import { PRODUCT_KEYWORDS } from '../config/product-keywords.js'
import { money } from './order.js'

// Product page copy (owner rules, 2026-10-13):
//  • H1, H2 and H3 headings carry the focus keyword or a supporting keyword
//  • the focus keyword appears in the first sentence of the description (first 20%)
//  • 5–10 supporting keywords, ~45% transactional / 45% commercial / 10% informational,
//    each used once in a natural sentence — no stuffing
// Unique per-product text: PRODUCT_ABOUT (cut profile) + the product's own short and desc.

// Display form: proper nouns and grade codes (wagyu → Wagyu, mb9 → MB9). Keyword matching is
// case-insensitive, so this never breaks a keyword match.
const PROPER = [
  [/\bwagyu\b/gi, 'Wagyu'],
  [/\bangus\b/gi, 'Angus'],
  [/\bnew york\b/gi, 'New York'],
  [/\bwimmera gold\b/gi, 'Wimmera Gold'],
  [/\bportuguese\b/gi, 'Portuguese'],
  [/\baustralia\b/gi, 'Australia'],
  [/\bsydney\b/gi, 'Sydney'],
  [/\bmb(\d)/gi, (m) => m.toUpperCase()],
]
const show = (s) => PROPER.reduce((t, [re, to]) => t.replace(re, to), s)
const cap = (s) => show(s.charAt(0).toUpperCase() + s.slice(1))
const halal = (f) => (/\bhalal\b/.test(f) ? f : `halal ${f}`)
// Two phrasings per sentence, picked per product so neighbouring pages don't read identically.
const pick = (p, list) => list[[...p.slug].reduce((n, ch) => n + ch.charCodeAt(0), 0) % list.length]

function sentence(kw, p) {
  const price = money(p.price)
  const perKg = money(p.perKg)
  const v = (list) => pick(p, list)
  let m
  if ((m = kw.match(/^buy (.+) online$/)))
    return v([`You can buy ${m[1]} online here and pay by PayID, bank transfer or crypto — crypto takes ${SITE.cryptoDiscountPct}% off your meat total.`, `Buy ${m[1]} online in a few clicks, then pay by PayID, bank transfer or crypto (${SITE.cryptoDiscountPct}% off with crypto).`])
  if ((m = kw.match(/^order (.+) online$/)))
    return v([`Order ${m[1]} online together with the rest of your meat — the $${SITE.minOrder} minimum applies to your whole cart, not each item.`, `When you order ${m[1]} online, the $${SITE.minOrder} minimum counts across your whole cart, so you can mix it with other cuts.`])
  if ((m = kw.match(/^(.+) price$/)))
    return v([`The ${m[1]} price is ${price} for ${p.unit}, about ${perKg} per kg.`, `Our ${m[1]} price is ${price} per pack (${p.unit}), roughly ${perKg} a kilo.`])
  if ((m = kw.match(/^(.+) for sale$/)))
    return v([`We have ${m[1]} for sale online, packed chilled at our Greenacre, Sydney depot.`, `Our ${m[1]} for sale is packed chilled at the Greenacre depot and sent to your door.`])
  if ((m = kw.match(/^(.+) delivery$/)))
    return `${cap(m[1])} delivery is Australia-wide: free on orders over $${SITE.freeShipOver}, otherwise a flat $${SITE.flatShip}.`
  if ((m = kw.match(/^halal (.+)$/)))
    return v([`Every pack of halal ${m[1]} is certified by ${SITE.certifier} (certificate No. ${SITE.certificate.number}).`, `All our halal ${m[1]} is certified by ${SITE.certifier} — certificate No. ${SITE.certificate.number} is published on our certification page.`])
  if ((m = kw.match(/^wholesale (.+)$/)))
    return `Restaurants, takeaways and caterers can buy wholesale ${m[1]} through a trade account with a regular price sheet.`
  if ((m = kw.match(/^bulk (.+)$/)))
    return `Buying bulk ${m[1]} for a big family or an event? Add several packs to one order, or ask us about trade cartons.`
  if ((m = kw.match(/^(.+) supplier$/)))
    return `As a ${m[1]} supplier we look after households, restaurants and caterers across Australia.`
  if ((m = kw.match(/^(.+) sydney$/)))
    return `We deliver ${m[1]} Sydney-wide from Greenacre, and to every other state.`
  return ''
}

export function productContent(p) {
  const named = containsFocus(p.name, p.focus)
  const f = p.focus
  const kws = PRODUCT_KEYWORDS[p.imageSlug] || []
  const T = kws.filter((k) => k.intent === 'T')
  const C = kws.filter((k) => k.intent === 'C')
  const I = kws.filter((k) => k.intent === 'I')
  const x = f.replace(/^buy /, '').replace(/ online$/, '').replace(/ price$/, '').replace(/ for sale$/, '')

  const h1 = named ? p.name : `${cap(f)} — ${p.name}`
  const h2raw = /^buy /.test(f) ? `${cap(f)} from ${SITE.name}` : / price$/.test(f) ? `${cap(f)} and pack size` : `About our ${halal(f)}`
  const h2 = show(h2raw)
  const intro = / price$/.test(f)
    ? `${cap(f)}: ${money(p.price)} for ${p.unit} of ${p.name.toLowerCase()}, about ${money(p.perKg)} per kg. ${p.short}`
    : /^buy /.test(f)
      ? `${cap(f)} from ${SITE.name}: ${p.short}`
      : `${cap(halal(f))}: ${p.short}`
  return {
    h1: show(h1),
    h2,
    intro: show(intro),
    about: PRODUCT_ABOUT[p.imageSlug] || '',
    buyHeading: show(/^buy /.test(f) ? `${cap(f)}: price and delivery` : `Buy ${x} online: price and delivery`),
    buy: T.map((k) => show(sentence(k.kw, p))).filter(Boolean),
    tradeHeading: show(/\bhalal\b/.test(x) ? `${cap(x)} for restaurants, caterers and families` : `Halal ${x} for restaurants, caterers and families`),
    trade: C.map((k) => show(sentence(k.kw, p))).filter(Boolean),
    cookHeading: cap(I[0]?.kw || `how to cook ${x}`),
    cook: p.desc,
    keywords: kws,
  }
}
