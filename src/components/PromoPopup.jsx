'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PROMO, promoWindow } from '@/config/promo'

// Christmas discount pop-up. Appears 5 seconds after a new visitor lands on any page while the promotion is on
// (26 Nov – 24 Dec 2026, Sydney time), then stays away for 14 days once it has been shown.
// A small corner card, not a full-screen overlay (Google penalises intrusive interstitials on phones), and it
// never takes focus. It stays off the cart, checkout, thank-you, order and admin pages.
const DELAY_MS = 5000
const QUIET_DAYS = 14
const KEY = 'hmd-promo-seen'
const SKIP = /^\/(cart|checkout|thank-you|order|admin|account)/

const readSeen = () => {
  try {
    return Number(localStorage.getItem(KEY)) || 0
  } catch {
    return 0
  }
}
const writeSeen = () => {
  try {
    localStorage.setItem(KEY, String(Date.now()))
  } catch {}
}

export default function PromoPopup({ minOrder }) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shown = useRef(false)

  useEffect(() => {
    if (shown.current || SKIP.test(pathname)) return
    if (promoWindow() !== 'active') return
    if (Date.now() - readSeen() < QUIET_DAYS * 86400000) return
    const id = setTimeout(() => {
      if (shown.current) return
      shown.current = true
      writeSeen()
      setOpen(true)
    }, DELAY_MS)
    return () => clearTimeout(id)
  }, [pathname])

  // Leaving for a page where the pop-up is not allowed closes it.
  useEffect(() => {
    if (open && SKIP.test(pathname)) setOpen(false)
  }, [pathname, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  async function copy() {
    try {
      await navigator.clipboard.writeText(PROMO.code)
    } catch {
      const t = document.createElement('textarea')
      t.value = PROMO.code
      t.setAttribute('readonly', '')
      t.style.position = 'absolute'
      t.style.left = '-9999px'
      document.body.appendChild(t)
      t.select()
      try {
        document.execCommand('copy')
      } catch {}
      document.body.removeChild(t)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!open) return null
  return (
    <div className="promo-pop" role="dialog" aria-modal="false" aria-labelledby="promo-title">
      <button type="button" className="promo-x" aria-label="Close discount offer" onClick={() => setOpen(false)}>
        ×
      </button>
      <span className="promo-tag">{PROMO.label}</span>
      <p id="promo-title" className="promo-big">
        {PROMO.pct}% off all orders
      </p>
      <p className="promo-dates">26 November to 24 December 2026. Applies to every product.</p>
      <div className="promo-code">
        <strong>{PROMO.code}</strong>
        <button type="button" className="promo-copy" onClick={copy}>
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>
      <Link href="/halal-meat-shop-near-me/" prefetch={false} className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
        Shop now
      </Link>
      <p className="promo-note">Enter the code at checkout. Minimum order ${minOrder} applies.</p>
      <p className="sr-only" aria-live="polite">
        {copied ? 'Code copied' : ''}
      </p>
    </div>
  )
}
