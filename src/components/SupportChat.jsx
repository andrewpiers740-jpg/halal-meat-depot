'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from './Icon'

// Floating support chat — the ONLY chat control on the site. A round button (bottom-right) opens a small panel with a
// greeting, three quick-answer topics and one-tap contact buttons. The tawk.to bubble is always hidden; the panel's
// "Live chat" button opens the tawk.to window instead, so visitors only ever see one chat control.
// All values arrive as props from the server layout (src/lib/chatProps.js ← src/config/site.js); nothing is hardcoded here.
//
// Performance (owner request 2026-11-09): tawk.to is ~265 KB of third-party JavaScript, so it is injected in the effect
// but only fires on the visitor's first interaction, or 8 seconds after page load if they just read. The "Live chat"
// button appears once it has loaded.
const FALLBACK_MS = 8000
const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove']

export default function SupportChat({ siteName, whatsapp, phoneIntl, phoneDisplay, emailEncoded, tawk, quick }) {
  const pathname = usePathname()
  const isAdmin = Boolean(pathname?.startsWith('/admin'))
  const [open, setOpen] = useState(false)
  const [pick, setPick] = useState(null)
  const [tawkReady, setTawkReady] = useState(false)

  useEffect(() => {
    if (isAdmin || !tawk?.propertyId) return undefined
    const src = `https://embed.tawk.to/${tawk.propertyId}/${tawk.widgetId || 'default'}`
    const hide = () => {
      try {
        window.Tawk_API.hideWidget()
      } catch {
        /* ignore */
      }
    }
    // Already loaded (e.g. the visitor navigated between pages): just reflect it.
    if (window.Tawk_API && window.Tawk_API.hideWidget && document.querySelector(`script[src="${src}"]`)) {
      setTawkReady(true)
      return undefined
    }
    if (document.querySelector(`script[src="${src}"]`)) return undefined
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    window.Tawk_API.onLoad = () => {
      hide()
      setTawkReady(true)
    }
    window.Tawk_API.onChatMaximized = () => setOpen(false)
    window.Tawk_API.onChatMinimized = hide

    let started = false
    let timer
    const cleanup = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load))
      clearTimeout(timer)
    }
    function load() {
      if (started) return
      started = true
      cleanup()
      const s = document.createElement('script')
      s.async = true
      s.src = src
      s.charset = 'UTF-8'
      s.setAttribute('crossorigin', '*')
      document.head.appendChild(s)
    }
    const arm = () => {
      EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
      timer = setTimeout(load, FALLBACK_MS)
    }
    if (document.readyState === 'complete') arm()
    else window.addEventListener('load', arm, { once: true })
    return cleanup
  }, [isAdmin, tawk?.propertyId, tawk?.widgetId])

  // Escape closes the panel (keyboard users).
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (isAdmin) return null

  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${siteName}, I have a question.`)}`
  const tel = `tel:+${phoneIntl}`
  // The address arrives entity-encoded (never plain text in the page HTML); it is decoded here, in the browser, and the
  // panel only renders after the visitor opens it.
  const email = emailEncoded.replace(/&#64;/g, '@').replace(/&#46;/g, '.')
  const openTawk = () => {
    try {
      window.Tawk_API.showWidget()
      window.Tawk_API.maximize()
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="sc">
      {open && (
        <section aria-label="Customer support" className="sc-panel">
          <div className="sc-head">
            <div className="sc-head-title">
              <Icon name="headset" size={18} />
              <div>
                <p className="sc-name">{siteName} support</p>
                <p className="sc-sub">Message us any time</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support" className="sc-x">
              <Icon name="close" size={18} />
            </button>
          </div>
          <div className="sc-body">
            <p className="sc-hello">Hi! How can we help? Pick a topic or message us directly.</p>
            <ul className="sc-topics">
              {quick.map((x, i) => (
                <li key={x.q}>
                  <button type="button" onClick={() => setPick(pick === i ? null : i)} aria-expanded={pick === i} className="sc-topic">
                    <Icon name={x.icon} size={16} />
                    {x.q}
                  </button>
                  {pick === i && (
                    <p className="sc-answer">
                      {x.a}{' '}
                      <Link href={x.href} onClick={() => setOpen(false)}>
                        Read more
                      </Link>
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="sc-actions">
              {tawkReady && (
                <button type="button" onClick={openTawk} className="sc-btn sc-btn--primary sc-wide">
                  <Icon name="chat" size={16} />
                  Live chat
                </button>
              )}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="sc-btn">
                <Icon name="chat" size={16} />
                WhatsApp
              </a>
              <a href={tel} className="sc-btn" aria-label={`Call ${phoneDisplay}`}>
                <Icon name="phone" size={16} />
                Call
              </a>
              <a href={`mailto:${email}`} className="sc-btn sc-wide">
                <Icon name="mail" size={16} />
                {email}
              </a>
            </div>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close support chat' : 'Open support chat'} className="sc-fab">
        <Icon name={open ? 'close' : 'chat'} size={24} />
      </button>
    </div>
  )
}
