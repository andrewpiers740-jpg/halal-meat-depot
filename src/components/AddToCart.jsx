'use client'
import { useState } from 'react'
import Link from 'next/link'
import QtyStepper from './QtyStepper'
import { addToCart } from '@/lib/cart-client'

export default function AddToCart({ slug, name, idPrefix = 'q', showViewCart = false }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const onAdd = () => {
    addToCart(slug, qty)
    setQty(1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="stack" style={{ marginTop: 0 }}>
      <div className="add-row">
        <QtyStepper id={`${idPrefix}-${slug}`} value={qty} onChange={setQty} label={`Quantity of ${name}`} />
        <button type="button" className="btn btn--primary" onClick={onAdd} aria-label={`Add ${name} to cart`}>
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {added ? `${name} added to cart` : ''}
      </p>
      {showViewCart && added && (
        <Link href="/cart/" className="btn btn--ghost btn--block">
          View cart &amp; checkout
        </Link>
      )}
    </div>
  )
}
