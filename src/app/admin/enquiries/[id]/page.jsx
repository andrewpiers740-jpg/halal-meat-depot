'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'
import StatusBadge from '@/components/admin/StatusBadge'
import { waLinkTo } from '@/lib/whatsapp'

export default function AdminEnquiry() {
  const { id } = useParams()
  const router = useRouter()
  const { api } = useAdmin()
  const [e, setE] = useState(undefined)

  useEffect(() => {
    api(`/api/admin/enquiries/${id}/`).then((r) => setE(r.ok ? r.data.enquiry : null))
  }, [api, id])

  async function del() {
    if (!window.confirm('Delete this enquiry?')) return
    await api(`/api/admin/enquiries/${id}/`, { method: 'DELETE' })
    router.push('/admin/enquiries/')
  }

  if (e === undefined) return <p>Loading…</p>
  if (e === null) return <p>Enquiry not found. <Link href="/admin/enquiries/">Back</Link></p>

  return (
    <div className="stack">
      <p>
        <Link href="/admin/enquiries/">← All enquiries</Link>
      </p>
      <h1 style={{ margin: 0 }}>
        {e.name} <StatusBadge status={e.status} />
      </h1>
      <p className="muted">
        {e.type} enquiry · {e.id} · {new Date(e.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
      </p>
      <div className="btn-row">
        <Link href={`/admin/reply-enquiry/?id=${e.id}`} className="btn btn--primary">
          Reply by email
        </Link>
        {e.phone && (
          <a className="btn btn--wa" href={waLinkTo(e.phone, `Hi ${e.name.split(' ')[0]}, thanks for your enquiry.`)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        )}
        <button type="button" className="btn btn--ghost" onClick={del}>
          Delete
        </button>
      </div>
      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem' }}>Contact</h2>
        <p style={{ margin: 0 }}>
          <a href={`mailto:${e.email}`}>{e.email}</a>
          {e.phone && (
            <>
              <br />
              <a href={`tel:${e.phone}`}>{e.phone}</a>
            </>
          )}
        </p>
        {Object.entries(e.meta || {})
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <p key={k} style={{ margin: '8px 0 0' }}>
              <span className="muted">{k}:</span> {v}
            </p>
          ))}
      </div>
      <div className="admin-card">
        <h2 style={{ fontSize: '1.1rem' }}>Message</h2>
        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{e.message}</p>
      </div>
    </div>
  )
}
