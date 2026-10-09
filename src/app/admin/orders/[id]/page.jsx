'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import StatusBadge, { ChannelBadge } from '@/components/admin/StatusBadge'
import { money } from '@/lib/order'
import { waLinkTo } from '@/lib/whatsapp'

export default function AdminOrder() {
  const { id } = useParams()
  const { api } = useAdmin()
  const [o, setO] = useState(undefined)

  useEffect(() => {
    api(`/api/admin/orders/${id}/`).then((r) => setO(r.ok ? r.data.order : null))
  }, [api, id])

  async function setStatus(status) {
    const r = await api(`/api/admin/orders/${id}/`, { method: 'PATCH', body: JSON.stringify({ status }) })
    if (r.ok) setO(r.data.order)
  }

  if (o === undefined) return <p>Loading order…</p>
  if (o === null) return <p>Order not found. <Link href="/admin/orders/">Back to orders</Link></p>

  return (
    <div className="stack">
      <p>
        <Link href="/admin/orders/">← All orders</Link>
      </p>
      <h1 style={{ margin: 0 }}>
        {o.orderNumber} · {money(o.amountDue)}
      </h1>
      <p>
        <StatusBadge status={o.status} /> <ChannelBadge channel={o.channel} />{' '}
        <span className="muted">{new Date(o.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</span>
      </p>
      {o.status === 'payment-confirmed' && <p className="notice">The customer has uploaded a payment confirmation — check your email for the screenshot.</p>}
      <div className="btn-row">
        <Link href={`/admin/send-payment-email/?id=${o.orderNumber}`} className="btn btn--primary">
          {o.paymentDetails ? 'Resend payment details' : 'Send payment details'}
        </Link>
        <a className="btn btn--wa" href={waLinkTo(o.customerPhone, [`Regarding your order ${o.orderNumber}:`, ''])} target="_blank" rel="noopener noreferrer">
          WhatsApp customer
        </a>
      </div>
      <div className="grid-2">
        <div className="admin-card">
          <h2 style={{ fontSize: '1.1rem' }}>Customer</h2>
          <p style={{ margin: 0 }}>
            {o.customerName}
            <br />
            <a href={`mailto:${o.customerEmail}`}>{o.customerEmail}</a>
            <br />
            <a href={`tel:${o.customerPhone}`}>{o.customerPhone}</a>
            <br />
            {o.fulfilment === 'pickup' ? 'Pickup from depot' : o.address}
            {o.userId && (
              <>
                <br />
                <span className="muted">Account holder</span>
              </>
            )}
          </p>
        </div>
        <div className="admin-card">
          <h2 style={{ fontSize: '1.1rem' }}>Payment</h2>
          <p style={{ margin: 0 }}>
            {o.paymentLabel}
            {o.discount > 0 && (
              <>
                <br />
                Crypto discount {o.discountPct}%: −{money(o.discount)}
              </>
            )}
            <br />
            Delivery: {o.shipping ? money(o.shipping) : 'Free'}
            <br />
            <strong>Total due: {money(o.amountDue)}</strong>
          </p>
          <label htmlFor="status-select" className="muted" style={{ display: 'block', marginTop: 12 }}>
            Change status
          </label>
          <select id="status-select" className="input" value={o.status} onChange={(e) => setStatus(e.target.value)} style={{ background: '#120a0b', color: '#fff' }}>
            <option value="pending">Pending</option>
            <option value="payment-sent">Payment sent</option>
            <option value="payment-confirmed">Payment confirmed</option>
          </select>
        </div>
      </div>
      <div className="admin-card table-wrap">
        <h2 style={{ fontSize: '1.1rem' }}>Items</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Qty</th>
              <th scope="col">Product</th>
              <th scope="col">Line total</th>
            </tr>
          </thead>
          <tbody>
            {o.items.map((i) => (
              <tr key={i.slug}>
                <td>{i.quantity}</td>
                <td>
                  {i.name}
                  <div className="muted" style={{ fontSize: '0.8rem' }}>{i.unit}</div>
                </td>
                <td>{money(i.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {o.notes && (
        <div className="admin-card">
          <h2 style={{ fontSize: '1.1rem' }}>Notes / cutting instructions</h2>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{o.notes}</p>
        </div>
      )}
    </div>
  )
}
