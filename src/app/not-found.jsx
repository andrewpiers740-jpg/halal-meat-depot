import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { headerProps } from '@/lib/headerProps'

export const metadata = {
  title: 'Page Not Found | Halal Meat Depot',
  description: 'The page you were looking for does not exist. Browse certified halal beef, lamb, goat, chicken and more at Halal Meat Depot, delivered Australia-wide.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header {...headerProps} />
      <main id="main">
        <div className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="card stack center">
              <h1>Page not found</h1>
              <p className="muted">Sorry — that page doesn&apos;t exist or has moved.</p>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link href="/shop/" className="btn btn--primary">
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
      <Footer />
    </>
  )
}
