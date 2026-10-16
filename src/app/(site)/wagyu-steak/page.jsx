import KeywordNotes from '@/components/KeywordNotes'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import ProductCard from '@/components/ProductCard'
import { SITE, PRODUCTS } from '@/config/site'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'

// Wagyu landing page — focus keyword "wagyu steak" (Commercial, 2,400/mo, KD 19). Gathers the
// 23 Wagyu products so the beef category page stays light and Wagyu gets its own hub.
const WAGYU = PRODUCTS.filter((p) => p.sub === 'Wagyu MB5+ & MB9+')
const low = Math.min(...WAGYU.map((p) => p.price))

export const metadata = pageMeta({
  title: 'Premium Wagyu Steak | Halal Wagyu Beef MB5+ & MB9+ | HMD',
  description: `Wagyu steak and halal Wagyu beef at marble score 5+ and 9+: tomahawk, scotch fillet, eye fillet, rump and brisket, from ${money(low)}. Delivered Australia-wide.`,
  path: '/wagyu-steak/',
})

const GROUPS = [
  { title: 'Wagyu steak: tomahawk, cutlets and Fiorentina', test: (p) => /tomahawk|cattleman|fiorentina/i.test(p.name) },
  { title: 'Wagyu steak: scotch fillet, eye fillet, porterhouse and rump', test: (p) => /scotch|eye fillet|porterhouse|rump steaks/i.test(p.name) },
  { title: 'Wagyu beef for slicing, braising and roasting', test: () => true },
]

export default function WagyuPage() {
  const used = new Set()
  const groups = GROUPS.map((g) => {
    const items = WAGYU.filter((p) => !used.has(p.slug) && g.test(p))
    items.forEach((p) => used.add(p.slug))
    return { ...g, items }
  })
  const faqs = [
    {
      q: 'What do MB5+ and MB9+ mean on Wagyu steak?',
      a: 'MB is the marble score: how much fine fat runs through the meat. MB5+ Wagyu steak is richly marbled; MB9+ sits at the top of the scale. Higher scores eat richer, so they are best served in smaller portions.',
    },
    {
      q: 'Is your Wagyu beef halal?',
      a: `Yes. All our Wagyu beef, like every product we sell, is certified halal by ${SITE.certifier} (certificate No. ${SITE.certificate.number}).`,
    },
    {
      q: 'How much does Wagyu steak cost?',
      a: `Our Wagyu range starts at ${money(low)} per pack. Every product shows its pack price and price per kg; delivery is free on orders over $${SITE.freeShipOver}.`,
    },
  ]
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Wagyu steak and halal Wagyu beef',
            numberOfItems: WAGYU.length,
            itemListElement: WAGYU.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/product/${p.slug}/`, name: p.name })),
          },
          faqSchema(faqs),
        ]}
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Shop', path: '/halal-meat-shop/' }, { name: 'Beef', path: '/shop/halal-beef/' }, { name: 'Wagyu steak', path: '/wagyu-steak/' }]} />
          <h1>Wagyu steak: halal Wagyu beef MB5+ and MB9+</h1>
          <p className="lead">
            Wagyu steak from {SITE.name} comes in two marble grades, MB5+ and MB9+, across {WAGYU.length} cuts — from tomahawks and
            scotch fillet to brisket and thin-sliced yakiniku. Every pack is certified halal by {SITE.certifier} and delivered
            Australia-wide from our Greenacre, Sydney depot.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          {groups.map((g, i) =>
            g.items.length ? (
              <section key={g.title} aria-labelledby={`wg-${i}`} style={{ marginBottom: 48 }}>
                <h2 id={`wg-${i}`}>{g.title}</h2>
                <div className="product-grid">
                  {g.items.map((p, j) => (
                    <ProductCard key={p.slug} product={p} priority={i === 0 && j < 2} />
                  ))}
                </div>
              </section>
            ) : null
          )}
          <section className="card" aria-labelledby="wg-faq">
            <h2 id="wg-faq">Wagyu steak: common questions</h2>
            {faqs.map((f) => (
              <div key={f.q} style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{f.q}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>{f.a}</p>
              </div>
            ))}
            <p style={{ marginTop: 16, marginBottom: 0 }}>
              Looking for Angus or everyday cuts? Browse all <Link href="/shop/halal-beef/">halal beef</Link>.
            </p>
          </section>
        </div>
      </div>
      <div className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <KeywordNotes path="/wagyu-steak/" />
        </div>
      </div>
    </>
  )
}
