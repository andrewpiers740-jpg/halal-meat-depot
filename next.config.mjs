import { REDIRECTS, SITE } from './src/config/site.js'

const isStatic = process.env.TARGET === 'static'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : undefined,
  trailingSlash: true,
  // Product/category images are served as WebP (owner rule); hero slides are pre-built AVIF.
  // Widths trimmed to what the layouts use (sources are at most 1600px wide): shorter srcsets keep
  // category pages (60+ cards) lighter, and the fallback src is 1600w instead of 3840w.
  images: isStatic ? { unoptimized: true } : { formats: ['image/webp'], deviceSizes: [640, 750, 828, 1080, 1200, 1600], imageSizes: [96, 256, 384] },
  poweredByHeader: false,
  // Note: experimental.inlineCss was tried (2026-10-13) and reverted — Next 16 embeds the stylesheet
  // three times per page (style tag + RSC payload), adding ~27 KB compressed to category pages, more
  // than the ~9 KB render-blocking request it removes. Keep the shared, cacheable stylesheet.
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
            // Browsers and crawlers request /favicon.ico by default; the favicon is SVG only (owner rule).
            { source: '/favicon.ico', destination: '/icon.svg', permanent: true },
          ]
        },
        async headers() {
          return [
            // RFC 9727 media type — the extensionless static file is otherwise served as octet-stream
            // (the vercel.json override does not take effect for it).
            { source: '/.well-known/api-catalog', headers: [{ key: 'Content-Type', value: 'application/linkset+json' }] },
            // Same for the other extensionless discovery files (served as octet-stream otherwise).
            ...['ucp', 'oauth-protected-resource', 'oauth-authorization-server', 'openid-configuration'].map((f) => ({
              source: `/.well-known/${f}`,
              headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }],
            })),
          ]
        },
      }),
}

export default nextConfig
