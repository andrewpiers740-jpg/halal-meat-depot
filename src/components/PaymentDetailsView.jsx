'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import CopyField from './CopyField'
import { money, paymentTermsLines } from '@/lib/order'
import { waPaymentConfirmationLink } from '@/lib/whatsapp'

export default function PaymentDetailsView() {
  const id = useSearchParams().get('id') || ''
  const [d, setD] = useState(null)

  useEffect(() => {
    if (!id) return setD({ ok: false })
    fetch(`/api/order/payment-details/?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then(setD)
      .catch(() => setD({ ok: false }))
  }, [id])

  if (!d) return <p>Loading payment details…</p>
  if (!d.ok) return <p className="notice notice--err">We couldn&apos;t find that order. Please use the link from your payment-details email, or contact us.</p>
  if (!d.ready)
    return (
      <p className="notice">
        Payment details for order <strong>{d.orderNumber}</strong> haven&apos;t been sent yet. Watch for our email — it usually arrives shortly after
        you order.
      </p>
    )

  return (
    <div className="stack">
      <div className="notice notice--ok" style={{ fontSize: '1.05rem' }}>
        Order <strong>{d.orderNumber}</strong> · Amount due <strong>{money(d.amountDue)}</strong> · {d.methodLabel}
      </div>
      <p>{d.opening}</p>
      <div className="stack" style={{ marginTop: 0 }}>
        {d.fields.map((f, i) => (
          <CopyField key={i} label={f.label} value={f.value} />
        ))}
        <CopyField label="Payment reference" value={d.orderNumber} />
      </div>
      <p>{d.closing}</p>
      <div className="card card--tint">
        <ul style={{ margin: 0 }}>
          {paymentTermsLines(d.orderNumber).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div className="btn-row">
        <Link href={`/order/confirm-payment/?id=${encodeURIComponent(d.orderNumber)}`} className="btn btn--primary">
          I&apos;ve paid — upload confirmation
        </Link>
        <a href={waPaymentConfirmationLink(d.orderNumber)} className="btn btn--wa" target="_blank" rel="noopener noreferrer">
          Confirm via WhatsApp
        </a>
      </div>
    </div>
  )
}
