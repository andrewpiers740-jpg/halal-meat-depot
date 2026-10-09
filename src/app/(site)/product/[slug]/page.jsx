import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import SmartImage from '@/components/SmartImage'
import ProductCard from '@/components/ProductCard'
import AddToCart from '@/components/AddToCart'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { SITE, PRODUCTS, productBySlug, categoryBySlug } from '@/config/site'
import { productSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'
import { waLink } from '@/lib/whatsapp'

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return {}
  const full = `${p.name} — Halal Meat Depot`
  const title = full.length <= 60 ? full : `${p.name} | Halal Meat Depot`.length <= 60 ? `${p.name} | Halal Meat Depot` : p.name.slice(0, 60)
  let description = `${p.name}, ${p.unit}, ${money(p.price)}. ${p.short}`
  if (description.length > 158) description = `${p.name}, ${p.unit}, ${money(p.price)}. Certified halal by Halal Control Australia. Delivered Australia-wide.`
  if (description.length > 158) description = description.slice(0, 155).replace(/\s+\S*$/, '') + '…'
  if (description.length < 110) description = `${description} Certified halal by Halal Control Australia.`
  return pageMeta({ title, description, path: `/product/${p.slug}/`, image: `${SITE.url}/images/products/${p.images[0]}` })
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) notFound()
  const cat = categoryBySlug(p.cat)
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug)
    .sort((a, b) => (a.sub === p.sub ? -1 : 0) - (b.sub === p.sub ? -1 : 0))
    .slice(0, 3)
  const enquire = waLink(`I have a question about ${p.name} (${p.unit}).`)

  return (
    <>
      <JsonLd data={productSchema(p)} />
      <div className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <Breadcrumbs
            crumbs={[
              { name: 'Shop', path: '/shop/' },
              { name: cat.name, path: `/shop/${cat.slug}/` },
              { name: p.name, path: `/product/${p.slug}/` },
            ]}
          />
          <div className="pdp">
            <div>
              <div className="pdp-media">
                {p.badge && <span className={`badge badge--${p.badge.replace(/\s+/g, '')}`}>{p.badge}</span>}
                <SmartImage src={`/images/products/${p.images[0]}`} alt={`${p.name} — ${p.unit} — Halal Meat Depot`} fill sizes="(max-width: 900px) 100vw, 55vw" priority />
              </div>
              <p className="muted" style={{ fontSize: '0.85rem', marginTop: 10 }}>
                Product photo coming soon — image shows the pack name and size.
              </p>
            </div>
            <div className="stack">
              <span className="product-meta">
                <Link href={`/shop/${cat.slug}/`}>{cat.name}</Link> · {p.sub}
              </span>
              <h1 style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)' }}>{p.name}</h1>
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
                    Certificate available on request — <Link href="/halal-certification/">how our meat is certified</Link>.
                  </span>
                </div>
              </div>
              <ul className="check-list">
                <li>
                  <Icon name="truck" /> Delivered Australia-wide — free over ${SITE.freeShipOver}, otherwise ${SITE.flatShip}
                </li>
                <li>
                  <Icon name="store" /> Free pickup from our Greenacre depot
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
            <section aria-labelledby="desc-title" className="prose">
              <h2 id="desc-title">About this {cat.name.toLowerCase()} {p.sub.toLowerCase().includes('carcass') ? 'carcass' : 'cut'}</h2>
              <p>{p.desc}</p>
              <p>
                Sold as <strong>{p.unit}</strong> at a fixed price per pack. Fresh, unprocessed meat is GST-free. Need it cut a particular
                way? Add your instructions in the order notes at checkout.
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

          {related.length > 0 && (
            <section aria-labelledby="related-title" style={{ marginTop: 56 }}>
              <h2 id="related-title">More halal {cat.name.toLowerCase()}</h2>
              <div className="product-grid">
                {related.map((r) => (
                  <ProductCard key={r.slug} product={r} />
                ))}
              </div>
              <p style={{ marginTop: 20 }}>
                <Link href={`/shop/${cat.slug}/`}>See all {cat.name.toLowerCase()} products</Link> · <Link href="/wholesale/">Wholesale accounts</Link>
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
