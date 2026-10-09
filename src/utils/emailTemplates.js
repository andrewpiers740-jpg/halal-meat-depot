// Branded transactional emails — LIGHT shell (white card, dark brand header
// band, near-black text, brand colour as accent only). Never a dark body:
// Gmail/Zoho dark mode force-invert dark emails and nothing in HTML stops it.
// Table-based inline CSS only (Outlook/Gmail/Zoho safe).
//
// Every function takes `base` — the live site origin from the request — so
// links work on the vercel.app URL today and the real domain later.
import { SITE, REPLY } from '../config/site.js'
import { money, paymentTermsHtml, paymentTermsLines } from '../lib/order.js'

const C = { page: '#F2F4F0', card: '#FFFFFF', ink: '#1B2320', soft: '#6A746E', faint: '#9AA39D', rule: '#E2E5DF' }
const ACCENT = REPLY.brand.primary
const DARK = REPLY.brand.headerDark

export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export const label = (t) =>
  `<div style="font:700 10px/1.4 Arial,Helvetica,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${C.faint};margin:0 0 4px 0;">${escapeHtml(t)}</div>`

export const field = (l, valueHtml, mb = 14) =>
  `<tr><td style="padding:0 0 ${mb}px 0;">${label(l)}<div style="font:400 14px/1.5 Arial,Helvetica,sans-serif;color:${C.ink};">${valueHtml}</div></td></tr>`

export const divider = `<tr><td style="padding:6px 0 18px 0;"><div style="height:1px;background:${C.rule};line-height:1px;font-size:1px;">&nbsp;</div></td></tr>`

export const callout = (inner) =>
  `<tr><td style="padding:4px 0 18px 0;"><div style="background:#FAF6F5;border-left:3px solid ${ACCENT};border-radius:6px;padding:14px 16px;font:400 13px/1.55 Arial,Helvetica,sans-serif;color:${C.ink};">${inner}</div></td></tr>`

export const button = (href, text) =>
  `<tr><td style="padding:6px 0 10px 0;"><a href="${escapeHtml(href)}" style="display:inline-block;background:${DARK};color:#FFFFFF;text-decoration:none;font:700 14px/1 Arial,Helvetica,sans-serif;padding:14px 22px;border-radius:999px;">${escapeHtml(text)} &rarr;</a></td></tr>`

const para = (t) => `<tr><td style="padding:0 0 14px 0;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:${C.ink};">${t}</td></tr>`

export function shell({ eyebrow, title, meta, body }) {
  const footer = SITE.domainPending ? SITE.name : `${SITE.name} · ${SITE.domain}`
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${C.page};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:12px;overflow:hidden;">
<tr><td style="background:${DARK};padding:24px 28px;">
<div style="font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#F0B4B4;">${escapeHtml(eyebrow)}</div>
<div style="font:700 22px/1.3 Arial,Helvetica,sans-serif;color:#FFFFFF;margin-top:6px;">${escapeHtml(title)}</div>
${meta ? `<div style="font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#C9BDBD;margin-top:6px;">${escapeHtml(meta)}</div>` : ''}
</td></tr>
<tr><td style="height:3px;background:${ACCENT};line-height:3px;font-size:3px;">&nbsp;</td></tr>
<tr><td style="padding:26px 28px 8px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table></td></tr>
<tr><td style="padding:16px 28px 22px 28px;border-top:1px solid ${C.rule};font:400 11px/1.6 Arial,Helvetica,sans-serif;color:${C.soft};">${escapeHtml(footer)} · ${escapeHtml(SITE.addressLine)}<br>${escapeHtml(SITE.name)} is a business name of ${escapeHtml(SITE.legalName)} · ABN ${escapeHtml(SITE.abn)}<br>${SITE.email ? `<a href="mailto:${escapeHtml(SITE.email)}" style="color:${C.soft};">${escapeHtml(SITE.email)}</a> · ` : ''}${escapeHtml(SITE.phone)} · All products certified halal by ${escapeHtml(SITE.certifier)}.</td></tr>
</table></td></tr></table></body></html>`
}

function itemsTable(order) {
  const rows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;font:400 13px/1.4 Arial,Helvetica,sans-serif;color:${C.ink};">${i.quantity} × ${escapeHtml(i.name)}<br><span style="color:${C.soft};font-size:12px;">${escapeHtml(i.unit)}</span></td><td align="right" style="padding:6px 0;font:400 13px/1.4 Arial,Helvetica,sans-serif;color:${C.ink};white-space:nowrap;">${money(i.lineTotal)}</td></tr>`
    )
    .join('')
  const line = (l, v, bold) =>
    `<tr><td style="padding:4px 0;font:${bold ? 700 : 400} 13px/1.4 Arial,Helvetica,sans-serif;color:${C.ink};">${l}</td><td align="right" style="padding:4px 0;font:${bold ? 700 : 400} 13px/1.4 Arial,Helvetica,sans-serif;color:${C.ink};">${v}</td></tr>`
  return `<tr><td style="padding:0 0 16px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}
<tr><td colspan="2" style="padding:6px 0;"><div style="height:1px;background:${C.rule};"></div></td></tr>
${line('Subtotal', money(order.subtotal))}
${order.discount ? line(`Crypto discount (${order.discountPct}%)`, `−${money(order.discount)}`) : ''}
${line(order.fulfilment === 'pickup' ? 'Pickup' : 'Delivery', order.shipping ? money(order.shipping) : 'Free')}
${line('Total due', money(order.amountDue), true)}
</table></td></tr>`
}

