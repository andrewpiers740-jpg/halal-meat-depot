import Image from 'next/image'
import { SITE } from '@/config/site'

// Every content image goes through this wrapper — never a raw <img>.
// Product and category images are WebP (owner rule). Vercel: next/image (WebP-only
// optimiser, responsive srcset, lazy by default). Static/Cloudflare: the WebP file as-is.
// `title` = image title attribute (image SEO: it carries the page's focus keyword).
export default function SmartImage({ src, alt, title, width, height, fill, sizes, priority = false, className }) {
  if (SITE.target === 'vercel') {
    return (
      <Image
        src={src}
        alt={alt}
        title={title}
        {...(fill ? { fill: true } : { width, height })}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    )
  }
  return <img src={src} alt={alt} title={title} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" className={className} />
}
