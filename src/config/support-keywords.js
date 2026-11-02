// Supporting keywords for categories and pages (owner keyword map v4, 2026-11-02). Every keyword is an EXACT phrase
// from the owner's Semrush files with Keyword Difficulty 0–29, chosen only where it truthfully describes the page
// (no other cities, brands, businesses or unconfirmed claims). A keyword may support more than one page (owner,
// 2026-11-02); each page's FOCUS keyword stays unique. Each keyword appears verbatim in `copy`, rendered on the
// page by <KeywordNotes> (crosscheck F14 verifies it).
// intent: I = Informational, C = Commercial, T = Transactional, N = Navigational (Semrush; "I+C" = both).
const k = (kw, intent, kd, vol) => ({ kw, intent, kd, vol })

export const CATEGORY_KEYWORDS = {
  beef: {
    keywords: [k('buy beef mince online', 'T', 5, 140), k('best roast beef to buy', 'C', 15, 110), k('buy roast beef', 'T', 8, 110), k('where to buy beef brisket', 'T', 6, 90), k('beef mince bulk buy', 'T', 6, 90), k('buy beef steak', 'T', 11, 70), k('buying beef in bulk', 'T', 6, 70), k('buy stir fry beef online', 'T', 7, 70), k('buy beef sausages online', 'T', 5, 70), k('halal beef near me', 'T', 6, 70)],
    title: 'How to buy halal beef online',
    copy: [
      `Every cut on this page is cut to order at our Greenacre depot. You can buy beef mince online in 2kg packs or 20kg cartons, buy beef steak from everyday rump to Wagyu, and buy beef sausages online as herb-and-garlic links, Wagyu Texan chilli and BBQ chipolatas. Want something for a weeknight wok? You can buy stir fry beef online already sliced into strips.`,
      `Wondering which is the best roast beef to buy? Topside and rump are lean and easy to carve, while a standing rib roast is the showpiece. You can buy roast beef as a whole topside, a rolled joint or a bone-in rib. If you've been searching where to buy beef brisket, we sell whole packers, point-end and navel-end cuts, which suit low-and-slow smoking. Our [roasting guide](/blog/best-beef-cut-for-roasting/) and [brisket guide](/blog/brisket-beef-best-temperature-smoke/) explain the cuts.`,
      `Buying beef in bulk saves money for big families and events. A beef mince bulk buy in a 20kg carton is our lowest price per kilo on mince, and our [meat packs](/shop/meat-packs/) cover cartons of steaks, diced beef and primals. Looking for halal beef near me? We deliver from Greenacre across Sydney and to every state, so there's no shop to visit.`,
    ],
  },
  lamb: {
    keywords: [k('lamb meat', 'C', 14, 1000), k('lamb prices australia', 'C', 17, 140), k('price of lamb in australia', 'T', 16, 110), k('buy lamb', 'T', 8, 90), k('leg of lamb for sale', 'T', 7, 90), k('buy lamb roast online', 'T', 4, 70), k('buy lamb steak online', 'T', 4, 70), k('halal lamb', 'C', 6, 90), k('halal lamb near me', 'T', 6, 20), k('halal lamb meat near me', 'T', 5, 20)],
    title: 'Halal lamb cut to order',
    copy: [
      `All our lamb meat is cut to order in Greenacre and certified halal by Halal Control Australia. Every pack of halal lamb, from cutlets to shanks, carries the same certificate, which is published on our [certification page](/halal-food-australia-certified-meat/).`,
      `When you buy lamb for a Sunday roast, a bone-in leg of lamb for sale here comes whole or halved. You can also buy lamb roast online as a boned and rolled shoulder, or buy lamb steak online as leg steaks and backstrap for quick grilling. For slow cooking, forequarter chops, neck and diced shoulder turn tender after a long braise. Our [lamb casserole guide](/blog/diced-lamb-casserole-recipe/) shows how.`,
      `Lamb prices Australia-wide move with the season, so we show the pack price and the price per kilo on every product. That makes it easy to compare the price of lamb in Australia from one cut to the next. Searching for halal lamb near me or halal lamb meat near me? We deliver from Greenacre across Sydney and to every state. For whole lambs for Aqeeqah or Qurbani, see [whole lamb](/whole-lamb-aqeeqah-qurbani/).`,
    ],
  },
  goat: {
    keywords: [k('lamb vs goat meat', 'C', 23, 260), k('mutton vs goat', 'C', 20, 140), k('goat meat vs mutton', 'I+C', 27, 140), k('where can i buy goat meat near me', 'T', 7, 110), k('whole goat meat for sale', 'T', 6, 20)],
    title: 'Choosing goat meat',
    copy: [
      `Weighing up lamb vs goat meat? Goat is leaner, with a deeper flavour, and it needs a longer, gentler cook. That's why bone-in curry cut and shoulder are the most popular cuts for curries and stews. Our [goat curry guide](/blog/goat-curry-meat-cuts-guide/) explains which cut suits each dish.`,
      `The mutton vs goat question confuses many shoppers, because in parts of South Asia "mutton" means goat. In Australia, mutton is meat from an older sheep. When recipes compare goat meat vs mutton, both suit slow curries, but goat is leaner and needs a little more liquid.`,
      `If you've been asking where can i buy goat meat near me, you can order from us online. We deliver from Greenacre across Sydney and to every state. We also have whole goat meat for sale as a full carcass, cut to your instructions, for Aqeeqah, Qurbani and family events.`,
    ],
  },
  chicken: {
    keywords: [k('chicken breast', 'I+T', 22, 9900), k('chicken wings near me', 'T', 27, 1900), k('halal chicken', 'C', 14, 1300), k('fresh chicken', 'T', 16, 320), k('chicken for sale near me', 'T', 22, 320), k('buy halal chicken', 'T', 4, 20), k('buy halal chicken online', 'T', 6, 20), k('buy halal chicken near me', 'T', 7, 20), k('halal chicken butcher', 'C', 13, 20), k('halal chicken butcher near me', 'T', 11, 20)],
    title: 'Fresh halal chicken, every cut',
    copy: [
      `Our halal chicken is sold fresh and packed chilled at our Greenacre depot, and it's certified by Halal Control Australia. Choose chicken breast fillets, tenderloins, thigh fillets, drumsticks, Marylands, wings and whole birds, or marinated and crumbed cuts that are ready to cook.`,
      `Fresh chicken is sold in family packs, and cartons are available for restaurants. To buy halal chicken online, add any cut to your cart; the $250 minimum order counts across your whole cart. Searching for chicken wings near me or chicken for sale near me? We deliver from Greenacre across Sydney and to every state.`,
      `As a halal chicken butcher we also sell split marinated chickens and curry-cut chicken in catering packs. If you've been looking for a halal chicken butcher near me, or a place to buy halal chicken near me, order online and we'll bring it to your door. You can buy halal chicken by the carton too, on our [meat packs](/shop/meat-packs/) page.`,
    ],
  },
  camel: {
    keywords: [k('camel meat australia', 'I+C', 6, 50), k('camel meat for sale', 'T', 9, 20), k('camel meat price', 'C', 8, 20), k('camel meat australia price', 'T', 8, 20), k('camel meat per kg', 'T', 1, 20), k('buy camel meat australia', 'T', 7, 20), k('camel meat halal near me', 'T', 12, 20), k('camel meat for sale near me', 'T', 11, 20)],
    title: 'Buying camel meat',
    copy: [
      `Camel meat Australia-wide is hard to find in shops, so we stock a full range. There's porterhouse, scotch fillet, eye fillet and rump steaks, a camel tomahawk, diced camel, mince, neck and osso buco. All our camel meat for sale is packed frozen and certified halal by Halal Control Australia.`,
      `Each product shows the camel meat price per pack, and the camel meat per kg figure sits beside it, so you can compare the camel meat Australia price across cuts. To buy camel meat Australia-wide, add it to your cart and we'll send it frozen from Greenacre.`,
      `Searching for camel meat halal near me, or camel meat for sale near me? There's no shop to visit. We deliver to your door across Sydney and to every state. Our [camel, buffalo and kangaroo guide](/blog/kangaroo-meat-cooking-camel-buffalo/) explains how to cook each cut.`,
    ],
  },
  duck: {
    keywords: [k('duck near me', 'T', 24, 480), k('buy duck', 'T', 13, 260), k('where to buy duck', 'T', 15, 210), k('where can you buy duck', 'T', 7, 210), k('buying duck', 'T', 8, 140), k('ducks for food', 'I+C', 26, 140)],
    title: 'Buying halal duck',
    copy: [
      `Ducks for food are raised for rich, dark meat that roasts beautifully and suits curries, braises and Asian-style dishes. We sell whole ducks, duck breast fillets, legs, mince, livers, rendered duck fat and bones for stock, all certified halal.`,
      `Wondering where to buy duck, or where can you buy duck that's certified halal? You can buy duck here and we'll deliver it from Greenacre across Sydney and Australia-wide. Searching for duck near me? Order online instead of hunting for a shop. When you're buying duck for a roast, allow about 500g of whole duck per person, because the carcass carries a lot of bone and fat.`,
    ],
  },
  kangaroo: {
    keywords: [k('kangaroo meat butcher', 'C', 7, 260), k('kangaroo meat sydney', 'C', 27, 260), k('kangaroo steak sydney', 'C', 16, 210), k('halal kangaroo meat', 'C', 10, 170), k('is kangaroo meat good for weight loss', 'I+C', 7, 20)],
    title: 'Kangaroo fillet and steak',
    copy: [
      `As a kangaroo meat butcher in Greenacre, we send kangaroo meat Sydney orders out frozen, and we deliver to the rest of Australia too. Kangaroo steak Sydney customers order most often are rump steaks and fillets, which are best seared quickly and served rare to medium-rare.`,
      `Looking for halal kangaroo meat? Our [camel, buffalo and kangaroo guide](/blog/kangaroo-meat-cooking-camel-buffalo/) covers buying and cooking it. Is kangaroo meat good for weight loss? Kangaroo is one of the leanest red meats you can buy, but no single food causes weight loss, so check with a dietitian about your own diet. For recipes, see our [kangaroo fillet guide](/blog/kangaroo-steak-fillet/).`,
    ],
  },
  'water-buffalo': {
    keywords: [k('buffalo meat', 'I+C', 8, 590), k('buffalo beef', 'I+T', 12, 320), k('buffalo vs cattle', 'I+C', 17, 90), k('buffalo vs cow', 'C', 26, 90), k('buffalo steak', 'T', 11, 70), k('buffalo meat buy online', 'T', 3, 20)],
    title: 'Water buffalo steaks and mince',
    copy: [
      `Water buffalo meat is sometimes called buffalo beef. It looks and cooks much like beef but is leaner, with a slightly sweeter flavour. Every cut of our buffalo meat is packed frozen and certified halal by Halal Control Australia.`,
      `Comparing buffalo vs cattle? Buffalo has less marbling, so it cooks faster and dries out if overcooked. The buffalo vs cow difference is easy to taste in a quick-seared steak. Cook a buffalo steak to medium-rare and rest it well. Our [camel, buffalo and kangaroo guide](/blog/kangaroo-meat-cooking-camel-buffalo/) goes into more detail.`,
      `For buffalo meat buy online here: porterhouse, scotch fillet, rib eye, T-bone, tomahawk, asado ribs, diced, mince and osso buco, delivered from Greenacre to every state.`,
    ],
  },
  offal: {
    keywords: [k('offal food', 'I+T', 28, 320), k('beef organ meat', 'C', 8, 90), k('buy chicken offal online', 'T', 4, 70), k('buy beef offal', 'T', 5, 20), k('beef offal near me', 'T', 9, 20), k('where to buy beef offal near me', 'T', 5, 20)],
    title: 'Offal, bones and broth cuts',
    copy: [
      `Offal food is a staple of many cuisines: liver with onions, slow-braised tongue, oxtail stew and rich bone broth. Our beef organ meat range covers liver, tongue, tendon and cheeks, plus a mince blended with liver, heart and kidney. We also sell oxtail, marrow bones and soup bones; the liver, tongue, oxtail and bones are packed frozen.`,
      `To buy beef offal, add it to your cart with the rest of your order; the $250 minimum counts across your whole cart. You can also buy chicken offal online, including livers, necks, feet and frames for stock. Searching for beef offal near me, or where to buy beef offal near me? We deliver from Greenacre across Sydney and to every state. For broth, see our [bone broth guide](/blog/best-bones-for-bone-broth/).`,
    ],
  },
  'wholesale-cartons': {
    keywords: [k('meat box', 'C', 16, 2400), k('meat boxes', 'C', 12, 720), k('wholesale meat', 'C', 16, 720), k('meat pack', 'T', 17, 590), k('wholesale meat near me', 'T', 28, 590), k('cheap bulk beef', 'T', 6, 20), k('bulk beef delivery', 'C', 6, 20), k('bulk beef for sale', 'T', 11, 20), k('bulk beef prices', 'T', 6, 20), k('bulk beef order', 'C', 6, 20)],
    title: 'Cartons and meat boxes',
    copy: [
      `A meat box is the easiest way to stock the freezer. Our meat boxes and cartons hold 20kg of a single cut, such as mince, diced beef, chicken or lamb shoulder, at our lowest prices per kilo. Each meat pack is sealed in manageable bags inside the carton, so you can freeze what you don't need straight away.`,
      `Restaurants, takeaways and caterers buy wholesale meat from us through a trade account. If you searched for wholesale meat near me, we deliver from Greenacre to businesses across Sydney and Australia-wide. See [halal meat manufacturers and wholesale](/halal-meat-manufacturers-wholesale/) for trade pricing.`,
      `Cheap bulk beef doesn't have to mean low quality. Every carton is the same certified halal beef we sell by the pack. Our bulk beef for sale includes mince, diced, brisket and steak cartons. Bulk beef prices are listed per carton and per kilo, and bulk beef delivery is free on orders over $500. Place a bulk beef order online, or ask us on WhatsApp for a regular delivery day.`,
    ],
  },
}

