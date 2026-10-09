'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import QtyStepper from './QtyStepper'
import { useCart, addToCart, getCart, replaceCart } from '@/lib/cart-client'
import { computeTotals, money } from '@/lib/order'
import { SITE, productBySlug } from '@/config/site'

export default function CartView() {
  const { lines, setQty, remove, clear } = useCart()
  const [undo, setUndo] = useState(null)
  const params = useSearchParams()
  const router = useRouter()

  // ?add=slug:qty,slug:qty — used by agent order drafts (create_order_draft)
  useEffect(() => {
    const add = params.get('add')
    if (!add) return
    add.split(',').forEach((pair) => {
      const [slug, q] = pair.split(':')
      if (productBySlug(slug)) addToCart(slug, Math.max(1, Math.min(999, Number(q) || 1)))
    })
    router.replace('/cart/')
  }, [params, router])

  const t = computeTotals(lines, { paymentMethod: null })
  const cryptoSaving = computeTotals(lines, { paymentMethod: 'crypto' }).discount

  const onRemove = (slug) => {
    const before = getCart()
    remove(slug)
    setUndo({ slug, before })
  }

  const onClear = () => {
    if (window.confirm('Remove every item from your cart?')) clear()
  }

  if (!t.items.length) {
    return (
      <div className="card center" style={{ maxWidth: 560, margin: '0 auto' }}>
        <h2>Your cart is empty</h2>
        <p className="muted">Browse halal beef, lamb, goat, chicken and more — all certified by {SITE.certifier}.</p>
        <Link href="/shop/" className="btn btn--primary">
          Shop halal meat
        </Link>
        {undo && (
          <p style={{ marginTop: 16 }}>
            <button type="button" className="link-btn" onClick={() => { replaceCart(undo.before); setUndo(null) }}>
              Undo remove
            </button>
          </p>
        )}
      </div>
    )
  }

  const pct = Math.min(100, Math.round((t.subtotal / SITE.freeShipOver) * 100))

  return (
    <div className="split">
      <section aria-labelledby="items-title">
        <h2 id="items-title" className="sr-only">
          Items in your cart
        </h2>
        {undo && (
          <div className="notice" role="status" style={{ marginBottom: 12 }}>
            Item removed.{' '}
            <button type="button" className="link-btn" onClick={() => { replaceCart(undo.before); setUndo(null) }}>
              Undo
            </button>
          </div>
        )}
        {t.items.map((i) => (
          <div key={i.slug} className="cart-line">
            <Link href={`/product/${i.slug}/`} className="thumb" tabIndex={-1} aria-hidden="true">
              <Image src={`/images/products/${productBySlug(i.slug).images[0]}`} alt="" fill sizes="88px" />
            </Link>
            <div>
              <div className="line-top">
                <div>
                  <Link href={`/product/${i.slug}/`} style={{ fontWeight: 700, color: 'var(--ink)', textDecoration: 'none' }}>
                    {i.name}
                  </Link>
                  <div className="muted" style={{ fontSize: '0.88rem' }}>
                    {i.unit} · {money(i.price)} each
                  </div>
                </div>
                <strong>{money(i.lineTotal)}</strong>
              </div>
              <div className="line-actions">
                <QtyStepper id={`cart-${i.slug}`} value={i.quantity} onChange={(v) => setQty(i.slug, v)} label={`Quantity of ${i.name}`} />
                <button type="button" className="link-btn" onClick={() => onRemove(i.slug)} aria-label={`Remove ${i.name} from cart`}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <p style={{ marginTop: 16 }}>
          <button type="button" className="link-btn" onClick={onClear}>
            Empty cart
          </button>{' '}
          · <Link href="/shop/">Continue shopping</Link>
        </p>
      </section>

      <aside className="card summary" aria-labelledby="summary-title">
        <h2 id="summary-title" style={{ fontSize: '1.3rem' }}>
          Order summary
        </h2>
        <div aria-live="polite">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{money(t.subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{t.shipping ? money(t.shipping) : 'Free'}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{money(t.total)}</span>
          </div>
          <p className="muted" style={{ fontSize: '0.88rem', marginTop: 8 }}>
            Pay with crypto at checkout and save {money(cryptoSaving)} ({SITE.cryptoDiscountPct}% off).
          </p>
          {t.freeShipShortfall > 0 ? (
            <>
              <div className="progress" aria-hidden="true">
                <span style={{ width: `${pct}%` }} />
              </div>
              <p style={{ fontSize: '0.9rem' }}>Add {money(t.freeShipShortfall)} more for free delivery.</p>
            </>
          ) : (
            <p className="notice notice--ok" style={{ fontSize: '0.9rem' }}>
              Your order qualifies for free delivery.
            </p>
          )}
        </div>
        {t.meetsMinimum ? (
          <Link href="/checkout/" className="btn btn--primary btn--block">
            Go to checkout
          </Link>
        ) : (
          <>
            <p className="notice notice--warn" role="status">
              The minimum order is {money(SITE.minOrder)}. Add {money(t.shortfall)} more to check out.
            </p>
            <button type="button" className="btn btn--primary btn--block" disabled aria-disabled="true">
              Go to checkout
            </button>
          </>
        )}
      </aside>
    </div>
  )
}
