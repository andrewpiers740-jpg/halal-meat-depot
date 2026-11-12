import Link from 'next/link'
import SmartImage from './SmartImage'
import CardCart from './CardCart'
import { money } from '@/lib/order'
import { SITE, categoryBySlug } from '@/config/site'
import { productImageSeo } from '@/lib/imageSeo'

const CARD_SIZES = '(max-width: 559px) calc(100vw - 32px), (max-width: 959px) calc(50vw - 34px), 371px'

// Below-the-fold cards use a plain server-rendered <img> instead of next/image (2026-11-12, text-to-HTML ratio + TBT):
// next/image hydrates a client component per card and sends a 6-width srcset plus a 1600px fallback twice (HTML + RSC data).
// Cards are at most 371px wide, so 3 widths (384/640/828, all already in images.deviceSizes/imageSizes, same q=60) are enough.
// Same /_next/image URLs as before, so no new image transformations. Priority (above-the-fold) cards keep next/image.
function CardImage({ src, alt, title, priority }) {
  if (priority || SITE.target !== 'vercel') {
    return <SmartImage src={src} alt={alt} title={title} fill sizes={CARD_SIZES} priority={priority} />
  }
  const u = (w) => `/_next/image/?url=${encodeURIComponent(src)}&w=${w}&q=60`
  return <img src={u(640)} srcSet={`${u(384)} 384w, ${u(640)} 640w, ${u(828)} 828w`} sizes={CARD_SIZES} alt={alt} title={title} loading="lazy" decoding="async" />
}

export default function ProductCard({ product: p, priority = false }) {
  const cat = categoryBySlug(p.cat)
  const href = `/product/${p.slug}/`
  const img = productImageSeo(p)
  return (
    <article className="product-card">
      <Link href={href} className="product-frame" tabIndex={-1} aria-hidden="true">
        {p.badge && <span className={`badge badge--${p.badge.replace(/\s+/g, '')}`}>{p.badge}</span>}
        <CardImage src={`/images/products/${p.images[0]}`} alt={img.alt} title={img.title} priority={priority} />
      </Link>
      <div className="product-body">
        <span className="product-meta">
          {`${cat?.name} · ${p.sub}`}
        </span>
        <h3 className="product-title">
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="product-short">{p.short}</p>
        <div className="price-row">
          <span className="price">{money(p.price)}</span>
          <span className="unit">{p.unit}</span>
          <span className="per-kg">{`≈ ${money(p.perKg)}/kg`}</span>
        </div>
        <CardCart slug={p.slug} name={p.name} />
      </div>
    </article>
  )
}
