'use client'
import { useEffect, useState } from 'react'
import { addToCart } from '@/lib/cart-client'

// One document-level handler for every <CardCart /> on the page (event delegation).
// It only touches the input value, the minus button's disabled state and a data-added
// attribute — never React-rendered text — so it can't fight React's reconciliation.
const clamp = (v) => Math.max(1, Math.min(999, Math.floor(Number(v) || 1)))

export default function CartDelegate() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const timers = new WeakMap()
    const sync = (row, value) => {
      const input = row.querySelector('[data-qty-input]')
      const minus = row.querySelector('[data-qty="-1"]')
      const q = clamp(value)
      if (input) input.value = String(q)
      if (minus) minus.disabled = q <= 1
      return q
    }

    const onClick = (e) => {
      const row = e.target.closest?.('[data-cart]')
      if (!row) return
      const input = row.querySelector('[data-qty-input]')
      const step = e.target.closest('[data-qty]')
      if (step) {
        sync(row, Number(input?.value || 1) + Number(step.dataset.qty))
        return
      }
      const btn = e.target.closest('[data-add]')
      if (!btn) return
      const qty = sync(row, input?.value)
      addToCart(row.dataset.cart, qty)
      sync(row, 1)
      btn.setAttribute('data-added', '')
      clearTimeout(timers.get(btn))
      timers.set(btn, setTimeout(() => btn.removeAttribute('data-added'), 2200))
      setMsg(`${row.dataset.name} added to cart`)
    }

    const onChange = (e) => {
      if (!e.target.matches?.('[data-qty-input]')) return
      const row = e.target.closest('[data-cart]')
      if (row) sync(row, e.target.value)
    }

    document.addEventListener('click', onClick)
    document.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <p className="sr-only" aria-live="polite">
      {msg}
    </p>
  )
}
