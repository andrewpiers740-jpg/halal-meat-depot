'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { waChatLink } from '@/lib/whatsapp'
import EmailLink from './EmailLink'

const CONFIG = {
  contact: {
    thankYou: '/thank-you-contact/',
    fields: [
      { k: 'name', label: 'Your name', type: 'text', auto: 'name', required: true },
      { k: 'email', label: 'Email', type: 'email', auto: 'email', required: true },
      { k: 'phone', label: 'Phone (optional)', type: 'tel', auto: 'tel' },
      { k: 'subject', label: 'Subject', type: 'select', options: ['General question', 'Product question', 'Order question', 'Event or bulk order', 'Halal certificate request', 'Other'] },
      { k: 'message', label: 'Message', type: 'textarea', required: true },
    ],
    submit: 'Send message',
  },
  wholesale: {
    thankYou: '/thank-you-wholesale/',
    fields: [
      { k: 'business', label: 'Business name', type: 'text', auto: 'organization', required: true },
      { k: 'businessType', label: 'Business type', type: 'select', options: ['Restaurant', 'Takeaway / kebab shop', 'Caterer', 'Butcher', 'Grocery / supermarket', 'Community group / events', 'Other'] },
      { k: 'name', label: 'Contact name', type: 'text', auto: 'name', required: true },
      { k: 'email', label: 'Email', type: 'email', auto: 'email', required: true },
      { k: 'phone', label: 'Phone', type: 'tel', auto: 'tel', required: true },
      { k: 'abn', label: 'ABN (optional)', type: 'text' },
      { k: 'location', label: 'Suburb and state', type: 'text', auto: 'address-level2', required: true },
      { k: 'volume', label: 'Approximate weekly volume', type: 'select', options: ['Under 50kg', '50–200kg', '200–500kg', '500kg+', 'One-off event order'] },
      { k: 'message', label: 'Which cuts do you need?', type: 'textarea', required: true, placeholder: 'e.g. 40kg lamb curry pieces and 20kg chicken thigh fillet per week' },
    ],
    submit: 'Request wholesale pricing',
  },
}

export default function WebForm({ kind = 'contact', email }) {
  const cfg = CONFIG[kind]
  const router = useRouter()
  const init = Object.fromEntries(cfg.fields.map((f) => [f.k, f.type === 'select' ? f.options[0] : '']))
  const [v, setV] = useState(init)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle')
  const [botcheck, setBotcheck] = useState('')
  const summaryRef = useRef(null)

  function validate() {
    const e = {}
    for (const f of cfg.fields) {
      const val = String(v[f.k] || '').trim()
      if (f.required && !val) e[f.k] = `${f.label.replace(' (optional)', '')} is required.`
      else if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) e[f.k] = 'Enter a valid email address, like name@example.com.'
      else if (f.k === 'message' && val && val.length < 5) e[f.k] = 'Please add a little more detail.'
    }
    setErrors(e)
    if (Object.keys(e).length) setTimeout(() => summaryRef.current?.focus(), 0)
    return !Object.keys(e).length
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setState('sending')
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName: kind, botcheck, ...v }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error('failed')
      router.push(cfg.thankYou)
    } catch {
      setState('error')
    }
  }

  const errs = Object.values(errors)
  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div aria-live="polite">
        {errs.length > 0 && (
          <div className="notice notice--err" tabIndex={-1} ref={summaryRef}>
            <strong>Please check the form:</strong>
            <ul style={{ margin: '6px 0 0' }}>
              {errs.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
        {state === 'error' && (
          <div className="notice notice--err">
            Sorry — your message could not be sent right now. Please{' '}
            <a href={waChatLink()} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            {email ? (
              <>
                {' '}or email <EmailLink address={email} />.
              </>
            ) : (
              ' instead.'
            )}
          </div>
        )}
      </div>
      <div className="form-row">
        {cfg.fields.map((f) => {
          const id = `${kind}-${f.k}`
          const common = {
            id,
            name: f.k,
            value: v[f.k],
            onChange: (e) => setV((s) => ({ ...s, [f.k]: e.target.value })),
            'aria-invalid': errors[f.k] ? 'true' : undefined,
            'aria-describedby': errors[f.k] ? `${id}-err` : undefined,
            required: f.required,
          }
          const wide = f.type === 'textarea'
          return (
            <div className="field" key={f.k} style={wide ? { gridColumn: '1 / -1' } : undefined}>
              <label htmlFor={id}>{f.label}</label>
              {f.type === 'select' ? (
                <select {...common}>
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea {...common} placeholder={f.placeholder} />
              ) : (
                <input type={f.type} autoComplete={f.auto} {...common} />
              )}
              {errors[f.k] && (
                <p className="error" id={`${id}-err`}>
                  {errors[f.k]}
                </p>
              )}
            </div>
          )
        })}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this empty</label>
        <input id={`${kind}-website`} type="text" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
      </div>
      <div>
        <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : cfg.submit}
        </button>
      </div>
    </form>
  )
}
