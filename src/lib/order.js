// Shared order logic — imported by the browser (cart, checkout) AND the server
// (API routes, emails). The server always recomputes totals from PRODUCTS, so
// a tampered client price can never change what the customer is charged.
import { SITE, REPLY, PAYMENT_METHODS, productBySlug } from '../config/site.js'

export function money(n) {
  const { code, locale } = REPLY.currency
  return new Intl.NumberFormat(locale || 'en-US', { style: 'currency', currency: code }).format(Number(n) || 0)
}

export const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100

export function findMethod(id) {
  return PAYMENT_METHODS.find((m) => m.id === id) || null
}

/**
 * Compute every total from {slug, qty} lines. Crypto discount applies to the
 * meat subtotal only (not delivery), automatically, whenever the selected
 * payment method carries a discount.
 */
export function computeTotals(lines, { paymentMethod, fulfilment = 'delivery' } = {}) {
  const items = []
  for (const line of lines || []) {
    const product = productBySlug(line.slug)
    const qty = Math.max(1, Math.min(999, Math.floor(Number(line.qty) || 0)))
    if (!product || !qty) continue
    items.push({ slug: product.slug, name: product.name, unit: product.unit, price: product.price, quantity: qty, lineTotal: round2(product.price * qty) })
  }
  const subtotal = round2(items.reduce((s, i) => s + i.lineTotal, 0))
  const method = findMethod(paymentMethod)
  const discountPct = method?.discountPct || 0
  const discount = round2((subtotal * discountPct) / 100)
  const shipping = fulfilment === 'pickup' || subtotal >= SITE.freeShipOver || subtotal === 0 ? 0 : SITE.flatShip
  const total = round2(subtotal - discount + shipping)
  return {
    items,
    subtotal,
    discountPct,
    discount,
    shipping,
    total,
    meetsMinimum: subtotal >= SITE.minOrder,
    shortfall: round2(Math.max(0, SITE.minOrder - subtotal)),
    freeShipShortfall: round2(Math.max(0, SITE.freeShipOver - subtotal)),
  }
}

// ── Order numbers ─────────────────────────────────────────────────────────
// Minted client-side so the same number appears in WhatsApp, the dashboard and
// the email. No 0/O/1/I/L — readable over the phone.
export function makeOrderNumber(prefix = REPLY.orderPrefix) {
  const t = Date.now().toString(36).toUpperCase().slice(-4)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(2))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
  let r = ''
  for (const b of bytes) r += alphabet[b % alphabet.length]
  return `${prefix}-${t}${r}`
}

export const ORDER_REF_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`)

// ── Payment details parser (any country, any rail) ────────────────────────
const KNOWN_LABELS = [
  'account name', 'account number', 'sort code', 'bank name', 'branch code', 'bsb',
  'routing number', 'beneficiary name', 'beneficiary', 'swift code', 'swift',
  'bic code', 'bic', 'iban', 'payid', 'wallet address', 'wallet', 'network', 'memo',
  'destination tag', 'tag', 'paypal email', 'paypal.me', 'paypal',
  'payment link', 'reference',
].sort((a, b) => b.length - a.length)

const LABEL_PATTERN = new RegExp(
  `^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`,
  'i'
)

function titleCase(s) {
  return s.replace(/\S+/g, (w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
}

export function parsePaymentDetail(text) {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean)
  let unlabeled = 0
  return lines.map((line) => {
    const colonIdx = line.indexOf(':')
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() }
    }
    const match = line.match(LABEL_PATTERN)
    if (match) return { label: titleCase(match[1]), value: match[2].trim() }
    unlabeled += 1
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line }
  })
}

export function paymentMethodParts(methodId, amount, ref) {
  const m = findMethod(methodId)
  const fill = (s) => String(s || '').replace(/\{amount\}/g, money(amount)).replace(/\{ref\}/g, ref)
  return { label: m?.label || methodId, opening: fill(m?.opening), closing: fill(m?.closing) }
}

// One source for payment terms — WhatsApp text, email HTML and the composer
// preview all render these same lines.
export function paymentTermsLines(ref) {
  return [
    'This order is confirmed once payment is received — it is not yet final.',
    `Use your order number — ${ref} — as the payment reference.`,
    REPLY.dispatchLine,
  ]
}

export function paymentTermsHtml(ref, escape) {
  return paymentTermsLines(ref).map((l) => `<li style="margin:0 0 6px 0;">${escape(l)}</li>`).join('')
}
