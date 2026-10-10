import { RETIRED_PRODUCTS } from './src/config/site.js'

const isStatic = process.env.TARGET === 'static'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  trailingSlash: true,
  images: isStatic ? { unoptimized: true } : { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  // Static export can't redirect; on Vercel retired product URLs 301 to their replacement.
  ...(isStatic
    ? {}
    : {
        async redirects() {
          return Object.entries(RETIRED_PRODUCTS).map(([slug, destination]) => ({ source: `/product/${slug}/`, destination, permanent: true }))
        },
      }),
}

export default nextConfig
