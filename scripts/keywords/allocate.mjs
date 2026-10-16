// Allocate keywords from the owner's Semrush files (exact phrases only) to every product.
//  1. Pass-list keywords (owner criteria) mapped to the product by the strategy come first.
//  2. Fallback rule (owner, 2026-10-13): where a product lacks keywords, use exact file keywords with KD 0–29.
//  Focus: products without a file focus get a file keyword that contains every core word of the product
//  name and is Transactional/Commercial; otherwise the product name stays (no qualifying keyword).
//  Supporting: 5–8 per product where the files allow, each keyword used by one product only.
//  Run: node scripts/keywords/allocate.mjs → rewrites src/config/product-keywords.js. Needs the owner's
//  Semrush CSVs in DIR (not in the repo). pass.txt = owner criteria list; mapped.json = strategy keyword → product.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
const DIR = 'C:/Users/GLOBAL STORE/Desktop/Halal Meat Depot/keywords'
const R = new URL('../../src/config/', import.meta.url).href
const parse = (line) => { const out = []; let cur = '', q = false; for (const ch of line) { if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = '' } else cur += ch } out.push(cur); return out }
const raw = new Map()
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.csv'))) for (const l of readFileSync(`${DIR}/${f}`, 'utf8').split(/\r?\n/).slice(1)) {
  if (!l.trim()) continue
  const [kw = '', intent = '', vol, kd = ''] = parse(l); const k = kw.trim().toLowerCase()
  if (!k) continue
  const rec = { kw: k, semrush: intent.trim(), vol: +vol || 0, kd: kd === '' ? null : +kd }
  if (!raw.has(k) || raw.get(k).vol < rec.vol) raw.set(k, rec)
}
const HERE = new URL('.', import.meta.url)
const pass = new Set(readFileSync(new URL('pass.txt', HERE), 'utf8').split(/\r?\n/).filter(Boolean))
const mapped = JSON.parse(readFileSync(new URL('mapped.json', HERE), 'utf8')).map(([kw, target]) => ({ kw, target }))
// Navigational counts as its own intent (owner, 2026-10-16); T/C still win when Semrush lists several.
const intentOf = (s) => (/Transactional/.test(s) ? 'T' : /Commercial/.test(s) ? 'C' : /Navigational/.test(s) ? 'N' : 'I')
const BAD = /\b(coles|woolworths|woolies|aldi|iga|costco|harris|melbourne|perth|brisbane|adelaide|gold coast|hobart|darwin|canberra|geelong|newcastle|wollongong|bendigo|ballarat|toowoomba|organic|grass|free range|free-range|msa|zabiha|pork|bacon|ham|dog|dogs|cat|puppy|pet|pets|jamie|recipetin|nz|uk|usa|america|american|walmart|kfc|mcdonalds|nando|nandos|subway|wine|beer|vegan|vegetarian|calories|calorie|nutrition|protein|carbs|jerky|link|links|qin|lanzhou|pho|noodle|noodles|sexcam|images|image|png|clipart|drawing|meaning|definition|translate|tamil|hindi|urdu|chinese|vietnamese|korean|japanese|spanish|french|italian|là|phần|nào|en|y|de|whats|filet|filets|beefs|cows|cattle|farm|farms|eat|eats|diet|health|healthy|benefits|raw|dangerous|safe|pregnant|baby|cut chart|diagram|tattoo|shirt|meme|game|toy|coupon|vs pork|roo burgers?|nutritional|proteins|suvee|frozen|freeze|dried|naked|turken|transylvanian|alabama|campbell's|campbells|mr|hump|feral|wild|hunting|hunt|lyrics|song|restaurant|restaurants|cafe|menu|takeaway|delivered|uber|doordash|kmart|bunnings|amazon|ebay|gumtree|nutrient|vitamin|fish|carp|goose|foie|kobe|woolworth|penthouse|poterhouse|porthouse|dislocated|broken|gelpro|supplement|supplements|capsules|cauliflower|luv|love'em|stuffed|puff|balls|mexican|frites|world|ranked|kinds|nicest|expensive|cheap|cheapest|tenderize|sides|gluten|panko|smart|em|thin|tallow|patties|rissoles|pie|pies|confit|parfait|pate|tomato|pan|leaner|shop|good|full lamb|grassfed|cell|nahla|master|strips of steak|chicken and thigh|bone marrow bone|marrow bone marrow|blackdog|primal|desiccated|nutrients|corned|cook's|chief|comfy|eater|how dry aged|how to aged|chuck of meat|what's gravy beef|dish)\b|^(lean steaks|beef cutlets?|beef neck.*|steak and bbq|steak wagyu beef|ribeye wagyu steak|cow tongue beef|best of the bone beef liver|sausage meat|sausage near me|beef and gravy slow cooker recipe|oyster steak beef|blade beef|beef blade meat|steak rump cut|rump meat cut|rump eye steak|porterhouse steak is what cut|what is in a porterhouse steak|tomahawk steak what cut|wagyu beef and kobe beef|ox tail|beef ox tongue|comfy duck legs|thor's hammer beef|jack's creek beef|wagyu beef flank steak|australia wagyu beef|australia wagyu beef price|australian wagyu beef|australian wagyu beef online|australian wagyu beef price|what's chuck beef|butcher's cut steak|chief beef liver|beef eater bug bbq|cow liver|butcher liver|what's a porterhouse steak|best steak for bbq|best steak for bbq australia|best bbq rub for beef brisket|bbq beef steak|good steak for bbq|where to buy beef liver|beef liver near me|buy beef liver|wagyu beef steak|short rib of beef price|is veal beef|beef vs veal|veal versus beef|do chicken necks have bones|best lamb sausage rolls|lamb sausage roll recipe)$|chicken \w+ chicken|buffalo (chicken|wings|wing|sauce)|^chicken thighs? chicken|chicken feet chicken|beef feet/
const TYPO = /\b(\w+) \1\b|\ba (eye|asado|oyster|egg)\b/
const GRAM = /^(what (is|are)|how to|best |buy |where (to|can i) buy|[a-z' ]+ (recipe|recipes|price|near me|for sale|online|slow cooker|bbq|oven|roast|curry|stew|cost|supplier|wholesale|butcher|steak|steaks|chops|mince|fillet|fillets|ribs|shanks|shank|leg|legs|shoulder|wings|thigh|thighs|breast|breasts|drumsticks|drumstick|livers|liver|bones|tail|cheeks|cheek|tongue|tendon|sausages|kebabs|kebab|kofta|carcass|meat|cutlets|cutlet|rack|racks|loin|rump|brisket|cut|cuts|feet|necks|neck|frames|fat|backstrap|chipolatas|patties|burgers|schnitzel|tenderloins|maryland|duck|goat|lamb|beef|chicken|camel|kangaroo|buffalo|veal|mutton|wagyu|tomahawk|t bone|ribeye|rib eye|porterhouse|sirloin|topside|silverside|osso buco|oxtail|marrow|tallow|skewers)$)/
const ok = (k) => k && !REJECT.has(k) && !BRANDS.test(k) && !BAD.test(k) && !TYPO.test(k) && GRAM.test(k) && k.split(' ').length <= 7
const { PRODUCTS, POSTS } = await import(R + 'site.js')
const { CATEGORY_SEO, PAGE_SEO, POST_SEO, PRODUCT_SEO } = await import(R + 'seo.js')
// Reserved: category/page/post focus keywords. Post keywords are re-picked later, so not reserved here.
const reserved = new Set([...Object.values(CATEGORY_SEO).map((s) => s.focus), ...Object.values(PAGE_SEO), ...Object.values(POST_SEO), ...POSTS.flatMap((p) => (p.keywords || []).map((k) => k.kw))].map((x) => x.toLowerCase()))
const CURATED = { 'lamb-leg-bone-in': 'leg of lamb for sale', 'buffalo-t-bone-steak': 'buffalo t bone steak' }
const BUY = { 'beef-rump-cap': 'beef rump cap', 'gravy-beef': 'gravy beef', 'lamb-neck': 'lamb neck', 'chicken-livers': 'chicken livers' }
const SPEC = { beef: ['beef', 'steak', 'steaks', 'brisket', 'rump', 'sirloin', 'porterhouse', 'scotch', 'eye fillet', 'oxtail', 't bone', 'ribeye', 'topside', 'chuck'], lamb: ['lamb', 'mutton'], goat: ['goat'], chicken: ['chicken'], duck: ['duck'], camel: ['camel'], kangaroo: ['kangaroo'], 'water-buffalo': ['buffalo'], offal: ['beef', 'liver', 'tongue', 'tendon', 'oxtail', 'bones', 'marrow', 'kidney', 'heart', 'tripe'], 'bulk-meat-boxes': ['beef', 'lamb', 'chicken', 'goat', 'carton', 'bulk', 'wholesale'] }
const STOP = new Set(['beef', 'lamb', 'goat', 'chicken', 'duck', 'camel', 'buffalo', 'kangaroo', 'black', 'halal', 'and', 'with', 'the', 'of', 'in', 'on', 'pack', 'carton', 'size', 'bone', 'cryovac', 'catering', 'portion', 'whole', 'half', 'mb', 'cut', 'price'])
const toks = (s) => s.toLowerCase().replace(/mb\d[\d-]*\+?/g, ' ').replace(/[^a-z ]+/g, ' ').split(/\s+/).filter(Boolean).map((w) => w.replace(/(?<!s)s$/, ''))
const product = {}
const takenFocus = new Set()
for (const p of PRODUCTS) { const s = PRODUCT_SEO[p.imageSlug]; if (s && !BUY[p.imageSlug]) takenFocus.add(s.focus.toLowerCase()) }
for (const v of Object.values(BUY)) takenFocus.add(v)
const info = (k) => raw.get(k)
// loose = owner request 2026-10-16: second pass for products still under 5 (see below).
// Brands, businesses, people and places (owner rule: no brands) — blocked in every pass (reviewed 2026-10-16).
const BRANDS = /\b(maleny|blackmore|margaret river|robbins island|sher|native angus|donna hay|arby's|arbys|my muscle chef|muscle chef|sheftalies|fat duck|two fat ducks|macros|recipetin|jamie oliver|gordon ramsay|nigella|julia|child.s)\b/
// Off-topic words the loose pass must never pick (reviewed by hand).
const LOOSE_BAD = /\b(calories|calorie|nutrition|nutritional|protein|capsules?|supplements?|tablets|powder|dogs?|treats|jerky|bacon|tallow|bouillon|cubes?|thermometer|shredder|location|meaning|called|tamil|hindi|greek|chinese|recipetin|jamie|oliver|gordon|ramsay|nigella|donna|hay|muscle|chef|frame|house|plans|wire|bill|barbers?|richmond|human|humans|maleny|blackmore|margaret|river|robbins|island|sher|native|patte|fat ducks|two|stroganoff|ravioli|bowl)\b/
// Specific phrases rejected on review (2026-10-16): they describe something we don't sell.
const REJECT = new Set(['buy angus beef sausage online', 'lamb and rosemary sausage rolls', 'crumbed chicken and', 'tendon beef ball', 'beef heel muscle'])
const okLoose = (k) => k && !BRANDS.test(k) && !BAD.test(k) && !TYPO.test(k) && !LOOSE_BAD.test(k) && !REJECT.has(k) && k.split(' ').length <= 6
const candFor = (p, loose = false) => {
  const core = toks(p.name).filter((t) => !STOP.has(t))
  const wag = /wagyu/i.test(p.name), ang = /angus/i.test(p.name)
  const specOk = (k) => (SPEC[p.cat] || []).some((s) => k.includes(s))
  const SP = ['beef', 'lamb', 'goat', 'chicken', 'duck', 'camel', 'kangaroo', 'buffalo', 'veal', 'mutton']; const inName = SP.filter((w) => p.name.toLowerCase().includes(w)); const nameSpecies = inName.length ? inName : SP.filter((w) => (SPEC[p.cat] || []).includes(w)).slice(0, 1)
  const otherSpecies = ['beef', 'lamb', 'goat', 'chicken', 'duck', 'camel', 'kangaroo', 'buffalo', 'veal', 'mutton', 'pork'].filter((w) => !nameSpecies.includes(w) && !(w === 'beef' && /wagyu|angus|steak|brisket|rump|porterhouse|scotch|oxtail/i.test(p.name)) && !(w === 'lamb' && /mutton/i.test(p.name)))
  const wrongSpecies = (k) => otherSpecies.some((w) => new RegExp(`\\b${w}\\b`).test(k)) && !nameSpecies.some((w) => k.includes(w))
  const GENERIC = new Set(['steak', 'meat', 'roast', 'piece', 'recipe', 'fillet', 'chop', 'mince', 'rib', 'ribs']); const distinct = core.filter((t) => !GENERIC.has(t)); const need = 1
  const own = mapped.filter((m) => m.target === p.imageSlug).map((m) => m.kw.toLowerCase()).filter((k) => ok(k) && info(k) && !wrongSpecies(k))
  const list = []
  for (const k of own) list.push({ kw: k, score: 10 + Math.log10(info(k).vol + 1), full: core.every((t) => toks(k).includes(t)) })
  for (const [k, r] of raw) {
    if (r.kd === null || r.kd > 29 || !(loose ? okLoose(k) : ok(k)) || !specOk(k) || own.includes(k) || wrongSpecies(k)) continue
    if (loose && intentOf(r.semrush) === 'N') continue
    if (/wagyu/.test(k) && !wag) continue
    if (/angus/.test(k) && !ang) continue
    const kt = toks(k); const hit = core.filter((t) => kt.includes(t)).length
    if (hit < need) continue
    if (distinct.length && !distinct.some((t) => kt.includes(t))) continue
    const extra = kt.filter((t) => !core.includes(t) && !STOP.has(t) && !['recipe', 'price', 'near', 'me', 'buy', 'best', 'how', 'to', 'cook', 'what', 'is', 'a', 'are', 'for', 'sale', 'online', 'where', 'can', 'i', 'slow', 'cooker', 'oven', 'bbq', 'roast', 'steak', 'meat'].includes(t)).length
    list.push({ kw: k, score: hit / Math.max(core.length, 1) * 3 - extra * 0.6 + (intentOf(r.semrush) !== 'I' ? 0.4 : 0) + Math.log10(r.vol + 1) / 4, full: core.every((t) => kt.includes(t)) })
  }
  return list.sort((a, b) => b.score - a.score)
}
// 1) focus for products without a file focus (and the 4 "buy" products)
const focusChange = {}
const fallbackNone = []
for (const p of PRODUCTS) {
  if (BUY[p.imageSlug]) { focusChange[p.imageSlug] = BUY[p.imageSlug]; continue }
  if (PRODUCT_SEO[p.imageSlug]) continue
  // Reviewed by hand: only exact file keywords that describe the product itself (no "frozen",
  // "confit" etc. that would misdescribe it). Names that are already exact file keywords stay.
  if (CURATED[p.imageSlug]) { focusChange[p.imageSlug] = CURATED[p.imageSlug]; takenFocus.add(CURATED[p.imageSlug]); continue }
  if (raw.has(p.focus.toLowerCase())) { takenFocus.add(p.focus.toLowerCase()); continue }
  fallbackNone.push(p.imageSlug)
}
// 2) supporting keywords, scarce products first
const used = new Set([...takenFocus, ...reserved])
const order = PRODUCTS.map((p) => ({ p, c: candFor(p) })).sort((a, b) => a.c.length - b.c.length)
const support = {}
for (const { p, c } of order) {
  const free = c.filter((x) => !used.has(x.kw))
  const tc = free.filter((x) => intentOf(info(x.kw).semrush) !== 'I')
  const i = free.filter((x) => intentOf(info(x.kw).semrush) === 'I')
  const sig = (k) => toks(k).filter((t) => !['recipe', 'for', 'with', 'in', 'the', 'a', 'of', 'to', 'how', 'cook', 'using', 'dish', 'best', 'way'].includes(t)).sort().join(' ')
  const seenSig = new Set([sig(PRODUCT_SEO[p.imageSlug]?.focus || p.focus)])
  const dedupe = (arr) => arr.filter((x) => { const g = sig(x.kw); if (seenSig.has(g)) return false; seenSig.add(g); return true })
  const tcD = dedupe(tc), iD = dedupe(i)
  let pick = [...tcD.slice(0, 6)]
  for (const x of iD) { if (pick.length >= 8) break; if (pick.length < 5 || pick.filter((y) => intentOf(info(y.kw).semrush) === 'I').length < 1) pick.push(x) }
  pick = pick.slice(0, 8)
  for (const x of pick) used.add(x.kw)
  support[p.imageSlug] = pick.map((x) => { const r = info(x.kw); return { kw: x.kw, intent: intentOf(r.semrush), semrush: r.semrush, vol: r.vol, kd: r.kd, src: pass.has(x.kw) ? 'pass' : 'kd0-29' } })
}
// 3) Owner request 2026-10-16: products still under 5 supporting keywords get more exact file keywords
//    (KD 0–29) that name the cut, even when the phrase is outside the strict wording list. Navigational
//    phrases are skipped in this pass: in these files they are other businesses' names.
let looseAdded = 0
for (const p of [...PRODUCTS].sort((a, b) => support[a.imageSlug].length - support[b.imageSlug].length)) {
  const have = support[p.imageSlug]
  if (have.length >= 5) continue
  const sig = (k) => toks(k).filter((t) => !['recipe', 'recipes', 'for', 'with', 'in', 'the', 'a', 'of', 'to', 'how', 'cook', 'using', 'dish', 'dishes', 'best', 'way'].includes(t)).sort().join(' ')
  const seen = new Set([sig(p.focus), ...have.map((k) => sig(k.kw))])
  for (const x of candFor(p, true)) {
    if (have.length >= 5) break
    if (used.has(x.kw)) continue
    const g = sig(x.kw)
    if (seen.has(g)) continue
    seen.add(g); used.add(x.kw); looseAdded++
    const r = info(x.kw)
    have.push({ kw: x.kw, intent: intentOf(r.semrush), semrush: r.semrush, vol: r.vol, kd: r.kd, src: 'kd0-29' })
  }
}
console.log('loose pass added', looseAdded)
const all = Object.values(support).flat()
const share = (t) => ((all.filter((k) => k.intent === t).length / all.length) * 100).toFixed(1)
const counts = Object.values(support).map((l) => l.length)
console.log('focus changes', Object.keys(focusChange).length, '| kept product name', fallbackNone.length)
console.log('supporting total', all.length, `mix T ${share('T')}% C ${share('C')}% N ${share('N')}% I ${share('I')}%`, '| <5:', counts.filter((n) => n < 5).length, '| 0:', counts.filter((n) => !n).length)
// ── write src/config/product-keywords.js ──
const RANK = { T: 0, C: 1, N: 2, I: 3 }
let out = `// Supporting keywords per product (keyed by ORIGINAL slug) — regenerated 2026-10-13 from the owner's
// Semrush keyword files. Owner rule: every keyword is an EXACT phrase from those files (never modified).
// Source: 'pass' = owner criteria list; 'kd0-29' = owner fallback rule — where a product lacks keywords,
// use exact file keywords with Keyword Difficulty 0–29. Each keyword is used on one product only.
// Products with fewer than 5 have no more relevant exact keywords in the files (none invented).
// Do not hand-edit: regenerate with node scripts/keywords/allocate.mjs (needs the owner's keyword CSVs).
export const PRODUCT_KEYWORDS = {\n`
for (const [slug, list] of Object.entries(support)) {
  out += `  '${slug}': [\n`
  for (const k of [...list].sort((a, b) => RANK[a.intent] - RANK[b.intent])) out += `    ${JSON.stringify({ kw: k.kw, intent: k.intent, semrush: k.semrush, vol: k.vol, kd: k.kd, src: k.src })},\n`
  out += `  ],\n`
}
out += `}\n`
writeFileSync(new URL('../../src/config/product-keywords.js', import.meta.url), out)
console.log('written', Object.keys(support).length)

