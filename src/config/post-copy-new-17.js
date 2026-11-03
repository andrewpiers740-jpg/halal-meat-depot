// New v4 posts, batch N17: is duck meat red meat, goat vs mutton, buffalo meat.
const qa = (title, items) => [['h2', title], ...items.flatMap(([q, a]) => [['h3', q], ['p', a]])]
const sec = (title, paras) => [['h2', title], ...paras.map((p) => (Array.isArray(p) ? ['ul', p] : ['p', p]))]

export const POST_COPY_NEW_17 = {
  'is-duck-meat-red-meat': {
    title: 'Is Duck Meat Red Meat? A Simple Guide to Duck',
    seoTitle: 'Is Duck Meat Red Meat? A Simple Guide to Duck',
    excerpt: 'Is duck meat red meat? A simple guide to what duck is, how it tastes and cooks, the best cuts, a marinade, and where to buy halal duck meat online.',
    body: [
      ['p', 'Is duck meat red meat? It is a question that surprises many cooks, because duck is a bird, and birds are usually grouped with white meat. The answer depends on whether you ask a scientist, a nutritionist or a chef. This guide explains how duck is classified, how it differs from chicken, how it tastes and cooks, and how to buy halal duck meat with confidence.'],
      ['h2', 'Is duck meat a red meat?'],
      ['p', 'Is duck meat a red meat? Scientifically, red and white meat are distinguished by the amount of myoglobin in the muscle, the protein that stores oxygen and gives meat its colour. Duck breast and leg are rich in myoglobin because ducks fly and swim, so their muscles work hard. That is why the meat is dark, similar to beef. Many cooks and food authorities therefore treat duck as a red meat in the kitchen, although nutritional guidelines often classify all poultry together as white meat. In cooking terms, duck behaves like a red meat: the breast can be served pink, and it has a rich, deep flavour. If you follow dietary advice that distinguishes red and white meat, check with a dietitian, as we make no health claims.'],
      ['h2', 'What does duck taste like?'],
      ['p', 'Duck has a rich, savoury flavour, between chicken and beef, with a layer of fat under the skin that bastes the meat as it cooks. The leg is dark and succulent, and the breast is meaty and tender when cooked medium. Compared with chicken, duck is richer, fattier and more intense. The rendered fat is prized for roasting potatoes and frying.'],
      ['h2', 'Buying duck'],
      ['p', 'Duck is available as whole birds, breasts, legs, mince, livers, fat and bones. If you search for duck meat near me, our [duck meat near me](/product/duck-meat-near-me-legs/) page lists duck legs, and the broader [duck meat](/shop/duck-meat/) category lists the whole range. You can buy duck meat online, buy duck meat, and buy duck meat near me with the same order: the [buy duck meat online](/product/whole-duck-size-20-23/), [buy duck meat](/product/whole-duck-size-20-23/) and [buy duck meat near me](/product/whole-duck-size-20-23/) results lead to our whole duck, 2.2kg. A [whole duck](/product/whole-duck-size-20-23/) is the best duck meat for roasting, and the [best duck meat](/product/whole-duck-size-20-23/) for a quick dinner is the breast: look for a [duck breast near me](/product/duck-breast-near-me-fillets/) fillet pack. Customers also ask about buying duck meat, and [buying duck meat](/product/duck-for-sale-whole-wimmera-gold-corn-fed/) is easy online. The duck meat cost per kilo is shown on each page: see [duck meat cost](/product/duck-for-sale-whole-wimmera-gold-corn-fed/). We offer duck meat delivery across Sydney and Australia-wide: see [duck meat delivery](/product/duck-for-sale-whole-wimmera-gold-corn-fed/). And [minced duck meat](/product/minced-duck-meat/) makes excellent meatballs and dumplings. All our duck is certified halal by Halal Control Australia.'],
      ['h2', 'A simple duck meat marinade'],
      ['p', 'A good duck meat marinade is simple: soy sauce, honey, garlic, ginger, five-spice and a splash of orange juice. Score the skin, rub the marinade into the meat and refrigerate for at least four hours or overnight. Pat dry before cooking. For breast, start skin-side down in a cold pan and cook slowly to render the fat, then finish in a hot oven. For legs, roast at 160°C for 2 hours until the meat falls off the bone. Check labels on bought sauces for alcohol.'],
      ...qa('Duck questions', [
        ['Is duck meat healthy?', 'Duck is a source of protein and iron, but it is also higher in fat than chicken. We make no health claims; speak to a dietitian for advice on your own diet.'],
        ['Can duck be served pink?', 'Duck breast can be cooked medium, 55 to 60°C. Legs, mince and whole birds should be cooked through to 75°C.'],
        ['How do I crisp duck skin?', 'Dry it well, score it, start in a cold pan and render slowly, or roast on a rack.'],
      ]),
    ],
    add: sec('Cooking duck: cuts, methods and serving', [
      'Duck breast is the quickest cut. Score the skin in a crosshatch pattern without cutting into the meat, season with salt, and place skin-side down in a cold, dry pan. Heat gently for 10 to 12 minutes, pouring off the rendered fat, until the skin is golden and crisp. Turn, cook for 2 to 3 minutes, and finish in a 200°C oven for 4 to 5 minutes. Rest for 5 minutes and slice. Serve with a fruit sauce, such as orange or cherry.',
      'Duck legs suit slow cooking. Season with salt, thyme and garlic, and roast at 150°C for 2.5 hours, or braise in stock for 2 hours. For confit, cook the legs slowly in duck fat until tender, then store in the fat. Finish under a hot grill to crisp the skin. Serve with lentils, potatoes or a salad of bitter leaves. The meat falls off the bone and is rich and flavoursome.',
      'A whole duck takes about 20 minutes per 500g plus 20 minutes at 180°C. Prick the skin, pour boiling water over it to tighten, dry thoroughly and leave uncovered in the fridge overnight for crisp skin. Roast on a rack so the fat drains away, and save it for roasting potatoes. Rest for 20 minutes before carving. Serve with roast vegetables, red cabbage and a tart sauce.',
      'Duck mince is a surprising treat. Use it in burgers, meatballs, dumplings and pasta sauces. Because it is richer than beef, mix it half and half with lean mince, or serve with something acidic. Add herbs, garlic and a little breadcrumb. Cook until no pink remains, to 75°C. Duck mince freezes well and cooks quickly, which makes it a useful option for weeknights.',
      'Pair duck with fruit, spice and acidity. Orange, cherry, plum, apple, ginger, star anise, five-spice, thyme and balsamic vinegar all work beautifully. Asian-style duck with pancakes, cucumber and hoisin is a feast. A salad of duck, citrus and walnuts is light and elegant. Serve with rice, potatoes or noodles, and a green vegetable.',
      'Store raw duck in the coldest part of the fridge and use within two days, or freeze. Thaw in the fridge overnight. Wash your hands and boards after handling raw duck, and cook to a safe temperature. Cooked duck keeps for three days in the fridge. Duck fat keeps for months in a jar in the fridge. Order from us with confidence: all duck is certified halal and delivered chilled.',
    ]),
  },

  'difference-between-goat-meat-and-mutton': {
    title: 'Difference Between Goat Meat and Mutton: A Complete Guide',
    seoTitle: 'Difference Between Goat Meat and Mutton: Complete Guide',
    excerpt: 'The difference between goat meat and mutton explained: animal, taste, texture, cooking methods, price and where to buy halal goat and mutton online.',
    body: [
      ['p', 'The difference between goat meat and mutton is one of the most common sources of confusion in the kitchen, especially because the word mutton means different things in different countries. In Australia, mutton is meat from an older sheep. In parts of South Asia, mutton on a menu usually means goat. This guide clears up the confusion, compares taste, texture and cooking, and helps you choose the right meat for your recipe.'],
      ['h2', 'What is the difference?'],
      ['p', 'Goat meat comes from goats; mutton, in the Western sense, comes from mature sheep, generally over a year or two old. Lamb is meat from young sheep. Goat is leaner than mutton, with a sweeter, more mineral taste and less fat. Mutton has more fat, a stronger, more pronounced sheepy flavour and a firmer texture. Both need slow cooking to become tender, and both are loved in curries, stews and roasts. In South Asia and the Caribbean, mutton is often a name for goat, which is why recipes can seem contradictory. If a recipe says mutton, check the context. Our guide to [goat meat vs lamb meat](/blog/goat-meat-vs-lamb-meat/) covers lamb in more detail.'],
      ['h2', 'Taste and texture compared'],
      ['p', 'Goat has a distinctive, slightly sweet and earthy flavour, with lean meat that can be dry if overcooked. Mutton has a stronger flavour and more fat, which melts during slow cooking and enriches the dish. Lamb, by comparison, is mild and tender. Lamb vs goat meat is a choice between mild and bold. Some people use the phrases goat meat vs lamb, lamb goat meat and goat meat lamb for the same comparison, and [lamb vs goat meat](/product/halal-goat-meat-full-plate-ribs/) searches lead to our goat range. A [goat meat lamb](/product/goat-price-half-carcass/) comparison is easy to try with a pack of each. Compare [goat meat vs lamb](/product/goat-leg-bone-in/) and [lamb goat meat](/product/goat-leg-bone-in/) legs side by side: goat is leaner and darker.'],
      ['h2', 'Where to buy goat and mutton'],
      ['p', 'Our [mutton meat](/product/whole-mutton-meat-carcass/) is sold as a whole carcass, cut to your instructions. For goat, you can search for goats meat: [goats meat](/product/goats-meat-rolled-loin/) in a rolled loin, meat goat for sale: [meat goat for sale](/product/meat-goat-for-sale-rump/) in rump, and goat meat mutton: [goat meat mutton](/product/goat-price-half-carcass/) in half carcasses. People ask where to buy goat meat near me, where can i buy goat meat near me and buy goat meat near me. Our answers: [where to buy goat meat near me](/product/where-to-buy-goat-meat-near-me-shoulder-butterflied/), [where can i buy goat meat near me](/blog/goat-curry-meat-cuts-guide/) and [buy goat meat near me](/product/buy-goat-meat-near-me-leg-butterflied/). If you want [fresh goat meat near me](/product/fresh-goat-meat-near-me-mini-leg-boned-rolled/), order a boned and rolled shoulder, and visit the [goat meat near me](/shop/goat-meat-near-me/) page for the full range. And for lamb, browse [lambs for sale](/shop/lambs-for-sale/).'],
      ['h2', 'Cooking each meat'],
      ['ul', [
        'Goat: marinate in yoghurt or lemon, cook low and slow with plenty of moisture; curries, stews and roasts.',
        'Mutton: slow roast or braise for 3 to 4 hours; stews, curries, pies and smoked shoulder.',
        'Lamb: roast, grill or braise; quicker, milder and more tender.',
      ]],
      ['p', 'A smoked mutton shoulder is a barbecue favourite: smoke at 120°C for 6 to 8 hours until the meat pulls apart. Goat can be smoked the same way. Both benefit from a bold rub and a long, slow cook.'],
      ...qa('Goat and mutton questions', [
        ['Is mutton the same as goat?', 'Not in Australia, where mutton is older sheep. In South Asia it often means goat.'],
        ['Which is leaner?', 'Goat is leaner than mutton. Lamb is somewhere in between.'],
        ['Can I swap one for the other?', 'Yes, with adjustments to cooking time. Goat needs a little more moisture; mutton needs a little more time.'],
      ]),
    ],
    add: sec('Choosing between goat, mutton and lamb', [
      'Choose goat for curries and spiced dishes where its bold flavour shines, and for health-conscious cooking, as it is leaner. Choose mutton for slow roasts, smoked shoulders and rich stews, where the fat adds flavour. Choose lamb for quick dinners, roasts and dishes where a mild flavour is wanted. There is no best meat: each has strengths, and many cooks keep all three in the freezer.',
      'Price also matters. Goat and mutton are often cheaper than lamb for the same weight of bone-in meat, and a whole carcass is especially good value. If you cook for a large family or community, buying half or a whole goat or mutton carcass saves money and gives a range of cuts. We cut carcasses to your instructions, whether for curry pieces, roasts, chops or a mix.',
      'Cuts from each animal are similar. The leg, shoulder, ribs, shanks, neck and loin all appear, though the sizes differ. Goat legs are smaller than mutton legs, and mutton shoulder is heavier. Bone-in pieces are best for curry, as the bone adds flavour to the sauce. For a roast, choose a leg or shoulder, and for a quick fry, choose chops or boneless pieces.',
      'Whichever you choose, tenderise with time and moisture. Marinades with yoghurt, lemon or vinegar help. Cook covered, at a low temperature, until the meat pulls away from the bone. Check the liquid level and top up with stock or water. Season generously, and finish with fresh herbs. These principles apply to all three meats.',
      'Many cultures have proud traditions around goat and mutton. In the Middle East, mansaf and mandi are made with lamb or goat. In India and Pakistan, mutton or goat karahi and biryani are festive dishes. In the Caribbean, curry goat is a staple. In Australia, a mutton roast was once the Sunday dinner. Exploring these dishes is a way to connect with food history.',
      'All our meat is certified halal by Halal Control Australia, and delivered chilled across Sydney and Australia-wide. Order several days ahead for events, tell us how you want the meat cut, and we will help. Store raw meat on the bottom shelf of the fridge, cook within two days or freeze, and wash your hands and boards after handling.',
    ]),
  },

  'buffalo-meat': {
    title: 'Buffalo Meat: A Complete Guide to Taste, Cuts and Cooking',
    seoTitle: 'Buffalo Meat: A Complete Guide to Taste and Cuts',
    excerpt: 'Buffalo meat explained: what water buffalo meat tastes like, the best cuts, how to cook it, can you eat water buffalo meat, and where to buy it online.',
    body: [
      ['p', 'Buffalo meat is a lean, mild and slightly sweet red meat that is gaining popularity in Australia. Water buffalo have been part of Australian farming for a long time, and today their meat is prized by cooks who want something leaner than beef with a similar taste. This guide explains what buffalo meat is, how it tastes, the best cuts, how to cook it and where to buy it.'],
      ['h2', 'What is buffalo meat?'],
      ['p', 'Buffalo meat, also called water buffalo meat, comes from water buffalo, a large bovine animal. Many shoppers ask: can you eat water buffalo meat? Yes. Water buffalo are bovines like cattle and are widely eaten across Asia, the Middle East and Europe. It looks like beef, but is darker, leaner and slightly sweeter, with less visible fat. Buffalo has a fine texture and a clean flavour. Shoppers often search for Australian buffalo meat: water buffalo have been farmed in northern Australia for many years, and you can check the product page for details of any cut.'],
      ['h2', 'Buying buffalo meat'],
      ['p', 'Our buffalo is sold frozen in a wide range of cuts. Customers search for frozen buffalo meat, and buffalo meat near me; the [buffalo meat near me](/shop/buffalo-meat-near-me/) page lists the whole range. People also search for fresh buffalo meat and fresh buffalo meat near me: our buffalo is sold frozen to preserve quality, and you can see the [fresh buffalo meat](/product/buffalo-steak-price-porterhouse/) and [fresh buffalo meat near me](/product/buffalo-steak-price-porterhouse/) results lead to our porterhouse steaks. Specific searches include [buffalo meat for sale near me](/product/buffalo-meat-for-sale-near-me-osso-buco/), which leads to buffalo osso buco; [buffalo steak near me](/product/buffalo-steak-price-porterhouse/); [buffalo steaks for sale](/product/buffalo-steaks-for-sale-scotch-fillet/) in scotch fillet; [buffalo t bone steak](/product/buffalo-t-bone-steak/); [buffalo meat australia](/product/buffalo-meat-australia-steak-rib-eye/) in rib eye; and the general [buffalo steak](/shop/buffalo-meat-near-me/) category. For mince, look for [minced buffalo meat](/product/minced-buffalo-meat-mince/). The cost of buffalo meat is shown on each page: see [cost of buffalo meat](/product/buffalo-steak-price-porterhouse/) for porterhouse.'],
      ['h2', 'Buffalo cuts'],
      ['ul', [
        'Steaks: porterhouse, scotch fillet, rib eye and T-bone, for quick cooking.',
        'Tomahawk: a thick, bone-in rib steak for sharing.',
        'Ribs: thin-cut asado ribs, for the grill or slow cooking.',
        'Diced: boneless pieces for curries and stews.',
        'Mince: lean, for burgers, bolognese and meatballs.',
        'Osso buco: cross-cut shanks for slow braising.',
      ]],
      ['h2', 'Cooking buffalo meat'],
      ['p', 'Buffalo is lean, so cook it with care. Steaks are best at medium-rare, 54 to 57°C, seared in a hot pan and rested. Overcooking dries them out. Mince, diced pieces and osso buco suit slow, moist cooking, as in a stew or curry. Always rest the meat. If you have cooked beef, you can cook buffalo: just reduce the time slightly. See our guide to cooking buffalo meat for recipes.'],
      ...qa('Buffalo questions', [
        ['Is buffalo meat gamey?', 'No. It is mild and slightly sweet, similar to lean beef.'],
        ['Is buffalo meat tough?', 'Not if cooked correctly. Steaks must not be overcooked; tougher cuts need slow cooking.'],
        ['Is buffalo meat halal?', 'Water buffalo is a bovine, so it falls in the same category as cattle when slaughtered correctly. Ours is certified by Halal Control Australia.'],
      ]),
    ],
    add: sec('Buffalo meat in the kitchen: flavours, pairings and planning', [
      'Buffalo takes to the same seasonings as beef. Salt, pepper, garlic, rosemary and thyme suit steaks. Cumin, coriander, paprika and chilli suit mince and burgers. Soy, ginger and garlic suit stir-fries. Its mild flavour is a good canvas. Because it is lean, a little oil or butter in the pan helps. Marinate steaks for 30 minutes in oil, garlic and herbs for extra moisture.',
      'For a steak dinner, buffalo porterhouse or scotch fillet is hard to beat. Season, sear for 2 to 3 minutes a side in a very hot pan, baste with butter and herbs, and rest for 5 minutes. Serve with roasted vegetables, a green salad, or a mushroom sauce. A buffalo tomahawk is a sharing steak: roast at 120°C to 50°C, then sear hard on both sides. Slice and serve.',
      'Buffalo mince makes excellent burgers. Add grated onion, a spoon of oil and an egg to keep the patties moist. Shape lightly, and cook for 4 minutes a side. Serve in toasted buns with salad and your favourite sauce. Buffalo bolognese, chilli and meatballs are other options. The mince is lean, so add moisture with tomato, stock or vegetables.',
      'Slow-cooked buffalo is rich and tender. Osso buco braised in tomato and stock for 2.5 hours falls from the bone. Diced buffalo makes a wonderful curry or goulash. Asado ribs can be braised or barbecued. Use the same methods as beef, with plenty of liquid, and cook until fork-tender.',
      'Buffalo is a good choice for people who want variety. Rotate it with beef, lamb, goat and chicken through the week. It is available in the same sizes as beef, and prices are comparable. Order a mixed box of steaks, mince and diced, and try different dishes. Store frozen until needed, thaw in the fridge, and cook within two days.',
      'All our buffalo is certified halal by Halal Control Australia, sold frozen and delivered across Sydney and Australia-wide. Browse the range on our buffalo category page, and ask us for help choosing cuts. Wash your hands and boards after handling raw meat, and enjoy a lean, tasty alternative to beef.',
    ]),
  },
}
