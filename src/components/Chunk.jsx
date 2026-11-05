import { Suspense } from 'react'

// Hydration chunking (Semrush Core Web Vitals / TBT, 2026-11-05).
// Nothing inside ever suspends, so the server HTML is identical (just comment markers). But React hydrates
// each Suspense boundary as its own short task instead of one long task for the whole page, which is what
// Lighthouse counts as Total Blocking Time. Keep above-the-fold (LCP) content outside.
export default function Chunk({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>
}
