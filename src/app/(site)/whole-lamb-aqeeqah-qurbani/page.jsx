import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import JsonLd from '@/components/JsonLd'
import ProductCard from '@/components/ProductCard'
import { SITE, productBySlug } from '@/config/site'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { money } from '@/lib/order'
import { waChatLink } from '@/lib/whatsapp'

// Commercial landing page for whole-animal orders (searches: "whole lamb for sale
// sydney", "whole lamb price", "qurbani price australia"). Only confirmed facts:
// the carcass products, their prices, the certifier and delivery rules. No claims
// about slaughter method or timing — those details come from the owner.
export const metadata = pageMeta({
  title: 'Whole Lamb & Goat for Aqeeqah and Qurbani | Halal Meat Depot',
  description:
    'Whole lamb or goat for Aqeeqah and Qurbani — whole and half carcasses, certified halal by Halal Control Australia and delivered Australia-wide.',
  path: '/whole-lamb-aqeeqah-qurbani/',
})

const SLUGS = ['whole-lamb-carcass', 'half-lamb-carcass', 'whole-goat-carcass', 'half-goat-carcass', 'whole-mutton-carcass', 'whole-lamb-catering-pack']

export default function AqeeqahQurbaniPage() {
  const items = SLUGS.map(productBySlug).filter(Boolean)
  const lamb = productBySlug('whole-lamb-carcass')
  const goat = productBySlug('whole-goat-carcass')
  const faqs = [
    {
      q: 'How much does a whole lamb cost for Aqeeqah or Qurbani?',
      a: `A whole lamb carcass (${lamb.unit}) is ${money(lamb.price)} at ${money(lamb.perKg)} per kg. A whole goat carcass (${goat.unit}) is ${money(goat.price)} at ${money(goat.perKg)} per kg. Half carcasses are also available.`,
    },
    {
      q: 'Is the meat certified halal?',
      a: `Yes. Every product we sell is certified halal by ${SITE.certifier}, certificate No. ${SITE.certificate.number}, valid until ${SITE.certificate.validUntil}. You can view the certificate on our halal certification page.`,
    },
    {
      q: 'Do you deliver whole lamb and goat outside Sydney?',
      a: `Yes. We deliver Australia-wide from our Greenacre, Sydney depot. A whole carcass order is above our $${SITE.minOrder} minimum, and delivery is free on orders over $${SITE.freeShipOver}.`,
    },
    {
      q: 'How do I arrange an Aqeeqah or Qurbani order?',
      a: `Message us on WhatsApp on ${SITE.phone} before you order, tell us what you need and when, and we will help you choose the right carcass. You can then order online or confirm the order over WhatsApp.`,
    },
  ]

  return (
    <>
      <JsonLd data={[faqSchema(faqs)]} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Aqeeqah & Qurbani', path: '/whole-lamb-aqeeqah-qurbani/' }]} />
          <h1>Whole lamb and goat for Aqeeqah and Qurbani</h1>
          <p className="lead">
            {SITE.name} sells whole and half lamb and goat carcasses for Aqeeqah and Qurbani, certified halal by {SITE.certifier} and
            delivered Australia-wide from Sydney. A whole lamb starts at {money(lamb.price)} and a whole goat at {money(goat.price)}.
          </p>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <a href={waChatLink()} className="btn btn--accent" target="_blank" rel="noopener noreferrer">
              Arrange your order on WhatsApp <Icon name="arrow" />
            </a>
            <Link href="/shop/lamb/#whole-and-half-carcass" className="btn btn--ghost">
              Browse lamb
            </Link>
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="aq-range">
        <div className="container">
          <div className="section-head">
            <h2 id="aq-range">Whole and half carcasses</h2>
            <p>Priced per pack with the price per kilo shown, so you know the cost before you order.</p>
          </div>
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="aq-what">
        <div className="container prose">
          <h2 id="aq-what">Aqeeqah and Qurbani at a glance</h2>
          <p>
            Aqeeqah is the Islamic tradition of sacrificing an animal to give thanks for the birth of a child. Qurbani (also called Udhiyah)
            is the sacrifice made at Eid al-Adha. Both are commonly a lamb, goat or larger animal, with the meat shared between family,
            friends and those in need.
          </p>
          <p>
            Every carcass we supply is certified halal by {SITE.certifier} — see our <Link href="/halal-certification/">halal certificate</Link>.
            For rulings on your own Aqeeqah or Qurbani, please follow the guidance of your local imam or scholar.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="aq-faq">
        <div className="container prose">
          <h2 id="aq-faq">Aqeeqah and Qurbani orders: common questions</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <p>
            Buying for a larger gathering? See our <Link href="/shop/bulk-meat-boxes/">bulk halal meat cartons</Link> or{' '}
            <Link href="/halal-meat-wholesale/">wholesale supply</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
