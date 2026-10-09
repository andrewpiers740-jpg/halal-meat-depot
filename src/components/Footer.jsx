import Link from 'next/link'
import { SITE, CATEGORIES } from '@/config/site'
import { waChatLink } from '@/lib/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Halal Meat Depot</h2>
            <p>
              Halal beef, lamb, goat, chicken, camel, duck, kangaroo and water buffalo — certified halal by {SITE.certifier} and delivered
              Australia-wide from Greenacre, Sydney since {SITE.founded}.
            </p>
            <p>
              {SITE.addressLine}
              <br />
              <a href={`tel:+${SITE.phoneRaw}`}>{SITE.phone}</a>
              <br />
              <a href={waChatLink()} rel="noopener noreferrer" target="_blank">
                WhatsApp us
              </a>
              {SITE.email && (
                <>
                  <br />
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </>
              )}
            </p>
            <p>
              <a href={SITE.abnUrl} rel="noopener noreferrer" target="_blank">
                ABN {SITE.abn}
              </a>
            </p>
          </div>
          <nav aria-label="Shop">
            <h2>Shop</h2>
            <ul>
              <li>
                <Link href="/shop/">All products</Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/halal-certification/">Halal certification</Link></li>
              <li><Link href="/wholesale/">Wholesale accounts</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li><Link href="/faq/">FAQ</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/account/">My account</Link></li>
            </ul>
          </nav>
          <nav aria-label="Policies">
            <h2>Policies</h2>
            <ul>
              <li><Link href="/shipping/">Delivery policy</Link></li>
              <li><Link href="/refund/">Refund &amp; returns policy</Link></li>
              <li><Link href="/terms/">Terms of sale</Link></li>
              <li><Link href="/privacy/">Privacy policy</Link></li>
            </ul>
            <h2 style={{ marginTop: 24 }}>Opening hours</h2>
            <ul>
              {SITE.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.opens}–{h.closes}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {SITE.name}. All products certified halal by {SITE.certifier}.
          </span>
          <span>Prices in AUD. Fresh meat is GST-free.</span>
        </div>
      </div>
    </footer>
  )
}
