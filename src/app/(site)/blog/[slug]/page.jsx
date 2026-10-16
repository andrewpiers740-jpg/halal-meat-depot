import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import RichText from '@/components/RichText'
import PostFigure from '@/components/PostFigure'
import JsonLd from '@/components/JsonLd'
import { SITE, POSTS, postBySlug } from '@/config/site'
import { articleSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/meta'
import { relatedPosts } from '@/config/blog-topics'

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
  // Share image = the post's first photo (2026-10-16), not the generic site image.
  const img = post.images?.[0]
  return pageMeta({ title: t.length <= 60 ? t : base, description: post.excerpt, path: `/blog/${post.slug}/`, type: 'article', ...(img ? { image: `${SITE.url}/images/blog/${post.slug}-${img.n}-${img.w}.webp`, imageSize: [img.w, img.h] } : {}) })
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()
  const others = relatedPosts(post, POSTS)
  // Photo 1 sits under the intro; photos 2–4 go before H2s spread evenly through the post.
  const h2s = post.body.flatMap(([t], i) => (t === 'h2' ? [i] : []))
  const insert = {}
  post.images.slice(1).forEach((img, k, rest) => {
    const at = h2s[Math.min(h2s.length - 1, Math.round(((k + 1) * h2s.length) / (rest.length + 1)))]
    if (at !== undefined && !insert[at]) insert[at] = <PostFigure post={post} img={img} index={k + 1} />
  })
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
            {post.images[0] && <PostFigure post={post} img={post.images[0]} index={0} />}
            <RichText blocks={post.body} insert={insert} />
          </article>
          <aside className="stack" aria-label="Related">
            <div className="card card--dark">
              <h2 style={{ fontSize: '1.2rem' }}>Shop certified halal meat</h2>
              <p>Every product certified by {SITE.certifier}. Delivered Australia-wide.</p>
              <Link href="/halal-meat-shop/" className="btn btn--accent">
                Browse the shop
              </Link>
            </div>
            <div className="card card--tint">
              <h2 style={{ fontSize: '1.2rem' }}>Related guides</h2>
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
