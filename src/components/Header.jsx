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
  const { count } = useCart()

  useEffect(() => setOpen(false), [pathname])

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
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
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
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
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
                <Link href={`/shop/${c.slug}/`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
