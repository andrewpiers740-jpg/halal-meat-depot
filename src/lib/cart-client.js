'use client'
// Browser cart: [{ slug, qty }] in localStorage. Prices are never stored here —
// they are always looked up from the catalogue (and recomputed on the server).
import { useSyncExternalStore, useCallback } from 'react'

const KEY = 'hmd-cart'
const EVENT = 'cart-change'
const EMPTY = '[]'

function read() {
  try {
    return localStorage.getItem(KEY) || EMPTY
  } catch {
    return EMPTY
  }
}

function write(lines) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines))
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(cb) {
  window.addEventListener(EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function getCart() {
  try {
    const v = JSON.parse(read())
    return Array.isArray(v) ? v.filter((l) => l && l.slug && l.qty > 0) : []
  } catch {
    return []
  }
}

export function addToCart(slug, qty = 1) {
  const lines = getCart()
  const i = lines.findIndex((l) => l.slug === slug)
  if (i > -1) lines[i].qty = Math.min(999, lines[i].qty + qty)
  else lines.push({ slug, qty: Math.min(999, qty) })
  write(lines)
}

export function setQty(slug, qty) {
  const q = Math.max(0, Math.min(999, Math.floor(Number(qty) || 0)))
  const lines = getCart().map((l) => (l.slug === slug ? { ...l, qty: q } : l)).filter((l) => l.qty > 0)
  write(lines)
}

export function removeLine(slug) {
  write(getCart().filter((l) => l.slug !== slug))
}

export function replaceCart(lines) {
  write(lines)
}

export function clearCart() {
  write([])
}

// React hook — server snapshot is always the empty cart (no localStorage on the server).
export function useCart() {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY)
  const lines = (() => {
    try {
      const v = JSON.parse(raw)
      return Array.isArray(v) ? v.filter((l) => l && l.slug && l.qty > 0) : []
    } catch {
      return []
    }
  })()
  const count = lines.reduce((s, l) => s + l.qty, 0)
  return { lines, count, add: useCallback(addToCart, []), setQty, remove: removeLine, clear: clearCart }
}
