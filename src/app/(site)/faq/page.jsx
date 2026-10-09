import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { FAQS } from '@/config/site'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'FAQ — Halal Meat Depot',
  description: 'Answers about halal certification, Australia-wide delivery, the minimum order, paying by PayID, bank transfer or crypto, accounts and wholesale.',
  path: '/faq/',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'FAQ', path: '/faq/' }]} />
          <h1>Frequently asked questions</h1>
          <p className="lead">
            Everything about certification, ordering, delivery and payment. Still stuck? <Link href="/contact/">Contact us</Link>.
          </p>
        </div>
      </div>
      <section className="section section--tint" aria-label="Questions and answers">
        <div className="container">
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="answer">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <p className="center" style={{ marginTop: 32 }}>
            <Link href="/shop/" className="btn btn--primary">
              Shop halal meat
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
