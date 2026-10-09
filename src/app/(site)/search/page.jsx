import { Suspense } from 'react'
import Link from 'next/link'
import SearchView from '@/components/SearchView'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Search Halal Meat | Halal Meat Depot',
  description: 'Search every halal meat product and guide at Halal Meat Depot — beef, lamb, goat, chicken, camel, duck, kangaroo, buffalo and trade cartons.',
  path: '/search/',
  noindex: true,
})

export default function SearchPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <h1>Search</h1>
          <p className="lead">
            Find a cut by name, or <Link href="/shop/">browse the full range</Link>.
          </p>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <Suspense fallback={<p>Loading search…</p>}>
            <SearchView />
          </Suspense>
        </div>
      </div>
    </>
  )
}
