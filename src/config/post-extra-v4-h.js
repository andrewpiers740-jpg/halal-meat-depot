// Further extension blocks (batch H) for new posts, keyed by post key.
const sec = (title, paras) => [['h2', title], ...paras.map((p) => (Array.isArray(p) ? ['ul', p] : ['p', p]))]

export const POST_EXTRA_V4_H = {
  'lamb-backstrap-recipes': sec("Quick weeknight backstrap plan", ["Keep two or three backstraps in the freezer for busy weeks. Thaw one overnight in the fridge, rub with oil, salt and your favourite spice blend, and cook it while the rice or potatoes finish. Slice and serve with a green vegetable, and dinner is done in 25 minutes. Lamb backstrap is naturally lean and tender, so it never needs a long marinade or a complicated sauce.","A simple rotation might be a lemon and herb backstrap on Monday, a Moroccan-spiced one on Wednesday, and a backstrap salad on Friday. Each uses the same cut and technique, with different seasoning, so the family stays interested without extra work. Keep the spice shelf stocked with cumin, coriander, paprika, sumac and dried mint, and you will always have something to cook with."]),
  'beef-cheek-ragu': sec("One last tip", ["Always cook the ragu until it is truly tender, and let it rest in the sauce for half an hour before shredding, as the meat reabsorbs the juices and stays moist."]),
}
