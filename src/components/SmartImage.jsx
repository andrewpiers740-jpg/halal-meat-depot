import Image from 'next/image'
import { SITE } from '@/config/site'

// Every content image goes through this wrapper — never a raw <img>.
// Vercel: next/image (AVIF/WebP negotiation, responsive srcset, lazy by default).
// Static/Cloudflare: <picture> with the pre-generated AVIF + WebP pair.
export default function SmartImage({ src, alt, width, height, fill, sizes, priority = false, className }) {
  if (SITE.target === 'vercel') {
    return (
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    )
  }
  const avif = src.replace(/\.webp$/, '.avif')
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" className={className} />
    </picture>
  )
}
