'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import StatusBadge from '@/components/admin/StatusBadge'

const FILTERS = ['all', 'contact', 'wholesale', 'new', 'replied']

export default function AdminEnquiries() {
  const { api } = useAdmin()
  const router = useRouter()
  const [list, setList] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api('/api/admin/enquiries/').then((r) => setList(r.data.enquiries || []))
  }, [api])

  if (!list) return <p>Loading enquiries…</p>
  const shown = list.filter((e) => filter === 'all' || e.type === filter || e.status === filter)

  return (
    <div className="stack">
      <h1 style={{ margin: 0 }}>Enquiries ({list.length})</h1>
      <div className="filter-pills" role="group" aria-label="Filter enquiries">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="muted">Nothing here.</p>
      ) : (
        <div className="admin-card table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">From</th>
                <th scope="col">Type</th>
                <th scope="col">Message</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.id} className="row-link" onClick={() => router.push(`/admin/enquiries/${e.id}/`)}>
                  <td>
                    <Link href={`/admin/enquiries/${e.id}/`} onClick={(ev) => ev.stopPropagation()}>
                      {e.name}
                    </Link>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>
                      {new Date(e.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
                    </div>
                  </td>
                  <td>{e.type}</td>
                  <td style={{ maxWidth: 360 }}>{e.message.slice(0, 120)}{e.message.length > 120 ? '…' : ''}</td>
                  <td>
                    <StatusBadge status={e.status} />
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
