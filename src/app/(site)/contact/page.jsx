import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import WebForm from '@/components/WebForm'
import Icon from '@/components/Icon'
import Email from '@/components/Email'
import { encodeEmail } from '@/components/EmailLink'
import JsonLd from '@/components/JsonLd'
import { SITE } from '@/config/site'
import { localBusinessSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { waChatLink } from '@/lib/whatsapp'

export const metadata = pageMeta({
  title: 'Contact Halal Meat Depot | Fresh Halal Meat, Greenacre',
  description: 'Contact Halal Meat Depot in Greenacre, Sydney for orders, wholesale accounts, event and bulk orders. Call, WhatsApp, email or send us a message.',
  path: '/contact/',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Contact', path: '/contact/' }]} />
          <h1>Contact Halal Meat Depot</h1>
          <p className="lead">
            Questions about cuts, quantities, wholesale or event orders? WhatsApp is the fastest way to reach us, or send a message
            below.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="container split">
          <section className="card" aria-labelledby="form-title">
            <h2 id="form-title">Send us a message</h2>
            <WebForm kind="contact" email={encodeEmail(SITE.email)} />
          </section>
          <aside className="stack" aria-label="Contact details">
            <div className="card card--dark">
              <span className="icon-badge"><Icon name="chat" /></span>
              <h2 style={{ fontSize: '1.2rem' }}>WhatsApp or call</h2>
              <p>
                <a href={`tel:+${SITE.phoneRaw}`} style={{ color: '#fff', fontWeight: 700 }}>
                  {SITE.phone}
                </a>
              </p>
              <a className="btn btn--wa" href={waChatLink()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
            <div className="card">
              <span className="icon-badge"><Icon name="mail" /></span>
              <h2 style={{ fontSize: '1.2rem' }}>Email</h2>
              <p style={{ marginBottom: 0 }}>
                Orders, wholesale and general enquiries: <Email />
              </p>
            </div>
            <div className="card card--tint">
              <span className="icon-badge"><Icon name="pin" /></span>
              <h2 style={{ fontSize: '1.2rem' }}>Business address &amp; hours</h2>
              <p style={{ marginBottom: 8 }}>{SITE.addressLine}</p>
              <ul className="check-list">
                {SITE.hours.map((h) => (
                  <li key={h.days}>
                    <Icon name="clock" /> {h.days}: {h.opens}–{h.closes}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <span className="icon-badge"><Icon name="file" /></span>
              <h2 style={{ fontSize: '1.2rem' }}>Business details</h2>
              <p className="muted" style={{ marginBottom: 0 }}>
                {SITE.name} is a business name of {SITE.legalName} · ABN{' '}
                <a href={SITE.abnUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.abn}
                </a>
                . See also the{' '}
                <Link href="/faq/">FAQ</Link>.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <section className="section section--tint" aria-labelledby="help-title">
        <div className="container prose">
          <h2 id="help-title">How we can help</h2>
          <p>
            Contact Halal Meat Depot for anything to do with an order, before or after you place it. Common questions we answer every
            day:
          </p>
          <ul>
            <li>
              <strong>Choosing cuts and quantities.</strong> Tell us the dish and how many people you are feeding and we will suggest
              the right cut, pack size or whole carcass. Cutting instructions can go in the order notes at checkout.
            </li>
            <li>
              <strong>Orders and payment.</strong> The minimum order is ${SITE.minOrder} across your whole cart. We email PayID, bank
              transfer or crypto payment details after you order, and crypto takes {SITE.cryptoDiscountPct}% off your meat total.
            </li>
            <li>
              <strong>Delivery.</strong> We deliver Australia-wide from Greenacre (delivery only, no pickup): Standard Delivery is free
              over ${SITE.freeShipOver}, otherwise ${SITE.flatShip}, and Priority Delivery is priced by distance. See{' '}
              <Link href="/halal-meat-delivery/">halal meat delivery</Link> for zones and times.
            </li>
            <li>
              <strong>Wholesale and events.</strong> Restaurants, caterers and large family or community events can ask about cartons,
              catering packs and regular orders on our <Link href="/halal-meat-wholesale/">halal meat wholesale</Link> page.
            </li>
            <li>
              <strong>A problem with an order.</strong> If anything arrives damaged, spoiled, incorrect or missing, contact us within
              48 hours as set out in our <Link href="/refund/">refund and returns policy</Link>.
            </li>
          </ul>
          <p>
            Every product is certified halal by {SITE.certifier} (see our <Link href="/halal-certified-meat/">halal certified meat</Link>{' '}
            page). Read more <Link href="/about/">about Halal Meat Depot</Link>, our <Link href="/terms/">terms of sale</Link> and how we
            handle your details in our <Link href="/privacy/">privacy policy</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
