import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import SmartImage from '@/components/SmartImage'
import ProductCard from '@/components/ProductCard'
import AddToCart from '@/components/AddToCart'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import Regulators from '@/components/Regulators'
import { hasRealPhoto } from '@/lib/photos'
import { productImageSeo } from '@/lib/imageSeo'
import { productContent } from '@/lib/productContent'
import { SITE, PRODUCTS, productBySlug, categoryBySlug, containsFocus, postBySlug } from '@/config/site'
import { productSchema } from '@/lib/schema'
import { PRIORITY_FROM } from '@/config/delivery'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'
import { waLink } from '@/lib/whatsapp'

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

// Blog guide each product links to (outbound) — gives every post inbound links from products.
const GUIDE_BY_CAT = {
  beef: 'guide-to-halal-beef-cuts',
  lamb: 'lamb-cuts-guide',
  goat: 'goat-curry-cuts-guide',
  camel: 'cooking-camel-buffalo-kangaroo',
  kangaroo: 'cooking-camel-buffalo-kangaroo',
  'water-buffalo': 'cooking-camel-buffalo-kangaroo',
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return {}
  // Focus keyword (src/config/seo.js) must appear in the title and description. When the
  // product name already contains it, "Halal <product>" leads; otherwise the keyword leads.
  const cap = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase())
  const named = containsFocus(p.name, p.focus)
  const kw = named ? `Halal ${p.name}` : `Halal ${cap(p.focus)}`
  const title = [named ? `${kw} | Halal Meat Depot` : `${kw} | ${p.name}`, `${kw} | Halal Meat Depot`, `${kw} | HMD`, kw].find((t) => t.length <= 60) || kw.slice(0, 60)
  const lead = named ? p.name : `${cap(p.focus)} (${p.name})`
  let description = `${lead}, ${p.unit}, ${money(p.price)}. ${p.short}`
  if (description.length > 158) description = `${lead}, ${p.unit}, ${money(p.price)}. Certified halal by Halal Control Australia. Delivered Australia-wide.`
  if (description.length > 158) description = description.slice(0, 155).replace(/\s+\S*$/, '') + '…'
  if (description.length < 110) description = `${description} Certified halal by Halal Control Australia.`
  if (description.length < 110) description = `${description} Wholesale prices, delivered Australia-wide.`
  return pageMeta({ title, description, path: `/product/${p.slug}/`, image: `${SITE.url}/images/products/${p.images[0]}` })
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) notFound()
  const cat = categoryBySlug(p.cat)
  // Related products: the neighbours either side in the category list, so every product is
  // linked from at least three others (inbound links), not just the first few in each category.
  const siblings = PRODUCTS.filter((x) => x.cat === p.cat)
  const at = siblings.findIndex((x) => x.slug === p.slug)
  const related = [...new Set([1, 2, -1, 3].map((d) => siblings[(at + d + siblings.length) % siblings.length]))].filter((x) => x && x.slug !== p.slug).slice(0, 3)
  const guide = postBySlug(GUIDE_BY_CAT[p.cat] || 'what-halal-certification-means-australia')
  const enquire = waLink(`I have a question about ${p.name} (${p.unit}).`)
  const img = productImageSeo(p)
  const copy = productContent(p)

  return (
    <>
      <JsonLd data={productSchema(p)} />
      <div className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Shop', path: '/halal-meat-shop/' },
              { name: cat.name, path: `${cat.path}` },
              { name: p.name, path: `/product/${p.slug}/` },
            ]}
          />
          <div className="pdp">
            <figure className="pdp-figure">
              <div className="pdp-media">
                {p.badge && <span className={`badge badge--${p.badge.replace(/\s+/g, '')}`}>{p.badge}</span>}
                <SmartImage src={`/images/products/${p.images[0]}`} alt={img.alt} title={img.title} fill sizes="(max-width: 900px) 100vw, 55vw" priority />
              </div>
              <figcaption className="img-caption">{img.caption}</figcaption>
              {!hasRealPhoto(p.imageSlug) && (
                <p className="muted" style={{ fontSize: '0.85rem', marginTop: 10 }}>
                  Product photo coming soon — image shows the pack name and size.
                </p>
              )}
            </figure>
            <div className="stack">
              <span className="product-meta">
                <Link href={`${cat.path}`}>{cat.name}</Link> · {p.sub}
              </span>
              <h1 style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)' }}>{copy.h1}</h1>
              <div className="price-row" style={{ marginTop: 0 }}>
                <span className="price">{money(p.price)}</span>
                <span className="unit">{p.unit}</span>
                <span className="per-kg">≈ {money(p.perKg)} per kg</span>
              </div>
              <p style={{ fontSize: '1.05rem' }}>{p.short}</p>
              <AddToCart slug={p.slug} name={p.name} idPrefix="pdp" showViewCart />
              <div className="cert-box">
                <Icon name="shield" />
                <div>
                  <strong>Certified halal by {SITE.certifier}</strong>
                  <br />
                  <span style={{ fontSize: '0.9rem' }}>
                    Certificate No. {SITE.certificate.number} —{' '}
                    <Link href="/halal-certification/#certificate">view certificate</Link>.
                  </span>
                </div>
              </div>
              <ul className="check-list">
                <li>
                  <Icon name="truck" /> Delivered Australia-wide in {SITE.delivery.transitDays[0]}–{SITE.delivery.transitDays[1]} days — free over ${SITE.freeShipOver}, otherwise ${SITE.flatShip}
                </li>
                <li>
                  <Icon name="clock" /> Priority Delivery from ${PRIORITY_FROM} — within 24 hours in Sydney,{' '}
                  <Link href="/halal-meat-delivery/#priority">priced by distance</Link>
                </li>
                <li>
                  <Icon name="chilled" /> Packed chilled and dispatched once payment clears
                </li>
                <li>
                  <Icon name="percent" /> {SITE.cryptoDiscountPct}% off your meat total when you pay with crypto
                </li>
                <li>
                  <Icon name="cart" /> Minimum order ${SITE.minOrder} across your whole cart
                </li>
              </ul>
            </div>
          </div>

          <div className="split" style={{ marginTop: 48 }}>
            {/* Product description (owner SEO rules): focus keyword in the H2 and the first sentence;
                supporting keywords ~45% transactional / 45% commercial / 10% informational. */}
            <section aria-labelledby="desc-title" className="prose product-description">
              <h2 id="desc-title">{copy.h2}</h2>
              <p>{copy.intro}</p>
              <p>{copy.about}</p>
              <h3>{copy.buyHeading}</h3>
              <p>
                {copy.buy.join(' ')} Need it cut a particular way? Add your instructions in the order notes at checkout.
              </p>
              <h3>{copy.tradeHeading}</h3>
              <p>
                {copy.trade.join(' ')} See <Link href="/halal-meat-wholesale/">halal meat wholesale</Link> for trade accounts.
              </p>
              <h3>{copy.cookHeading}</h3>
              <p>{copy.cook}</p>
              <p>
                More in our guide: <Link href={`/blog/${guide.slug}/`}>{guide.title}</Link>
                {p.sub === 'Wagyu MB5+ & MB9+' && (
                  <>
                    {' '}· See all <Link href="/wagyu-steak/">Wagyu steak</Link>
                  </>
                )}
                {/carcass|catering pack/i.test(p.name) && (p.cat === 'lamb' || p.cat === 'goat' || p.slug === 'whole-lamb-catering-pack') && (
                  <>
                    {' '}· <Link href="/whole-lamb-aqeeqah-qurbani/">Whole lamb and goat for Aqeeqah and Qurbani</Link>
                  </>
                )}
              </p>
            </section>
            <aside className="card card--tint" aria-labelledby="help-title">
              <h2 id="help-title" style={{ fontSize: '1.2rem' }}>
                Questions about this product?
              </h2>
              <p className="muted">Ask about cuts, quantities or event orders before you buy.</p>
              <div className="btn-row">
                <a className="btn btn--wa btn--sm" href={enquire} target="_blank" rel="noopener noreferrer">
                  Ask on WhatsApp
                </a>
                <Link className="btn btn--ghost btn--sm" href="/contact/">
                  Contact form
                </Link>
              </div>
            </aside>
          </div>

          <div className="card" style={{ marginTop: 32 }}>
            <Regulators cat={p.cat} id="pdp-regulation" />
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related-title" style={{ marginTop: 56 }}>
              <h2 id="related-title">More halal {cat.name.toLowerCase()}</h2>
              <div className="product-grid">
                {related.map((r) => (
                  <ProductCard key={r.slug} product={r} />
                ))}
              </div>
              <p style={{ marginTop: 20 }}>
                <Link href={`${cat.path}`}>See all {cat.name.toLowerCase()} products</Link> · <Link href="/halal-meat-wholesale/">Wholesale accounts</Link>
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
