import Link from 'next/link'
import { postImageSeo } from '@/lib/imageSeo'
import { postImageSrc } from './PostFigure'

// Blog tile photo (2026-10-16): the post's first photo (already licence-checked, see post-images.js),
// served as a pre-sized WebP — no Vercel image transformations. Alt/title carry the post's focus keyword;
// the credit stays visible because CC BY / BY-SA photos must be attributed wherever they appear.
export default function PostThumb({ post }) {
  const img = post.images?.[0]
  if (!img) return <div className="post-band" aria-hidden="true">{post.kw}</div>
  const seo = postImageSeo(post, img, 0)
  return (
    <div className="post-thumb">
      <Link href={`/blog/${post.slug}/`} tabIndex={-1} aria-hidden="true">
        <img
          src={postImageSrc(post.slug, img, 640)}
          srcSet={`${postImageSrc(post.slug, img, 640)} 640w, ${postImageSrc(post.slug, img, 768)} 768w`}
          sizes="(max-width: 700px) calc(100vw - 32px), 380px"
          width={640}
          height={Math.round((640 * img.h) / img.w)}
          alt={seo.alt}
          title={seo.title.replace(/ \(photo 1 of \d+\)$/, '')}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <span className="post-thumb-credit">{seo.credit}</span>
    </div>
  )
}
