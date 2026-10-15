# Technical + SEO audit — live site (2026-10-15)

Site: https://halalmeatdepot.com.au · Live commit `e6f00cc` · 256 sitemap URLs crawled one at a time from the live site.

## Summary

| Area | Result |
|---|---|
| On-page SEO score (100-point rubric, every page) | **100** on 255/256 pages once test-location latency is excluded (raw 99.0 avg, see "Response time" below) |
| PageSpeed mobile — home / category / product / blog | **99 / 98 / 95 / 100** performance; Accessibility, Best Practices, SEO **100** on all |
| PageSpeed desktop — home | **100 / 100 / 100 / 100** |
| GTmetrix (home, Seattle) | **95–97%** performance, **100%** structure, LCP 0.6–0.9s |
| Rank Math SEO Analyzer (home) | **90/100** (2 fails are tool-side, see below) |
| isitagentready | **80/100** |
| Broken internal links / images | **0 / 0** (260 internal URLs, 225 images checked) |
| Configured 301s | **143/143** single hop to a 200 |

## Technical — all passing

- **HTTPS + canonical host:** http→https, www→apex, missing trailing slash → slash: all one permanent (308) hop. Unknown URLs and wrong-case URLs return a real 404.
- **Security headers** on every page: HSTS (2 years, subdomains), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Compression:** Brotli on HTML, CSS, JS, llms.txt. Images served as AVIF (hero) / WebP (products, categories).
- **Caching:** HTML cached at Vercel's edge (every page an edge HIT, revalidated on deploy); `/_next/static` and `/images` cached 1 year, immutable.
- **robots.txt:** valid, no unknown directives (Content-Signal kept as a comment so Lighthouse stays at SEO 100), sitemap referenced, private paths (/admin, /cart, /checkout, /account, /order, thank-you pages) disallowed, 12 AI crawlers allowed.
- **Sitemap:** index + 4 child sitemaps, 256 URLs, `<lastmod>` on every URL, 212 product image entries, no noindex/redirected/404 URL included.
- **Indexability:** no indexable page carries noindex; every canonical is self-referencing and absolute; `lang="en-AU"` and viewport on every page.
- **Agent files:** llms.txt, auth.md, all `.well-known` discovery files return 200 with correct content types; markdown served only to clients that prefer it.

## On-page SEO — all passing

- 256/256 pages: unique title (30–60 chars, exact focus keyword, 1–2 power words), unique meta description (110–158 chars, exact focus keyword), exactly one H1 containing the focus keyword, no skipped heading levels, focus keyword in slug.
- Open Graph + Twitter tags complete on every page.
- Every image has alt text; no orphan pages; every page within 2 clicks of the homepage (35 at depth 1, 220 at depth 2); every page has 3+ inbound content links.
- Content: products 429–710 words, posts 1,105–1,348 words, no page under 300 words; median text overlap between product pages 27%, highest pair 50%.
- **Structured data:** valid JSON-LD on every page. Types: Store/Organization, LocalBusiness, WebSite + SearchAction, Product + Offer + shipping (7 options) + MerchantReturnPolicy (212/212), BreadcrumbList, FAQPage, Article, CollectionPage/ItemList, AboutPage, ImageObject.

## Findings to act on

| # | Priority | Finding | Action |
|---|---|---|---|
| 1 | **High** | **Search Console is signed out** in the browser pane. Batch 2 (14 Oct — the 10 new/moved URLs) stopped early without requesting anything; batch 3 requested 2 of 10 before Google's daily quota ran out. Batches 4–5 (16–17 Oct) will fail while signed out. | Owner: sign in to Search Console in the browser pane. Re-request: `/blog/slow-roast-lamb-slow-cooker/` (not on Google yet), the 10 new/moved URLs from batch 2, then `/blog/30-minute-beef-mince-recipes/`, `beef-bolar-blade-roast-recipe`, `beef-oyster-blade-steak-recipe`, `slow-cooked-lamb-shanks`. The sitemap (resubmitted 14 Oct) covers them meanwhile. |
| 2 | Medium | **AUS-MEAT link unreachable** (`https://www.ausmeat.com.au/`, on the certification/regulator section): connection refused/timed out from three different networks. May be down or reachable only from Australia. | Owner: open it from an Australian connection. If it is down, replace or remove the link. |
| 3 | Low | Product page mobile LCP 3.0s (performance 95): the product photo is the LCP element on Google's throttled phone. | Optional: lower product image quality slightly. Not urgent — it is 95 and real users on 4G see it far faster. |
| 4 | Low | Five product pairs at 49–50% text overlap (just under the 50% line): lamb & rosemary chipolatas ~ lamb ham, goat frenched rack ~ goat rolled loin, diced beef carton ~ lamb curry pieces carton / lamb shoulder carton, camel porterhouse on the bone ~ diced camel. | Optional: add 2–3 cut-specific sentences to each in `product-about.js` (as done for 13 products on 15 Oct). |
| 5 | Info | Halal Control Australia's site returns 429 to scripts (bot protection) but loads normally in a browser. | None — link works for visitors. |
| 6 | Info | Homepage hero images have no width/height attributes. | Intentional: adding them dropped mobile PageSpeed from 99 to 86–88 (tested and reverted 15 Oct). The hero is sized by CSS; no layout shift. |
| 7 | Info | Beef category page is 445 KB uncompressed. | Not a problem: 41 KB on the wire, mobile PageSpeed 98. |

## Tool-side items that cannot be fixed honestly

- **Rank Math "JavaScript not minified"** — the flagged file is Next.js's own minified runtime; line breaks inside its error-message strings trigger the heuristic.
- **Rank Math "Mobile speed test failed"** — Rank Math's own tester errors; PageSpeed mobile is 99.
- **isitagentready:** DNS-AID records exist but the zone is not DNSSEC-signed (Vercel DNS can't sign); Content-Signal as a directive would cost 8 Lighthouse SEO points; Web Bot Auth, OAuth agent registration and x402/MPP don't apply to a human-checkout shop.

## Response time note

The rubric's "server response < 800 ms" check failed on 86 pages when measured from the audit machine, which reaches Vercel's Cape Town edge (~0.5 s to first byte from there). Every page was an edge-cache HIT; Google's US test servers measured 10 ms time-to-first-byte. Those deductions reflect the test location, not the site.

## Off-site (not fixable in code)

Rankings now depend mostly on: a complete Google Business Profile, genuine customer reviews (none yet — Product `aggregateRating` stays off until real reviews exist), directory citations with consistent name/address/phone, and links from Australian food, halal-community and supplier sites.
