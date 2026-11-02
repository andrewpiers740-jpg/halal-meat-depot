// Extra Q&A sections (batch B), keyed by the post's slug before v4.
const qa = (title, items) => [['h2', title], ...items.flatMap(([q, a]) => [['h3', q], ['p', a]])]

export const POST_EXTRA_V4_B = {
  'beef-bolar-blade-roast-recipe': qa('Pot roast questions', [
    ['Should the roast be covered?', 'Yes. Cover the pot or tray tightly with a lid or foil so the steam stays in and the meat braises. Uncover it for the last 30 minutes if you want the top to brown and the sauce to reduce.'],
    ['How long per kilo?', 'Allow about 50 minutes per kilo at 160°C, plus a further 30 minutes. A 1.5kg bolar blade roast takes around three hours in the oven or eight hours on low in a slow cooker. It is done when a fork twists in easily.'],
    ['Can I add vegetables from the start?', 'Root vegetables like carrots, potatoes and parsnips can go in from the start if you cut them in big chunks. Add softer vegetables later. Remove the roast before thickening the gravy so it does not overcook.'],
  ]),
  'beef-oyster-blade-steak-recipe': qa('Oyster blade questions', [
    ['Why is there a line of gristle?', 'A seam of connective tissue runs through the middle of the muscle. It is chewy no matter how long you cook it quickly, so butchers cut it out, which leaves two flat iron steaks. If your piece still has it, trim it with a sharp knife.'],
    ['How do I know when flat iron is done?', 'Medium-rare is 54 to 57°C in the centre. Because the steak is thin, it cooks in three to four minutes a side over high heat. Rest it, then slice thinly across the grain.'],
    ['Can I marinate flat iron?', 'Yes, and it takes a marinade well. An hour in soy, garlic and lime juice adds flavour without making the meat mushy. Pat it dry before cooking, so it browns instead of steaming.'],
  ]),
  'best-beef-cut-for-roasting': qa('Roast beef questions', [
    ['What temperature is best for roasting beef?', 'Start at 220°C for 15 minutes to brown the outside, then drop to 160°C. Use a thermometer: 52°C in the centre is rare, 57°C medium-rare and 63°C medium. The temperature rises by about 5°C while the roast rests.'],
    ['Should I cover the roast with foil?', 'Not while it cooks, because foil traps steam and softens the crust. Cover it loosely with foil only while it rests, for 15 to 20 minutes, before you carve.'],
    ['How do I carve roast beef?', 'Use a sharp, long knife and slice across the grain, about 5mm thick. Carving with the grain makes the meat chewy. Let the roast rest first, so the juices stay in the slices.'],
  ]),
  'best-bones-for-bone-broth': qa('Bone broth questions', [
    ['How long should I simmer bone broth?', 'Beef bones need 12 to 24 hours, chicken frames 4 to 8 hours. A pressure cooker cuts this to about two hours. Longer is not always better: after a day the flavour turns flat.'],
    ['Why has my broth not set?', 'A broth that does not gel usually has too much water or too few collagen-rich bones. Use knuckle, oxtail or chicken feet, and just cover the bones with water. It will still taste good even if it stays liquid.'],
    ['How do I store bone broth?', 'Refrigerate it for up to five days, or freeze it in portions for three months. Ice-cube trays make handy small portions for sauces. Boil it for a few minutes after thawing.'],
  ]),
  'gravy-beef-vs-chuck': qa('Slow-cooking questions', [
    ['Can I use gravy beef in a pie?', 'Yes, it is one of the best pie fillings. Cook it slowly with onion and stock until tender, thicken the sauce, and cool it completely before it goes into pastry. Hot filling makes the base soggy.'],
    ['Why is my stew meat still tough?', 'It needs more time. Slow-cooking cuts get tougher before they get tender, and if you stop too early, the connective tissue has not melted. Keep the heat low and test again after another 30 minutes.'],
    ['Do I flour the meat first?', 'You can. A light dusting helps browning and thickens the sauce. Shake off the excess, brown the meat in batches, and do not crowd the pan.'],
  ]),
  'best-beef-for-stir-fry': qa('Stir-fry questions', [
    ['How thin should I slice the beef?', 'About 3 to 5mm. Partly freezing the beef for 30 minutes makes it firm enough to slice thinly. Cut across the grain, not with it, to shorten the muscle fibres.'],
    ['Why does my stir-fry beef turn grey and tough?', 'The pan was too crowded or not hot enough. Cook in small batches over the highest heat you have, for 60 to 90 seconds. Return all the beef to the wok only at the end.'],
    ['Does bicarb soda really tenderise beef?', 'A pinch does. Toss the sliced beef with a little bicarbonate of soda for 15 minutes, rinse and pat dry. This is how restaurants get velvety stir-fry beef, but use only a little, or the texture turns mushy.'],
  ]),
  'best-temperature-to-smoke-beef-brisket': qa('Brisket questions', [
    ['What is the stall?', 'Around 65 to 75°C, the brisket\'s temperature stops rising for a few hours as moisture evaporating from the surface cools it. Do not raise the heat. Wait it out, or wrap the brisket in butcher paper to push through.'],
    ['Should I wrap the brisket?', 'Wrapping in butcher paper or foil speeds up the cook and keeps the meat moist, but softens the bark. Many cooks wrap after the bark has set, at about 70°C, then continue to 93–96°C.'],
    ['How long should brisket rest?', 'At least one hour, and up to four in an insulated box wrapped in towels. Resting lets the juices redistribute and makes slicing easier.'],
  ]),
  'thai-beef-salad': qa('Thai beef salad questions', [
    ['Can I make the dressing ahead?', 'Yes. The dressing keeps in the fridge for up to three days. Shake it before using. Dress the salad only at the last minute, or the herbs and lettuce wilt.'],
    ['How do I stop the salad being too salty?', 'Balance the fish sauce with palm sugar and lime juice, and taste as you go. Use less fish sauce if you serve the salad with rice. Remember the beef itself is seasoned.'],
    ['What should I serve with it?', 'Jasmine rice, sticky rice or a simple noodle dish. For a larger meal, add a coconut soup or stir-fried vegetables. Serve the salad at room temperature, with the beef still slightly warm.'],
  ]),
  'beef-massaman-curry': qa('Massaman questions', [
    ['Can I use ready-made massaman paste?', 'Yes. A good-quality paste saves a lot of time. Fry it in the thick top layer of coconut cream until fragrant, then add the beef and liquid. Check the label for shrimp paste and fish sauce if you have guests with allergies.'],
    ['Why is my curry oily?', 'Coconut cream separates and releases oil as it cooks; that is normal in a good massaman. Skim some off if you prefer, or stir in a splash of water.'],
    ['Can I make it without peanuts?', 'Yes. Swap the peanuts for toasted cashews, or leave them out. Check any peanut-free requirements carefully, as many pastes contain nuts.'],
  ]),
  'beef-rendang-recipe': qa('Rendang questions', [
    ['Why does rendang take so long?', 'The coconut milk needs to cook down until its oil separates and fries the spice paste and beef. Rushing it gives a soupy curry. Stir more often at the end, when the sauce thickens and can catch on the pan.'],
    ['What is kerisik?', 'Kerisik is toasted grated coconut, ground to a paste. It gives rendang its nutty depth and helps thicken the sauce. You can toast dried desiccated coconut in a dry pan until golden, then pound or blend it.'],
    ['How long does rendang keep?', 'Because it is cooked until dry, rendang keeps well: about a week in the fridge, and its flavour deepens. It also freezes well for up to three months.'],
  ]),
  'beef-korma': qa('Korma questions', [
    ['How do I stop the yoghurt curdling?', 'Use full-fat yoghurt at room temperature, whisk it smooth and stir it in off the heat, then return the pot to a gentle simmer. Never let a yoghurt-based curry boil hard.'],
    ['Can I make korma without nuts?', 'Yes. Use a spoonful of coconut cream or evaporated milk in place of the nut paste. The sauce will be a little thinner but still creamy.'],
    ['Is korma spicy?', 'No, it is the mildest of the popular curries. If you like more heat, add a green chilli or a pinch of cayenne at the end, so the children\'s portion stays mild.'],
  ]),
  'beef-vindaloo': qa('Vindaloo questions', [
    ['Is vindaloo always very hot?', 'Not in Goa, where the vinegar and garlic matter as much as the chilli. Use mild Kashmiri chillies for colour with little heat, and add hot chillies only if you want a fierce curry.'],
    ['Which vinegar should I use?', 'A mild white or coconut vinegar is traditional. Avoid anything with alcohol or wine in it, as with all our recipes. Malt vinegar works in a pinch.'],
    ['Can I make vindaloo in a pressure cooker?', 'Yes. Cook the marinated beef on high pressure for 35 minutes, release the pressure naturally, then simmer the sauce uncovered for a few minutes to thicken it.'],
  ]),
  'beef-madras': qa('Madras questions', [
    ['What is the difference between madras and vindaloo?', 'Madras is hot, deep red and a little tangy from tomato and tamarind. Vindaloo is more sour, with a heavy vinegar and garlic base. Both can be fiery, but madras is usually smoother.'],
    ['How do I make madras less hot?', 'Use fewer dried chillies and remove their seeds, then balance the heat with a spoonful of yoghurt, coconut cream or a little sugar. You can always add heat at the table with chilli flakes.'],
    ['Can I use the same paste for lamb?', 'Yes, madras suits lamb and chicken too. Lamb shoulder cooks in about the same time as beef chuck. Chicken thighs need only 30 to 40 minutes.'],
  ]),
  'beef-biryani': qa('Biryani questions', [
    ['How do I stop biryani rice going mushy?', 'Soak the basmati for 30 minutes, then boil it in well-salted water until it is only 70% cooked. It finishes steaming on top of the meat, so it should still have a firm bite when you drain it.'],
    ['What does the saffron do?', 'Soak a pinch of saffron in warm milk and drizzle it over the top layer of rice. It gives the biryani its golden streaks and a delicate floral aroma. A little goes a long way.'],
    ['How long does the dum cook take?', 'Seal the pot with foil or a dough rim and cook it over a very low heat for 25 to 30 minutes. Then let it stand for ten minutes before opening it.'],
  ]),
  'beef-skirt': qa('Skirt steak questions', [
    ['Is skirt steak tough?', 'It can be if it is overcooked or sliced with the grain. Skirt has a coarse, loose texture, so cook it fast over a very high heat to medium-rare, then slice thinly across the grain.'],
    ['What is the difference between inside and outside skirt?', 'Outside skirt is thicker and more tender but harder to find. Inside skirt is thinner and chewier, with a strong flavour. Either way, trim the silverskin and marinate before cooking.'],
    ['Can I cook skirt in a pan?', 'Yes. A very hot cast-iron pan works well. Cut long pieces in half so they fit, and cook for two minutes a side. Open a window, because it smokes.'],
  ]),
  'beef-onglet-steak': qa('Onglet questions', [
    ['How do I trim an onglet?', 'Remove the tough membrane running down the centre, which splits the muscle into two lobes. Cut out any silverskin on the surface. A sharp, thin knife makes this easy.'],
    ['What temperature should I cook onglet to?', 'Rare to medium-rare, 50 to 55°C. It has a loose texture that turns livery if overcooked. Rest it for five minutes before slicing.'],
    ['What sauces suit onglet?', 'A shallot and red-wine-free pan sauce made with stock and a splash of balsamic vinegar, or a green peppercorn sauce. Chimichurri also works well, with its parsley and garlic.'],
  ]),
  'beef-bavette': qa('Bavette questions', [
    ['How do I slice bavette?', 'Identify the direction of the grain: the long fibres run along the length of the steak. Cut across them at a slight angle, in thin slices. This makes each bite tender.'],
    ['Does bavette need a marinade?', 'It does not need one, but it takes one well. Thirty minutes in oil, garlic and herbs is enough. Do not add acid for more than a couple of hours, or the surface turns mushy.'],
    ['What is steak frites?', 'The French bistro classic: a pan-seared steak with a pile of thin fries and a little butter or sauce on top. Bavette is one of the traditional cuts used.'],
  ]),
  'beef-schnitzel': qa('Schnitzel questions', [
    ['Why does my crumb fall off?', 'The meat was wet or the crumb pressed on too lightly. Pat the beef dry, dust it with flour, dip it in beaten egg, then press the breadcrumbs on firmly. Rest the crumbed schnitzels in the fridge for 15 minutes before frying.'],
    ['What oil temperature do I need?', 'Around 170 to 180°C. Too cool and the crumb absorbs oil; too hot and it burns before the meat cooks. A breadcrumb dropped in should sizzle at once.'],
    ['Can I bake schnitzel instead?', 'Yes. Spray the crumbed schnitzels with oil and bake at 220°C for 12 to 15 minutes, turning halfway. The crumb is less crisp than fried, but lighter.'],
  ]),
  'satay-beef': qa('Satay questions', [
    ['Do I soak the bamboo skewers?', 'Yes, for at least 30 minutes, so they do not burn on the grill. Wrapping the exposed ends in foil also helps.'],
    ['Is satay sauce the same as peanut sauce?', 'Satay sauce is a type of peanut sauce, usually with chilli, lemongrass, tamarind and coconut milk. Simple peanut sauces may have only peanut butter, soy and lime.'],
    ['Can I make the sauce ahead?', 'Yes. It keeps in the fridge for five days and thickens as it chills. Warm it with a splash of water before serving.'],
  ]),
  'shaking-beef': qa('Shaking beef questions', [
    ['Why is it called shaking beef?', 'In Vietnamese, bò lúc lắc means "shaking beef", after the way cooks shake the wok to turn the cubes as they sear. Shake the pan or toss the cubes every 20 to 30 seconds.'],
    ['How do I get a good sear?', 'Use a very hot wok or heavy pan, a high-smoke-point oil and small batches. Do not move the beef for the first 30 seconds. Overcrowding the pan drops the temperature and the beef stews.'],
    ['What is the dipping sauce?', 'A simple mix of lime juice, salt and black pepper, called muối tiêu chanh. It is served on the side for dipping, and it lifts the richness of the beef.'],
  ]),
  'rainbow-beef': qa('Rainbow beef questions', [
    ['Why is it called rainbow beef?', 'Because of the colourful mix of vegetables, usually red and green capsicum, carrot, snow peas and corn. Cut them to the same size so they cook at the same speed.'],
    ['How do I keep the vegetables crisp?', 'Cook them separately from the beef, over high heat, for only a minute or two. Combine everything with the sauce at the end, and serve immediately.'],
    ['Can I use frozen vegetables?', 'You can, but they release water and make the stir-fry watery. Fresh vegetables give a better texture. If you use frozen, add them directly to a very hot pan without thawing.'],
  ]),
  'beef-and-black-bean': qa('Black bean questions', [
    ['Do I rinse the fermented black beans?', 'Give them a quick rinse and a rough chop, which removes some of the salt. Then mash them with garlic and ginger before adding them to the wok, to release their flavour.'],
    ['How do I make the sauce glossy?', 'Mix a teaspoon of cornflour with cold water and stir it in during the last minute. The sauce thickens and clings to the beef. Add the slurry slowly so it does not go lumpy.'],
    ['Is the sauce very salty?', 'Fermented black beans are salty, so go lightly on added soy sauce and taste before seasoning more. A pinch of sugar rounds out the saltiness.'],
  ]),
  'beef-fajitas': qa('Fajita questions', [
    ['How long should I marinate the steak?', 'Two to four hours is ideal. Overnight is fine for a mild marinade, but a very acidic one can make the surface mushy. Pat the steak dry before cooking.'],
    ['What do I serve with fajitas?', 'Warm tortillas, sour cream, guacamole, salsa, grated cheese and lime wedges. A pot of rice and beans makes it a full meal. Let everyone build their own.'],
    ['Can I cook fajitas on the barbecue?', 'Yes, and it adds a smoky flavour. Grill the steak and the sliced capsicum and onion on a hot flat plate, or on skewers. Rest the meat before slicing.'],
  ]),
  'beef-skewers': qa('Skewer questions', [
    ['How do I stop skewers sticking to the grill?', 'Heat the grill well, then oil the grates (not the skewers) with a cloth dipped in oil. Do not turn the skewers until they release naturally.'],
    ['How long should I marinate beef for skewers?', 'Between two and eight hours. Yoghurt-based marinades tenderise gently, while acidic ones such as lemon should be limited to a couple of hours.'],
    ['What temperature are skewers cooked at?', 'Medium-rare is 55°C and medium is 60°C, but small cubes cook quickly and are hard to probe. Cook for about 8 to 10 minutes, turning often, until the outside is browned and the centre is just pink.'],
  ]),
  'tataki-beef': qa('Tataki questions', [
    ['How cold should the beef be after searing?', 'Plunge it into iced water for a minute to stop the cooking, then pat it dry and chill it for 30 minutes. Cold beef is easier to slice thinly.'],
    ['What is ponzu?', 'A Japanese citrus and soy dressing. Use a store-bought one that contains no mirin or alcohol, or mix soy sauce with lemon and lime juice and a pinch of sugar at home.'],
    ['How long does tataki keep?', 'Eat it within a day. Rare seared beef should be served soon after slicing and kept refrigerated. Do not keep leftovers for later meals.'],
  ]),
  'pulled-beef-recipe': qa('Pulled beef questions', [
    ['How do I know it is ready to shred?', 'A fork should pull the meat apart with almost no resistance. If it still holds together, cook it another hour. Shred it while it is warm, with two forks, then toss it in the cooking juices.'],
    ['Can I cook it in the oven instead?', 'Yes. Cover the meat tightly and cook at 150°C for 4 to 5 hours. Check it has enough liquid halfway through. Rest it for 20 minutes before shredding.'],
    ['What do I serve with pulled beef?', 'Soft rolls with coleslaw, tacos with pickled onions, nachos, or on rice and beans. Leftovers freeze well in their juices for up to three months.'],
  ]),
  'braised-beef': qa('Braising questions', [
    ['What is the difference between braising and stewing?', 'Braising cooks larger pieces of meat partly submerged in liquid, while stewing uses smaller pieces fully covered. Both rely on low heat and long cooking times to tenderise tough cuts.'],
    ['Do I need a heavy pot?', 'A heavy, lidded casserole holds heat evenly and stops the liquid evaporating. A slow cooker or a covered roasting tray in the oven works too.'],
    ['How do I thicken the sauce?', 'Remove the meat, then simmer the liquid uncovered until it reduces by a third. For a thicker sauce, mash a few of the cooked vegetables into it, or whisk in a little cornflour slurry.'],
  ]),
  'beef-shank': qa('Shank questions', [
    ['Why is my shank still tough?', 'Shank has a lot of connective tissue and needs three hours or more at a gentle simmer. If it feels tough, it is not overcooked, it is undercooked. Keep cooking, checking every 30 minutes.'],
    ['Do I eat the marrow?', 'Yes, it is a delicacy. Scoop it out with a small spoon or knife and spread it on toast or stir it into the sauce. The traditional osso buco is served with a small spoon for this.'],
    ['Can I freeze cooked shank?', 'Yes, in its sauce, for up to three months. Thaw it in the fridge and reheat gently until bubbling.'],
  ]),
  'slow-cooker-beef-ribs': qa('Beef rib questions', [
    ['Do I need to remove the membrane?', 'For slow cooker ribs it is not essential, because the long cook softens it. For ribs that you grill afterwards, remove the tough membrane from the back of the bones with a paper towel for a better texture.'],
    ['How do I make the sauce sticky?', 'Remove the ribs when they are tender and reduce the cooking liquid in a pan until syrupy. Brush it over the ribs and finish them under a hot grill for five minutes.'],
    ['Are the ribs fatty?', 'Short ribs are rich. Skim the fat from the sauce, or chill the dish and lift off the set fat the next day. The result is a glossy, more balanced sauce.'],
  ]),
  'beef-brisket-rub': qa('Rub questions', [
    ['Do I need a binder?', 'A thin coat of mustard or oil helps the rub stick, and the mustard flavour disappears during cooking. It is optional: the moisture on the surface of the meat also holds a dry rub.'],
    ['Can I make the rub in bulk?', 'Yes. Mix a big batch and keep it in an airtight jar in a cool, dark place for up to six months. Shake the jar before using, as the spices settle.'],
    ['How much rub per kilo?', 'About one tablespoon per kilo for a salt and pepper rub, up to two for a mixed spice rub. Season all sides, including the edges, and press it in lightly.'],
  ]),
}
