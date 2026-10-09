'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminPasscodeContext'

function Composer() {
  const id = useSearchParams().get('id') || ''
  const { api } = useAdmin()
  const [e, setE] = useState(undefined)
  const [reply, setReply] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!id) return setE(null)
    api(`/api/admin/enquiries/${id}/`).then((r) => setE(r.ok ? r.data.enquiry : null))
  }, [api, id])

  if (e === undefined) return <p>Loading…</p>
  if (e === null) return <p>Open this from an enquiry. <Link href="/admin/enquiries/">Go to enquiries</Link></p>

  async function send() {
    setBusy(true)
    const r = await api('/api/admin/reply-enquiry/', { method: 'POST', body: JSON.stringify({ id: e.id, reply }) })
    setMsg(r.ok ? 'Reply sent.' : r.data.error || 'Failed to send.')
    setBusy(false)
  }

  return (
    <div className="stack">
      <p>
        <Link href={`/admin/enquiries/${e.id}/`}>← Back to enquiry</Link>
      </p>
      <h1 style={{ margin: 0 }}>Reply to {e.name}</h1>
      <div className="grid-2">
        <div className="admin-card form">
          <div className="field">
            <label htmlFor="reply">Your reply</label>
            <textarea id="reply" rows={10} value={reply} onChange={(ev) => setReply(ev.target.value)} />
          </div>
          <div aria-live="polite">{msg && <p className="notice">{msg}</p>}</div>
          <button type="button" className="btn btn--primary" onClick={send} disabled={busy || reply.trim().length < 2}>
            {busy ? 'Sending…' : `Send to ${e.email}`}
          </button>
        </div>
        <div className="preview-frame">
          <strong>Preview</strong>
          <p>Hi {e.name.split(' ')[0]},</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{reply || '…'}</p>
          <hr />
          <p className="muted" style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
            Their message: {e.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ReplyEnquiryPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Composer />
    </Suspense>
  )
}
