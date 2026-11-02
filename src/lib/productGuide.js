import { SITE } from '../config/site.js'
import { PRIORITY_FROM } from '../config/delivery.js'
import { money } from './order.js'

// Longer product copy (owner, 2026-11-02: every product description 400+ words). Everything here is built from
// the product's own data (name, pack, weight, price, chilled or frozen) and general, true cooking and food-safety
// guidance for its kind of cut — no claims about breed, feed, farm or slaughter method (see CLAUDE.md).

const has = (p, re) => re.test(p.name)
const frozen = (p) => /frozen/i.test(`${p.unit} ${p.name}`)
const seedOf = (p) => [...p.slug].reduce((n, ch) => n + ch.charCodeAt(0), 0)
const pick = (p, list) => list[seedOf(p) % list.length]

// Kind of cut, in order: the first match wins.
export function cutKind(p) {
  if (has(p, /carcass|whole beef|half beef|hindquarter|forequarter$|rear half|catering pack/i) && !has(p, /curry cut/i)) return 'carcass'
  if (p.cat === 'wholesale-cartons' || has(p, /carton/i)) return 'carton'
  if (has(p, /mince/i) && !/duck/.test(p.cat)) return 'mince'
  if (has(p, /liver|tongue|kidney|heart|feet|necks/i)) return 'offal'
  if (has(p, /bones|frames|duck fat/i)) return 'bones'
  if (has(p, /sausage|chipolata|kofta|burger|patties|patty|rissole/i)) return 'sausage'
  if (has(p, /whole chicken|whole .*duck|split chicken/i)) return 'bird'
  if (p.cat === 'chicken' || p.cat === 'duck') return 'poultry'
  if (has(p, /brisket|chuck|shin|cheek|osso buco|shank|neck|oxtail|short rib|ribs|riblets|gravy|tendon|forequarter chops|conical/i)) return 'slow'
  if (has(p, /diced|curry|kebab|stir-fry|strips|yakiniku/i)) return 'diced'
  if (has(p, /roast|topside|girello|whole piece|rump whole|whole rump|leg bone|leg boned|rolled|rack|shoulder|striploin|silverside|leg butterflied|ham|\bwhole\b/i)) return 'roast'
  return 'steak'
}

// Lean game-style meats cook differently from beef and lamb.
const lean = (p) => ['camel', 'kangaroo', 'water-buffalo'].includes(p.cat)
const wagyu = (p) => /wagyu/i.test(p.name)
// The guide each kind of cut links to, by species (beef guides only on beef).
const SPECIES_GUIDE = { lamb: ['lamb cuts guide', 'lamb-cuts-australia-guide'], goat: ['goat cuts guide', 'goat-meat-curry-cuts-guide'], camel: ['camel, buffalo and kangaroo guide', 'cooking-camel-meat-buffalo-kangaroo'], kangaroo: ['camel, buffalo and kangaroo guide', 'cooking-camel-meat-buffalo-kangaroo'], 'water-buffalo': ['camel, buffalo and kangaroo guide', 'cooking-camel-meat-buffalo-kangaroo'] }
const link = (p, beefText, beefSlug) => { const [t, s] = p.cat === 'beef' || p.cat === 'offal' || p.cat === 'wholesale-cartons' ? [beefText, beefSlug] : SPECIES_GUIDE[p.cat] || [beefText, beefSlug]; return `[${t}](/blog/${s}/)` }

