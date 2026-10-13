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
import { SITE, PRODUCTS, productBySlug, categoryBySlug, containsExact, powerWordCount, postBySlug } from '@/config/site'
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
  lamb: 'lamb-cuts-australia-guide',
  goat: 'goat-meat-curry-cuts-guide',
  camel: 'cooking-camel-meat-buffalo-kangaroo',
  kangaroo: 'cooking-camel-meat-buffalo-kangaroo',
  'water-buffalo': 'cooking-camel-meat-buffalo-kangaroo',
}

// The recipe / "which cut" guide each product links to, when one covers it (posts-guides.js).
// Shown alongside the category guide, so the new posts get inbound links from the products they feature.
const GUIDE_BY_PRODUCT = {
  ...Object.fromEntries(["scotch-fillet-ribeye-steaks","beef-eye-fillet-steaks","whole-beef-fillet","beef-eye-fillet-whole-mb4","angus-beef-eye-fillet-steaks-mb3-4","angus-beef-butt-eye-fillet-mb3-4","black-angus-beef-ribeye-steaks-mb3-4","beef-scotch-fillet-portion-mb4","wagyu-eye-fillet-steaks-mb5","wagyu-eye-fillet-steaks-mb9","wagyu-beef-ribeye-steak-mb5"].map((s) => [s, 'scotch-fillet-vs-porterhouse-vs-eye-fillet'])),
  ...Object.fromEntries(["sirloin-steak-beef-porterhouse","beef-porterhouse-portion","beef-porterhouse-portion-mb4","angus-beef-porterhouse-steaks-mb3-4","angus-beef-porterhouse-portion-mb3-4","rump-beef-steaks","beef-rump-portion","beef-rump-cap","angus-beef-rump-steaks-mb3-4","whole-beef-rump-black-angus-mb3-4","beef-rump-cap-mb4","beef-steak-t-bone","beef-porterhouse-minute-steaks","beef-striploin-cryovac-carton","beef-rump-cryovac-carton","wagyu-rump-steaks-mb5","wagyu-rump-steaks-mb9","wagyu-beef-porterhouse-steaks-mb5","wagyu-porterhouse-steaks-mb9"].map((s) => [s, 'sirloin-vs-porterhouse-vs-rump'])),
  ...Object.fromEntries(["buy-beef-cheeks"].map((s) => [s, 'slow-cooked-beef-cheeks'])),
  ...Object.fromEntries(["lamb-forequarter-chops","diced-lamb-boneless","lamb-curry-pieces-carton"].map((s) => [s, 'lamb-casserole-recipe'])),
  ...Object.fromEntries(["leg-of-lamb-for-sale-bone-in","lamb-leg-boned-and-rolled","half-lamb-leg-bone-in","lamb-shoulder-boned-and-rolled","lamb-shoulder-butterflied","lamb-shoulder-carton","lamb-leg-butterflied","lamb-leg-cryovac-carton","milk-fed-lamb-leg-bone-in"].map((s) => [s, 'slow-roast-lamb-slow-cooker'])),
  ...Object.fromEntries(["buy-chicken-maryland-online","chicken-drumsticks","chicken-drumstick-carton","chicken-thigh-chops"].map((s) => [s, 'chicken-maryland-recipes'])),
  ...Object.fromEntries(["premium-beef-mince","extra-lean-beef-mince","beef-mince-carton","beef-mince-with-15-liver","beef-mince-with-liver-heart-and-kidney-30"].map((s) => [s, '30-minute-beef-mince-recipes'])),
  ...Object.fromEntries(["beef-bolar-blade-roast"].map((s) => [s, 'beef-bolar-blade-roast-recipe'])),
  ...Object.fromEntries(["flat-iron-steak-beef-oyster-blade","wagyu-oyster-blade-steaks-mb9","wagyu-whole-oyster-blade-mb9","wagyu-blade-steaks-mb5","wagyu-blade-steaks-mb9"].map((s) => [s, 'beef-oyster-blade-steak-recipe'])),
  ...Object.fromEntries(["lamb-shanks","goat-foreshanks","lamb-osso-buco"].map((s) => [s, 'slow-cooked-lamb-shanks'])),
  ...Object.fromEntries(["buy-roast-beef-online-joint","beef-topside-whole","angus-standing-rib-roast-mb3-4","wagyu-topside-roast-mb9","wagyu-rump-whole-mb5","wagyu-girello-mb5-eye-round"].map((s) => [s, 'best-beef-cut-for-roasting'])),
  ...Object.fromEntries(["beef-bones-for-soup","beef-marrow-bones","beef-tendon","chicken-frames","duck-bones-carton"].map((s) => [s, 'best-bones-for-bone-broth'])),
  ...Object.fromEntries(["gravy-beef","beef-chuck-meat-steak","beef-chuck-tender","beef-shin-hammer","buy-diced-beef-online","diced-beef-carton","beef-osso-buco","wagyu-chuck-steak-mb5","beef-oxtail"].map((s) => [s, 'gravy-beef-vs-chuck'])),
  ...Object.fromEntries(["beef-stir-fry-strips","flank-steak-beef","beef-minute-steaks"].map((s) => [s, 'best-beef-for-stir-fry'])),
  ...Object.fromEntries(["buy-beef-brisket-whole","packer-cut-beef-brisket-navel-end","beef-point-end-brisket","wagyu-beef-brisket-mb9","beef-brisket-cryovac-carton","buy-beef-short-ribs","beef-asado-cut-ribs"].map((s) => [s, 'best-temperature-to-smoke-beef-brisket'])),
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = productBySlug(slug)
  if (!p) return {}
  // Focus keyword (src/config/seo.js) must appear in the title and description. When the
  // product name already contains it, "Halal <product>" leads; otherwise the keyword leads.
  const cap = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase())
  const named = containsExact(p.name, p.focus)
  // "Buy …" keywords read as a call to action, and some keywords already say "halal" — no
  // "Halal" prefix for either (avoids "Halal Buy Beef Cheeks" / "Halal Halal Lamb Sausages").
  const base = named ? p.name : cap(p.focus)
  const buying = !named && /^buy\b/i.test(p.focus)
  const kw = buying || /\bhalal\b/i.test(base) ? base : `Halal ${base}`
  // Owner rule (2026-10-13): 1–2 SEO power words per title, never inside the focus keyword.
  const pw = powerWordCount(kw) ? '' : /wagyu|angus|dry-aged/i.test(p.name) ? 'Premium ' : 'Fresh '
  const head = buying ? kw : `${pw}${kw}`
  const tail = buying ? ` | ${pw.trim() || 'Fresh'} & Certified Halal` : ''
  const title = [named || buying ? `${head}${tail} | Halal Meat Depot` : `${head} | ${p.name}`, `${head}${tail} | Halal Meat Depot`, `${head}${tail} | HMD`, `${head}${tail}`, `${head} | Fresh Halal`, head].find((t) => t.length <= 60 && powerWordCount(t) >= 1) || head.slice(0, 60)
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
  // Offsets 1, -1, 4: neighbouring products no longer share most of their related cards (near-duplicate
  // pages, audit 2026-10-13); each offset is a bijection, so every product still gets 3 inbound links.
  const related = [...new Set([1, -1, 4].map((d) => siblings[(at + d + siblings.length) % siblings.length]))].filter((x) => x && x.slug !== p.slug).slice(0, 3)
  const guides = [...new Set([GUIDE_BY_PRODUCT[p.slug], GUIDE_BY_CAT[p.cat] || 'halal-meat-australia-certification'])].map(postBySlug).filter(Boolean)
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
                    <Link href="/halal-certified-meat/#certificate">view certificate</Link>.
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
                  <Icon name="chilled" /> Packed {/frozen/i.test(`${p.unit} ${p.name}`) ? 'frozen' : 'chilled'} and dispatched once payment clears
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
                supporting keywords are exact phrases from the owner's keyword files (src/config/product-keywords.js). */}
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
              {copy.cookNotes.length > 0 && <p>{copy.cookNotes.join(' ')}</p>}
              <p>
                More in our {guides.length > 1 ? 'guides' : 'guide'}:{' '}
                {guides.map((g, i) => (
                  <span key={g.slug}>
                    {i > 0 && ' · '}
                    <Link href={`/blog/${g.slug}/`}>{g.title}</Link>
                  </span>
                ))}
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
