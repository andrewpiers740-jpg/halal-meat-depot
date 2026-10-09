import { Suspense } from 'react'
import AccountView from '@/components/AccountView'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'My Account | Halal Meat Depot',
  description: 'Sign in to your optional Halal Meat Depot account to see your orders and save your delivery details, or track a guest order with your order number.',
  path: '/account/',
  noindex: true,
})

export default function AccountPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>My account</h1>
          <p className="lead">Accounts are optional — you can always check out as a guest.</p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <Suspense fallback={<p>Loading…</p>}>
            <AccountView />
          </Suspense>
        </div>
      </div>
    </>
  )
}