function guide(p) {
  const n = p.name.toLowerCase()
  const L = lean(p)
    ? ` Because ${n} is much leaner than beef, it overcooks quickly: take it off the heat a few degrees early and rest it well.`
    : ''
  switch (cutKind(p)) {
    case 'carcass':
      return [
        `A carcass or quarter gives you every cut from the animal in one order. Before it is cut, tell us how your household or kitchen cooks: how thick to cut steaks and chops, which pieces to keep whole for roasting, what to dice for curries, and what to mince. Bones can be cut for stock or left out. Write it all in the order notes at checkout, or send it to us on WhatsApp.`,
        `Plan your freezer space first. Bagged and labelled cuts stack flat and thaw evenly. Most families use the steaks and roasts first and keep the mince, diced meat and bones for later in the season. The final weight depends on the animal, so the price is confirmed before dispatch.`,
      ]
    case 'carton':
      return [
        `Cartons are packed for kitchens that cook in volume. The meat comes in manageable bags inside the carton, so you can open one bag at a time and keep the rest sealed and cold. Restaurants usually plan a carton around a week of service; families split one with friends, or freeze the bags in meal-sized portions.`,
        `Treat each bag like a fresh pack: keep it at 5°C or below, and use it, or freeze it, by the date on the label. Label frozen bags with the date and thaw them in the coolroom or fridge, never on the bench. For regular cartons on a set day, open a trade account on our [wholesale page](/halal-meat-manufacturers-wholesale/).`,
      ]
    case 'offal':
      return [
        `Offal rewards fresh, simple cooking. Liver is best sliced and seared hot for a minute or two a side so it stays pink and tender; overcooked liver turns grainy. Tongue is simmered for two to three hours until tender, then peeled and sliced or braised in a sauce. Chicken necks and feet are mostly used for stock, broth and slow braises.`,
        `Rinse offal and pat it dry before cooking, and cook it the day you thaw it. Our [bone broth guide](/blog/best-bones-for-bone-broth/) covers stocks and broths in more detail.`,
      ]
    case 'bones':
      return [
        `Bones make the base of a good stock or broth. Roast beef bones at 200°C for 40 minutes first for a deeper colour and flavour, then cover them with cold water and simmer gently for 6 to 12 hours, skimming the surface now and then. Chicken frames and duck bones need less time, about 3 to 4 hours. Rendered duck fat keeps in the fridge for weeks and roasts potatoes beautifully.`,
        `Cool stock quickly, chill it overnight and lift off the fat before you freeze it in portions. Our [bone broth guide](/blog/best-bones-for-bone-broth/) compares the best bones for each kind of broth.`,
      ]
    case 'sausage':
      return [
        `Cook ${n} over a medium heat rather than a fierce one, so the outside browns while the centre cooks through. Turn them often on the barbecue or in a pan and allow 12 to 15 minutes for thick sausages and less for chipolatas and kofta. Don't prick sausages before cooking or the juices run out.`,
        `Minced meat products should be cooked until the centre reaches 75°C and the juices run clear, which is the food-safety guidance from Food Standards Australia New Zealand. Rest them for a couple of minutes before serving.`,
      ]
    case 'mince':
      return [
        `${p.name} suits burgers, kofta, meatballs, bolognese, keema and pies. Brown it in batches in a hot pan so it fries rather than stews, and break it up as it cooks. Leaner mince needs a little oil; mince with more fat renders its own.${L}`,
        `Mince should be cooked right through, to 75°C in the centre, following Food Standards Australia New Zealand guidance. Our ${link(p, 'beef mince recipes', '30-minute-beef-mince-recipes')} has more ideas.`,
      ]
    case 'bird':
      return [
        `Roast a whole bird at 180–200°C. Allow about 45 minutes per kilo for chicken, then rest it for 10 to 15 minutes before carving. Duck takes longer and benefits from pricking the skin, so the fat renders out and the skin crisps. Marinated split birds cook more quickly and suit the barbecue or a hot oven.`,
        `Poultry is cooked when the thickest part of the thigh reaches 75°C and the juices run clear. Keep raw poultry away from cooked food and wash boards and knives in hot, soapy water after use.`,
      ]
    case 'poultry':
      if (p.cat === 'duck')
        return [
          `Duck rewards a little care. Score duck breast skin and start it skin-side down in a cold pan, so the fat renders slowly and the skin crisps, then finish it in a hot oven and rest it. Duck legs suit slow braising, or slow cooking in rendered duck fat until the meat falls from the bone. Duck mince makes rich meatballs, dumplings and ragù.`,
          `Food Standards Australia New Zealand advises cooking poultry, including duck, until the centre reaches 75°C; duck legs and mince should always be cooked through. Save the rendered fat for roasting vegetables.`,
        ]
      return [
        `Chicken cuts like this cook quickly. Breast and tenderloins are best pan-fried, grilled or baked at 200°C until just cooked through, so they stay juicy. Thighs, drumsticks, Marylands and wings handle higher heat and longer cooking, which makes them ideal for the barbecue, air fryer, oven or a curry. Crumbed and marinated cuts can go straight into the oven or air fryer.`,
        `Cook poultry until the centre reaches 75°C and the juices run clear, which is the food-safety guidance from Food Standards Australia New Zealand. Our [chicken recipes](/blog/chicken-maryland-recipes/) have oven, air fryer and curry ideas.`,
      ]
    case 'slow':
      return [
        `This is a hard-working cut with plenty of connective tissue, and it rewards a long, gentle cook. Brown it well first, then braise it covered at 150–160°C, or in a slow cooker on low, until it is fork-tender. That usually takes 3 to 8 hours depending on the size of the pieces. The connective tissue melts into the sauce and gives it body.${L}`,
        `Like most braises, it tastes even better the next day. Cool it, chill it overnight and lift off the fat before reheating. Our ${link(p, 'slow-cooking guide', 'gravy-beef-vs-chuck')} compares the best cuts for slow cooking.`,
      ]
    case 'diced':
      return [
        `This cut is made for curries, stews, kebabs and stir-fries. For a curry or stew, brown the pieces in batches, then simmer gently until tender. For stir-fries and skewers, cook small pieces fast over a high heat so they sear without stewing. Marinating for a few hours adds flavour and helps tenderise.${L}`,
        `Keep the pieces about the same size so they cook evenly. Our ${link(p, 'beef cuts guide', 'guide-to-halal-beef-cuts')} explains which cut suits which dish.`,
      ]
    case 'roast':
      return [
        `Bring ${n} out of the fridge 30 to 60 minutes before cooking, season it well and roast at 180–200°C. A meat thermometer takes the guesswork out: for beef and lamb, 55–57°C in the centre is medium-rare and 60–63°C is medium. Rest the roast for 15 to 20 minutes before carving, loosely covered, and carve across the grain.${L}`,
        `Boned and rolled roasts cook more evenly and carve easily; bone-in roasts take a little longer but stay juicy. Our ${link(p, 'roasting guide', 'best-beef-cut-for-roasting')} compares the best cuts.`,
      ]
    default:
      return [
        wagyu(p)
          ? `Wagyu like this is heavily marbled, so cook it hot and fast. Bring it to room temperature, season with salt just before cooking, and sear it in a very hot, dry pan or on the grill. The fat renders as it cooks, so it needs little or no oil. Medium-rare to medium (55–60°C in the centre) lets the marbling melt without drying the meat.`
          : `For ${n}, take the meat out of the fridge 20 to 30 minutes before cooking, pat it dry and season it well. Cook it in a very hot pan or on a hot grill, turning every minute or so for an even crust. A thermometer helps: 52–55°C in the centre is rare, 55–57°C medium-rare and 60–63°C medium.${L}`,
        `Always rest a steak for about half its cooking time before slicing, and slice across the grain. Our ${link(p, 'steak guide', 'scotch-fillet-vs-porterhouse-vs-eye-fillet')} compares the most popular cuts.`,
      ]
  }
}

