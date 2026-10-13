import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShopBrowser from '@/components/ShopBrowser'
import JsonLd from '@/components/JsonLd'
import { SITE, CATEGORIES, PRODUCTS, subSlug } from '@/config/site'
import { offerCatalogSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { productImageSeo } from '@/lib/imageSeo'

export const metadata = pageMeta({
  title: 'Halal Meat Shop | Buy Halal Meat Online Australia-Wide',
  description: `Halal meat shop online: ${PRODUCTS.length} beef, lamb, goat, chicken, camel, duck, kangaroo, buffalo and offal packs at depot prices, certified by Halal Control Australia.`,
  path: '/halal-meat-shop/',
})

// Light index for the client-side browser — only what a product tile needs.
const categories = CATEGORIES.map((c) => {
  const items = PRODUCTS.filter((p) => p.cat === c.slug)
  return {
    slug: c.slug,
    path: c.path,
    name: c.name,
    count: items.length,
    subs: c.subcategories
      .map((s) => ({ name: s, id: subSlug(s), count: items.filter((p) => p.sub === s).length }))
      .filter((s) => s.count > 0),
  }
})
const products = PRODUCTS.map((p) => ({
  slug: p.slug,
  name: p.name,
  cat: p.cat,
  catName: CATEGORIES.find((c) => c.slug === p.cat).name,
  sub: p.sub,
  subId: subSlug(p.sub),
  unit: p.unit,
  price: p.price,
  perKg: p.perKg,
  short: p.short,
  badge: p.badge,
  img: `/images/products/${p.images[0]}`,
  imgAlt: productImageSeo(p).alt,
  imgTitle: productImageSeo(p).title,
}))

export default function ShopPage() {
  return (
    <>
      <JsonLd data={offerCatalogSchema()} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Shop', path: '/halal-meat-shop/' }]} />
          <h1>Halal meat shop: buy halal meat online</h1>
          <p className="lead">
            {PRODUCTS.length} wholesale packs, carcasses and cartons across {CATEGORIES.length} categories, all certified halal by {SITE.certifier}.
            Filter by category, cut or price. Minimum order ${SITE.minOrder}, free delivery over ${SITE.freeShipOver} and {SITE.cryptoDiscountPct}% off
            when you pay with crypto.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <ShopBrowser categories={categories} products={products} />
          <div className="card card--tint" style={{ marginTop: 48 }}>
            <h2>Need more help choosing?</h2>
            <p className="muted">
              Read our <Link href="/blog/guide-to-halal-beef-cuts/">guide to halal beef cuts</Link>, see{' '}
              <Link href="/halal-certification/">how our meat is certified and regulated</Link>, check the <Link href="/faq/">FAQ</Link>, or open a{' '}
              <Link href="/halal-meat-wholesale/">wholesale account</Link> for weekly volume pricing.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
