'use client'
import { useState } from 'react'

export default function WhatsAppSendPanel({ link, text }) {
  const [copied, setCopied] = useState(false)
  if (!link) return null
  return (
    <div className="admin-card stack">
      <h3 style={{ margin: 0 }}>Send on WhatsApp too</h3>
      <p className="muted" style={{ margin: 0 }}>Opens WhatsApp with the same payment details pre-filled for the customer.</p>
      <div className="btn-row">
        <a className="btn btn--wa btn--sm" href={link} target="_blank" rel="noopener noreferrer">
          Open WhatsApp message
        </a>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            } catch {}
          }}
        >
          {copied ? 'Copied ✓' : 'Copy message'}
        </button>
      </div>
    </div>
  )
}
