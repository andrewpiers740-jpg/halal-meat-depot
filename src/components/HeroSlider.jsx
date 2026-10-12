'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Full-bleed background slideshow for the homepage hero. Each slide pops in
// (fade + slight zoom-out) and the next one replaces it every `interval` ms.
export default function HeroSlider({ slides, interval = 5000 }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  return (
    <div className="hero-slides" aria-hidden="true">
      {slides.map((s, i) => (
        <div key={s.src} className={`hero-slide${i === active ? ' is-active' : ''}`}>
          <Image src={s.src} alt="" fill priority={i === 0} sizes="100vw" style={{ objectFit: 'cover', objectPosition: s.position || 'center' }} />
        </div>
      ))}
      <div className="hero-dots">
        {slides.map((s, i) => (
          <span key={s.src} className={i === active ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  )
}
