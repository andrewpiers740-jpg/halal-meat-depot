import { Suspense } from 'react'
import CartView from '@/components/CartView'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Your Cart | Halal Meat Depot',
  description: 'Review your halal meat order, adjust quantities and check out. Minimum order $250, free delivery over $500 and 10% off when you pay with crypto.',
  path: '/cart/',
  noindex: true,
})

export default function CartPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Your cart</h1>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <Suspense fallback={<p>Loading your cart…</p>}>
            <CartView />
          </Suspense>
        </div>
      </div>
    </>
  )
}