function storage(p) {
  if (frozen(p))
    return `We pack this product frozen. Keep it in the freezer at -15°C or colder until you need it, then thaw it in the fridge, never on the bench. Small packs thaw overnight; larger pieces can take a day or two. Once thawed, keep it in the fridge at 5°C or below and cook it within a day or two. Don't refreeze raw meat that has fully thawed.`
  return `We pack this product chilled. Keep it in the fridge at 5°C or below and use it by the date on the label. To keep it longer, freeze it on the day it arrives, in its sealed pack or in meal-sized bags with the air pressed out. Thaw it in the fridge, never on the bench, and cook it within a day or two of thawing.`
}

// Serves: about 200g per person boneless, 350g bone-in (a planning guide, not a promise).
function serves(p) {
  const bone = /bone-in|bone in|on the bone|ribs|riblets|shank|osso|neck|oxtail|drumstick|wing|maryland|whole|carcass|quarter|chops|t-bone|tomahawk|cutlet|split|feet|frames|bones|curry/i.test(`${p.name} ${p.unit}`)
  return Math.max(1, Math.round((p.kg * 1000) / (bone ? 350 : 200)))
}

export function productGuide(p) {
  const kind = cutKind(p)
  const cold = frozen(p) ? 'frozen' : 'chilled'
  const crypto = money(Math.round(p.price * (100 - SITE.cryptoDiscountPct)) / 100)
  const people = serves(p)
  const feeds = ['bones', 'carton', 'carcass'].includes(kind) ? null : people
  const pk = `${p.name.replace(/\s*\(.*?\)/, '').toLowerCase().replace(/\bwagyu\b/g, 'Wagyu').replace(/\bangus\b/g, 'Angus').replace(/\bmb(\d)/g, 'MB$1')} pack`
  const share = Math.round((p.price / SITE.minOrder) * 100)
  return {
    guideHeading: `How to cook ${p.name.replace(/\s*\(.*?\)/, '')}`,
    guide: guide(p),
    storeHeading: frozen(p) ? 'Storing and thawing' : 'Storing and freezing',
    store: storage(p),
    packHeading: 'Pack size, price and delivery',
    pack: [
      `You get ${p.unit} (about ${p.kg} kg) for ${money(p.price)}, which works out at roughly ${money(p.perKg)} per kilo.${feeds ? ` As a guide, that is enough for about ${feeds} ${feeds === 1 ? 'serve' : 'serves'}.` : ''} Pay with crypto and the price drops to ${crypto}, because crypto takes ${SITE.cryptoDiscountPct}% off your meat total.`,
      `${p.price >= SITE.minOrder ? `This product on its own meets our $${SITE.minOrder} minimum order.` : `This pack covers about ${share}% of our $${SITE.minOrder} minimum order, which counts across your whole cart.`} Standard Delivery takes ${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days and is free over $${SITE.freeShipOver} (otherwise $${SITE.flatShip}). Priority Delivery starts at $${PRIORITY_FROM} and is priced by distance from our Greenacre depot. Your order is packed ${cold} and dispatched once payment clears.`,
    ],
    faqs: [
      { q: `Is this ${pk} certified halal?`, a: `Yes. It is certified halal by ${SITE.certifier} (certificate No. ${SITE.certificate.number}). You can view the certificate on our certification page before you order.` },
      { q: `How is this ${pk} delivered?`, a: `It is packed ${cold} at our Greenacre depot and delivered Australia-wide. Choose Standard Delivery (${SITE.delivery.transitDays[0]}–${SITE.delivery.transitDays[1]} days, free over $${SITE.freeShipOver}) or Priority Delivery, priced by distance, at checkout.` },
      frozen(p)
        ? { q: `How long does this ${pk} take to thaw?`, a: `Thaw it in the fridge: small packs overnight, larger pieces in a day or two. Once thawed, cook it within a day or two and don't refreeze it raw.` }
        : { q: `Can I freeze this ${pk}?`, a: `Yes. Freeze it on the day it arrives, in its sealed pack or in meal-sized bags. Thaw it in the fridge and cook it within a day or two of thawing.` },
    ],
  }
}
