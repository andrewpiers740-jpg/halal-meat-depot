'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Icon from './Icon'
import { useCart } from '@/lib/cart-client'

// Receives nav data as props so the product catalogue never ships in this client bundle.
export default function Header({ siteName, nav, categories }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  // After a dropdown link is clicked, ignore hover until the pointer leaves, so the panel closes.
  const [suppress, setSuppress] = useState(false)
  const closeOnLink = (e) => {
    if (!e.target.closest('a')) return
    setShopOpen(false)
    setSuppress(true)
    setOpen(false)
  }
  const { count } = useCart()

  useEffect(() => {
    setOpen(false)
    setShopOpen(false)
  }, [pathname])

  // Escape closes the Shop dropdown (keyboard users).
  useEffect(() => {
    if (!shopOpen) return
    const onKey = (e) => e.key === 'Escape' && setShopOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [shopOpen])

  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label={`${siteName} — home`}>
          <Image src="/images/logo-mark-v2.webp" alt="" width={46} height={46} priority />
          <span>
            Halal Meat Depot
            <small>Certified Halal · Sydney</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Primary">
          <ul>
            {nav.map((n) =>
              n.href === '/shop/' ? (
                <li
                  key={n.href}
                  className={`has-mega${shopOpen ? ' is-open' : ''}${suppress ? ' is-suppressed' : ''}`}
                  onMouseLeave={() => {
                    setShopOpen(false)
                    setSuppress(false)
                  }}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setShopOpen(false)}
                >
                  <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                    {n.label}
                  </Link>
                  <button
                    type="button"
                    className="mega-toggle"
                    aria-expanded={shopOpen}
                    aria-controls="shop-mega"
                    aria-label={`${shopOpen ? 'Hide' : 'Show'} shop categories`}
                    onClick={() => setShopOpen((v) => !v)}
                  >
                    <Icon name="chevron" />
                  </button>
                  <div id="shop-mega" className="mega" onClick={closeOnLink}>
                    <div className="mega-grid">
                      {categories.map((c) => (
                        <div key={c.slug} className="mega-col">
                          <Link href={`/shop/${c.slug}/`} className="mega-cat">
                            {c.name}
                          </Link>
                          {c.subs.length > 0 && (
                            <ul>
                              {c.subs.map((s) => (
                                <li key={s.id}>
                                  <Link href={`/shop/${c.slug}/#${s.id}`}>{s.name}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <Link href="/shop/" className="mega-all">
                      View all halal meat <Icon name="arrow" />
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                    {n.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <Link href="/search/" className="icon-btn" aria-label="Search products">
            <Icon name="search" />
          </Link>
          <Link href="/account/" className="icon-btn" aria-label="My account">
            <Icon name="user" />
          </Link>
          <Link href="/cart/" className="icon-btn" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <Icon name="cart" />
            {count > 0 && (
              <span className="cart-count" aria-hidden="true">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" onClick={closeOnLink}>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faq/">FAQ</Link>
            </li>
          </ul>
          <ul className="cats" aria-label="Shop by category">
            {categories.map((c) => (
              <li key={c.slug}>
                {c.subs.length > 0 ? (
                  <details>
                    <summary>{c.name}</summary>
                    <ul>
                      <li>
                        <Link href={`/shop/${c.slug}/`}>All {c.name.toLowerCase()}</Link>
                      </li>
                      {c.subs.map((s) => (
                        <li key={s.id}>
                          <Link href={`/shop/${c.slug}/#${s.id}`}>{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