function customerBlock(order) {
  return (
    field('Customer', `${escapeHtml(order.customerName)}<br>${escapeHtml(order.customerEmail)}<br>${escapeHtml(order.customerPhone)}`) +
    field(order.fulfilment === 'pickup' ? 'Fulfilment' : 'Deliver to', order.fulfilment === 'pickup' ? `Pickup — ${escapeHtml(SITE.addressLine)}` : escapeHtml(order.address)) +
    field('Payment method', escapeHtml(order.paymentLabel)) +
    (order.notes ? field('Notes / cutting instructions', escapeHtml(order.notes).replace(/\n/g, '<br>')) : '')
  )
}

// → shop
export function orderNotificationEmail(order, base) {
  const html = shell({
    eyebrow: `New order · ${order.channel === 'whatsapp' ? 'via WhatsApp' : 'via website'}`,
    title: `Order ${order.orderNumber} — ${money(order.amountDue)}`,
    meta: new Date(order.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
    body: itemsTable(order) + divider + customerBlock(order) + button(`${base}/admin/orders/${order.orderNumber}/`, 'Reply in Dashboard'),
  })
  const text = [`New order ${order.orderNumber} (${order.channel})`, ...order.items.map((i) => `${i.quantity} x ${i.name} — ${money(i.lineTotal)}`), `Total due: ${money(order.amountDue)}`, `Customer: ${order.customerName}, ${order.customerEmail}, ${order.customerPhone}`, `Dashboard: ${base}/admin/orders/${order.orderNumber}/`].join('\n')
  return { subject: `New order ${order.orderNumber} — ${money(order.amountDue)} (${order.customerName})`, html, text }
}

// → customer. Never contains payment details — those follow from the portal.
export function orderConfirmationEmail(order, base) {
  const html = shell({
    eyebrow: REPLY.headerTagline,
    title: `Thanks — we've received order ${order.orderNumber}`,
    meta: `Total due ${money(order.amountDue)} · ${order.paymentLabel}`,
    body:
      para(`Hi ${escapeHtml(order.customerName.split(' ')[0])}, thank you for your order. Here is a copy for your records.`) +
      itemsTable(order) +
      callout(`<strong>What happens next:</strong> watch for a follow-up email from us with the payment details for ${escapeHtml(order.paymentLabel)}. Your order is confirmed once payment is received.`) +
      customerBlock(order) +
      button(`${base}/account/`, 'View your account'),
  })
  const text = [`Thanks — we've received order ${order.orderNumber}.`, ...order.items.map((i) => `${i.quantity} x ${i.name} — ${money(i.lineTotal)}`), `Total due: ${money(order.amountDue)}`, `Watch for a follow-up email with payment details for ${order.paymentLabel}.`].join('\n')
  return { subject: `Order ${order.orderNumber} received — ${SITE.name}`, html, text }
}

// → shop
export function enquiryNotificationEmail(enquiry, base) {
  const metaRows = Object.entries(enquiry.meta || {})
    .filter(([, v]) => v)
    .map(([k, v]) => field(k, escapeHtml(v)))
    .join('')
  const html = shell({
    eyebrow: enquiry.type === 'wholesale' ? 'New wholesale enquiry' : 'New contact enquiry',
    title: `${enquiry.name}`,
    meta: enquiry.id,
    body:
      field('From', `${escapeHtml(enquiry.name)}<br>${escapeHtml(enquiry.email)}${enquiry.phone ? `<br>${escapeHtml(enquiry.phone)}` : ''}`) +
      metaRows +
      field('Message', escapeHtml(enquiry.message).replace(/\n/g, '<br>')) +
      button(`${base}/admin/enquiries/${enquiry.id}/`, 'Reply in Dashboard'),
  })
  return { subject: `${enquiry.type === 'wholesale' ? 'Wholesale' : 'Contact'} enquiry from ${enquiry.name}`, html, text: `${enquiry.name} <${enquiry.email}>\n\n${enquiry.message}\n\n${base}/admin/enquiries/${enquiry.id}/` }
}

// → customer (from the admin composer)
export function paymentDetailsEmail({ orderNumber, amountDue, customerName, opening, closing, fields = [] }, base) {
  const detailsUrl = `${base}/order/payment-details/?id=${encodeURIComponent(orderNumber)}`
  const confirmUrl = `${base}/order/confirm-payment/?id=${encodeURIComponent(orderNumber)}`
  const rows = fields.map((f) => field(f.label, `<span style="font-family:Consolas,Menlo,monospace;font-size:15px;">${escapeHtml(f.value)}</span>`)).join('')
  const html = shell({
    eyebrow: 'Payment details',
    title: `Order ${orderNumber}`,
    meta: `Amount due ${money(amountDue)}`,
    body:
      para(`Hi ${escapeHtml(String(customerName || '').split(' ')[0] || 'there')},`) +
      field('Amount due', `<span style="font-size:20px;font-weight:700;color:${ACCENT};">${money(amountDue)}</span>`) +
      divider +
      para(escapeHtml(opening)) +
      rows +
      para(escapeHtml(closing)) +
      button(detailsUrl, 'View & copy payment details') +
      callout(`<ul style="margin:0;padding-left:18px;">${paymentTermsHtml(orderNumber, escapeHtml)}</ul>`) +
      button(confirmUrl, "I've paid — upload confirmation"),
  })
  const text = [`Payment details for order ${orderNumber}`, `Amount due: ${money(amountDue)}`, '', opening, ...fields.map((f) => `${f.label}: ${f.value}`), closing, '', ...paymentTermsLines(orderNumber), '', `Copy details: ${detailsUrl}`, `Upload confirmation: ${confirmUrl}`].join('\n')
  return { subject: `Payment details for order ${orderNumber} — ${money(amountDue)} due`, html, text }
}

// → customer (from the admin composer)
export function enquiryReplyEmail({ name, reply, originalMessage }) {
  const html = shell({
    eyebrow: REPLY.headerTagline,
    title: `Reply from ${SITE.name}`,
    body:
      para(`Hi ${escapeHtml(String(name || '').split(' ')[0] || 'there')},`) +
      para(escapeHtml(reply).replace(/\n/g, '<br>')) +
      (originalMessage ? callout(`<strong>Your message:</strong><br>${escapeHtml(originalMessage).replace(/\n/g, '<br>')}`) : ''),
  })
  return { subject: `Re: your enquiry — ${SITE.name}`, html, text: `${reply}\n\n— ${SITE.name}` }
}

// → shop, when a customer uploads a payment screenshot
export function paymentConfirmationNoticeEmail({ orderNumber, note }, base) {
  const html = shell({
    eyebrow: 'Payment confirmation uploaded',
    title: `Order ${orderNumber}`,
    body: para('The customer has uploaded a payment confirmation (attached).') + (note ? field('Customer note', escapeHtml(note)) : '') + button(`${base}/admin/orders/${orderNumber}/`, 'Open order'),
  })
  return { subject: `Payment confirmation uploaded — ${orderNumber}`, html, text: `Payment confirmation uploaded for ${orderNumber}. ${note || ''}` }
}

// → customer
export function passwordResetEmail({ name, link }) {
  const html = shell({
    eyebrow: 'Account',
    title: 'Reset your password',
    body:
      para(`Hi ${escapeHtml(String(name || '').split(' ')[0] || 'there')}, we received a request to reset the password for your ${escapeHtml(SITE.name)} account.`) +
      button(link, 'Choose a new password') +
      para(`<span style="color:${C.soft};font-size:12px;">This link expires in 1 hour. If you didn't ask for this, you can ignore this email — your password won't change.</span>`),
  })
  return { subject: `Reset your ${SITE.name} password`, html, text: `Reset your password: ${link}\nThis link expires in 1 hour.` }
}
