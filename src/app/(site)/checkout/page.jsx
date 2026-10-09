import CheckoutForm from '@/components/CheckoutForm'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Checkout | Halal Meat Depot',
  description: 'Check out your halal meat order — pay by PayID, bank transfer or crypto (10% off). Delivered Australia-wide, free on orders over $500.',
  path: '/checkout/',
  noindex: true,
})

export default function CheckoutPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Checkout</h1>
          <p className="lead">No payment is taken on this page — we email payment details after you order.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <CheckoutForm />
        </div>
      </div>
    </>
  )
}
