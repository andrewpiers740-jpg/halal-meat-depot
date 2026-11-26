// Christmas discount (owner, 2026-11-26): 15% off the meat subtotal of every order placed with the code
// from 26 November to 24 December 2026 inclusive (Sydney time).
// Kept in its own tiny module with no imports so the pop-up (client) can use it without pulling in the catalogue.
// The server (computeTotals in src/lib/order.js) is the only authority: it re-checks the code and the dates.
export const PROMO = {
  code: 'Halal2026',
  label: 'Christmas discount',
  pct: 15,
  start: '2026-11-26', // first day (inclusive)
  end: '2026-12-24', // last day (inclusive)
  timeZone: 'Australia/Sydney',
}

/** Today's date in the promo's time zone as YYYY-MM-DD. */
export function promoToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: PROMO.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/** 'before' | 'active' | 'ended' */
export function promoWindow(now = new Date()) {
  const d = promoToday(now)
  if (d < PROMO.start) return 'before'
  if (d > PROMO.end) return 'ended'
  return 'active'
}

/**
 * Check a code typed by a customer.
 * Returns { ok: true, code, label, pct } or { ok: false, reason: 'empty' | 'invalid' | 'before' | 'ended' }.
 * The code is matched case-insensitively and trimmed.
 */
export function checkPromo(input, now = new Date()) {
  const typed = String(input || '').trim()
  if (!typed) return { ok: false, reason: 'empty' }
  if (typed.toLowerCase() !== PROMO.code.toLowerCase()) return { ok: false, reason: 'invalid' }
  const w = promoWindow(now)
  if (w !== 'active') return { ok: false, reason: w }
  return { ok: true, code: PROMO.code, label: PROMO.label, pct: PROMO.pct }
}

export const PROMO_MESSAGES = {
  empty: 'Enter a discount code first.',
  invalid: 'That code isn’t valid. Check it and try again.',
  before: 'That code isn’t active yet. It starts on 26 November.',
  ended: 'That code has expired.',
}
