import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryChips from '@/components/CategoryChips'
import ProductCard from '@/components/ProductCard'
import { SITE, CATEGORIES, POSTS, categoryBySlug, productsInCategory } from '@/config/site'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ cat: c.slug }))
}

function describe(c, items) {
  const low = Math.min(...items.map((p) => p.price))
  const base = `Buy ${c.kw} online: ${c.subcategories.slice(0, 3).join(', ').toLowerCase()} and more. ${items.length} products from ${money(low)}, certified by Halal Control Australia.`
  return base.length > 158 ? `Buy ${c.kw} online — ${items.length} products from ${money(low)}. Certified by Halal Control Australia, delivered Australia-wide.` : base
}

export async function generateMetadata({ params }) {
  const { cat } = await params
  const c = categoryBySlug(cat)
  if (!c) return {}
  const items = productsInCategory(c.slug)
  const title = `${c.name === 'Wholesale Cartons' ? 'Wholesale Halal Meat Cartons' : `Halal ${c.name} Online`} | Halal Meat Depot`
  return pageMeta({ title, description: describe(c, items), path: `/shop/${c.slug}/` })
}

export default async function CategoryPage({ params }) {
  const { cat } = await params
  const c = categoryBySlug(cat)
  if (!c) notFound()
  const items = productsInCategory(c.slug)
  const groups = c.subcategories.map((sub) => ({ sub, items: items.filter((p) => p.sub === sub) })).filter((g) => g.items.length)
  const related = POSTS.filter((p) => p.body.some((b) => typeof b[1] === 'string' && b[1].includes(`/shop/${c.slug}/`))).slice(0, 2)

  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Shop', path: '/shop/' }, { name: c.name, path: `/shop/${c.slug}/` }]} />
          <h1>{c.slug === 'wholesale-cartons' ? 'Wholesale halal meat cartons' : `Halal ${c.name.toLowerCase()}`}</h1>
          <p className="lead">{c.intro}</p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <CategoryChips current={c.slug} />
          {groups.map((g, i) => (
            <section key={g.sub} aria-labelledby={`sub-${i}`} style={{ marginBottom: 48 }}>
              <h2 id={`sub-${i}`}>{g.sub}</h2>
              <div className="product-grid">
                {g.items.map((p, j) => (
                  <ProductCard key={p.slug} product={p} priority={i === 0 && j < 2} />
                ))}
              </div>
            </section>
          ))}
          <div className="grid-2">
            <div className="card card--tint">
              <h2>Ordering {c.name.toLowerCase()} from Halal Meat Depot</h2>
              <p className="muted" style={{ marginBottom: 0 }}>
                All {c.name.toLowerCase()} is certified halal by {SITE.certifier} — see our <Link href="/halal-certification/">certification page</Link>.
                Minimum order ${SITE.minOrder}, free delivery over ${SITE.freeShipOver}, {SITE.cryptoDiscountPct}% off with crypto. Buying for a
                restaurant? <Link href="/wholesale/">Open a wholesale account</Link>.
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
                  <Link href="/shipping/">Delivery and pickup details</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
