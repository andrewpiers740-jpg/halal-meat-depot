import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import WebForm from '@/components/WebForm'
import { encodeEmail } from '@/components/EmailLink'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/Icon'
import { SITE, WHOLESALE_TIERS, productsInCategory } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Wholesale Halal Meat Supply | Halal Meat Depot',
  description: 'Wholesale halal meat for restaurants, takeaways, caterers and events. Trade cartons online or a weekly account. Certified by Halal Control Australia.',
  path: '/wholesale/',
})

export default function WholesalePage() {
  const cartons = productsInCategory('wholesale-cartons')
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Wholesale', path: '/wholesale/' }]} />
          <h1>Wholesale halal meat supply</h1>
          <p className="lead">
            Halal meat for restaurants, takeaways, caterers, butchers and community events — certified by {SITE.certifier}. Order trade
            cartons online today, or apply for a weekly account with a price sheet for your regular cuts.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="tiers-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How we supply</span>
            <h2 id="tiers-title">Three ways to buy wholesale</h2>
            <p>Start with online cartons and move to a weekly account as your volume grows.</p>
          </div>
          <div className="grid-3">
            {WHOLESALE_TIERS.map((t) => (
              <div key={t.name} className={`card${t.highlight ? ' card--highlight' : ''}`}>
                <span className="icon-badge"><Icon name={t.highlight ? 'users' : t.name.startsWith('Bulk') ? 'box' : 'store'} /></span>
                <h3>{t.name}</h3>
                <p className="muted">{t.who}</p>
                <ul className="check-list">
                  {t.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="cartons-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Order online now</span>
            <h2 id="cartons-title">Trade cartons</h2>
            <p>
              Carton pricing for kitchens that go through volume every week. See also bulk packs in <Link href="/shop/chicken/">chicken</Link>,{' '}
              <Link href="/shop/lamb/">lamb</Link> and <Link href="/shop/goat/">goat</Link>.
            </p>
          </div>
          <div className="product-grid product-grid--4">
            {cartons.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="apply-title">
        <div className="container split">
          <div className="card">
            <h2 id="apply-title">Apply for a wholesale account</h2>
            <p className="muted">Tell us about your business and the cuts you need — we&apos;ll come back to you with pricing.</p>
            <WebForm kind="wholesale" email={encodeEmail(SITE.email)} />
          </div>
          <div className="stack">
            <div className="card card--dark">
              <span className="icon-badge"><Icon name="shield" /></span>
              <h3>One certifier, the whole range</h3>
              <p style={{ marginBottom: 0 }}>
                Everything we supply is certified halal by {SITE.certifier}. Keep a copy of our certificate on file for your customers —{' '}
                <Link href="/contact/" style={{ color: '#f6d48f' }}>
                  request it here
                </Link>
                .
              </p>
            </div>
            <div className="card card--tint">
              <span className="icon-badge"><Icon name="percent" /></span>
              <h3>Payment</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                PayID, bank transfer or cryptocurrency — crypto payments get {SITE.cryptoDiscountPct}% off the meat total, applied automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
