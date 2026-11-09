// WhatsApp links. Two directions, two openers — never mixed up:
//   customer → business: opens with the greeting "Hi Halal Meat Depot,"
//   admin → customer:    opens with the bold WA_HEADER
import { SITE, REPLY } from '../config/site.js'
import { money, paymentTermsLines } from './order.js'

export const WA_HEADER = `*${SITE.name}*`

export function toWhatsAppNumber(phone) {
  let digits = String(phone || '').replace(/\D/g, '')
  if (digits.startsWith('0') && digits.length === 10) digits = '61' + digits.slice(1) // AU local mobile → international
  return digits
}

const waGreeting = () => `Hi ${SITE.name},`
const buildCustomerText = (body) => [waGreeting(), '', ...(Array.isArray(body) ? body : [body])].join('\n')
const buildAdminText = (body) => [WA_HEADER, '', ...(Array.isArray(body) ? body : [body])].join('\n')

export const hasWhatsApp = () => Boolean(REPLY.channels.whatsapp)

// customer → business
// Customer-facing links go through our own /chat/whatsapp/ hand-off (src/app/chat/whatsapp/route.js), which redirects to wa.me.
// Reason: WhatsApp returns 429 to crawlers, so direct wa.me links were reported as broken (2026-11-09). Admin→customer
// links (waLinkTo) stay direct wa.me links, as they are not part of any public page.
const viaSite = (text) => `/chat/whatsapp/?text=${encodeURIComponent(text)}`
export function waLink(body) {
  return viaSite(buildCustomerText(body))
}

// The general chat link — pre-filled greeting, cursor ready.
export function waChatLink() {
  return viaSite(`Hi ${SITE.name}, `)
}

export function waOrderLink(order) {
  const lines = [
    `New order request ${order.orderNumber}`,
    '',
    ...order.items.map((i) => `• ${i.quantity} × ${i.name} (${i.unit}) — ${money(i.lineTotal)}`),
    '',
    `Subtotal: ${money(order.subtotal)}`,
    ...(order.discount ? [`Crypto discount (${order.discountPct}%): −${money(order.discount)}`] : []),
    `${order.deliveryLabel || 'Delivery'}: ${order.shipping ? money(order.shipping) : 'Free'}`,
    `Total: ${money(order.amountDue)}`,
    `Payment: ${order.paymentLabel}`,
    `${order.fulfilment === 'pickup' ? 'Pickup from Greenacre depot' : `Deliver to: ${order.address}`}`,
    '',
    `Name: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `Email: ${order.customerEmail}`,
    ...(order.notes ? ['', `Notes: ${order.notes}`] : []),
  ]
  return waLink(lines)
}

export function waPaymentConfirmationLink(ref) {
  return waLink(`I've completed payment for order ${ref}.`)
}

// admin → customer
export function waPaymentDetailsMessage({ orderNumber, amountDue, opening, closing, fields }) {
  return [
    `Payment details for order ${orderNumber}`,
    `Amount due: ${money(amountDue)}`,
    '',
    opening,
    '',
    ...fields.map((f) => `${f.label}: ${f.value}`),
    '',
    closing,
    '',
    ...paymentTermsLines(orderNumber).map((l) => `• ${l}`),
    '',
    `Copy each detail here: ${SITE.url}/order/payment-details/?id=${encodeURIComponent(orderNumber)}`,
  ]
}

export function waLinkTo(phone, body) {
  return `https://wa.me/${toWhatsAppNumber(phone)}?text=${encodeURIComponent(buildAdminText(body))}`
}

export function waMessageText(body) {
  return buildAdminText(body)
}
