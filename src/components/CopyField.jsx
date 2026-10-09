'use client'
import { useState } from 'react'

// One payment-detail row: tap to copy, 2-second "Copied" state. Email clients
// strip JavaScript, so the email links here for real copy buttons.
export default function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const t = document.createElement('textarea')
      t.value = value
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button type="button" className="copy-field" onClick={copy} aria-label={`Copy ${label}: ${value}`}>
      <span>
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </span>
      <span className="state" aria-live="polite">
        {copied ? 'Copied ✓' : 'Copy'}
      </span>
    </button>
  )
}
