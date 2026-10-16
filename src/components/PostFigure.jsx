import { postImageSeo } from '@/lib/imageSeo'

// Pre-sized WebP files in /images/blog/ (640px + full width) served directly, so blog photos
// never use Vercel image-optimisation transformations.
export const postImageSrc = (slug, img, w) => `/images/blog/${slug}-${img.n}-${w}.webp`

export default function PostFigure({ post, img, index }) {
  const seo = postImageSeo(post, img, index)
  const hero = index === 0
  return (
    <figure className="post-figure">
      <img
        src={postImageSrc(post.slug, img, img.w)}
        srcSet={`${postImageSrc(post.slug, img, 640)} 640w, ${postImageSrc(post.slug, img, img.w)} ${img.w}w`}
        sizes="(max-width: 900px) calc(100vw - 32px), 720px"
        width={img.w}
        height={img.h}
        alt={seo.alt}
        title={seo.title}
        loading={hero ? 'eager' : 'lazy'}
        fetchPriority={hero ? 'high' : undefined}
        decoding="async"
      />
      <figcaption className="img-caption">
        {seo.caption}.{' '}
        <span className="credit">
          Photo:{' '}
          {img.source ? (
            <a href={img.source} target="_blank" rel="noopener nofollow">
              {img.creator || 'source'}
            </a>
          ) : (
            img.creator
          )}
          ,{' '}
          {img.licenseUrl ? (
            <a href={img.licenseUrl} target="_blank" rel="noopener nofollow license">
              {img.license}
            </a>
          ) : (
            img.license
          )}
        </span>
      </figcaption>
    </figure>
  )
}
