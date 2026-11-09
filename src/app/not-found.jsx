import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found | Halal Meat Depot',
  description: 'The page you were looking for does not exist. Browse certified halal beef, lamb, goat, chicken and more at Halal Meat Depot, delivered Australia-wide.',
  robots: { index: false, follow: true },
}

// Deliberately no Header/Footer: Next embeds this component in the RSC data of EVERY page, so the full site chrome here
// added ~12 KB to every page (Semrush low text-to-HTML ratio, 2026-11-09). Links below get visitors back on track.
export default function NotFound() {
  return (
    <>
      <main id="main">
        <div className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="card stack center">
              <h1>Page not found</h1>
              <p className="muted">Sorry — that page doesn&apos;t exist or has moved.</p>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link href="/halal-meat-shop-near-me/" className="btn btn--primary">
                  Shop halal meat
                </Link>
                <Link href="/" className="btn btn--ghost">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
