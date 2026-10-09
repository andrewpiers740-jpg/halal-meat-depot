import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { POSTS } from '@/config/site'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Halal Meat Guides & Cooking Tips | Halal Meat Depot Blog',
  description: 'Guides to halal beef, lamb and goat cuts, cooking camel, buffalo and kangaroo, and what halal certification means when you buy meat in Australia.',
  path: '/blog/',
})

const fmt = (d) => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Blog', path: '/blog/' }]} />
          <h1>Halal meat guides and cooking tips</h1>
          <p className="lead">Practical guides to choosing cuts, cooking lean and unusual meats, and buying certified halal meat with confidence.</p>
        </div>
      </div>
      <section className="section section--tint" aria-label="Articles">
        <div className="container grid-3">
          {posts.map((p) => (
            <article key={p.slug} className="post-card">
              <div className="post-band" aria-hidden="true">{p.kw}</div>
              <div className="post-body">
                <time dateTime={p.date}>{fmt(p.date)}</time>
                <h2 style={{ fontSize: '1.15rem', margin: 0 }}>
                  <Link href={`/blog/${p.slug}/`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                    {p.title}
                  </Link>
                </h2>
                <p className="muted">{p.excerpt}</p>
                <Link href={`/blog/${p.slug}/`} className="read" aria-label={`Read: ${p.title}`}>
                  Read the guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
