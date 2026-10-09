import nodemailer from 'nodemailer'
import { FORMS, SITE } from '../config/site.js'

export function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

let transport
function transporter() {
  if (transport) return transport
  const port = Number(process.env.SMTP_PORT || 465)
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transport
}

export function fromAddress() {
  return process.env.SMTP_FROM || FORMS.smtpFrom || process.env.SMTP_USER
}

export function destination(kind) {
  const env = { contact: 'CONTACT_EMAIL', order: 'ORDER_EMAIL', wholesale: 'WHOLESALE_EMAIL' }[kind]
  return process.env[env] || FORMS.destinations[kind] || process.env.ORDER_EMAIL || process.env.SMTP_USER || ''
}

// Never throws. Returns {sent:false, reason} so callers can degrade gracefully.
export async function sendMail({ to, subject, html, text, replyTo, attachments }) {
  if (!isMailerConfigured()) return { sent: false, reason: 'not-configured' }
  if (!to) return { sent: false, reason: 'no-recipient' }
  try {
    // Customer-facing emails reply to the business inbox by default.
    await transporter().sendMail({ from: fromAddress(), to, replyTo: replyTo || SITE.email || undefined, subject, text, html, ...(attachments ? { attachments } : {}) })
    return { sent: true }
  } catch (err) {
    console.error('sendMail failed:', err?.code || err?.message)
    return { sent: false, reason: 'send-failed' }
  }
}
