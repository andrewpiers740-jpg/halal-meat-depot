'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import StatusBadge, { ChannelBadge } from '@/components/admin/StatusBadge'
import { money } from '@/lib/order'

export default function AdminOrders() {
  const { api } = useAdmin()
  const router = useRouter()
  const [orders, setOrders] = useState(null)

  const load = useCallback(() => api('/api/admin/orders/').then((r) => setOrders(r.data.orders || [])), [api])
  useEffect(() => {
    load()
  }, [load])

  async function del(id) {
    if (!window.confirm(`Delete order ${id}? This cannot be undone.`)) return
    await api(`/api/admin/orders/${id}/`, { method: 'DELETE' })
    load()
  }

  async function delAll() {
    if (!window.confirm('Delete ALL orders? This cannot be undone.')) return
    await api('/api/admin/orders/', { method: 'DELETE' })
    load()
  }

  if (!orders) return <p>Loading orders…</p>

  return (
    <div className="stack">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Orders ({orders.length})</h1>
        {orders.length > 0 && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={delAll}>
            Delete all
          </button>
        )}
      </div>
      {orders.length === 0 ? (
        <p className="muted">No orders yet.</p>
      ) : (
        <div className="admin-card table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderNumber} className="row-link" onClick={() => router.push(`/admin/orders/${o.orderNumber}/`)}>
                  <td>
                    <Link href={`/admin/orders/${o.orderNumber}/`} onClick={(e) => e.stopPropagation()}>
                      {o.orderNumber}
                    </Link>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>
                      {new Date(o.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
                    </div>
                  </td>
                  <td>
                    {o.customerName}
                    <div className="muted" style={{ fontSize: '0.8rem' }}>{o.customerPhone}</div>
                  </td>
                  <td>{money(o.amountDue)}</td>
                  <td>{o.paymentLabel}</td>
                  <td>
                    <StatusBadge status={o.status} /> <ChannelBadge channel={o.channel} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        del(o.orderNumber)
                      }}
                      aria-label={`Delete order ${o.orderNumber}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
