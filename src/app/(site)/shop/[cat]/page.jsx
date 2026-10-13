import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryChips from '@/components/CategoryChips'
import ProductCard from '@/components/ProductCard'
import Regulators from '@/components/Regulators'
import JsonLd from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'
import { SITE, CATEGORIES, POSTS, categoryBySlug, productsInCategory, subSlug, categoryImage } from '@/config/site'
import SmartImage from '@/components/SmartImage'
import { categoryImageSeo, imageObject } from '@/lib/imageSeo'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'

export const dynamicParams = false
const WAGYU_SUB = 'Wagyu MB5+ & MB9+'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.urlSlug }))
}

const cap = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase())
// Focus keyword (src/config/seo.js), with "halal" in front when it isn't already there.
const phrase = (c) => (c.slug === 'wholesale-cartons' ? 'meat boxes and bulk halal meat cartons' : (/halal/.test(c.focus) ? c.focus : `halal ${c.focus}`).replace(/\baustralia\b/, 'Australia'))
// Focus keywords like "goat meat for sale" already say "buy", so they lead as-is.
const saysBuy = (c) => /for sale|australia/i.test(c.focus)

// Meta description: focus keyword first, then range, price anchor and delivery (110–158 chars).
function describe(c, items) {
  const low = Math.min(...items.map((p) => p.price))
  const lead = c.slug === 'wholesale-cartons' || saysBuy(c) ? cap(phrase(c)) : `Buy ${phrase(c)} online`
  const base = `${lead}: ${c.subcategories.slice(0, 3).join(', ').toLowerCase()} and more. ${items.length} products from ${money(low)}, HCA certified, delivered Australia-wide.`
  const d = base.length > 158 ? `${lead} — ${items.length} products from ${money(low)}. Certified by Halal Control Australia, delivered Australia-wide.` : base
  return d.length < 130 && d.length + 20 <= 158 ? `${d} Order online today.` : d
}

function titleFor(c) {
  // Owner rule (2026-10-13): 1–2 SEO power words in every title ("Fresh" never splits the focus keyword).
  if (c.slug === 'wholesale-cartons') return 'Fresh Meat Boxes & Bulk Halal Meat Cartons | HMD'
  const head = saysBuy(c) ? `Fresh ${cap(phrase(c))}` : `Buy Fresh ${cap(phrase(c))} Online`
  return [`${head} | Sydney & Australia-Wide`, `${head} | Delivered Australia-Wide`, `${head} | Halal Meat Depot`, head].find((t) => t.length <= 60)
}

// Page-level mini-FAQ built only from catalogue facts (prices, cuts, delivery rules).
function categoryFaqs(c, items, groups) {
  const low = Math.min(...items.map((p) => p.price))
  const lowKg = Math.min(...items.map((p) => p.perKg))
  const noun = c.slug === 'wholesale-cartons' ? 'bulk halal meat cartons' : c.kw
  return [
    {
      q: `How much does ${noun} cost at ${SITE.name}?`,
      a: `Our ${c.name.toLowerCase()} range has ${items.length} products starting at ${money(low)} per pack, from about ${money(lowKg)} per kg. Every price is shown upfront, the minimum order is $${SITE.minOrder} and delivery is free on orders over $${SITE.freeShipOver}.`,
    },
    {
      q: `Which ${c.slug === 'wholesale-cartons' ? 'cartons and packs' : `${c.name.toLowerCase()} cuts`} can I order?`,
      a: `You can order ${groups.map((g) => g.sub.toLowerCase()).join('; ')} — ${items.length} products in total, all certified halal by ${SITE.certifier} (certificate No. ${SITE.certificate.number}).`,
    },
    {
      q: `Do you deliver ${noun} outside Sydney?`,
      a: `Yes. We deliver ${noun} Australia-wide from our Greenacre, Sydney depot. Delivery is free on orders over $${SITE.freeShipOver}, otherwise $${SITE.flatShip} flat, with a $${SITE.minOrder} minimum order. See our delivery policy for details.`,
    },
  ]
}

export async function generateMetadata({ params }) {
  const { cat } = await params
  const c = categoryBySlug(cat)
  if (!c) return {}
  const items = productsInCategory(c.slug)
  return pageMeta({ title: titleFor(c), description: describe(c, items), path: `${c.path}` })
}

