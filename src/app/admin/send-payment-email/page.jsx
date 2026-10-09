'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import WhatsAppSendPanel from '@/components/admin/WhatsAppSendPanel'
import { PAYMENT_METHODS } from '@/config/site'
import { parsePaymentDetail, paymentMethodParts, paymentTermsLines, money } from '@/lib/order'

const PLACEHOLDER = {
  payid: 'PayID: payments@yourbusiness.com.au\nAccount name: Halal Meat Depot',
  bank_transfer: 'Account name: Halal Meat Depot\nBSB: 000-000\nAccount number: 00000000\nBank name: Your Bank',
  crypto: 'Wallet address: T...\nNetwork: TRON (TRC-20)\nCurrency: USDT',
}

function Composer() {
  const id = useSearchParams().get('id') || ''
  const { api } = useAdmin()
  const [order, setOrder] = useState(undefined)
  const [methodId, setMethodId] = useState('payid')
  const [detail, setDetail] = useState('')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!id) return setOrder(null)
    api(`/api/admin/orders/${id}/`).then((r) => {
      const o = r.ok ? r.data.order : null
      setOrder(o)
      if (o) setMethodId(o.paymentMethod)
    })
  }, [api, id])

  if (order === undefined) return <p>Loading…</p>
  if (order === null) return <p>Open this from an order. <Link href="/admin/orders/">Go to orders</Link></p>

  const fields = parsePaymentDetail(detail)
  const parts = paymentMethodParts(methodId, order.amountDue, order.orderNumber)

  async function send() {
    setBusy(true)
    const r = await api('/api/admin/send-payment-email/', { method: 'POST', body: JSON.stringify({ orderNumber: order.orderNumber, methodId, detail }) })
    setResult(r.ok ? r.data : { error: r.data.error || 'Failed to send.' })
    setBusy(false)
  }

  return (
    <div className="stack">
      <p>
        <Link href={`/admin/orders/${order.orderNumber}/`}>← Back to {order.orderNumber}</Link>
      </p>
      <h1 style={{ margin: 0 }}>Send payment details</h1>
      <p className="muted">
        {order.customerName} · {order.customerEmail} · amount due {money(order.amountDue)} · customer chose {order.paymentLabel}
      </p>
      <div className="grid-2">
        <div className="admin-card form">
          <div className="field">
            <label htmlFor="pm">Payment method</label>
            <select id="pm" value={methodId} onChange={(e) => setMethodId(e.target.value)}>
              {PAYMENT_METHODS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="detail">Paste the payment details (one per line, as Label: value)</label>
            <textarea id="detail" rows={7} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder={PLACEHOLDER[methodId]} />
          </div>
          <div aria-live="polite">
            {result?.error && <p className="notice">{result.error}</p>}
            {result && !result.error && (
              <p className="notice">
                {result.emailed ? 'Payment details emailed to the customer.' : `Saved, but the email was not sent (${result.emailError}). Use WhatsApp below.`}
              </p>
            )}
          </div>
          <button type="button" className="btn btn--primary" onClick={send} disabled={busy || !fields.length}>
            {busy ? 'Sending…' : 'Send payment details'}
          </button>
        </div>
        <div className="stack">
          <div className="preview-frame">
            <strong>Preview</strong>
            <p style={{ margin: '8px 0' }}>Amount due: {money(order.amountDue)}</p>
            <p>{parts.opening}</p>
            {fields.length ? (
              <ul>
                {fields.map((f, i) => (
                  <li key={i}>
                    <strong>{f.label}:</strong> <code>{f.value}</code>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">Fields appear here as you paste.</p>
            )}
            <p>{parts.closing}</p>
            <ul style={{ fontSize: '0.9rem' }}>
              {paymentTermsLines(order.orderNumber).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          {result && !result.error && <WhatsAppSendPanel link={result.waLink} text={result.waText} />}
        </div>
      </div>
    </div>
  )
}

export default function SendPaymentEmailPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Composer />
    </Suspense>
  )
}
