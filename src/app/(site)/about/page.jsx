import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import { SITE, CATEGORIES, PRODUCTS } from '@/config/site'
import { organizationSchema, speakableSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'About Halal Meat Depot | Greenacre, Sydney Since 2021',
  description: 'Halal Meat Depot is a Greenacre, Sydney halal meat supplier established in 2021, certified by Halal Control Australia and delivering Australia-wide.',
  path: '/about/',
})

export default function AboutPage() {
  const org = organizationSchema()
  return (
    <>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'AboutPage', url: `${SITE.url}/about/`, name: 'About Halal Meat Depot', mainEntity: org },
          speakableSchema('/about/', ['.about-intro']),
        ]}
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'About', path: '/about/' }]} />
          <h1>About Halal Meat Depot</h1>
          <p className="lead about-intro">{SITE.brandStatement}</p>
        </div>
      </div>

      <section className="section" aria-labelledby="story-title">
        <div className="container split">
          <div className="prose">
            <span className="eyebrow">Our story</span>
            <h2 id="story-title">A halal meat depot, not a corner butcher</h2>
            <p>
              Halal Meat Depot started in {SITE.founded} in Greenacre, in Sydney&apos;s south-west, with a simple idea: make certified halal meat
              easy to buy in the quantities families, restaurants and community groups actually need — and make it available beyond the
              local area.
            </p>
            <p>
              Instead of small retail portions, we sell practical bulk packs, whole and half carcasses and trade cartons, priced per pack
              with the price per kilo shown on every product. A household can stock the freezer for a month in one order; a restaurant can
              order its weekly curry cut and chicken fillet together; a family can order a whole lamb or goat for an Aqeeqah or a wedding
              and have it cut exactly how they want.
            </p>
            <h2>One certifier across the whole range</h2>
            <p>
              Every product we sell is certified halal by {SITE.certifier}. We use one certifier for everything so there is never any doubt
              about who stands behind the halal status of your meat, and we provide a copy of our certificate on request. Read more on our{' '}
              <Link href="/halal-certification/">halal certification page</Link>.
            </p>
            <h2>Meats that are hard to find in one place</h2>
            <p>
              Alongside everyday <Link href="/shop/beef/">beef</Link>, <Link href="/shop/lamb/">lamb</Link>, <Link href="/shop/goat/">goat</Link> and{' '}
              <Link href="/shop/chicken/">chicken</Link>, we stock <Link href="/shop/camel/">camel</Link>, <Link href="/shop/duck/">duck</Link>,{' '}
              <Link href="/shop/kangaroo/">kangaroo</Link> and <Link href="/shop/water-buffalo/">water buffalo</Link> — all certified halal, all in the
              same order. Our range currently covers {PRODUCTS.length} products across {CATEGORIES.length} categories.
            </p>
            <h2>Who we supply</h2>
            <p>
              Families and households buying in bulk; restaurants, takeaways and kebab shops; caterers and event organisers; and community
              groups ordering for Eid, weddings and Aqeeqah. Trade customers can order <Link href="/shop/wholesale-cartons/">wholesale cartons</Link>{' '}
              online or open a <Link href="/wholesale/">weekly account</Link>.
            </p>
            <h2>Delivery Australia-wide, pickup in Greenacre</h2>
            <p>
              We deliver Australia-wide. Orders are packed chilled and dispatched once payment clears, and we confirm your delivery date with
              you directly. Delivery is free on orders over ${SITE.freeShipOver}; otherwise it is a flat ${SITE.flatShip}. You can also pick up for free
              from our depot at {SITE.addressLine}. Full details are on our <Link href="/shipping/">delivery page</Link>.
            </p>
            <h2>Straightforward payment</h2>
            <p>
              We accept PayID, bank transfer and cryptocurrency, with {SITE.cryptoDiscountPct}% off your meat total when you pay in crypto. No
              payment is taken on the website: after you order, we email the payment details for your chosen method, and your order is
              confirmed once payment is received.
            </p>
          </div>
          <div className="stack">
            <div className="card card--dark">
              <h2 style={{ fontSize: '1.2rem' }}>Milestones</h2>
              <ol className="check-list" style={{ listStyle: 'none' }}>
                <li>
                  <Icon name="store" /> <span><strong>{SITE.founded}</strong> — Halal Meat Depot established in Greenacre, Sydney</span>
                </li>
                <li>
                  <Icon name="truck" /> <span><strong>Today</strong> — delivering certified halal meat Australia-wide</span>
                </li>
              </ol>
            </div>
            <div className="card card--tint">
              <h2 style={{ fontSize: '1.2rem' }}>What sets us apart</h2>
              <ul className="check-list">
                <li><Icon name="shield" /> Every product certified by {SITE.certifier}</li>
                <li><Icon name="box" /> Bulk packs, carcasses and cartons at depot prices</li>
                <li><Icon name="scale" /> Price per kilo shown on every product</li>
                <li><Icon name="utensils" /> Carcasses cut to your instructions</li>
                <li><Icon name="percent" /> {SITE.cryptoDiscountPct}% off with crypto</li>
              </ul>
            </div>
            <div className="card">
              <h2 style={{ fontSize: '1.2rem' }}>Find us</h2>
              <p className="muted">{SITE.addressLine}</p>
              <p className="muted" style={{ marginBottom: 0 }}>
                ABN{' '}
                <a href={SITE.abnUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.abn}
                </a>{' '}
                · <Link href="/contact/">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
