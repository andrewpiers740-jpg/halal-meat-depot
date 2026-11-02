// Further extension blocks (batch F) for posts that needed more words, keyed by post key.
const sec = (title, paras) => [['h2', title], ...paras.map((p) => (Array.isArray(p) ? ['ul', p] : ['p', p]))]

export const POST_EXTRA_V4_F = {
  'mince-recipes': sec('Storing, freezing and reheating mince meals', [
    'Mince dishes are among the best for batch cooking. Cool cooked mince quickly by spreading it in a shallow tray, then refrigerate within an hour. Cooked dishes keep for three days in the fridge and three months in the freezer. Freeze in flat, labelled bags so they stack neatly and thaw quickly, and always thaw in the fridge overnight.',
    'When reheating, bring the dish to a rolling simmer or until steaming hot all the way through, at least 75°C. Add a splash of water or stock if the sauce has thickened. Do not reheat more than once. Raw mince should always be kept in the coldest part of the fridge, below 5°C, and away from cooked foods and fresh produce. Wash boards, knives and hands thoroughly after handling it.',
    'If you cook for a family every night, a simple system helps: buy a carton of mince, portion it into 500g bags, label each with the date, and rotate the oldest first. A bag taken from the freezer in the morning is ready to cook that evening, and you will always have the base of a dinner ready. It saves money, reduces waste and takes the stress out of the 5pm question.',
  ]),
  'minced-meat-taco-recipe': sec('Taco variations for the whole family', [
    'Once the basic filling is mastered, taco night never gets boring. For a crunchy twist, serve the mince in lettuce leaves or baked tortilla bowls. For a breakfast version, scramble eggs into the leftover filling and wrap in a warm tortilla with cheese. For a lighter dinner, pile the seasoned mince over a salad of cos lettuce, cucumber, tomato and avocado, with a lime and coriander dressing.',
    'For children, use the mildest seasoning and keep the chilli on the side. Cut the toppings small, serve the shells in a basket and let them assemble their own. For adults who like heat, offer sliced jalapeños, hot sauce and pickled chillies. A small bowl of refried beans spread inside the shell adds protein and holds the filling in place.',
    'If you want to stretch the meat, add a cup of cooked lentils, a can of black beans or a grated carrot to the pan along with the water. The spices cover the difference, and the filling goes further without losing flavour. Grated zucchini works too, and disappears into the sauce, which is a clever way to add vegetables for fussy eaters.',
    'Finally, remember that tacos suit parties. Prepare the filling and toppings ahead, keep the filling warm on low heat, and lay out the shells and tortillas with bowls of toppings. Guests can serve themselves in minutes, and the host can enjoy the evening instead of cooking.',
  ]),
  'rice-and-minced-meat-recipe': sec('Troubleshooting rice and mince dishes', [
    'If the rice is crunchy but the liquid has gone, add a splash of boiling water, cover tightly and steam on the lowest heat for five more minutes. If the rice is mushy, spread it on a tray to dry out slightly, and use less liquid next time. If the dish tastes bland, the cause is usually too little salt, so season gradually and add acid at the end, such as lemon juice, lime or a splash of vinegar.',
    'If the mince is greasy, spoon off the fat before adding the rice, or use leaner mince next time. If the bottom is catching, the heat is too high; turn it to the lowest setting and use a heavy-based pot with a tight-fitting lid. A heat diffuser or a folded tea towel under the lid can help absorb steam and keep the rice fluffy.',
    'If you are cooking for a crowd, use a wide, shallow pan rather than a deep pot, so the rice cooks evenly. Increase the liquid proportionally, and add 5 minutes to the cooking time for every extra cup of rice. Check the rice at the end, and rest the dish for ten minutes, covered, before serving. A final fluff with a fork separates the grains and releases excess steam.',
    'To freeze, cool the dish quickly, pack into portions, and freeze flat. Reheat from frozen in a covered pan with a splash of water, stirring gently, until steaming hot. Rice should be cooled and refrigerated within an hour of cooking, and never kept at room temperature for long.',
  ]),
}
