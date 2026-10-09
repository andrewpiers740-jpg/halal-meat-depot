'use client'
import { useSearchParams } from 'next/navigation'
import { ORDER_REF_RE } from '@/lib/order'

export default function ThankYouOrder() {
  const params = useSearchParams()
  const id = params.get('id') || ''
  const via = params.get('via')
  if (!ORDER_REF_RE.test(id)) return null
  return (
    <div className="notice notice--ok" style={{ fontSize: '1.05rem' }}>
      Your order number is <strong>{id}</strong>.
      {via === 'whatsapp' && ' Please make sure you pressed send in WhatsApp so the message reaches us.'}
    </div>
  )
}
