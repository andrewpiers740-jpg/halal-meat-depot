import { SITE, containsExact } from '../config/site.js'
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
  [/\bi\b/g, 'I'],
]
const show = (s) => PROPER.reduce((t, [re, to]) => t.replace(re, to), s)
const cap = (s) => show(s.charAt(0).toUpperCase() + s.slice(1))
const halal = (f) => (/\bhalal\b/.test(f) ? f : `halal ${f}`)
// Several phrasings per kind of keyword. The pick rotates with the product AND with how many
// keywords of that kind came before on the page, so no sentence repeats on a page.
const seedOf = (p) => [...p.slug].reduce((n, ch) => n + ch.charCodeAt(0), 0)

// Every supporting keyword is an exact phrase from the owner's keyword files (never modified),
// placed word-for-word in a truthful sentence. `seen` counts keywords per kind on this page.
function sentence(kw, p, seen) {
  const price = money(p.price)
  const perKg = money(p.perKg)
  const name = p.name
  const cold = /frozen/i.test(`${p.unit} ${p.name}`) ? 'frozen' : 'chilled'
  const v = (kind, list) => {
    const n = (seen[kind] = (seen[kind] || 0) + 1) - 1
    return list[(seedOf(p) + n) % list.length]
  }
  const priced = () => (seen.$price = (seen.$price || 0) + 1) === 1
  let m
  if ((m = kw.match(/^buy (.+) online$/)))
    return v('buy', [`You can buy ${m[1]} online here and pay by PayID, bank transfer or crypto — crypto takes ${SITE.cryptoDiscountPct}% off your meat total.`, `Buy ${m[1]} online in a few clicks, then pay by PayID, bank transfer or crypto (${SITE.cryptoDiscountPct}% off with crypto).`, `To buy ${m[1]} online, add it to your cart; the $${SITE.minOrder} minimum counts across your whole order.`])
  if ((m = kw.match(/^order (.+) online$/)))
    return `Order ${m[1]} online together with the rest of your meat — the $${SITE.minOrder} minimum applies to your whole cart, not each item.`
  if (/\b(price|prices|cost|costs|how much)\b/.test(kw))
    return priced()
      ? v('price', [`Our ${kw} is ${price} for ${p.unit}, about ${perKg} per kg.`, `On ${kw}: this pack is ${price} for ${p.unit}, roughly ${perKg} a kilo.`])
      : v('price', [`The ${kw} you see above is per pack, with the per-kilo figure beside it.`, `Checking ${kw}? Both the pack and per-kilo figures are listed above.`, `For ${kw} on bigger orders, our trade team can quote a regular price sheet.`])
  if ((m = kw.match(/^(.+) for sale$/)))
    return v('sale', [`We have ${m[1]} for sale online, packed ${cold} at our Greenacre, Sydney depot.`, `Our ${m[1]} for sale is packed ${cold} at the Greenacre depot and sent to your door.`])
  if ((m = kw.match(/^halal (.+)$/)))
    return v('halal', [`Every pack of halal ${m[1]} is certified by ${SITE.certifier} (certificate No. ${SITE.certificate.number}).`, `All our halal ${m[1]} is certified by ${SITE.certifier}; the certificate is published on our certification page.`])
  if ((m = kw.match(/^wholesale (.+)$/)))
    return `Restaurants, takeaways and caterers can buy wholesale ${m[1]} through a trade account with a regular price sheet.`
  if ((m = kw.match(/^bulk (.+)$/)))
    return `Buying bulk ${m[1]} for a big family or an event? Add several packs to one order, or ask us about trade cartons.`
  if ((m = kw.match(/^(.+) supplier$/)))
    return `As a ${m[1]} supplier we look after households, restaurants and caterers across Australia.`
  if (/ near me$/.test(kw))
    return v('near', [`Searching for ${kw}? We deliver Australia-wide from our Greenacre, Sydney depot, straight to your door.`, `If you searched ${kw}, there is no shop to visit: order online and we deliver from Greenacre, Sydney.`, `No need to look for ${kw}: we send ${cold} orders to every state from Greenacre.`])
  if (/^(where|how)\b.*\b(buy|purchase|get)\b/.test(kw))
    return v('where', [`${cap(kw)}? Right here: order online and we deliver Australia-wide from Greenacre, Sydney.`, `${cap(kw)}? Add it to your cart here and choose Standard or Priority Delivery at checkout.`, `${cap(kw)}? From us, online, with payment by PayID, bank transfer or crypto.`, `${cap(kw)}? Order on this page; we pack it ${cold} in Greenacre and send it to your door.`, `${cap(kw)}? Online, from our Greenacre depot, with delivery to every state.`])
  if (/^(buy|order|purchase|buying|shop)\b|\b(for sale|online|butcher|wholesale|bulk|delivery)\b/.test(kw))
    return v('shop', [`${cap(kw)}: add our ${name} to your cart and pay by PayID, bank transfer or crypto.`, `For ${kw}, our ${name} is packed ${cold} in Greenacre and delivered Australia-wide.`, `${cap(kw)} is what this page is for — every pack is certified halal by ${SITE.certifier}.`])
  if (/^(what|whats|what's|how|is|are|which|do|does|can|why|when)\b/.test(kw))
    return v('question', [`${cap(kw)}? The cut notes on this page answer it for our ${name}.`, `${cap(kw)}? Read the notes above, or ask us on WhatsApp before you order.`, `${cap(kw)}? Our guides linked below cover it in more detail.`])
  if (/\b(vs|versus|or)\b/.test(kw))
    return v('compare', [`Weighing up ${kw}? The cut notes on this page explain how our ${name} cooks.`, `${cap(kw)} comes down to cooking method and budget; our guides compare the cuts side by side.`, `If you are deciding ${kw}, ask us on WhatsApp and we will help you pick.`])
  if (/\b(recipe|recipes|cook|cooking|cooked|cooker|slow|oven|bbq|barbecue|grill|grilled|roast|roasted|roasting|stew|curry|soup|casserole|smoke|smoked|smoker|smoking|fry|fryer|fried|air|pressure|crockpot|braise|braised|meals?|dish)\b/.test(kw))
    return v('cook', [`${cap(kw)}: the cooking notes on this page show how to get the best from our ${name}.`, `Our cooking notes and guides help with ${kw}.`, `Trying ${kw}? Start with the cooking notes on this page.`, `For ${kw}, this cut works well; see the cooking notes for timings.`])
  if (/^best\b/.test(kw))
    return v('best', [`Looking for the ${kw}? The cut notes on this page explain where our ${name} fits.`, `What counts as the ${kw} depends on how you cook it; our guides compare the options.`])
  return v('other', [`If you shop for ${kw}, our ${name} is packed ${cold} in Greenacre and delivered Australia-wide.`, `Customers looking for ${kw} order our ${name}, certified halal by ${SITE.certifier}.`, `${cap(kw)}: order it here for delivery Australia-wide.`])
}

export function productContent(p) {
  const named = containsExact(p.name, p.focus)
  const f = p.focus
  const kws = PRODUCT_KEYWORDS[p.imageSlug] || []
  const T = kws.filter((k) => k.intent === 'T')
  // Navigational (owner, 2026-10-16) reads like commercial copy: generic place/service phrases.
  const C = kws.filter((k) => k.intent === 'C' || k.intent === 'N')
  const I = kws.filter((k) => k.intent === 'I')
  const seen = {}
  const x = f.replace(/^buy /, '').replace(/ online$/, '').replace(/ price$/, '').replace(/ for sale$/, '')

  const h1 = named ? p.name : `${cap(f)} — ${p.name}`
  const h2raw = /^buy /.test(f) ? `${cap(f)} from ${SITE.name}` : / price$/.test(f) ? `${cap(f)} and pack size` : / for sale$/.test(f) ? `${cap(f)} from ${SITE.name}` : `About our ${halal(f)}`
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
    buy: T.map((k) => show(sentence(k.kw, p, seen))).filter(Boolean),
    tradeHeading: show(/\bhalal\b/.test(x) ? `${cap(x)} for restaurants, caterers and families` : `Halal ${x} for restaurants, caterers and families`),
    trade: C.map((k) => show(sentence(k.kw, p, seen))).filter(Boolean),
    cookHeading: cap(I[0]?.kw || `how to cook ${x}`),
    cook: p.desc,
    cookNotes: I.slice(1).map((k) => show(sentence(k.kw, p, seen))).filter(Boolean),
    keywords: kws,
  }
}
