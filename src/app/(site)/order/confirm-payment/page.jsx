import { Suspense } from 'react'
import ConfirmPaymentForm from '@/components/ConfirmPaymentForm'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Confirm Your Payment | Halal Meat Depot',
  description: 'Upload a screenshot or receipt of your payment for your Halal Meat Depot order so we can confirm it and schedule your delivery or pickup.',
  path: '/order/confirm-payment/',
  noindex: true,
})

export default function ConfirmPaymentPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="card stack">
          <h1 style={{ fontSize: '1.9rem' }}>Confirm your payment</h1>
          <Suspense fallback={<p>Loading…</p>}>
            <ConfirmPaymentForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
