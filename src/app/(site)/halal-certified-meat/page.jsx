import KeywordNotes from '@/components/KeywordNotes'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import Icon from '@/components/Icon'
import Regulators from '@/components/Regulators'
import { SITE, CATEGORIES } from '@/config/site'
import { pageMeta } from '@/lib/meta'
import JsonLd from '@/components/JsonLd'
import { imageObject } from '@/lib/imageSeo'

// Image SEO: the page focus keyword ("halal certified meat") in alt, title, caption and description.
const certImg = {
  alt: `Halal certified meat: certificate No. ${SITE.certificate.number} issued by ${SITE.certifier} to ${SITE.legalName}, trading as ${SITE.name}`,
  title: `Halal certified meat — ${SITE.certifier} certificate No. ${SITE.certificate.number}`,
  caption: `Our halal certified meat: certificate No. ${SITE.certificate.number} from ${SITE.certifier}, valid until ${SITE.certificate.validUntil}`,
  description: `Halal certified meat from ${SITE.name} (${SITE.legalName}): ${SITE.certifier} certificate No. ${SITE.certificate.number}, covering all meat sold, valid until ${SITE.certificate.validUntil}.`,
}

export const metadata = pageMeta({
  title: 'Halal Certified Meat — Halal Control Australia | HMD',
  description: 'All our halal certified meat is certified by Halal Control Australia. See what halal certification covers and how meat is regulated in Australia.',
  path: '/halal-certified-meat/',
})

export default function HalalCertificationPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...imageObject(`${SITE.url}${SITE.certificate.image}`, certImg, { encodingFormat: 'image/webp' }) }} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Halal Certification', path: '/halal-certified-meat/' }]} />
          <h1>Halal certified meat: our certificate</h1>
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
              Our guide <Link href="/blog/halal-meat-australia-certification/">What halal certification means when you buy meat in Australia</Link>{' '}
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
                <br />
                Certificate No. {SITE.certificate.number} · valid until {SITE.certificate.validUntil}
              </div>
            </div>
            <figure className="card" id="certificate" style={{ margin: 0 }}>
              <a href={SITE.certificate.full} target="_blank" rel="noopener noreferrer">
                <img
                  src={SITE.certificate.image}
                  width={SITE.certificate.width}
                  height={SITE.certificate.height}
                  alt={certImg.alt}
                  title={certImg.title}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius)' }}
                />
              </a>
              <figcaption className="muted" style={{ fontSize: '0.9rem', marginTop: 10 }}>
                {certImg.caption}.{' '}
                <a href={SITE.certificate.full} target="_blank" rel="noopener noreferrer">
                  View full size
                </a>
              </figcaption>
            </figure>
            <div className="card card--tint">
              <h2 style={{ fontSize: '1.2rem' }}>Certified categories</h2>
              <ul className="check-list">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Icon name="check" /> <Link href={`${c.path}`}>{c.name}</Link>
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
      <div className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <KeywordNotes path="/halal-certified-meat/" />
        </div>
      </div>
    </>
  )
}
