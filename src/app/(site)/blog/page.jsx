import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { POSTS } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Easy Halal Meat Guides & Cooking Tips | HMD Blog',
  description: 'Our blog: halal steak and roast guides, slow-cooking recipes for beef cheeks, lamb shanks and casseroles, brisket smoking tips and how to buy halal meat.',
  path: '/blog/',
})

const fmt = (d) => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })

// Topic groups for the index (owner request 2026-10-13: give the blog index real content, not just a grid).
// Any post not listed here falls into "More guides", so new posts always appear.
const TOPICS = [
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

function PostCard({ p }) {
  return (
    <article className="post-card">
      <div className="post-band" aria-hidden="true">{p.kw}</div>
      <div className="post-body">
        <time dateTime={p.date}>{fmt(p.date)}</time>
        <h3 style={{ fontSize: '1.15rem', margin: 0 }}>
          <Link href={`/blog/${p.slug}/`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
            {p.title}
          </Link>
        </h3>
        <p className="muted">{p.excerpt}</p>
        <Link href={`/blog/${p.slug}/`} className="read" aria-label={`Read the guide: ${p.title}`}>
          Read the guide →
        </Link>
      </div>
    </article>
  )
}

export default function BlogIndex() {
  const bySlug = Object.fromEntries(POSTS.map((p) => [p.slug, p]))
  const listed = new Set(TOPICS.flatMap((t) => t.slugs))
  const groups = [
    ...TOPICS.map((t) => ({ ...t, posts: t.slugs.map((s) => bySlug[s]).filter(Boolean) })),
    { title: 'More guides', intro: '', posts: POSTS.filter((p) => !listed.has(p.slug)).sort((a, b) => b.date.localeCompare(a.date)) },
  ].filter((g) => g.posts.length)
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Blog', path: '/blog/' }]} />
          <h1>Halal meat blog: guides and cooking tips</h1>
          <p className="lead">Practical guides to choosing cuts, cooking every kind of halal meat, and buying certified halal meat with confidence.</p>
        </div>
      </div>
      <section className="section" aria-label="About this blog">
        <div className="container prose" style={{ maxWidth: 860 }}>
          <p>
            This blog is written by the team at Halal Meat Depot, a halal meat supplier in Greenacre, Sydney. We cut and pack beef, lamb, goat, chicken,
            camel, duck, kangaroo and water buffalo every day, and these guides answer the questions our customers ask us most: which steak to buy,
            how long to slow cook a shank, what the difference is between gravy beef and chuck, and how to get a tender stir-fry.
          </p>
          <p>
            Every recipe is halal — no pork and no alcohol — and every guide links straight to the cuts it uses, so you can go from reading to
            ordering in a click. All our meat is certified halal by Halal Control Australia and delivered chilled Australia-wide. New to buying
            meat online? Start with our <Link href="/blog/guide-to-halal-beef-cuts/">guide to halal beef cuts</Link>, browse the{' '}
            <Link href="/halal-meat-shop/">halal meat shop</Link>, or read the <Link href="/faq/">FAQ</Link> for delivery and payment details.
          </p>
          <nav aria-label="Blog topics">
            <p style={{ marginBottom: 0 }}>
              <strong>Jump to a topic:</strong>{' '}
              {groups.map((g, i) => (
                <span key={g.title}>
                  {i > 0 && ' · '}
                  <a href={`#${g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>{g.title}</a>
                </span>
              ))}
            </p>
          </nav>
        </div>
      </section>
      {groups.map((g, i) => (
        <section
          key={g.title}
          id={g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
          className={`section${i % 2 === 0 ? ' section--tint' : ''}`}
          aria-labelledby={`topic-${i}`}
        >
          <div className="container">
            <h2 id={`topic-${i}`}>{g.title}</h2>
            {g.intro && <p className="muted" style={{ maxWidth: 760 }}>{g.intro}</p>}
            <div className="grid-3">
              {g.posts.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
