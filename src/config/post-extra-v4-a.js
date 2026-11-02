// Extra Q&A sections that take each v4 post past 1,500 words (batch A), keyed by the post's slug before v4.
const qa = (title, items) => [['h2', title], ...items.flatMap(([q, a]) => [['h3', q], ['p', a]])]

export const POST_EXTRA_V4_A = {
  'halal-meat-australia-certification': qa('Halal certification questions', [
    ['Does halal certification expire?', 'Yes. Certificates are issued for a fixed period, commonly one year, and the certifier audits the business during that time. That is why you should always check the expiry date, not just the logo. Ours is published with its number and expiry date, and we update it each time it is renewed.'],
    ['Is halal meat more expensive?', 'Not necessarily. The price depends on the cut, the grade and how it is supplied, not on the halal certificate. Buying by the carton or the primal usually lowers the price per kilo whatever the certification. Compare the price per kilo rather than the pack price, because pack sizes differ.'],
    ['Can I trust a halal label on supermarket meat?', 'A label is a starting point. Look for the certifier\'s name and number, and if you are unsure, check the certifier\'s own website for the list of certified businesses. If the label names no certifier, treat it with caution and ask the retailer before you buy.'],
  ]),
  'guide-to-halal-beef-cuts': qa('Beef cut questions we hear every week', [
    ['How much steak should I buy per person?', 'Plan on 200 to 250g of boneless steak per adult, or 350 to 400g for a bone-in cut like a T-bone. Big eaters and barbecues call for more. Steaks cut thicker than 3cm are better shared and sliced.'],
    ['Should I buy steak fresh or freeze it?', 'Fresh steak cooks best within three days of arriving. If you will not use it that quickly, freeze it flat in its sealed pack on day one, then thaw it overnight in the fridge. Frozen steak keeps its quality for around three months.'],
    ['Is a more expensive cut always better?', 'No. Eye fillet is the most tender, but scotch fillet and rump have more flavour, and slow-cooking cuts like chuck and brisket beat any steak in a braise. The best cut is the one that suits your cooking method.'],
  ]),
  'goat-meat-curry-cuts-guide': qa('Goat meat questions', [
    ['Does goat meat taste gamey?', 'Fresh goat has a rich, slightly sweet flavour, not a strong or gamey one. Trimming excess fat and marinating in yoghurt, ginger and garlic for a few hours softens any strong notes. Older animals taste stronger than younger ones.'],
    ['How long does goat curry take?', 'Allow two and a half to three hours on the stove for bone-in pieces, or about 45 minutes in a pressure cooker. Boneless diced goat is a little quicker. If the meat is still chewy, simmer it longer with the lid on.'],
  ]),
  'cooking-camel-meat-buffalo-kangaroo': qa('Lean meat questions', [
    ['Why is my kangaroo tough?', 'Almost always because it is overcooked. Kangaroo has almost no fat, so it goes from medium-rare to leathery in a minute or two. Sear it fast, rest it for as long as it cooked, and slice across the grain.'],
    ['Can I swap these meats for beef in a recipe?', 'Yes, with adjustments. Buffalo substitutes for beef one for one but cooks faster. Camel suits slow cooking better than quick grilling. Kangaroo works in stir-fries, burgers and quick-seared steaks; avoid long cooking times unless it is in a sauce.'],
    ['Are these meats healthy?', 'They are lean and high in protein, with little fat. That makes them a popular choice for people who want a lighter red meat. We do not make health claims for individual products, so speak to a dietitian if you have dietary needs.'],
  ]),
  'lamb-cuts-australia-guide': qa('Lamb questions', [
    ['What is the difference between lamb and mutton?', 'Lamb is meat from a young sheep, usually under a year old. It is tender and mild. Mutton comes from an older sheep and has a stronger flavour and firmer texture, so it suits long, slow cooking.'],
    ['How much lamb do I need per person?', 'About 200g boneless, or 350 to 400g bone-in, per adult. A 2.5kg leg on the bone feeds six to eight people. For curry, allow 250g of bone-in pieces per person.'],
    ['Should I buy a whole or half lamb?', 'If you have freezer space and cook lamb often, a half lamb is good value and gives you a mix of chops, roasts, mince and curry pieces. For Eid or Aqeeqah, a whole lamb is the traditional choice. Tell us how you want it cut when you order.'],
  ]),
  'scotch-fillet-vs-porterhouse-vs-eye-fillet': qa('Steak buying questions', [
    ['What thickness is best?', 'For scotch fillet and porterhouse, 2.5 to 3cm is ideal: thick enough to get a crust and stay pink inside. Eye fillet is usually cut thicker, 4 to 5cm, because it is so lean.'],
    ['Should I buy bone-in or boneless?', 'Bone-in steaks like a cattleman\'s cutlet cook a little slower and stay juicier near the bone. Boneless steaks are easier to carve and cook evenly. For a first purchase, boneless is the simpler choice.'],
    ['How long should I rest a steak?', 'Rest it for about half the cooking time, usually five minutes. The juices settle back through the meat instead of running onto the plate. Tent the steak loosely with foil to keep it warm.'],
  ]),
  'slow-cooked-beef-cheeks': qa('Beef cheek questions', [
    ['Do I need to sear beef cheeks first?', 'Yes, it is worth the five minutes. Browning builds flavour that carries through the whole braise. Pat the cheeks dry, season them well, and sear them in a hot pan until deeply golden on both sides before they go into the slow cooker or oven.'],
    ['How do I know the cheeks are ready?', 'They should be fork-tender and wobble when you lift them. If the fork meets resistance, give them another 30 to 45 minutes. Cheeks are very forgiving, and they do not dry out in a covered braise.'],
    ['Can I make slow cooked beef cheeks ahead?', 'Absolutely. They improve overnight. Cool them in the sauce, refrigerate, lift off the fat and reheat gently. They also freeze well for up to three months.'],
  ]),
  'lamb-casserole-recipe': qa('Casserole questions', [
    ['Why is my lamb casserole tough?', 'Usually the pot was too hot or the cooking too short. Keep the liquid at a gentle simmer, not a boil, and cook until the meat is fork-tender. Lean pieces cut from the leg can stay chewy; shoulder and neck are far more forgiving.'],
    ['Should I trim the fat?', 'Trim thick pieces of surface fat, but leave a little: it melts into the sauce and adds flavour. Skim any excess from the top before serving, or chill the casserole and lift off the set fat the next day.'],
    ['What vegetables work best?', 'Carrots, potatoes, onions, celery and swede hold up to long cooking. Add softer vegetables like peas, beans or zucchini in the last 15 minutes so they keep their colour and shape.'],
  ]),
  'slow-roast-lamb-slow-cooker': qa('Slow cooker lamb questions', [
    ['Do I need to add liquid?', 'A little. Lamb releases plenty of juice as it cooks, so about a cup of stock or water is enough. Too much liquid boils the meat instead of braising it and dilutes the flavour of the gravy.'],
    ['Can I cook lamb from frozen in a slow cooker?', 'It is not recommended. A frozen roast spends too long in the temperature range where bacteria multiply. Thaw the lamb fully in the fridge first, which takes a day or two for a large piece.'],
    ['How do I crisp the outside?', 'Lift the lamb into a roasting tray when it is tender, brush it with a little of the cooking juices and place it under a hot grill, or in a 230°C oven, for ten minutes until the surface browns.'],
  ]),
  'chicken-maryland-recipes': qa('Chicken maryland questions', [
    ['How long do I cook a chicken maryland?', 'About 40 to 45 minutes at 200°C in the oven, or 22 to 25 minutes in an air fryer at 190°C. The chicken is done when the thickest part of the thigh reaches 75°C and the juices run clear.'],
    ['Do I need to remove the skin?', 'No. Skin keeps the meat moist and crisps up beautifully. If you prefer less fat, remove the skin after cooking, not before, because the meat stays juicier under it.'],
    ['What is the best way to get crispy skin?', 'Pat the chicken dry, rub it with oil and salt, and start it on a high heat. Do not crowd the tray, because steam makes the skin soggy. A teaspoon of baking powder in the rub also helps the skin crisp.'],
  ]),
  'sirloin-vs-porterhouse-vs-rump': qa('Sirloin, porterhouse and rump questions', [
    ['Is T-bone the same as porterhouse?', 'A T-bone includes a piece of fillet on one side of the bone and striploin on the other. A porterhouse is cut from the same area but with a larger fillet portion. In Australia, "porterhouse" usually means the boneless striploin.'],
    ['How do I cook rump so it is not tough?', 'Do not cook it past medium, rest it well and slice it thinly across the grain. Marinating for an hour or two in oil, garlic and a little acid also helps.'],
    ['What is the best steak for a budget?', 'Rump gives the best flavour for the price, and porterhouse is a close second. Both reward careful cooking and slicing. Buying a whole piece and cutting your own steaks is cheaper again.'],
  ]),
  '30-minute-beef-mince-recipes': qa('Beef mince questions', [
    ['How do I stop mince going grey and watery?', 'Use a hot pan, add the mince in small batches and leave it alone for a minute before stirring. That lets it brown instead of steam. Drain any excess liquid before adding the sauce.'],
    ['Is it safe to eat mince medium-rare?', 'No. Mince should always be cooked through to 75°C, because bacteria on the surface of the meat get mixed through during mincing. Cook burgers and meatballs until they are no longer pink in the centre.'],
    ['How long does cooked mince keep?', 'Three days in the fridge, or up to three months in the freezer. Cool it quickly, store it in shallow containers and reheat it until steaming hot.'],
  ]),
}
