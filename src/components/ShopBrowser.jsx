'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CardCart from './CardCart'

// Shop page browser: left sidebar (categories, subcategories, price range) filtering a
// product grid in place. Receives a light product index as props so the full catalogue
// module never ships to the browser. Filters mirror to the URL (?cat=&sub=&min=&max=).
const PAGE = 24
const money = (n) => `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $250', min: 100, max: 250 },
  { label: '$250 – $500', min: 250, max: 500 },
  { label: '$500 – $1,000', min: 500, max: 1000 },
  { label: '$1,000 and over', min: 1000, max: null },
]
const SORTS = { featured: 'Featured', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low', 'kg-asc': 'Price per kg: low to high' }

export default function ShopBrowser({ categories, products }) {
  const [cat, setCat] = useState('')
  const [sub, setSub] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [sort, setSort] = useState('featured')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState(false)

  // Read filters from the URL once on load (shareable filtered views).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    // Old ?cat= links forward to the category's own page.
    const legacyCat = q.get('cat')
    if (legacyCat && categories.some((c) => c.slug === legacyCat)) {
      window.location.replace(`${categories.find((c) => c.slug === legacyCat).path}${q.get("sub") ? `#${q.get("sub")}` : ""}`)
      return
    }
    setCat(q.get('cat') || '')
    setSub(q.get('sub') || '')
    setMin(q.get('min') || '')
    setMax(q.get('max') || '')
    setSort(SORTS[q.get('sort')] ? q.get('sort') : 'featured')
  }, [])

  useEffect(() => {
    const q = new URLSearchParams()
    if (cat) q.set('cat', cat)
    if (sub) q.set('sub', sub)
    if (min !== '') q.set('min', min)
    if (max !== '') q.set('max', max)
    if (sort !== 'featured') q.set('sort', sort)
    const s = q.toString()
    window.history.replaceState(null, '', s ? `?${s}` : window.location.pathname)
    setShown(PAGE)
  }, [cat, sub, min, max, sort])

  const list = useMemo(() => {
    const lo = min === '' ? -Infinity : Number(min)
    const hi = max === '' ? Infinity : Number(max)
    const out = products.filter((p) => (!cat || p.cat === cat) && (!sub || p.subId === sub) && p.price >= lo && p.price <= hi)
    if (sort === 'price-asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') out.sort((a, b) => b.price - a.price)
    if (sort === 'kg-asc') out.sort((a, b) => a.perKg - b.perKg)
    return out
  }, [products, cat, sub, min, max, sort])

  const pick = (c, s = '') => (e) => {
    e.preventDefault()
    setCat(c)
    setSub(s)
    setOpen(false)
  }
  const setRange = (r) => {
    setMin(String(r.min))
    setMax(r.max == null ? '' : String(r.max))
  }
  const rangeActive = (r) => min === String(r.min) && max === (r.max == null ? '' : String(r.max))
  const clear = () => {
    setCat('')
    setSub('')
    setMin('')
    setMax('')
  }
  const active = cat || sub || min !== '' || max !== ''
  const catName = categories.find((c) => c.slug === cat)?.name
  const subName = categories.find((c) => c.slug === cat)?.subs.find((s) => s.id === sub)?.name

  return (
    <div className="shop-layout">
      <button type="button" className="btn btn--ghost shop-filter-toggle" aria-expanded={open} aria-controls="shop-sidebar" onClick={() => setOpen((v) => !v)}>
        {open ? 'Hide filters' : 'Filters'}
        {active ? ' (on)' : ''}
      </button>

      <aside id="shop-sidebar" className={`shop-sidebar${open ? ' is-open' : ''}`} aria-label="Shop filters">
        <div className="shop-side-block">
          <h2>Categories</h2>
          <ul className="shop-cats">
            <li>
              <a href="/halal-meat-shop/" className={!cat ? 'is-active' : ''} aria-current={!cat ? 'true' : undefined} onClick={pick('')}>
                All products <span>{products.length}</span>
              </a>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                {/* Each category opens its own page (/shop/<slug>/), not an in-place filter. */}
                <Link href={`${c.path}`} className={cat === c.slug && !sub ? 'is-active' : ''} aria-current={cat === c.slug && !sub ? 'true' : undefined}>
                  {c.name} <span>{c.count}</span>
                </Link>
                {cat === c.slug && c.subs.length > 0 && (
                  <ul>
                    {c.subs.map((s) => (
                      <li key={s.id}>
                        <a href={`${c.path}#${s.id}`} className={sub === s.id ? 'is-active' : ''} aria-current={sub === s.id ? 'true' : undefined} onClick={pick(c.slug, s.id)}>
                          {s.name} <span>{s.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="shop-side-block">
          <h2>Price range</h2>
          <p className="muted shop-side-note">Price per pack</p>
          <ul className="shop-ranges">
            {RANGES.map((r) => (
              <li key={r.label}>
                <button type="button" className={rangeActive(r) ? 'is-active' : ''} aria-pressed={rangeActive(r)} onClick={() => (rangeActive(r) ? (setMin(''), setMax('')) : setRange(r))}>
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="shop-price-inputs">
            <label>
              <span>Min $</span>
              <input type="number" inputMode="numeric" min="0" step="1" value={min} onChange={(e) => setMin(e.target.value)} placeholder="0" />
            </label>
            <label>
              <span>Max $</span>
              <input type="number" inputMode="numeric" min="0" step="1" value={max} onChange={(e) => setMax(e.target.value)} placeholder="Any" />
            </label>
          </div>
        </div>

        {active && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>
            Clear all filters
          </button>
        )}
      </aside>

      <div className="shop-main">
        <div className="shop-toolbar">
          <p aria-live="polite">
            <strong>{list.length}</strong> {list.length === 1 ? 'product' : 'products'}
            {catName ? ` in ${catName}` : ''}
            {subName ? ` › ${subName}` : ''}
          </p>
          <label className="shop-sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        {list.length === 0 ? (
          <div className="card card--tint">
            <p style={{ margin: 0 }}>
              No products match these filters.{' '}
              <button type="button" className="link-btn" onClick={clear}>
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {list.slice(0, shown).map((p, i) => (
              <article key={p.slug} className="product-card">
                <Link href={`/product/${p.slug}/`} className="product-frame" tabIndex={-1} aria-hidden="true">
                  {p.badge && <span className={`badge badge--${p.badge.replace(/\s+/g, '')}`}>{p.badge}</span>}
                  <Image src={p.img} alt={p.imgAlt} title={p.imgTitle} fill sizes="(max-width: 560px) 100vw, (max-width: 1180px) 50vw, 30vw" priority={i < 2} />
                </Link>
                <div className="product-body">
                  <span className="product-meta">
                    {p.catName} · {p.sub}
                  </span>
                  <h3 className="product-title">
                    <Link href={`/product/${p.slug}/`}>{p.name}</Link>
                  </h3>
                  <p className="product-short">{p.short}</p>
                  <div className="price-row">
                    <span className="price">{money(p.price)}</span>
                    <span className="unit">{p.unit}</span>
                    <span className="per-kg">≈ {money(p.perKg)}/kg</span>
                  </div>
                  <CardCart key={p.slug} slug={p.slug} name={p.name} idPrefix="shop" />
                </div>
              </article>
            ))}
          </div>
        )}

        {shown < list.length && (
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + PAGE)}>
              Show more ({list.length - shown} left)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
