import { Suspense } from 'react'
import PaymentDetailsView from '@/components/PaymentDetailsView'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Payment Details | Halal Meat Depot',
  description: 'Payment details for your Halal Meat Depot order. Tap any detail to copy it, then upload your payment confirmation so we can schedule your order.',
  path: '/order/payment-details/',
  noindex: true,
})

export default function PaymentDetailsPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card stack">
          <h1 style={{ fontSize: '1.9rem' }}>Payment details</h1>
          <Suspense fallback={<p>Loading…</p>}>
            <PaymentDetailsView />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
