'use client'
import { useEffect } from 'react'

// Tawk.to live chat (owner request 2026-11-09). The widget is ~265 KB of third-party JavaScript (about 270 ms of main-thread
// time, 140 KB unused, plus a popup that shifts the layout), so it must not compete with the page for speed. It loads on the
// visitor's FIRST INTERACTION (scroll, click, key, touch), or 8 seconds after the page has loaded if they just read.
// Same loader as Tawk's own snippet; the bubble is moved above the WhatsApp button with customStyle.
const TAWK_SRC = 'https://embed.tawk.to/6aef669d7b17683c37891769/default'
const FALLBACK_MS = 8000
const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove']

export default function TawkChat() {
  useEffect(() => {
    if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return undefined
    window.Tawk_API = window.Tawk_API || {}
    // Owner request 2026-11-09: WhatsApp button takes the bottom-right corner, the chat bubble sits just above it.
    window.Tawk_API.customStyle = { visibility: { desktop: { position: 'br', xOffset: 16, yOffset: 88 }, mobile: { position: 'br', xOffset: 16, yOffset: 88 } } }
    window.Tawk_LoadStart = new Date()
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
      const s1 = document.createElement('script')
      const s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = TAWK_SRC
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode.insertBefore(s1, s0)
    }
    const arm = () => {
      EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
      timer = setTimeout(load, FALLBACK_MS)
    }
    if (document.readyState === 'complete') arm()
    else window.addEventListener('load', arm, { once: true })
    return cleanup
  }, [])
  return null
}
