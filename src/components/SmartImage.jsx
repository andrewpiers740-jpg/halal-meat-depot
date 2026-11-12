import { preload } from 'react-dom'
import { SITE } from '@/config/site'

// Every content image goes through this wrapper — never a raw <img>.
// Product and category images are WebP (owner rule). Vercel: Vercel's /_next/image/ optimiser (WebP-only), called with the same URLs
// and widths next/image used, but WITHOUT next/image's per-deployment `dpl=` parameter. That parameter changed every image URL on every
// deploy, so the whole optimised-image cache started cold after each deploy: the first view of each product page waited ~0.9 s for the
// optimiser (LCP "To improve", measured 2026-11-12: MISS 944 ms vs HIT 274 ms). Image files are versioned (-v4) so URLs never need it.
// Server component: no client JS to hydrate. Static/Cloudflare: the WebP file as-is.
// `title` = image title attribute (image SEO: it carries the page's focus keyword).
const WIDTHS = [384, 640, 828, 1200, 1600] // all already in next.config images.deviceSizes / imageSizes, same q=60
const FILL = { position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }
const optimised = (src, w) => `/_next/image/?url=${encodeURIComponent(src)}&w=${w}&q=60`

export default function SmartImage({ src, alt, title, width, height, fill, sizes, priority = false, className }) {
  if (SITE.target === 'vercel') {
    const fallback = optimised(src, 828)
    const srcSet = WIDTHS.map((w) => `${optimised(src, w)} ${w}w`).join(', ')
    // Above-the-fold image: high-priority preload (same srcset + sizes as the <img>, so the browser fetches the one candidate it needs).
    if (priority) preload(fallback, { as: 'image', imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: 'high' })
    return (
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        title={title}
        {...(fill ? { style: FILL } : { width, height })}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
      />
    )
  }
  return <img src={src} alt={alt} title={title} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" className={className} />
}
