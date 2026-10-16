// Supporting keywords for categories and pages (owner request 2026-10-16). Every keyword is an EXACT phrase
// from the owner's Semrush files with Keyword Difficulty 0–29, used nowhere else on the site, chosen only where
// it truthfully describes the page (no other cities, brands, businesses or unconfirmed claims). Navigational
// phrases are used only when generic (e.g. "fresh poultry", "wagyu beef sydney"). Each keyword appears verbatim
// in `copy`, which is rendered on the page by <KeywordNotes> (the build check verifies it).
// intent: I = Informational, C = Commercial, T = Transactional, N = Navigational (Semrush, first listed first).
const k = (kw, intent, kd, vol) => ({ kw, intent, kd, vol })

export const CATEGORY_KEYWORDS = {
  beef: {
    keywords: [k('halal beef steak', 'C', 8, 590), k('beef cuts', 'I', 29, 1600), k('beef wholesale', 'C', 13, 140), k('beef bulk', 'C', 10, 90), k('wholesale beef', 'C', 27, 170)],
    title: 'Halal beef cuts, steaks and bulk buying',
    copy: [
      `This page lists every beef cut we sell, from premium halal beef steak such as scotch fillet, porterhouse and eye fillet to slow-cooking chuck, brisket and shin. The beef cuts are grouped by how you cook them, so you can jump straight to steaks, roasts, mince or braising cuts.`,
      `Buying for a business? Our beef wholesale prices apply to cryovac primals and cartons, and buying beef bulk for a big family or an event works the same way: add several packs or a carton to one order. For regular wholesale beef supply, open a trade account on our [wholesale page](/halal-meat-wholesale/).`,
    ],
  },
  lamb: {
    keywords: [k('lamb meat', 'I', 13, 1000), k('lamb for roast', 'I', 18, 1600), k('lamb racks', 'I', 24, 480), k('lamb for casserole', 'I', 12, 260)],
    title: 'Choosing lamb meat for every dish',
    copy: [
      `All our lamb meat is cut to order in Greenacre and certified halal by Halal Control Australia. For a Sunday lamb for roast, choose a bone-in leg or a boned and rolled shoulder; for a special dinner, our frenched lamb racks cook in under 30 minutes.`,
      `Looking for lamb for casserole? Forequarter chops, neck, shanks and diced shoulder turn tender after a long, slow cook. Our [lamb casserole recipe](/blog/lamb-casserole-recipe/) shows how.`,
    ],
  },
  goat: {
    keywords: [k('where to buy goat meat near me', 'T', 8, 170), k('goat australia', 'I', 25, 140), k('recipes goat meat', 'I', 19, 140), k('goat for food', 'I', 7, 210)],
    title: 'Halal goat delivered Australia-wide',
    copy: [
      `Wondering where to buy goat meat near me? Order here and we deliver chilled goat from Greenacre, Sydney to every state, so you don't need a local butcher that stocks it.`,
      `Goat for food is lean, full of flavour and best slow cooked. We send goat Australia-wide and carry whole and half carcasses as well as legs, shoulders, racks, ribs, shanks and curry cuts. For recipes goat meat lovers enjoy, see our [slow cooked goat recipes](/blog/slow-cooked-goat-recipes/) and our [goat meat curry cuts guide](/blog/goat-meat-curry-cuts-guide/).`,
    ],
  },
  chicken: {
    keywords: [k('fresh poultry', 'N', 13, 880), k('chicken meat', 'I', 16, 480), k('chicken frame', 'I', 6, 590), k('chicken neck', 'I', 11, 590)],
    title: 'Fresh halal chicken, cut every way',
    copy: [
      `We pack fresh poultry chilled at our Greenacre depot: whole birds, breast and thigh fillets, drumsticks, wings, marylands and ready-to-cook marinated and crumbed chicken meat.`,
      `For stock and broth, a chicken frame and a chicken neck or two give a rich, gelatinous base; both are in our [offal range](/shop/offal-beef-organ-meat/) with chicken feet and livers.`,
    ],
  },
  camel: {
    keywords: [k('camel meat sydney', 'C', 8, 30), k('buy camel meat australia', 'T', 9, 20), k('camel meat dishes', 'I', 6, 30), k('camel halal meat', 'I', 9, 20), k('camel meat australia price', 'T', 8, 20), k('camel meat butcher', 'N', 8, 20)],
    title: 'Buying camel meat',
    copy: [
      `We are a camel meat butcher based in Greenacre, so camel meat Sydney customers can order today and receive it chilled, and anyone wanting to buy camel meat australia-wide gets the same delivery to every state.`,
      `Every cut is camel halal meat certified by Halal Control Australia. The camel meat australia price for each cut is shown per pack and per kilo on its product page. For camel meat dishes, try our [camel burgers](/blog/camel-burgers/) guide or the [camel, buffalo and kangaroo cooking guide](/blog/cooking-camel-meat-buffalo-kangaroo/).`,
    ],
  },
  duck: {
    keywords: [k('is duck red meat', 'I', 23, 390), k('duck maryland', 'I', 6, 320), k('duck leg', 'I', 10, 390), k('duck oven', 'I', 12, 210)],
    title: 'Cooking duck',
    copy: [
      `Is duck red meat? In the kitchen, yes: duck breast is cooked pink like a steak, and the meat is darker and richer than chicken.`,
      `A duck leg (sometimes sold as a duck maryland) is best slow roasted until the meat falls off the bone. For a whole bird, our [oven duck](/blog/oven-duck/) guide covers the duck oven method step by step, from scoring the skin to resting.`,
    ],
  },
  kangaroo: {
    keywords: [k('kangaroo meat butcher', 'C', 9, 210), k('kangaroo meat recipes', 'I', 11, 480), k('recipes for kangaroo steak', 'I', 9, 480), k('kangaroo steak sydney', 'C', 26, 210), k('kangaroo dishes', 'I', 10, 480)],
    title: 'Kangaroo fillet and steak',
    copy: [
      `As a kangaroo meat butcher in Greenacre, we send kangaroo steak Sydney orders out chilled, and deliver to the rest of Australia too.`,
      `Kangaroo is very lean, so it is best seared quickly and served rare to medium-rare. For kangaroo meat recipes and recipes for kangaroo steak, see our [kangaroo fillet](/blog/kangaroo-fillet/) guide; it covers pepper-crusted fillet, a bush-spice marinade and other kangaroo dishes.`,
    ],
  },
  'water-buffalo': {
    keywords: [k('buffalo beef', 'I', 19, 320), k('buffalo steaks near me', 'T', 5, 30), k('where to buy buffalo steaks', 'T', 6, 20), k('buffalo steak price', 'T', 3, 10), k('buffalo meat for sale near me', 'T', 5, 20)],
    title: 'Water buffalo steaks and mince',
    copy: [
      `Water buffalo meat is sometimes called buffalo beef: it looks and cooks much like beef but is leaner, with a slightly sweeter flavour.`,
      `Searching for buffalo steaks near me, or where to buy buffalo steaks? We deliver chilled buffalo from Greenacre, Sydney to every state, and the buffalo steak price for each cut is shown per pack and per kilo. If you searched for buffalo meat for sale near me, every cut on this page can be ordered online today.`,
    ],
  },
  offal: {
    keywords: [k('beef offal', 'I', 10, 320), k('soup bones', 'I', 9, 390), k('beef marrow bone broth', 'I', 17, 390), k('tendon beef', 'I', 14, 260)],
    title: 'Offal and bones for broth',
    copy: [
      `Our beef offal includes cheeks, liver, tongue, tendon and oxtail, alongside chicken livers, necks, feet and frames. Tendon beef is prized in Asian braises and soups for its silky, gelatinous texture.`,
      `Soup bones and marrow bones make the base for a rich beef marrow bone broth; our [best bones for bone broth](/blog/best-bones-for-bone-broth/) guide explains which bones to buy and how long to simmer them.`,
    ],
  },
  'wholesale-cartons': {
    keywords: [k('steak bulk', 'C', 6, 110), k('bulk beef purchase', 'T', 12, 70), k('beef mince bulk buy', 'T', 4, 90), k('wholesale beef mince', 'C', 5, 90)],
    title: 'Buying meat in bulk',
    copy: [
      `Cartons and catering packs are the cheapest way to buy steak bulk or make a bulk beef purchase: cryovac primals, mince, diced beef and lamb come at carton prices.`,
      `A beef mince bulk buy suits big families and caterers, and our wholesale beef mince carton keeps well in the freezer. Restaurants and takeaways can arrange regular supply on our [wholesale page](/halal-meat-wholesale/).`,
    ],
  },
}

