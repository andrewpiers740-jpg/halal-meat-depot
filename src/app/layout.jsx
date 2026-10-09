import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { SITE } from '@/config/site'

// next/font self-hosts the font files at build time — no request to Google at
// runtime, no render-blocking stylesheet, font-display: swap.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta', weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  verification: {
    ...(SITE.gscCode ? { google: SITE.gscCode } : {}),
    ...(SITE.bingCode ? { other: { 'msvalidate.01': SITE.bingCode } } : {}),
  },
  other: { 'IndexNow-key': SITE.indexNowKey },
  formatDetection: { telephone: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A0D0E',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={jakarta.variable}>
      <head>
        <script src="/js/webmcp.js" defer />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
