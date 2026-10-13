import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import WebForm from '@/components/WebForm'
import { encodeEmail } from '@/components/EmailLink'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/Icon'
import { SITE, WHOLESALE_TIERS, productsInCategory } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Halal Meat Wholesale Sydney | Restaurant Supplier | HMD',
  description: 'Halal meat wholesale from Sydney for restaurants, takeaways, caterers and butchers Australia-wide. Trade cartons or a weekly account. HCA certified.',
  path: '/halal-meat-wholesale/',
})

export default function WholesalePage() {
  const cartons = productsInCategory('wholesale-cartons')
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Wholesale', path: '/halal-meat-wholesale/' }]} />
          <h1>Halal meat wholesale for restaurants, caterers and butchers</h1>
          <p className="lead">
            {SITE.name} is a Sydney halal meat wholesaler supplying restaurants, takeaways, caterers, butchers and community events
            Australia-wide — every product certified by {SITE.certifier} (certificate No. {SITE.certificate.number}). Order trade
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
              Carton pricing for kitchens that go through volume every week. See also bulk packs in <Link href="/shop/halal-chicken/">chicken</Link>,{' '}
              <Link href="/shop/lamb/">lamb</Link> and <Link href="/shop/goat-meat-for-sale/">goat</Link>.
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
                Everything we supply is certified halal by {SITE.certifier}, so one supplier covers your whole menu.
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