export default async function CategoryPage({ params }) {
  const { cat } = await params
  const c = categoryBySlug(cat)
  if (!c) notFound()
  const items = productsInCategory(c.slug)
  const groups = c.subcategories.map((sub) => ({ sub, items: items.filter((p) => p.sub === sub) })).filter((g) => g.items.length)
  const related = POSTS.filter((p) => p.body.some((b) => typeof b[1] === 'string' && b[1].includes(`${c.path}`))).slice(0, 2)
  const faqs = categoryFaqs(c, items, groups)
  const img = categoryImageSeo(c)
  const imgUrl = `${SITE.url}/images/categories/${categoryImage(c.slug)}`
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.slug === 'wholesale-cartons' ? 'Bulk halal meat cartons' : `Halal ${c.name.toLowerCase()}`,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/product/${p.slug}/`, name: p.name })),
  }

  return (
    <>
      <JsonLd data={[itemList, faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'CollectionPage', url: `${SITE.url}${c.path}`, name: titleFor(c), primaryImageOfPage: imageObject(imgUrl, img) }]} />
      <div className="page-head">
        <div className="container cat-head">
          <div>
            <Breadcrumbs crumbs={[{ name: 'Shop', path: '/halal-meat-shop/' }, { name: c.name, path: `${c.path}` }]} />
            <h1>{c.slug === 'wholesale-cartons' ? 'Bulk halal meat cartons and meat boxes' : saysBuy(c) ? cap(phrase(c)) : `Buy ${phrase(c)} online`}</h1>
            <p className="lead">{c.intro}</p>
          </div>
          <figure className="cat-head-figure">
            <div className="cat-head-media">
              <SmartImage src={`/images/categories/${categoryImage(c.slug)}`} alt={img.alt} title={img.title} fill sizes="(max-width: 900px) 100vw, 420px" priority />
            </div>
            <figcaption className="img-caption">{img.caption}</figcaption>
          </figure>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <CategoryChips current={c.slug} />
          {(c.slug === 'lamb' || c.slug === 'goat') && (
            <p className="card card--tint" style={{ marginBottom: 32 }}>
              Ordering for Aqeeqah or Qurbani? See <Link href="/whole-lamb-aqeeqah-qurbani/">whole lamb and goat for Aqeeqah and Qurbani</Link> — whole and half carcasses with prices.
            </p>
          )}
          {groups.map((g, i) =>
            g.sub === WAGYU_SUB ? (
              <section key={g.sub} id={subSlug(g.sub)} aria-labelledby={`sub-${i}`} className="sub-section card card--tint" style={{ marginBottom: 48 }}>
                <h2 id={`sub-${i}`}>Wagyu steak MB5+ and MB9+</h2>
                <p style={{ marginBottom: 0 }}>
                  Our {g.items.length} Wagyu products — tomahawks, scotch fillet, eye fillet, rump, brisket, yakiniku and more — have their own page:{' '}
                  <Link href="/wagyu-steak/">shop Wagyu steak and halal Wagyu beef</Link>.
                </p>
              </section>
            ) : (
              <section key={g.sub} id={subSlug(g.sub)} aria-labelledby={`sub-${i}`} className="sub-section" style={{ marginBottom: 48 }}>
                <h2 id={`sub-${i}`}>{g.sub}</h2>
                <div className="product-grid">
                  {g.items.map((p, j) => (
                    <ProductCard key={p.slug} product={p} priority={i === 0 && j < 2} />
                  ))}
                </div>
              </section>
            )
          )}
          <section className="card" style={{ marginBottom: 24 }} aria-labelledby="cat-faq-title">
            <h2 id="cat-faq-title">{c.slug === 'wholesale-cartons' ? 'Meat boxes and bulk halal meat cartons' : cap(phrase(c))}: common questions</h2>
            {faqs.map((f) => (
              <div key={f.q} style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{f.q}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>
                  {f.a.replace(' See our delivery policy for details.', ' ')}
                  {f.a.includes('delivery policy') && <Link href="/halal-meat-delivery/">See our delivery policy</Link>}
                  {f.a.includes('delivery policy') && '.'}
                </p>
              </div>
            ))}
          </section>
          <div className="card" style={{ marginBottom: 24 }}>
            <Regulators cat={c.slug} title={`How ${c.name.toLowerCase()} is regulated in Australia`} />
          </div>
          <div className="grid-2">
            <div className="card card--tint">
              <h2>Ordering {c.name.toLowerCase()} from Halal Meat Depot</h2>
              <p className="muted" style={{ marginBottom: 0 }}>
                All {c.name.toLowerCase()} is certified halal by {SITE.certifier} — see our <Link href="/halal-certified-meat/">certification page</Link>.
                Minimum order ${SITE.minOrder}, free delivery over ${SITE.freeShipOver}, {SITE.cryptoDiscountPct}% off with crypto. Buying for a
                restaurant? <Link href="/halal-meat-wholesale/">Open a wholesale account</Link>.
              </p>
            </div>
            <div className="card">
              <h2>Learn more</h2>
              <ul style={{ marginBottom: 0 }}>
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/faq/">Delivery, payment and ordering FAQ</Link>
                </li>
                <li>
                  <Link href="/halal-meat-delivery/">Delivery details</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
