import KeywordNotes from '@/components/KeywordNotes'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { FAQS } from '@/config/site'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Check Halal Food: Simple Halal Meat FAQ | HMD',
  description: 'Check halal food the easy way: answers on halal certification, Australia-wide delivery, the minimum order, PayID, bank transfer, crypto and wholesale.',
  path: '/faq-check-halal-food/',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'FAQ', path: '/faq-check-halal-food/' }]} />
          <h1>Check halal food: frequently asked questions</h1>
          <p className="lead">
            Everything about certification, ordering, delivery and payment. Still stuck? <Link href="/contact-halal-butcher-near-me/">Contact us</Link>.
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
          <p className="center muted" style={{ marginTop: 32 }}>
            More detail: <Link href="/about-halal-butcher/">about Halal Meat Depot</Link> · <Link href="/terms/">terms of sale</Link> ·{' '}
            <Link href="/privacy/">privacy policy</Link> · <Link href="/refund/">refund and returns policy</Link>
          </p>
          <p className="center" style={{ marginTop: 16 }}>
            <Link href="/halal-meat-shop-near-me/" className="btn btn--primary">
              Shop halal meat
            </Link>
          </p>
        </div>
      </section>
      <div className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <KeywordNotes path="/faq-check-halal-food/" />
        </div>
      </div>
    </>
  )
}
