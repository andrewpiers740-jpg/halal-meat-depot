import Link from 'next/link'
import { pageMeta } from '@/lib/meta'
import { waChatLink } from '@/lib/whatsapp'

export const metadata = pageMeta({
  title: 'Message Sent | Halal Meat Depot',
  description: 'Thanks for contacting Halal Meat Depot. We have received your message and will reply by email or phone as soon as we can during opening hours.',
  path: '/thank-you-contact/',
  noindex: true,
})

export default function ThankYouContactPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card stack">
          <h1>Thanks — your message has been sent</h1>
          <p>We&apos;ll reply by email or phone as soon as we can during opening hours. For anything urgent, WhatsApp is the fastest way to reach us.</p>
          <div className="btn-row">
            <Link href="/shop/" className="btn btn--primary">
              Browse the shop
            </Link>
            <a href={waChatLink()} className="btn btn--wa" target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