export const PAGE_KEYWORDS = {
  '/': {
    keywords: [k('what halal meat', 'I', 28, 1600), k('halal meat what is', 'I', 24, 1300)],
    title: 'What halal meat do we sell?',
    copy: [
      `What halal meat do we sell? Beef, lamb, goat, chicken, camel, duck, kangaroo and water buffalo, plus offal, bones and bulk cartons, all certified by Halal Control Australia. Halal meat — what is it, exactly? Our [halal certification page](/halal-certified-meat/) explains what certification covers and shows our certificate.`,
    ],
  },
  '/wagyu-steak/': {
    keywords: [k('wagyu beef sydney', 'N', 17, 320), k('wagyu sydney', 'N', 13, 320), k('wagyu beef delivery', 'C', 17, 170), k('wagyu beef online delivery', 'N', 15, 90)],
    title: 'Wagyu delivered from Sydney',
    copy: [
      `We cut and pack our Wagyu beef Sydney-side, at our Greenacre depot, so Wagyu Sydney customers can order today. Wagyu beef delivery reaches every state, chilled, and Wagyu beef online delivery is free on orders over $500.`,
    ],
  },
  '/halal-meat-wholesale/': {
    keywords: [k('halal wholesale', 'C', 10, 110), k('wholesale beef near me', 'T', 25, 90)],
    title: 'Halal wholesale supply',
    copy: [
      `Our halal wholesale accounts cover restaurants, takeaways, caterers and butchers. If you searched wholesale beef near me, we deliver trade orders from Greenacre, Sydney, Australia-wide.`,
    ],
  },
  '/whole-lamb-aqeeqah-qurbani/': {
    keywords: [k('cost of whole lamb', 'I', 5, 210), k('whole lamb on a spit', 'I', 5, 110), k('whole lamb spit', 'I', 5, 110), k('rotisserie whole lamb', 'I', 6, 110)],
    title: 'Whole lamb prices and spit roasting',
    copy: [
      `The cost of whole lamb depends on its weight; current prices are shown on this page and on each carcass product. For a whole lamb on a spit, ask us to prepare it for roasting; our [lamb spit guide](/blog/lamb-spit-roast-guide/) covers the whole lamb spit setup, timings and carving for a rotisserie whole lamb.`,
    ],
  },
  '/halal-meat-delivery/': {
    keywords: [k('steaks to deliver', 'I', 16, 90), k('beef brisket delivery', 'C', 9, 110)],
    title: 'What we deliver',
    copy: [
      `Everything in the shop can be delivered, from steaks to deliver for a weekend barbecue to beef brisket delivery for a smoker cook. Orders are packed chilled in Greenacre and sent Australia-wide.`,
    ],
  },
  '/halal-certified-meat/': {
    keywords: [k('what is halal meat', 'I', 23, 1600), k('halal meat certification', 'I', 16, 260), k('check halal food', 'I', 27, 880), k('what does halal meat mean', 'I', 25, 720)],
    title: 'Halal certification explained',
    copy: [
      `What is halal meat, and what does halal meat mean when you buy it in Australia? It is meat from animals prepared according to Islamic requirements and supervised by a halal certifier. Our halal meat certification is with Halal Control Australia, and the certificate is shown on this page.`,
      `To check halal food you buy anywhere, look for the certifier's name and certificate number, and confirm it is current.`,
    ],
  },
  '/about/': {
    keywords: [k('the halal butcher', 'I', 14, 590)],
    title: 'A halal butcher in Greenacre',
    copy: [`Many customers know us simply as the halal butcher in Greenacre that delivers: we cut, pack and send certified halal meat from our depot to every state.`],
  },
  '/faq/': {
    keywords: [k('what is a halal meat', 'I', 26, 590)],
    title: 'Who we are',
    copy: [`What is a halal meat supplier like us? We are Halal Meat Depot in Greenacre, Sydney, selling meat certified halal by Halal Control Australia online, with delivery Australia-wide.`],
  },
}