// Supporting keywords for static pages (keyed by path).
export const PAGE_KEYWORDS = {
  '/': {
    keywords: [k('halal meat store near me', 'T', 13, 1300), k('steaks halal near me', 'T', 19, 1000), k('halal steak', 'C', 8, 720), k('halal meats', 'C', 11, 720), k('halal beef steak', 'C', 8, 590), k('halal meats near me', 'T', 17, 390), k('meat shops halal', 'C', 11, 390), k('halal meat butchers', 'C', 11, 320), k('halal butchers near me', 'T', 9, 260), k('halal food meat', 'C', 10, 260), k('halal meat near me', 'T', 13, 3600)],
    title: 'Your halal meat store, delivered',
    copy: [
      `Searching for a halal meat store near me, or halal meat near me? We're an online butcher in Greenacre, Sydney, and we deliver to every state. Most meat shops halal shoppers know only serve their own suburb, but our halal meats reach your door wherever you live.`,
      `Looking for steaks halal near me? Every halal steak we sell, from rump to Wagyu, is certified by Halal Control Australia. A halal beef steak is cut to order, so it's never been sitting in a display case. Our [beef range](/shop/halal-beef/) lists every cut.`,
      `Like most halal meat butchers, we cut beef, lamb, goat and chicken. We also stock camel, buffalo, kangaroo and duck. If you've been searching for halal butchers near me or halal meats near me, order online and choose Standard or Priority Delivery at checkout. Halal food meat should be clearly certified, so our certificate is published in full on our [certification page](/halal-food-australia-certified-meat/).`,
    ],
  },
  '/halal-meat-shop-near-me/': {
    keywords: [k('halal butcher', 'C', 27, 1900), k('halal food stores near me', 'T', 6, 480), k('halal meat shop', 'C', 17, 390), k('halal shop near me', 'T', 12, 390), k('halal meat grocery near me', 'T', 10, 260), k('halal meat vendors', 'C', 10, 260), k('halal grocery near me', 'T', 18, 260), k('halal beef meat', 'C', 9, 260), k('halal steak sydney', 'C', 17, 260), k('halal meat food', 'C', 10, 260), k('halal beef shop', 'C', 15, 20), k('halal beef shop near me', 'T', 6, 20), k('buy halal beef', 'T', 7, 20), k('halal beef for sale', 'T', 7, 50), k('halal beef meat near me', 'T', 6, 20)],
    title: 'An online halal meat shop',
    copy: [
      `Our halal meat shop is online. We're a halal butcher in Greenacre, Sydney, and we pack every order to deliver straight to your door. If you've been searching for a halal shop near me, halal food stores near me, a halal grocery near me or a halal meat grocery near me, you can order every cut here instead.`,
      `Unlike many halal meat vendors, we publish our certificate from Halal Control Australia so you can check it before you order. Every pack of halal meat food we sell is covered by it. That includes our halal beef meat, from mince to the halal steak Sydney restaurants order for their grills.`,
      `Think of this page as a halal beef shop with the whole range in one place. Looking for a halal beef shop near me, or halal beef meat near me? We deliver across Sydney and to every state. To buy halal beef, choose a cut below; all our halal beef for sale is cut to order and packed chilled, or frozen where the product says so.`,
    ],
  },
  '/wagyu-steak/': {
    keywords: [k('wagyu scotch fillet', 'I+C', 7, 390), k('wagyu beef sydney', 'C', 6, 320), k('wagyu steak near me', 'T', 9, 260), k('wagyu butcher', 'C', 14, 260), k('wagyu beef price', 'T', 7, 210), k('buy wagyu beef', 'T', 15, 210), k('wagyu beef price per kg', 'T', 8, 170), k('wagyu meat price', 'T', 6, 170), k('wagyu price', 'T', 7, 170), k('wagyu beef delivery', 'C', 9, 170), k('order wagyu beef online', 'I+T', 9, 170), k('buy wagyu meat', 'T', 7, 140), k('buy wagyu', 'T', 10, 140), k('halal wagyu beef near me', 'T', 8, 20), k('halal wagyu sydney', 'C', 6, 20)],
    title: 'Buying halal Wagyu',
    copy: [
      `We're a Wagyu butcher in Greenacre with a halal Wagyu range from MB5+ to MB9+: rump, porterhouse, eye fillet, oyster blade, brisket and Wagyu scotch fillet. For Wagyu beef Sydney customers can order Priority Delivery within 24 hours, and we deliver to every other state too.`,
      `The Wagyu beef price depends on the grade and the cut. Each product shows the pack price, with the Wagyu beef price per kg beside it, so you can compare the Wagyu meat price across cuts. As a rule, the Wagyu price per kilo rises with the marble score.`,
      `To buy Wagyu beef, add it to your cart. You can buy Wagyu meat by the steak, or buy Wagyu as whole primals such as rump, oyster blade and brisket. Order Wagyu beef online and choose Standard or Priority delivery; Wagyu beef delivery is free over $500. Searching for a Wagyu steak near me, halal Wagyu beef near me or halal Wagyu Sydney? Every Wagyu cut here is certified halal by Halal Control Australia.`,
    ],
  },
  '/whole-lamb-aqeeqah-qurbani/': {
    keywords: [k('lamb whole', 'I+C', 4, 320), k('lamb for sale', 'T', 13, 210), k('cost of whole lamb', 'C', 2, 210), k('price for a lamb', 'T', 13, 210), k('lamb butcher', 'C', 11, 170), k('full lamb for sale', 'T', 6, 140), k('buy whole lamb', 'T', 6, 90), k('buy a whole lamb', 'T', 6, 90), k('buy whole lamb meat', 'T', 5, 90), k('purchase whole lamb', 'T', 5, 90), k('buy lamb online', 'T', 0, 90), k('buy lamb meat online', 'T', 6, 90)],
    title: 'Buying a whole lamb',
    copy: [
      `A lamb whole is the traditional choice for Aqeeqah and Qurbani, and for big family events. Our lamb for sale is supplied as a full carcass, certified halal by Halal Control Australia, and cut by our lamb butcher to your instructions.`,
      `The cost of whole lamb depends on the carcass weight. Each product shows its approximate weight and price, so the price for a lamb is clear before you order. Every full lamb for sale here can be cut into curry pieces, roasts, chops or left whole for a spit.`,
      `To buy whole lamb, or to buy a whole lamb for an Eid order, add it to your cart and write your cutting instructions in the order notes. You can buy whole lamb meat by the carcass or half carcass, and purchase whole lamb for a group by adding several to one order. If you just want to buy lamb online by the cut, or buy lamb meat online in smaller packs, see our [lamb range](/shop/lambs-for-sale/).`,
    ],
  },
  '/halal-meat-manufacturers-wholesale/': {
    keywords: [k('beef wholesale sydney', 'T', 10, 1300), k('bulk meat', 'C', 11, 720), k('wholesale meat sydney', 'C', 9, 590), k('meat wholesalers sydney', 'C', 8, 390), k('wholesale lamb', 'C', 8, 170), k('wagyu beef wholesale', 'C', 15, 140), k('wagyu wholesale', 'C', 17, 110), k('wagyu beef supplier', 'N+C', 6, 50), k('halal wagyu supplier', 'C', 8, 20), k('halal wagyu beef supplier', 'C', 9, 10), k('halal wagyu beef wholesale', 'C', 9, 10), k('bulk sausage', 'C', 2, 210), k('bulk sausages', 'I+C', 1, 210), k('wholesale halal sausages', 'C', 4, 20), k('beef wholesale', 'C', 18, 170)],
    title: 'What we supply to the trade',
    copy: [
      `Restaurants comparing halal meat manufacturers and meat wholesalers Sydney-wide often want one supplier for everything. We supply beef, lamb, goat, chicken and specialty meats, all certified halal by Halal Control Australia. Our beef wholesale range covers primals, steaks, mince and diced beef. For beef wholesale Sydney kitchens get Priority Delivery, and businesses in other states get Standard Delivery.`,
      `Wholesale meat Sydney caterers order from us includes wholesale lamb by the shoulder, leg or carton, and bulk meat in 20kg cartons. Burger bars and grills order bulk sausage packs. Our bulk sausages and wholesale halal sausages come in beef and lamb flavours.`,
      `As a halal Wagyu supplier, we sell MB5+ and MB9+ cuts. For Wagyu beef wholesale and Wagyu wholesale pricing, ask for our trade price sheet. Restaurants that need a halal Wagyu beef supplier, or halal Wagyu beef wholesale by the primal, can open an account below. For a regular Wagyu beef supplier, we can set a weekly delivery day.`,
    ],
  },
  '/meat-box-delivery/': {
    keywords: [k('halal butcher near me', 'T', 12, 4400), k('meat delivery', 'C', 17, 1300), k('meat near me', 'T', 18, 880), k('meat in bulk near me', 'T', 23, 480), k('meat box near me', 'T', 28, 480), k('buy beef online', 'T', 15, 390), k('australia meat', 'C', 14, 390), k('wagyu beef online delivery', 'C', 0, 110), k('halal beef delivery', 'T', 6, 20), k('halal beef online', 'C', 3, 20)],
    title: 'Meat delivery from our Greenacre depot',
    copy: [
      `Our meat delivery covers Sydney and every state. Searching for a halal butcher near me, or just meat near me? Order online and we deliver from Greenacre. Need meat in bulk near me, or a meat box near me? Cartons and meat boxes ship the same way, and delivery is free on orders over $500.`,
      `When you buy beef online with us, halal beef delivery is either Standard (2–5 days) or Priority (priced by distance from Greenacre). Halal beef online orders are packed chilled, or frozen for the products sold frozen. Wagyu beef online delivery works the same way, and Priority Delivery reaches most of Sydney within 24 hours.`,
      `If you're comparing Australia meat delivery services, check who certifies the meat. Ours is certified by Halal Control Australia, and the certificate is on our [certification page](/halal-food-australia-certified-meat/).`,
    ],
  },
  '/halal-food-australia-certified-meat/': {
    keywords: [k('halal', 'C', 17, 12100), k('halal suppliers', 'C', 11, 210), k('halal food products in australia', 'T', 13, 170), k('halal products australia', 'I+C', 22, 170), k('halal wagyu beef', 'I+C', 2, 90), k('halal wagyu beef australia', 'C', 1, 20), k('australian halal beef', 'I+C', 8, 170), k('australian halal lamb', 'C', 6, 20), k('halal beef brands australia', 'T', 5, 20), k('halal beef brands', 'T', 6, 20)],
    title: 'Checking halal suppliers',
    copy: [
      `Halal means permissible under Islamic law. For meat, that covers how the animal is slaughtered and how the meat is handled afterwards. When you compare halal suppliers, ask who certifies them and whether the certificate is current. Ours is Halal Control Australia, and the certificate is shown in full on this page.`,
      `Halal food products in Australia are certified by independent bodies. Halal products Australia exports are also regulated under the Australian Government Authorised Halal Program. If you're comparing australian halal beef or australian halal lamb suppliers, or halal beef brands Australia-wide, the certifier's name and certificate number are the details to check. Most halal beef brands print them on the pack.`,
      `Our certificate covers our whole range, including our halal Wagyu beef. Customers looking for halal Wagyu beef Australia-wide can see every grade on our [Wagyu steak](/wagyu-steak/) page.`,
    ],
  },
  '/about-halal-butcher/': {
    keywords: [k('halal meat', 'C', 28, 2900), k('halal butcher near me', 'T', 19, 5400), k('halal meat near me', 'T', 13, 3600), k('halal chicken', 'C', 14, 1300), k('halal meat store near me', 'T', 11, 1300), k('halal butchers', 'C', 20, 1000), k('check halal food', 'C', 14, 880), k('australian halal beef', 'I+C', 8, 170), k('wagyu halal beef', 'C', 6, 40), k('buy halal beef', 'T', 7, 20)],
    title: 'Why customers choose us',
    copy: [
      `We started Halal Meat Depot in 2021 so families could get certified halal meat delivered, wherever they live. Many people searching for a halal butcher near me, halal meat near me or a halal meat store near me don't have one nearby. We deliver from Greenacre to every state.`,
      `Like other halal butchers, we cut beef, lamb, goat and halal chicken to order. Customers who want to buy halal beef can choose anything from mince to Wagyu halal beef. Shoppers comparing australian halal beef suppliers can see our certifier and certificate number before they order.`,
      `We think you should always be able to check halal food. That's why our certificate from Halal Control Australia is published in full on our [certification page](/halal-food-australia-certified-meat/).`,
    ],
  },
  '/contact-halal-butcher-near-me/': {
    keywords: [k('halal chicken and meat near me', 'T', 13, 20), k('halal beef nearby', 'T', 12, 20), k('halal beef butcher near me', 'T', 27, 20), k('halal chicken shop near me', 'T', 28, 90), k('halal meat shop near me', 'T', 17, 1900), k('halal meat near me', 'T', 13, 3600), k('halal butcher', 'C', 12, 1900), k('halal meat store near me', 'T', 11, 1300), k('halal butchers', 'C', 20, 1000), k('halal beef delivery', 'T', 6, 20)],
    title: 'Reaching your nearest halal butcher',
    copy: [
      `Searching for halal chicken and meat near me, halal beef nearby or a halal beef butcher near me? We're a halal butcher in Greenacre, Sydney. We don't run a shopfront, but we deliver to your door across Sydney and to every state.`,
      `If you were looking for a halal meat shop near me, a halal meat store near me or a halal chicken shop near me, you can order online instead and choose your delivery day. Halal beef delivery is free on orders over $500.`,
      `Have a question first? Send us a message on WhatsApp or use the form on this page. Like most halal butchers, we're happy to talk you through cuts, quantities and event orders. Every order of halal meat near me goes out from 43 Banksia Rd, Greenacre.`,
    ],
  },
  '/faq-check-halal-food/': {
    keywords: [k('can you get halal beef', 'I+T', 4, 20), k('best halal chicken', 'C', 16, 20), k('certified halal chicken', 'I+T', 20, 40), k('halal lamb meat', 'C', 9, 90), k('halal chicken breast', 'C', 4, 110), k('halal chicken tenders', 'C', 6, 90), k('can you get halal sausages', 'C', 6, 20), k('halal meat', 'C', 28, 2900), k('halal chicken', 'C', 14, 1300), k('halal butcher', 'C', 12, 1900)],
    title: 'Quick answers',
    copy: [
      `Can you get halal beef delivered outside Sydney? Yes, we deliver to every state. Can you get halal sausages? Yes, we sell beef, lamb and chicken sausages, all certified halal.`,
      `What makes the best halal chicken? It should be certified and fresh, and cut the way you cook. Our certified halal chicken is sold fresh and packed chilled. You can choose halal chicken breast, thigh, wings, drumsticks or halal chicken tenders, and our halal lamb meat and halal meat range carry the same certificate. As a halal butcher we publish that certificate, so you can check it before you order. See our [halal chicken range](/shop/halal-chicken-near-me/).`,
    ],
  },
  '/blog/': {
    keywords: [k('beef mince', 'I+T', 25, 5400), k('eye fillet vs scotch fillet', 'C', 28, 480), k('striploin vs sirloin', 'I+C', 28, 390), k('recipes that use beef', 'I', 28, 1600), k('best way to cook wagyu beef', 'I+C', 24, 140), k('sirloin vs scotch fillet', 'C', 8, 590), k('rib eye vs scotch fillet', 'C', 6, 320), k('ribeye vs scotch fillet', 'C', 9, 320), k('sirloin vs ribeye', 'I+C', 11, 320), k('hanger steak vs outside skirt', 'I+C', 21, 20)],
    title: 'Popular guides',
    copy: [
      `Looking for recipes that use beef? Our most-read guides cover quick beef mince dinners, slow-cooked braises and the best way to cook Wagyu beef, which is hot and fast, with the fat rendered first.`,
      `Steak questions come up most. Our comparisons answer eye fillet vs scotch fillet, sirloin vs scotch fillet and striploin vs sirloin (two names for the same cut). They also cover sirloin vs ribeye, rib eye vs scotch fillet and ribeye vs scotch fillet (again, the same cut with different names), and even hanger steak vs outside skirt. Start with [scotch fillet vs porterhouse vs eye fillet](/blog/eye-fillet-vs-scotch-fillet-porterhouse/).`,
    ],
  },
}
