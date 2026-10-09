'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ConfirmPaymentForm() {
  const id = useSearchParams().get('id') || ''
  const [state, setState] = useState({ s: 'idle', msg: '' })

  async function submit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('id', id)
    setState({ s: 'sending', msg: '' })
    const res = await fetch('/api/order/confirm-payment/', { method: 'POST', body: fd })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) setState({ s: 'done', msg: '' })
    else setState({ s: 'error', msg: data.error || 'Upload failed. Please try again or send the screenshot on WhatsApp.' })
  }

  if (state.s === 'done')
    return <p className="notice notice--ok">Thank you — we&apos;ve received your payment confirmation for order {id}. We&apos;ll be in touch to confirm your delivery date.</p>

  return (
    <form className="form" onSubmit={submit}>
      <p>
        Order <strong>{id || '—'}</strong>
      </p>
      <div aria-live="polite">{state.s === 'error' && <p className="notice notice--err">{state.msg}</p>}</div>
      <div className="field">
        <label htmlFor="cp-file">Payment screenshot or receipt</label>
        <input id="cp-file" name="file" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" required />
        <p className="hint">JPG, PNG, WebP or HEIC, up to 4MB.</p>
      </div>
      <div className="field">
        <label htmlFor="cp-note">Note (optional)</label>
        <textarea id="cp-note" name="note" placeholder="e.g. paid from my business account; crypto transaction ID" />
      </div>
      <div>
        <button type="submit" className="btn btn--primary" disabled={state.s === 'sending' || !id}>
          {state.s === 'sending' ? 'Uploading…' : 'Upload confirmation'}
        </button>
      </div>
    </form>
  )
}
