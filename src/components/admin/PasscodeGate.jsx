'use client'
import { useCallback, useEffect, useState } from 'react'

const KEY = 'hmd-admin-passcode'

// Verifies a passcode by calling the orders-list endpoint with it — no
// separate /verify route. Stored in localStorage (try/catch for private mode).
export default function PasscodeGate({ children }) {
  const [passcode, setPasscode] = useState(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  const verify = useCallback(async (code) => {
    const res = await fetch('/api/admin/orders/', { headers: { 'X-Admin-Passcode': code }, cache: 'no-store' })
    if (res.status === 503) return 'The admin passcode has not been set yet. Add it in Vercel → Settings → Environment Variables (see README), then redeploy.'
    if (res.status === 401) return 'Incorrect passcode.'
    if (!res.ok) return 'Could not reach the server.'
    return null
  }, [])

  useEffect(() => {
    let saved = ''
    try {
      saved = localStorage.getItem(KEY) || ''
    } catch {}
    if (!saved) return setChecking(false)
    verify(saved).then((err) => {
      if (!err) setPasscode(saved)
      setChecking(false)
    })
  }, [verify])

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem(KEY)
    } catch {}
    setPasscode(null)
  }, [])

  async function submit(e) {
    e.preventDefault()
    setError('')
    const err = await verify(input)
    if (err) return setError(err)
    try {
      localStorage.setItem(KEY, input)
    } catch {}
    setPasscode(input)
    setInput('')
  }

  if (checking) return <p style={{ padding: 32 }}>Checking access…</p>
  if (passcode) return children(passcode, signOut)

  return (
    <main id="main" className="container" style={{ maxWidth: 440, paddingTop: 80 }}>
      <div className="admin-card">
        <h1 style={{ fontSize: '1.5rem' }}>Halal Meat Depot — admin</h1>
        <p className="muted">Enter the admin passcode to manage orders and enquiries.</p>
        <form className="form" onSubmit={submit}>
          <div className="field">
            <label htmlFor="admin-pass">Passcode</label>
            <input id="admin-pass" type="password" autoComplete="current-password" value={input} onChange={(e) => setInput(e.target.value)} required />
          </div>
          <div aria-live="polite">{error && <p className="notice">{error}</p>}</div>
          <button type="submit" className="btn btn--primary">
            Unlock dashboard
          </button>
        </form>
      </div>
    </main>
  )
}
