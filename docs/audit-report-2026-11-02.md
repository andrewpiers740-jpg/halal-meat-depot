# Halal Meat Depot — technical & SEO audit (2026-11-02)

Live site: https://halalmeatdepot.com.au — 238 sitemap URLs (142 posts, 212 products, 10 categories, 14 pages in the link audit's grouping).

## 1. Crawl (live)
- Every sitemap URL returns 200; no redirect chains in the sitemap.
- One title, meta description (110–158 chars decoded), `<h1>`, canonical and viewport per page; no duplicate titles or descriptions; JSON-LD on every page; every image has alt text.
- Internal links and images: no broken targets after the `&amp;` crawler fix.
- Blog photos: no licensed-photo credits remain; all posts use the site's own product images.
- Project crosscheck: 21,661 checks, 0 failures.

## 2. Lighthouse 12.8.2 (local, live URLs)
| Page | Mobile perf | LCP | TBT | Desktop perf |
|---|---|---|---|---|
| Home | 81 | 2.8 s | 540 ms | 95 |
| Category (halal beef) | 81 | 2.7 s | 610 ms | 99 |
| Shop page | 83 | 2.5 s | 570 ms | 100 |
| Product | 87 | 2.4 s | 420 ms | 100 |
| Blog post | 93 | 2.0 s | 290 ms | 98 |

Accessibility, best practices and SEO are 100 on every page and device. CLS is 0–0.03.
Main weakness: mobile Total Blocking Time (unused and legacy JavaScript, main-thread work). Smaller items: `valid-source-maps`, `label-content-name-mismatch` (desktop), `uses-responsive-images`, `dom-size` on category/shop pages.

## 3. Structured data
Product pages carry Product, MerchantReturnPolicy, shippingDetails and FAQPage. No aggregateRating: there are no real reviews, and inventing one would break Australian Consumer Law and Google policy.

## 4. Internal links
Average inbound links: products 9.6, posts 9.8; outbound 11–18. Weak spots: `/privacy/` has 2 outbound links, and 11 posts have fewer than 3 inbound links (e.g. `/blog/healthy-mince-recipes/`, `/blog/curry-sausages-recipe/`, `/blog/gyudon-beef-donburi-recipe/`, `/blog/dish-biryani-beef/`, `/blog/lemongrass-vietnamese-beef/`, `/blog/goat-flesh-does-taste-like/`, `/blog/burger-camel/`, `/blog/mince-recipes/`).

## 5. Agent readiness (isitagentready.com): 80, Level 1
Deliberately not implemented (nothing real to advertise): OAuth/authorization servers, Web Bot Auth, x402/MPP agent payments, DNS-AID (needs DNSSEC and DNS records), UCP checkout. `Content-Signal` stays a robots.txt comment because Lighthouse flags it as an unknown directive as a real directive (SEO 100 → 92).

## 6. Not completed
- Rank Math SEO analyzer: not run; the owner can run it at rankmath.com/tools/seo-analyzer (it asks for an email).
- GTmetrix: not run; it needs a login. Lighthouse above is the equivalent lab data.

## 7. Recommendations (priority order)
1. Cut mobile TBT: split or defer third-party and client components, remove legacy polyfills (raise the browserslist target), lazy-load below-the-fold client JS.
2. Add inbound links to the 11 under-linked posts (related-post blocks / hub pages).
3. Add 3–4 more links on `/privacy/`.
4. Upgrade Next.js to the patched security release (`next upgrade --agent=security`) — awaiting the owner's yes.
5. Regenerate `docs/keyword-report-2026-11-02*` to drop the removed competitor keyword.
6. Add a real aggregateRating only once genuine reviews exist.
