'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordForm() {
  const token = useSearchParams().get('token') || ''
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [done, setDone] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/account/reset/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) setDone(true)
    else setMsg(data.error || 'Something went wrong.')
  }

  if (done)
    return (
      <p className="notice notice--ok">
        Your password has been changed and you are signed in. <Link href="/account/">Go to your account</Link>.
      </p>
    )

  return (
    <form className="form" onSubmit={submit}>
      <div aria-live="polite">{msg && <p className="notice notice--err">{msg}</p>}</div>
      <div className="field">
        <label htmlFor="rp-password">New password</label>
        <input id="rp-password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <p className="hint">At least 8 characters.</p>
      </div>
      <div>
        <button type="submit" className="btn btn--primary">
          Set new password
        </button>
      </div>
    </form>
  )
}
