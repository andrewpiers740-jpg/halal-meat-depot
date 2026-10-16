// Topic groups for the index (owner request 2026-10-13: give the blog index real content, not just a grid).
// Any post not listed here falls into "More guides", so new posts always appear.
export const TOPICS = [
  {
    title: 'Steaks and roasts: which cut to buy',
    intro: 'Side-by-side comparisons of the premium cuts, so you can choose the right steak or roast for the occasion and the budget.',
    slugs: ['scotch-fillet-vs-porterhouse-vs-eye-fillet', 'sirloin-vs-porterhouse-vs-rump', 'best-beef-cut-for-roasting', 'beef-oyster-blade-steak-recipe', 'guide-to-halal-beef-cuts', 'how-to-prepare-a-porterhouse', 'medium-rare-beef-steak-temperature', 'how-to-tenderise-beef-steak', 'beef-steak-side-dishes', 'beef-onglet-steak', 'beef-bavette', 'beef-skirt', 'roast-beef-cooking-time', 'tataki-beef'],
  },
  {
    title: 'Slow cooking and braising',
    intro: 'The cheaper, hard-working cuts that turn meltingly tender with time — with slow cooker, oven and pressure cooker methods.',
    slugs: ['slow-cooked-beef-cheeks', 'slow-cooked-lamb-shanks', 'lamb-casserole-recipe', 'slow-roast-lamb-slow-cooker', 'beef-bolar-blade-roast-recipe', 'gravy-beef-vs-chuck', 'best-bones-for-bone-broth', 'braised-beef', 'beef-shank', 'pulled-beef-recipe', 'slow-cooker-beef-ribs', 'mongolian-beef-slow-cooker', 'chicken-thigh-slow-cooker-meals'],
  },
  {
    title: 'Quick weeknight dinners',
    intro: 'Fast, family-friendly recipes for busy nights, most on the table in about 30 minutes.',
    slugs: ['30-minute-beef-mince-recipes', 'best-beef-for-stir-fry', 'chicken-maryland-recipes', 'asian-beef-mince-recipes', 'beef-pasta-bake', 'pasta-with-beef-steak', 'fried-rice-and-beef', 'beef-donburi-recipe', 'rainbow-beef', 'beef-and-black-bean', 'shaking-beef', 'beef-and-lemongrass', 'beef-fajitas', 'beef-schnitzel', 'beef-croquettes', 'creamy-tuscan-chicken'],
  },
  {
    title: 'Barbecue and smoking',
    intro: 'Low-and-slow smoking temperatures, timings and resting, for brisket and other big cuts.',
    slugs: ['best-temperature-to-smoke-beef-brisket', 'beef-brisket-rub', 'beef-skewers', 'satay-beef', 'beef-meat-patties-recipe', 'lamb-skewers', 'lamb-souvlaki', 'lamb-spit-roast-guide'],
  },
  {
    title: 'Curries from around the world',
    intro: 'Slow-simmered beef and lamb curries, from Thai massaman and Malaysian rendang to Goan vindaloo and Kashmiri rogan josh.',
    slugs: ['beef-curry-recipe', 'beef-massaman-curry', 'beef-rendang-recipe', 'beef-korma', 'beef-vindaloo', 'beef-madras', 'beef-biryani', 'rogan-josh-with-beef', 'japanese-beef-curry', 'thai-beef-salad'],
  },
  {
    title: 'Lamb recipes and cooking times',
    intro: 'Roasting times, chops and cutlets, slow-cooked necks and shanks, and everyday lamb mince meals.',
    slugs: ['leg-of-lamb-cooking-time', 'rack-of-lamb-cooking-time', 'lamb-cooking-temperature', 'how-do-you-cook-lamb-cutlets', 'lamb-chops-in-air-fryer', 'marinated-lamb-chops', 'slow-cooked-lamb-chops', 'lamb-chop-casserole', 'lamb-neck-recipes', 'how-to-cook-lamb-ribs-in-oven', 'lamb-shank-soup', 'diced-lamb-recipes', 'lamb-mince-recipes', 'lamb-kofta-wraps', 'quarter-lamb-buying-guide'],
  },
  {
    title: 'Chicken and duck',
    intro: 'Crumbed, air-fried, slow-cooked and tandoori chicken, plus roast duck, crispy duck fat potatoes and smooth pâtés.',
    slugs: ['how-to-crumb-chicken', 'chicken-tenders-recipes', 'chicken-drumsticks-air-fryer', 'chicken-wing-meals', 'chicken-breast-with-filling', 'chicken-sandwich-filling', 'marinate-tandoori-chicken', 'chicken-liver-pate', 'oven-duck', 'duck-fat-potatoes', 'duck-liver-pate'],
  },
  {
    title: 'Lamb, goat and other meats',
    intro: 'Cut guides for lamb and goat, and how to cook less common meats such as camel, water buffalo and kangaroo.',
    slugs: ['lamb-cuts-australia-guide', 'goat-meat-curry-cuts-guide', 'cooking-camel-meat-buffalo-kangaroo', 'goat-meat-vs-lamb-meat', 'what-does-goat-taste-like', 'slow-cooked-goat-recipes', 'recipe-for-goat-leg', 'goat-shank', 'marinade-for-mutton-chops', 'mutton-stew-slow-cooker', 'kangaroo-fillet', 'camel-burgers'],
  },
  {
    title: 'Buying halal meat',
    intro: 'What halal certification covers and what to look for when you buy meat in Australia.',
    slugs: ['halal-meat-australia-certification'],
  },
]

// Related posts for a post page: same-topic posts first, ranked by shared words in slug and focus keyword.
const STOP = new Set(['and', 'the', 'for', 'with', 'how', 'to', 'a', 'of', 'in', 'do', 'you', 'recipe', 'recipes', 'guide', 'best', 'vs'])
const words = (p) => new Set(`${p.slug} ${p.kw}`.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)))
export function relatedPosts(post, posts, n = 4) {
  const topic = TOPICS.find((t) => t.slugs.includes(post.slug))
  const mine = words(post)
  const score = (p) => [...words(p)].filter((w) => mine.has(w)).length * 2 + (topic?.slugs.includes(p.slug) ? 3 : 0)
  const self = posts.findIndex((p) => p.slug === post.slug)
  // Ties go to the nearest posts in list order, so every post gets linked from somewhere.
  return posts
    .map((p, i) => ({ p, s: score(p), d: Math.abs(i - self) }))
    .filter((x) => x.p.slug !== post.slug)
    .sort((x, y) => y.s - x.s || x.d - y.d)
    .slice(0, n)
    .map((x) => x.p)
}
