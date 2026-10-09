import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryChips from '@/components/CategoryChips'
import ProductCard from '@/components/ProductCard'
import JsonLd from '@/components/JsonLd'
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site'
import { offerCatalogSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Shop Halal Meat Online — Full Range | Halal Meat Depot',
  description: `Shop ${PRODUCTS.length} halal meat products: beef, lamb, goat, chicken, camel, duck, kangaroo, buffalo and trade cartons. Certified by Halal Control Australia.`,
  path: '/shop/',
})

export default function ShopPage() {
  return (
    <>
      <JsonLd data={offerCatalogSchema()} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Shop', path: '/shop/' }]} />
          <h1>Buy halal meat online — full range</h1>
          <p className="lead">
            Every product we sell, by category: {PRODUCTS.length} packs, carcasses and cartons, all certified halal by {SITE.certifier}. Prices are
            per pack with the price per kilo shown. Minimum order ${SITE.minOrder}, free delivery over ${SITE.freeShipOver} and{' '}
            {SITE.cryptoDiscountPct}% off when you pay with crypto.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <CategoryChips />
          {CATEGORIES.map((c, i) => {
            const items = PRODUCTS.filter((p) => p.cat === c.slug)
            return (
              <section key={c.slug} aria-labelledby={`cat-${c.slug}`} style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
                  <h2 id={`cat-${c.slug}`} style={{ margin: 0 }}>
                    Halal {c.name.toLowerCase()}
                  </h2>
                  <Link href={`/shop/${c.slug}/`}>
                    All {items.length} {c.name.toLowerCase()} products →
                  </Link>
                </div>
                <div className="product-grid product-grid--4">
                  {items.slice(0, 4).map((p, j) => (
                    <ProductCard key={p.slug} product={p} priority={i === 0 && j < 2} />
                  ))}
                </div>
              </section>
            )
          })}
          <div className="card card--tint">
            <h2>Need more help choosing?</h2>
            <p className="muted">
              Read our <Link href="/blog/guide-to-halal-beef-cuts/">guide to halal beef cuts</Link>, see{' '}
              <Link href="/halal-certification/">how our meat is certified</Link>, check the <Link href="/faq/">FAQ</Link>, or open a{' '}
              <Link href="/wholesale/">wholesale account</Link> for weekly volume pricing.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
