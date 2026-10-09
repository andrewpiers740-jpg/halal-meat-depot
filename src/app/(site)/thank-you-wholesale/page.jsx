import Link from 'next/link'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Wholesale Enquiry Received | Halal Meat Depot',
  description: 'Thanks for your wholesale enquiry. We will review your requirements and contact you with pricing for your regular halal meat cuts and volumes.',
  path: '/thank-you-wholesale/',
  noindex: true,
})

export default function ThankYouWholesalePage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card stack">
          <h1>Thanks — your wholesale enquiry is in</h1>
          <p>We&apos;ll review your cuts and volumes and get back to you with pricing. In the meantime you can order trade cartons online.</p>
          <div className="btn-row">
            <Link href="/shop/wholesale-cartons/" className="btn btn--primary">
              Browse trade cartons
            </Link>
            <Link href="/shop/" className="btn btn--ghost">
              Full range
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
