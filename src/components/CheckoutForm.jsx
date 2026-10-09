'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-client'
import { computeTotals, money, makeOrderNumber, findMethod } from '@/lib/order'
import { waOrderLink, waChatLink } from '@/lib/whatsapp'
import { SITE, PAYMENT_METHODS } from '@/config/site'

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

export default function CheckoutForm() {
  const router = useRouter()
  const { lines, clear } = useCart()
  const [f, setF] = useState({ name: '', email: '', phone: '', street: '', suburb: '', state: 'NSW', postcode: '', notes: '', password: '' })
  const fulfilment = 'delivery' // delivery only — no pickup
  const [payment, setPayment] = useState('payid')
  const [createAccount, setCreateAccount] = useState(false)
  const [user, setUser] = useState(null)
  const [accountsOn, setAccountsOn] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [botcheck, setBotcheck] = useState('')
  const errRef = useRef(null)

  useEffect(() => {
    fetch('/api/account/me/', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        setAccountsOn(Boolean(d.enabled))
        if (d.user) {
          setUser(d.user)
          setF((v) => ({ ...v, name: d.user.name || v.name, email: d.user.email, phone: d.user.phone || v.phone, ...(d.user.address ? splitAddress(d.user.address) : {}) }))
        }
      })
      .catch(() => {})
  }, [])

  const t = computeTotals(lines, { paymentMethod: payment, fulfilment })
  const method = findMethod(payment)
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address — we send your order confirmation here.'
    if (f.phone.replace(/\D/g, '').length < 8) e.phone = 'Enter a phone number we can reach you on.'
    if (fulfilment === 'delivery') {
      if (f.street.trim().length < 3) e.street = 'Enter your street address.'
      if (f.suburb.trim().length < 2) e.suburb = 'Enter your suburb.'
      if (!/^\d{4}$/.test(f.postcode.trim())) e.postcode = 'Enter a 4-digit postcode.'
    }
    if (createAccount && !user && f.password.length < 8) e.password = 'Choose a password of at least 8 characters.'
    setErrors(e)
    if (Object.keys(e).length) setTimeout(() => errRef.current?.focus(), 0)
    return !Object.keys(e).length
  }

  function buildOrder(orderNumber, channel) {
    const address = fulfilment === 'delivery' ? `${f.street.trim()}, ${f.suburb.trim()} ${f.state} ${f.postcode.trim()}` : ''
    return {
      orderNumber,
      channel,
      customerName: f.name.trim(),
      customerEmail: f.email.trim(),
      customerPhone: f.phone.trim(),
      address,
      fulfilment,
      paymentMethod: payment,
      paymentLabel: method?.label || payment,
      notes: f.notes.trim(),
      items: t.items,
      subtotal: t.subtotal,
      discount: t.discount,
      discountPct: t.discountPct,
      shipping: t.shipping,
      amountDue: t.total,
    }
  }

  async function submit(channel) {
    const orderNumber = makeOrderNumber()
    const order = buildOrder(orderNumber, channel)
    const res = await fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formName: 'order',
        botcheck,
        orderNumber,
        channel,
        lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        customer: { name: order.customerName, email: order.customerEmail, phone: order.customerPhone },
        address: order.address,
        fulfilment,
        paymentMethod: payment,
        notes: order.notes,
        createAccount: createAccount && !user ? { password: f.password } : null,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok && data.ok, data, orderNumber }
  }

  async function onPlaceOrder(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus({ state: 'sending', message: '' })
    try {
      const { ok, data, orderNumber } = await submit('email')
      if (!ok) throw new Error(data.error || 'failed')
      clear()
      router.push(`/thank-you-order/?id=${encodeURIComponent(orderNumber)}`)
    } catch {
      setStatus({ state: 'error', message: 'We could not send your order online. Please send it on WhatsApp instead — nothing has been charged.' })
    }
  }

  // Pop-up blockers: window.open must fire synchronously, before any await.
  function onWhatsApp() {
    if (!validate()) return
    const orderNumber = makeOrderNumber()
    const order = buildOrder(orderNumber, 'whatsapp')
    window.open(waOrderLink(order), '_blank', 'noopener')
    setStatus({ state: 'sending', message: '' })
    fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formName: 'order',
        botcheck,
        orderNumber,
        channel: 'whatsapp',
        lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        customer: { name: order.customerName, email: order.customerEmail, phone: order.customerPhone },
        address: order.address,
        fulfilment,
        paymentMethod: payment,
        notes: order.notes,
        createAccount: createAccount && !user ? { password: f.password } : null,
      }),
    })
      .catch(() => {})
      .finally(() => {
        clear()
        router.push(`/thank-you-order/?id=${encodeURIComponent(orderNumber)}&via=whatsapp`)
      })
  }

  if (!t.items.length) {
    return (
      <div className="card center">
        <h2>Your cart is empty</h2>
        <Link href="/shop/" className="btn btn--primary">
          Shop halal meat
        </Link>
      </div>
    )
  }

  if (!t.meetsMinimum) {
    return (
      <div className="card center">
        <h2>Almost there</h2>
        <p>
          The minimum order is {money(SITE.minOrder)}. Add {money(t.shortfall)} more to check out.
        </p>
        <Link href="/shop/" className="btn btn--primary">
          Keep shopping
        </Link>
      </div>
    )
  }

  const errList = Object.values(errors)
  const fieldProps = (k) => ({
    id: `co-${k}`,
    name: k,
    value: f[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `co-${k}-err` : undefined,
  })
  const Err = ({ k }) =>
    errors[k] ? (
      <p className="error" id={`co-${k}-err`}>
        {errors[k]}
      </p>
    ) : null

  return (
    <form className="split" onSubmit={onPlaceOrder} noValidate>
      <div className="form">
        <div aria-live="polite">
          {errList.length > 0 && (
            <div className="notice notice--err" tabIndex={-1} ref={errRef}>
              <strong>Please fix {errList.length === 1 ? 'this' : `these ${errList.length}`}:</strong>
              <ul style={{ margin: '6px 0 0' }}>
                {errList.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {status.state === 'error' && (
            <div className="notice notice--err">
              {status.message}{' '}
              <a href={waChatLink()} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>
            </div>
          )}
        </div>

        {user ? (
          <p className="notice notice--ok">
            Signed in as <strong>{user.email}</strong> — this order will appear in <Link href="/account/">your account</Link>.
          </p>
        ) : (
          <p className="notice">
            Checking out as a guest. Have an account? <Link href="/account/?next=/checkout/">Sign in</Link> to use your saved details.
          </p>
        )}

        <fieldset className="card">
          <legend>Your details</legend>
          <div className="form">
            <div className="field">
              <label htmlFor="co-name">Full name</label>
              <input type="text" autoComplete="name" required {...fieldProps('name')} />
              <Err k="name" />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="co-email">Email</label>
                <input type="email" autoComplete="email" required readOnly={Boolean(user)} {...fieldProps('email')} />
                <Err k="email" />
              </div>
              <div className="field">
                <label htmlFor="co-phone">Phone</label>
                <input type="tel" autoComplete="tel" required {...fieldProps('phone')} />
                <Err k="phone" />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="card">
          <legend>Delivery address</legend>
          <p className="muted" style={{ margin: 0 }}>
            Delivered Australia-wide —{' '}
            {t.subtotal >= SITE.freeShipOver ? 'free on this order.' : `${money(SITE.flatShip)} flat, free over ${money(SITE.freeShipOver)}.`}
          </p>
          {fulfilment === 'delivery' && (
            <div className="form" style={{ marginTop: 16 }}>
              <div className="field">
                <label htmlFor="co-street">Street address</label>
                <input type="text" autoComplete="street-address" {...fieldProps('street')} />
                <Err k="street" />
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="co-suburb">Suburb</label>
                  <input type="text" autoComplete="address-level2" {...fieldProps('suburb')} />
                  <Err k="suburb" />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="co-state">State</label>
                    <select autoComplete="address-level1" {...fieldProps('state')}>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="co-postcode">Postcode</label>
                    <input type="text" inputMode="numeric" autoComplete="postal-code" maxLength={4} {...fieldProps('postcode')} />
                    <Err k="postcode" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className="card">
          <legend>Payment method</legend>
          <div className="choice-list">
            {PAYMENT_METHODS.map((m) => (
              <label key={m.id} className="choice">
                <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} />
                <span>
                  <strong>
                    {m.label}
                    {m.discountPct > 0 && <span className="tag">{m.discountPct}% OFF</span>}
                  </strong>
                  <span>{m.note}</span>
                </span>
              </label>
            ))}
          </div>
          <p className="muted" style={{ fontSize: '0.88rem', margin: '12px 0 0' }}>
            No payment is taken now. After you order, we email the payment details for your chosen method.
          </p>
        </fieldset>

        <fieldset className="card">
          <legend>Notes and cutting instructions</legend>
          <div className="field">
            <label htmlFor="co-notes">Anything we should know? (optional)</label>
            <textarea {...fieldProps('notes')} placeholder="e.g. cut the whole lamb into curry pieces and 2 legs; delivery access notes" />
          </div>
        </fieldset>

        {!user && accountsOn && (
          <fieldset className="card">
            <legend>Account (optional)</legend>
            <label className="choice">
              <input type="checkbox" checked={createAccount} onChange={(e) => setCreateAccount(e.target.checked)} />
              <span>
                <strong>Save my details for next time</strong>
                <span>Create an account to see your orders and check out faster.</span>
              </span>
            </label>
            {createAccount && (
              <div className="field" style={{ marginTop: 14 }}>
                <label htmlFor="co-password">Choose a password</label>
                <input type="password" autoComplete="new-password" minLength={8} {...fieldProps('password')} />
                <p className="hint">At least 8 characters.</p>
                <Err k="password" />
              </div>
            )}
          </fieldset>
        )}

        <div className="hp" aria-hidden="true">
          <label htmlFor="co-company-site">Leave this empty</label>
          <input id="co-company-site" type="text" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
        </div>
      </div>

      <aside className="card summary" aria-labelledby="co-summary">
        <h2 id="co-summary" style={{ fontSize: '1.3rem' }}>
          Order summary
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px' }}>
          {t.items.map((i) => (
            <li key={i.slug} className="summary-row" style={{ fontSize: '0.92rem' }}>
              <span>
                {i.quantity} × {i.name}
              </span>
              <span>{money(i.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div aria-live="polite">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{money(t.subtotal)}</span>
          </div>
          {t.discount > 0 && (
            <div className="summary-row summary-row--discount">
              <span>Crypto discount ({t.discountPct}%)</span>
              <span>−{money(t.discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>{fulfilment === 'pickup' ? 'Pickup' : 'Delivery'}</span>
            <span>{t.shipping ? money(t.shipping) : 'Free'}</span>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <span>{money(t.total)}</span>
          </div>
          {payment !== 'crypto' && (
            <p className="muted" style={{ fontSize: '0.85rem' }}>
              Choose cryptocurrency to save {money(computeTotals(lines, { paymentMethod: 'crypto' }).discount)}.
            </p>
          )}
        </div>
        <div className="stack">
          <button type="submit" className="btn btn--primary btn--block" disabled={status.state === 'sending'}>
            {status.state === 'sending' ? 'Sending…' : 'Place order'}
          </button>
          <button type="button" className="btn btn--wa btn--block" onClick={onWhatsApp} disabled={status.state === 'sending'}>
            Order via WhatsApp
          </button>
          <p className="muted" style={{ fontSize: '0.82rem', margin: 0 }}>
            Both options create the same order and send you a confirmation email. By ordering you agree to our <Link href="/terms/">terms of sale</Link> and{' '}
            <Link href="/refund/">Refund &amp; Returns Policy</Link>.
          </p>
        </div>
      </aside>
    </form>
  )
}

function splitAddress(address) {
  const m = String(address).match(/^(.*),\s*(.+?)\s+(NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\s+(\d{4})$/)
  return m ? { street: m[1], suburb: m[2], state: m[3], postcode: m[4] } : {}
}
