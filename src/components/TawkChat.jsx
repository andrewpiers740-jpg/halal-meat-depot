'use client'
import { useEffect } from 'react'

// Tawk.to live chat (owner request 2026-11-09). Loaded AFTER the page has finished loading and the browser is idle,
// so the third-party widget can't hurt LCP / TBT (Core Web Vitals). Same loader as Tawk's own snippet.
const TAWK_SRC = 'https://embed.tawk.to/6aef669d7b17683c37891769/default'

export default function TawkChat() {
  useEffect(() => {
    if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return undefined
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    let started = false
    const load = () => {
      if (started) return
      started = true
      const s1 = document.createElement('script')
      const s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = TAWK_SRC
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode.insertBefore(s1, s0)
    }
    const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(load, { timeout: 4000 }) : setTimeout(load, 2500))
    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })
    return undefined
  }, [])
  return null
}
