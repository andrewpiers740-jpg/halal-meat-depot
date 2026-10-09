import Link from 'next/link'
import SmartImage from './SmartImage'
import AddToCart from './AddToCart'
import { money } from '@/lib/order'
import { categoryBySlug } from '@/config/site'

export default function ProductCard({ product: p, priority = false }) {
  const cat = categoryBySlug(p.cat)
  const href = `/product/${p.slug}/`
  return (
    <article className="product-card">
      <Link href={href} className="product-frame" tabIndex={-1} aria-hidden="true">
        {p.badge && <span className={`badge badge--${p.badge.replace(/\s+/g, '')}`}>{p.badge}</span>}
        <SmartImage
          src={`/images/products/${p.images[0]}`}
          alt={`${p.name} — ${p.unit} — Halal Meat Depot`}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw"
          priority={priority}
        />
      </Link>
      <div className="product-body">
        <span className="product-meta">
          {cat?.name} · {p.sub}
        </span>
        <h3 className="product-title">
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="product-short">{p.short}</p>
        <div className="price-row">
          <span className="price">{money(p.price)}</span>
          <span className="unit">{p.unit}</span>
          <span className="per-kg">≈ {money(p.perKg)}/kg</span>
        </div>
        <AddToCart slug={p.slug} name={p.name} />
      </div>
    </article>
  )
}
