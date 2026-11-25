'use client'
import { useState } from 'react'
import AddToCart from './AddToCart'
import { money } from '@/lib/order'

// Price, weight chooser and add-to-cart for carcass products sold in several weights.
// `sizes` come from the catalogue (weight x per-kg price); the server recomputes the
// price from the same catalogue, so this is display only.
export default function ProductBuy({ slug, name, perKg, sizes }) {
  const [id, setId] = useState((sizes.find((s) => s.isDefault) || sizes[0]).id)
  const size = sizes.find((s) => s.id === id)

  return (
    <>
      <div className="price-row" style={{ marginTop: 0 }}>
        <span className="price">{money(size.price)}</span>
        <span className="unit">{size.unit}</span>
        <span className="per-kg">≈ {money(size.perKg)} per kg</span>
      </div>
      <fieldset className="size-picker">
        <legend>Choose a weight</legend>
        <div className="size-options">
          {sizes.map((s) => (
            <label key={s.id} className={`size-opt${s.id === id ? ' is-on' : ''}`}>
              <input type="radio" name={`size-${slug}`} value={s.id} checked={s.id === id} onChange={() => setId(s.id)} />
              <span className="size-kg">approx. {s.kg}kg</span>
              <span className="size-price">{money(s.price)}</span>
              <span className="size-perkg">{money(s.perKg)}/kg</span>
            </label>
          ))}
        </div>
        <p className="muted" style={{ fontSize: '0.85rem', margin: '8px 0 0' }}>
          Bigger weights cost less per kg, so you save as you buy more. Weights are close estimates, and the price shown is for the weight you choose.
        </p>
      </fieldset>
      <AddToCart slug={slug} lineKey={`${slug}~${size.id}`} name={`${name} (approx. ${size.kg}kg)`} idPrefix="pdp" showViewCart />
    </>
  )
}
