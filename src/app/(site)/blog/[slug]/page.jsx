import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import RichText from '@/components/RichText'
import JsonLd from '@/components/JsonLd'
import { SITE, POSTS, postBySlug } from '@/config/site'
import { articleSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'

export const dynamicParams = false

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}
  const base = post.seoTitle || post.title
  const t = `${base} | HMD Blog`
  return pageMeta({ title: t.length <= 60 ? t : base, description: post.excerpt, path: `/blog/${post.slug}/`, type: 'article' })
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)
  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs crumbs={[{ name: 'Blog', path: '/blog/' }, { name: post.title, path: `/blog/${post.slug}/` }]} />
          <h1>{post.title}</h1>
          <p className="muted" style={{ margin: 0 }}>
            By {SITE.name} ·{' '}
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          </p>
        </div>
      </div>
      <div className="section">
        <div className="container split">
          <article className="prose">
            <p className="lead">{post.excerpt}</p>
            <RichText blocks={post.body} />
          </article>
          <aside className="stack" aria-label="Related">
            <div className="card card--dark">
              <h2 style={{ fontSize: '1.2rem' }}>Shop certified halal meat</h2>
              <p>Every product certified by {SITE.certifier}. Delivered Australia-wide.</p>
              <Link href="/shop/" className="btn btn--accent">
                Browse the shop
              </Link>
            </div>
            <div className="card card--tint">
              <h2 style={{ fontSize: '1.2rem' }}>More guides</h2>
              <ul style={{ marginBottom: 0 }}>
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
