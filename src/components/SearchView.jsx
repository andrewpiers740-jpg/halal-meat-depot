'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { searchProducts, searchPosts } from '@/lib/catalog'
import { money } from '@/lib/order'
import { categoryBySlug } from '@/config/site'

export default function SearchView() {
  const params = useSearchParams()
  const router = useRouter()
  const initial = params.get('q') || ''
  const [q, setQ] = useState(initial)

  useEffect(() => setQ(initial), [initial])

  const products = q.trim() ? searchProducts({ query: q }) : []
  const posts = q.trim() ? searchPosts(q) : []

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          router.replace(`/search/?q=${encodeURIComponent(q.trim())}`)
        }}
        className="form-row"
        style={{ alignItems: 'end', marginBottom: 28 }}
      >
        <div className="field">
          <label htmlFor="search-q">Search products and guides</label>
          <input id="search-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. goat curry, chicken thigh, wagyu" autoComplete="off" />
        </div>
        <div>
          <button type="submit" className="btn btn--primary">
            Search
          </button>
        </div>
      </form>
      <div aria-live="polite">
        {q.trim() && (
          <p className="muted">
            {products.length} product{products.length === 1 ? '' : 's'} and {posts.length} guide{posts.length === 1 ? '' : 's'} for &ldquo;{q.trim()}&rdquo;
          </p>
        )}
      </div>
      {products.length > 0 && (
        <ul className="grid-2" style={{ listStyle: 'none', padding: 0 }}>
          {products.map((p) => (
            <li key={p.slug} className="card card--flat">
              <span className="product-meta">{categoryBySlug(p.cat)?.name}</span>
              <h2 style={{ fontSize: '1.1rem', margin: '4px 0' }}>
                <Link href={`/product/${p.slug}/`}>{p.name}</Link>
              </h2>
              <p className="muted" style={{ margin: 0 }}>
                {money(p.price)} · {p.unit}
              </p>
            </li>
          ))}
        </ul>
      )}
      {posts.length > 0 && (
        <>
          <h2 style={{ marginTop: 32 }}>Guides</h2>
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {q.trim() && !products.length && !posts.length && (
        <div className="card card--tint">
          <p style={{ margin: 0 }}>
            Nothing matched. Try a shorter word, or <Link href="/shop/">browse the full range</Link>.
          </p>
        </div>
      )}
    </>
  )
}
