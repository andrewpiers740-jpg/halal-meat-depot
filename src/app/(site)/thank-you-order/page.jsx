import { Suspense } from 'react'
import Link from 'next/link'
import ThankYouOrder from '@/components/ThankYouOrder'
import { pageMeta } from '@/lib/meta'
import { waChatLink } from '@/lib/whatsapp'

export const metadata = pageMeta({
  title: 'Order Received | Halal Meat Depot',
  description: 'Thank you for your halal meat order. Watch for our follow-up email with payment details, then we confirm your delivery or pickup date with you.',
  path: '/thank-you-order/',
  noindex: true,
})

// Rule: this page says "watch for the payment-details email" ONLY — no bank
// details, deadlines or screenshot requests. Those come from the portal.
export default function ThankYouOrderPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card stack">
          <h1>Thank you — we&apos;ve received your order</h1>
          <Suspense fallback={null}>
            <ThankYouOrder />
          </Suspense>
          <p>A confirmation email with a copy of your order is on its way to you.</p>
          <h2 style={{ fontSize: '1.2rem' }}>What happens next</h2>
          <p>
            Watch for a follow-up email from us with the payment details for the method you chose. Your order is confirmed once payment is
            received, and we will confirm your delivery or pickup date with you.
          </p>
          <div className="btn-row">
            <Link href="/shop/" className="btn btn--primary">
              Continue shopping
            </Link>
            <Link href="/account/" className="btn btn--ghost">
              My account
            </Link>
            <a href={waChatLink()} className="btn btn--wa" target="_blank" rel="noopener noreferrer">
              Questions? WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
