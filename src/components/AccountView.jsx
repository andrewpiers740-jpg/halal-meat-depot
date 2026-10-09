'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { money } from '@/lib/order'
import { waChatLink } from '@/lib/whatsapp'

const STATUS = {
  pending: 'Order received — payment details coming by email',
  'payment-sent': 'Payment details sent — awaiting payment',
  'payment-confirmed': 'Payment confirmation received',
}

async function post(url, body) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok && data.ok, data }
}

function Field({ id, label, type = 'text', value, onChange, auto, hint, required }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={auto} required={required} />
      {hint && <p className="hint">{hint}</p>}
    </div>
  )
}

function Message({ msg }) {
  return (
    <div aria-live="polite">
      {msg && <p className={`notice ${msg.ok ? 'notice--ok' : 'notice--err'}`}>{msg.text}</p>}
    </div>
  )
}

export default function AccountView() {
  const router = useRouter()
  const next = useSearchParams().get('next')
  const [state, setState] = useState({ loading: true })

  const load = useCallback(async () => {
    const d = await fetch('/api/account/me/', { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ enabled: false }))
    setState({ loading: false, ...d })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const afterAuth = () => (next && next.startsWith('/') ? router.push(next) : load())

  if (state.loading) return <p>Loading your account…</p>

  return (
    <div className="split">
      <div className="stack">
        {!state.enabled && (
          <div className="card card--tint">
            <h2>Accounts are coming soon</h2>
            <p className="muted" style={{ marginBottom: 0 }}>
              You don&apos;t need an account to order — <Link href="/shop/">shop now</Link> and check out as a guest. You can track a guest order
              using the form on this page.
            </p>
          </div>
        )}
        {state.enabled && !state.user && <AuthForms onDone={afterAuth} />}
        {state.enabled && state.user && <Dashboard user={state.user} orders={state.orders || []} reload={load} />}
      </div>
      <aside className="stack">
        <GuestTracker />
        <div className="card card--dark">
          <h2 style={{ fontSize: '1.15rem' }}>Need help with an order?</h2>
          <p>Message us with your order number.</p>
          <a className="btn btn--wa" href={waChatLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </div>
      </aside>
    </div>
  )
}

function AuthForms({ onDone }) {
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' })
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    if (mode === 'forgot') {
      const { ok, data } = await post('/api/account/forgot/', { email: f.email })
      setMsg(ok ? { ok: true, text: 'If an account exists for that email, a reset link is on its way. Check your inbox.' } : { ok: false, text: data.error || 'Something went wrong.' })
    } else {
      const { ok, data } = await post(`/api/account/${mode === 'login' ? 'login' : 'register'}/`, f)
      if (ok) return onDone()
      setMsg({ ok: false, text: data.error || 'Something went wrong. Please try again.' })
    }
    setBusy(false)
  }

  return (
    <div className="card">
      <div className="filter-pills" role="group" aria-label="Choose an option" style={{ marginTop: 0 }}>
        {[
          ['login', 'Sign in'],
          ['register', 'Create account'],
        ].map(([m, label]) => (
          <button
            key={m}
            type="button"
            className={`btn btn--sm ${mode === m ? 'btn--primary' : 'btn--ghost'}`}
            aria-pressed={mode === m}
            onClick={() => {
              setMode(m)
              setMsg(null)
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <h2>{mode === 'login' ? 'Sign in to your account' : mode === 'register' ? 'Create an account' : 'Reset your password'}</h2>
      {mode === 'register' && <p className="muted">Optional — save your details for faster checkout and see all your orders in one place.</p>}
      <form className="form" onSubmit={submit} noValidate>
        <Message msg={msg} />
        {mode === 'register' && <Field id="acc-name" label="Full name" value={f.name} onChange={set('name')} auto="name" required />}
        <Field id="acc-email" label="Email" type="email" value={f.email} onChange={set('email')} auto="email" required />
        {mode === 'register' && <Field id="acc-phone" label="Phone (optional)" type="tel" value={f.phone} onChange={set('phone')} auto="tel" />}
        {mode !== 'forgot' && (
          <Field
            id="acc-password"
            label="Password"
            type="password"
            value={f.password}
            onChange={set('password')}
            auto={mode === 'login' ? 'current-password' : 'new-password'}
            hint={mode === 'register' ? 'At least 8 characters.' : undefined}
            required
          />
        )}
        <div className="btn-row">
          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
          </button>
          {mode === 'login' && (
            <button type="button" className="link-btn" onClick={() => setMode('forgot')}>
              Forgot password?
            </button>
          )}
          {mode === 'forgot' && (
            <button type="button" className="link-btn" onClick={() => setMode('login')}>
              Back to sign in
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

function Dashboard({ user, orders, reload }) {
  const router = useRouter()
  const [p, setP] = useState({ name: user.name || '', phone: user.phone || '', address: user.address || '' })
  const [pw, setPw] = useState({ current: '', next: '' })
  const [msg, setMsg] = useState(null)
  const [pwMsg, setPwMsg] = useState(null)

  async function saveProfile(e) {
    e.preventDefault()
    const res = await fetch('/api/account/me/', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
    setMsg(res.ok ? { ok: true, text: 'Your details have been saved.' } : { ok: false, text: 'Could not save your details.' })
    if (res.ok) reload()
  }

  async function changePassword(e) {
    e.preventDefault()
    const { ok, data } = await post('/api/account/password/', pw)
    setPwMsg(ok ? { ok: true, text: 'Password changed.' } : { ok: false, text: data.error || 'Could not change password.' })
    if (ok) setPw({ current: '', next: '' })
  }

  async function signOut() {
    await post('/api/account/logout/', {})
    router.refresh()
    reload()
  }

  return (
    <>
      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
          <h2 style={{ margin: 0 }}>Hi {user.name?.split(' ')[0] || 'there'}</h2>
          <button type="button" className="btn btn--ghost btn--sm" onClick={signOut}>
            Sign out
          </button>
        </div>
        <p className="muted">Signed in as {user.email}</p>
      </div>

      <section className="card" aria-labelledby="orders-title">
        <h2 id="orders-title">Your orders</h2>
        {orders.length === 0 ? (
          <p className="muted" style={{ marginBottom: 0 }}>
            No orders yet. <Link href="/shop/">Start shopping</Link>.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {orders.map((o) => (
              <li key={o.orderNumber} style={{ padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
                  <strong>{o.orderNumber}</strong>
                  <span>{money(o.amountDue)}</span>
                </div>
                <div className="muted" style={{ fontSize: '0.9rem' }}>
                  {new Date(o.createdAt).toLocaleDateString('en-AU')} · {o.paymentLabel} · {STATUS[o.status] || o.status}
                </div>
                <div style={{ fontSize: '0.9rem' }}>{o.items.map((i) => `${i.quantity} × ${i.name}`).join(', ')}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card" aria-labelledby="details-title">
        <h2 id="details-title">Your details</h2>
        <form className="form" onSubmit={saveProfile}>
          <Message msg={msg} />
          <Field id="me-name" label="Full name" value={p.name} onChange={(v) => setP((s) => ({ ...s, name: v }))} auto="name" />
          <Field id="me-phone" label="Phone" type="tel" value={p.phone} onChange={(v) => setP((s) => ({ ...s, phone: v }))} auto="tel" />
          <Field
            id="me-address"
            label="Delivery address"
            value={p.address}
            onChange={(v) => setP((s) => ({ ...s, address: v }))}
            auto="street-address"
            hint="Format: street, suburb STATE postcode — e.g. 1 Smith St, Lakemba NSW 2195"
          />
          <div>
            <button type="submit" className="btn btn--primary">
              Save details
            </button>
          </div>
        </form>
      </section>

      <section className="card" aria-labelledby="pw-title">
        <h2 id="pw-title">Change password</h2>
        <form className="form" onSubmit={changePassword}>
          <Message msg={pwMsg} />
          <Field id="pw-current" label="Current password" type="password" value={pw.current} onChange={(v) => setPw((s) => ({ ...s, current: v }))} auto="current-password" />
          <Field id="pw-next" label="New password" type="password" value={pw.next} onChange={(v) => setPw((s) => ({ ...s, next: v }))} auto="new-password" hint="At least 8 characters." />
          <div>
            <button type="submit" className="btn btn--ghost">
              Change password
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

function GuestTracker() {
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [res, setRes] = useState(null)

  async function track(e) {
    e.preventDefault()
    const r = await fetch(`/api/order/status/?id=${encodeURIComponent(id.trim())}&email=${encodeURIComponent(email.trim())}`)
    setRes(await r.json().catch(() => ({ ok: false, error: 'Something went wrong.' })))
  }

  return (
    <section className="card card--tint" aria-labelledby="track-title">
      <h2 id="track-title" style={{ fontSize: '1.15rem' }}>
        Track a guest order
      </h2>
      <form className="form" onSubmit={track}>
        <Field id="tr-id" label="Order number" value={id} onChange={setId} hint="e.g. HMD-K3P9QX" />
        <Field id="tr-email" label="Email used for the order" type="email" value={email} onChange={setEmail} auto="email" />
        <div>
          <button type="submit" className="btn btn--primary btn--sm">
            Check status
          </button>
        </div>
      </form>
      <div aria-live="polite" style={{ marginTop: 12 }}>
        {res && !res.ok && <p className="notice notice--err">{res.error}</p>}
        {res?.ok && (
          <p className="notice notice--ok">
            <strong>{res.order.orderNumber}</strong> — {STATUS[res.order.status] || res.order.status}. Total {money(res.order.amountDue)}.
          </p>
        )}
      </div>
    </section>
  )
}
