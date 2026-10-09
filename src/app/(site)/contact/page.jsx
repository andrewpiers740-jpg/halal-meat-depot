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
  title: 'Contact Halal Meat Depot | Greenacre, Sydney',
  description: 'Contact Halal Meat Depot in Greenacre, Sydney for orders, wholesale, event orders and halal certificate requests. Call, WhatsApp, email or message us.',
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
            Questions about cuts, quantities, event orders or our halal certificate? WhatsApp is the fastest way to reach us, or send a message
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
                . Need a copy of our halal certificate? Choose &ldquo;Halal certificate request&rdquo; in the form. See also the{' '}
                <Link href="/faq/">FAQ</Link>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
