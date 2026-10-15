'use client'
import { useEffect, useState } from 'react'

// Full-bleed background slideshow for the homepage hero. Each slide pops in
// (fade + slight zoom-out) and the next one replaces it every `interval` ms.
// Slides are pre-built AVIF (responsive srcset) served as-is, not via the optimiser.
// Each slide is a <figure> with alt, title and a visible caption (image SEO rule).
export default function HeroSlider({ slides, interval = 5000 }) {
  const [active, setActive] = useState(0)
  // Slides 2+ are only added once the page has loaded, so they never compete with slide 1
  // (the LCP image) for bandwidth. The rotation starts at the same moment.
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') return setLoaded(true)
    const on = () => setLoaded(true)
    window.addEventListener('load', on, { once: true })
    return () => window.removeEventListener('load', on)
  }, [])

  useEffect(() => {
    if (!loaded || slides.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [loaded, slides.length, interval])

  return (
    <div className="hero-slides">
      {slides.map((s, i) => (
        <figure key={s.src} className={`hero-slide${i === active ? ' is-active' : ''}`} aria-hidden={i === active ? undefined : 'true'}>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-built AVIF srcset */}
          {(i === 0 || loaded) && <img
            src={s.src}
            srcSet={s.srcSet}
            sizes="100vw"
            alt={s.alt}
            title={s.title}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: s.position || 'center' }}
          />}
          <figcaption className="hero-caption">{s.caption}</figcaption>
        </figure>
      ))}
      <div className="hero-dots" aria-hidden="true">
        {slides.map((s, i) => (
          <span key={s.src} className={i === active ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  )
}
