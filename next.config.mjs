import { REDIRECTS, SITE } from './src/config/site.js'

const isStatic = process.env.TARGET === 'static'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  trailingSlash: true,
  // Product/category images are served as WebP (owner rule); hero slides are pre-built AVIF.
  images: isStatic ? { unoptimized: true } : { formats: ['image/webp'] },
  poweredByHeader: false,
  // Static export can't redirect; on Vercel moved and retired URLs 301 to their current page.
  ...(isStatic
    ? {}
    : {
        async redirects() {
          return [
            // The Vercel production alias served a full duplicate of the site (SEO audit C3) —
            // send it to the real domain. Preview deployments use other hostnames and are unaffected.
            { source: '/:path*', has: [{ type: 'host', value: 'halal-meat-depot.vercel.app' }], destination: `${SITE.url}/:path*`, permanent: true },
            ...REDIRECTS.map((r) => ({ ...r, permanent: true })),
          ]
        },
      }),
}

export default nextConfig
