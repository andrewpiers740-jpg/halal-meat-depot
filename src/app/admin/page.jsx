'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import StatusBadge, { ChannelBadge } from '@/components/admin/StatusBadge'
import { money } from '@/lib/order'

export default function AdminHome() {
  const { api } = useAdmin()
  const [d, setD] = useState(null)

  useEffect(() => {
    Promise.all([api('/api/admin/orders/'), api('/api/admin/enquiries/')]).then(([o, e]) =>
      setD({ orders: o.data.orders || [], enquiries: e.data.enquiries || [], storeConfigured: o.data.storeConfigured, mailerConfigured: o.data.mailerConfigured })
    )
  }, [api])

  if (!d) return <p>Loading dashboard…</p>
  const pending = d.orders.filter((o) => o.status === 'pending').length
  const fresh = d.enquiries.filter((e) => e.status === 'new').length

  return (
    <div className="stack">
      <h1>Dashboard</h1>
      {!d.storeConfigured && (
        <p className="notice">
          Order storage is not connected yet — orders and enquiries are still emailed (if SMTP is set) but won&apos;t appear here. Connect
          Upstash Redis in Vercel → Storage.
        </p>
      )}
      {!d.mailerConfigured && <p className="notice">Email sending is not set up yet (SMTP_* environment variables). Customers will not receive emails.</p>}
      <div className="stat-cards">
        <Link href="/admin/orders/" className="admin-card" style={{ textDecoration: 'none' }}>
          <span className="muted">Orders</span>
          <b>{d.orders.length}</b>
          <span>{pending} awaiting payment details</span>
        </Link>
        <Link href="/admin/enquiries/" className="admin-card" style={{ textDecoration: 'none' }}>
          <span className="muted">Enquiries</span>
          <b>{d.enquiries.length}</b>
          <span>{fresh} new</span>
        </Link>
      </div>
      <div className="admin-card">
        <h2 style={{ fontSize: '1.2rem' }}>Recent orders</h2>
        {d.orders.length === 0 ? (
          <p className="muted">No orders yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {d.orders.slice(0, 5).map((o) => (
              <li key={o.orderNumber} style={{ padding: '10px 0', borderBottom: '1px solid #33201f', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <Link href={`/admin/orders/${o.orderNumber}/`}>{o.orderNumber}</Link>
                <span>{o.customerName}</span>
                <span>{money(o.amountDue)}</span>
                <StatusBadge status={o.status} />
                <ChannelBadge channel={o.channel} />
              </li>
            ))}
          </ul>
        )}
        {d.orders.length > 5 && <Link href="/admin/orders/">View all orders →</Link>}
      </div>
      <div className="admin-card">
        <h2 style={{ fontSize: '1.2rem' }}>Recent enquiries</h2>
        {d.enquiries.length === 0 ? (
          <p className="muted">No enquiries yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {d.enquiries.slice(0, 5).map((e) => (
              <li key={e.id} style={{ padding: '10px 0', borderBottom: '1px solid #33201f', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <Link href={`/admin/enquiries/${e.id}/`}>{e.name}</Link>
                <span className="muted">{e.type}</span>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        )}
        {d.enquiries.length > 5 && <Link href="/admin/enquiries/">View all enquiries →</Link>}
      </div>
    </div>
  )
}
