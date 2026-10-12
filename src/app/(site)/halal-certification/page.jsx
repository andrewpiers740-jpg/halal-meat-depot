import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import Regulators from '@/components/Regulators'
import { SITE, CATEGORIES } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Halal Certification — Halal Control Australia | HMD',
  description: 'Every product at Halal Meat Depot is certified halal by Halal Control Australia. See what halal certification covers and how meat is regulated in Australia.',
  path: '/halal-certification/',
})

export default function HalalCertificationPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Halal Certification', path: '/halal-certification/' }]} />
          <h1>Our halal certification</h1>
          <p className="lead">
            Every product sold by Halal Meat Depot — across all {CATEGORIES.length} categories — is certified halal by {SITE.certifier}.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="cert-title">
        <div className="container split">
          <div className="prose">
            <h2 id="cert-title">Certified by {SITE.certifier}</h2>
            <p>
              Halal certification in Australia is issued by independent Islamic certification organisations, which audit suppliers against
              their published halal standard. We use a single certifier, {SITE.certifier}, for our entire range —{' '}
              {CATEGORIES.map((c) => c.name.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')} — so there is one clear answer to the question &ldquo;who certifies this
              meat?&rdquo;
            </p>
            <h2>What halal certification covers</h2>
            <p>A halal certifier typically checks that:</p>
            <ul>
              <li>slaughter is carried out according to the certifier&apos;s halal standard, by a Muslim slaughterman, with the name of Allah invoked;</li>
              <li>the animal species is permissible;</li>
              <li>halal products are kept separate from non-halal products through processing, storage and transport;</li>
              <li>records let each product be traced to a certified source.</li>
            </ul>
            <Regulators title="Who regulates the meat we sell" />
            <p>
              If a specific requirement matters to you, we recommend reading {SITE.certifier}&apos;s published standard or asking us before you order.
              Our guide <Link href="/blog/what-halal-certification-means-australia/">What halal certification means when you buy meat in Australia</Link>{' '}
              explains more.
            </p>
          </div>
          <div className="stack">
            <div className="cert-box" style={{ padding: 22 }}>
              <Icon name="shield" />
              <div>
                <strong style={{ fontSize: '1.1rem' }}>{SITE.certifier}</strong>
                <br />
                Certifier for 100% of our range.
              </div>
            </div>
            <div className="card card--tint">
              <h2 style={{ fontSize: '1.2rem' }}>Certified categories</h2>
              <ul className="check-list">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Icon name="check" /> <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 style={{ fontSize: '1.2rem' }}>Business details</h2>
              <p className="muted" style={{ marginBottom: 0 }}>
                {SITE.name} is a business name of {SITE.legalName}, {SITE.addressLine} · ABN{' '}
                <a href={SITE.abnUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.abn}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
