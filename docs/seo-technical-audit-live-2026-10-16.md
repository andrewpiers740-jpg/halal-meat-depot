# Halal Meat Depot — full technical and SEO audit (live site)

**Site:** https://halalmeatdepot.com.au · **Date:** 16 October 2026 · **Build audited:** commit `27086d1` (live on Vercel)

Method: a full crawl of every sitemap URL (336 pages) as Googlebot; a technical check of redirects, headers, caching, robots, sitemaps, every internal link, every image and every external link; structured data validation of all product and blog pages; PageSpeed Insights (Lighthouse 13.5), GTmetrix, Rank Math SEO Analyzer and isitagentready.com on sample pages; and the project's own build check (`npm run crosscheck`, 15,772 checks, 0 failed).

---

## 1. Scorecard

| Tool | Homepage | Blog post (beef rendang) | Category (halal beef) | Product (lamb shanks) |
|---|---|---|---|---|
| PageSpeed mobile (Perf / A11y / BP / SEO) | 93 / 100 / 100 / 100 | 99 / 100 / 100 / 100 | 96 / 100 / 100 / 100 | 97 / 100 / 100 / 100 |
| PageSpeed desktop | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | — | — |
| PageSpeed Agentic Browsing | 4/4 | 4/4 | — | — |
| GTmetrix (Performance / Structure) | 98% / 99% | 100% / 100% (earlier today) | — | — |
| Rank Math SEO Analyzer | 90/100 (26/28) | 90/100 (26/28) | — | — |
| isitagentready.com | 80 | 80 | — | — |

The homepage's mobile score varies between runs: 98 earlier today, 93 on the latest two runs. The LCP element (the hero image) hasn't changed, and its measured load parts add up to about 1.5 s; the rest comes from Lighthouse's simulated throttling. Desktop is 100.

---

## 2. Technical SEO

| Check | Result |
|---|---|
| Pages in sitemaps | 336 (14 pages, 212 products, 10 categories, 100 posts) — all return 200 |
| Canonical host | http → https and www → apex redirect (308). `http://www.` takes two hops (http://www → https://www → apex), which is Vercel's domain handling and harmless |
| Trailing slash | `/about` → `/about/` (308) |
| 404 handling | Unknown URLs and wrong-case URLs return a real 404 |
| Configured 301s | 143 of 143 redirect in one hop to a 200 page |
| HTTPS / security headers | HSTS (2 years, includeSubDomains), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy all present |
| Compression | Brotli on HTML, CSS and JS |
| Caching | Static JS, CSS and images: 1 year, immutable. HTML: revalidated each request, served from the Vercel cache |
| robots.txt | Valid. Sitemap listed. Private areas (cart, checkout, account, admin, order, thank-you pages) disallowed. No unknown directives |
| Sitemaps | Index plus 4 child sitemaps, every URL with a `lastmod`, 612 image entries (212 product, 400 blog) |
| Noindex pages | Cart, checkout, account, search, thank-you and order pages are noindex and not in the sitemap |
| Internal links | 340 unique internal links: 0 broken, 0 redirecting |
| Images | Every image on every page loads (625 unique plus all 1,200 blog image files) |
| External links | 626 checked. Real problems found and fixed today: 2 deleted Flickr photo pages and the CC0 licence link (all replaced). The remaining errors are bot-blocking, not broken links: WhatsApp (599), halalcontrol.com.au (429), Rawpixel and Flickr (403) |
| Average response (crawl) | about 1 s from the audit location (Cape Town); TTFB from Australia is lower |
| HTML weight | Product pages ~106 KB, blog posts ~87 KB, homepage 174 KB, blog index 345 KB (100 tiles), largest category 446 KB |

### Open technical items
1. **Rank Math "JavaScript not minified"** (1 of 2 Rank Math fails). The post-build step puts JS chunks on one line, but Vercel's CDN still serves an old cached copy of chunk `3v60a0rid8eqb.js` because it caches static files by name. **Fix:** a Vercel CDN cache purge (not the image cache), or renaming the chunks. This needs your decision.
2. **Rank Math "Mobile Speed: test execution failed"** is Rank Math's own tester failing. It isn't a site issue; PageSpeed mobile is 93–99.
3. **Largest category page (446 KB HTML)** is the beef category, with about 90 products. Splitting it into paginated or subcategory pages would lighten it, but it already scores 96 on mobile.

---

## 3. On-page SEO (all 336 pages)

| Check | Result |
|---|---|
| Title length (≤ 60) | 0 issues |
| Meta description (110–158) | 0 issues |
| Duplicate titles / descriptions | 0 / 0 |
| Focus keyword in title, meta, H1 and slug (owner rule) | Enforced by the build check (F1–F4, F9): 0 failures |
| Power words in titles (1–2) | 0 failures (F13) |
| Exactly one H1 per page | 0 issues |
| Heading order (no skipped levels) | 0 issues |
| Canonical tags | Present and self-referencing on every page |
| Open Graph and Twitter cards | Present on every page. Blog posts now share their own first photo and categories their category photo (fixed today; they previously all used the generic image) |
| Language | `en-AU` on every page |
| Image alt text | 0 images without alt. Focus keyword in alt, title, caption and schema (F6–F7) |
| Image dimensions | One image without width/height: the homepage hero slider, on purpose. Adding them cut mobile PageSpeed from 99 to 86–88 in earlier testing, so it uses a fixed-ratio container instead (CLS = 0) |
| Click depth | Home 0, 35 pages at depth 1, 300 at depth 2. Nothing deeper |
| Orphan pages | 0 (every page has inbound internal links) |
| Thin content (< 300 words) | 0 |
| Product descriptions | 429–710 words. Focus keyword in the first 20% (F10) |
| Blog posts | 100 posts, each 1,000+ words, 4 photos each with credits. No near-duplicate posts (5-word shingle similarity < 8% for every pair) |
| Near-duplicate products | Highest similarity 0.48 (for example camel scotch fillet vs camel mince). Acceptable; each product has its own cut copy |

---

## 4. Structured data

| Page type | Types | Result |
|---|---|---|
| Homepage | Store/Organization, LocalBusiness, WebSite + SearchAction, FAQPage, ImageGallery | Valid |
| Products (212) | Product, Offer (with OfferShippingDetails, DefinedRegion, ShippingDeliveryTime), MerchantReturnPolicy, BreadcrumbList, ImageObject | **212 of 212 fully valid** |
| Categories (10) | CollectionPage, ItemList, OfferCatalog, BreadcrumbList | Valid |
| Blog posts (100) | Article (headline, 4 ImageObjects, datePublished, dateModified, author, publisher logo), BreadcrumbList | **100 of 100 complete** |
| FAQ / About / Contact | FAQPage, AboutPage, ContactPoint, OpeningHoursSpecification | Valid |

Only informational: Product has no `review` / `aggregateRating`. That's correct, because no real reviews exist yet, and it must not be faked.

---

## 5. Agent readiness (AI agents and LLMs)

| Item | Status |
|---|---|
| Markdown for agents (`Accept: text/markdown`) | Works on every page, including blog posts |
| llms.txt / llms-full.txt | Live; lists all 100 posts |
| API catalog, MCP server card, Agent Skills (6), WebMCP (5 tools) | Live and valid |
| ai-catalog.json / ard.json | Valid against the official ard-spec schema (fixed today). PageSpeed Agentic Browsing 4/4 |
| OAuth / OIDC discovery | Root and per-page (RFC 9728 path) metadata live (fixed today) |
| Not implemented on purpose | DNSSEC (impossible on Vercel DNS), Content-Signal robots directive (costs 8 Lighthouse SEO points), Web Bot Auth, agent payments (x402) |

---

## 6. Keyword audit (summary — full list in the keyword usage report)

| Group | Count | Focus keyword KD ≥ 35 | Average supporting keywords | With no supporting keywords |
|---|---|---|---|---|
| Pages | 14 | 0 | 0 | 14 |
| Categories | 10 | 0 | 0 | 10 |
| Products | 212 | 5 | 3.2 | 65 |
| Blog posts | 100 | 1 | 5.3 | 0 |

**Findings**
1. **Five product focus keywords are harder to rank for (KD ≥ 35):** beef hanger steak (40), lamb shanks (44), lamb kofta (44), chicken wings (43) and chicken drumsticks (54). Also the blog post focus "slow cooked lamb shanks" (39). They are exact-match, high-volume terms (for example lamb shanks at 14,800/month), but a young domain will take longer to rank. If faster wins matter more, swap to lower-KD exact phrases from the files, which would mean URL changes and 301s.
2. **129 products use their own name as the focus keyword**, because the keyword files have no qualifying exact phrase for them (your fallback rule). They're marked "not in keyword files" in the report.
3. **Product supporting keyword mix is 19% T / 22% C / 59% I, against a 45/45/10 target.** 105 products have fewer than 5 supporting keywords and 65 have none. The files don't contain more relevant exact transactional or commercial phrases, and none were invented, as your rule requires. Getting closer to target needs fresh Semrush exports, for example "buy/price/near me" variations for each cut.
4. **Pages and categories have focus keywords only, no supporting keywords.** This is the biggest remaining keyword gap. Adding 3–5 exact supporting phrases to each category page (for example halal beef → "halal beef meat", "halal beef steak", which are already used in posts) would need a re-allocation so keywords aren't used twice.
5. **Blog posts all meet the 50/25/25 rule**, with 5–8 keywords each, all used verbatim and each used once site-wide.
6. **Seven utility pages have no real keyword:** About, Contact, FAQ, Blog, Refund, Terms and Privacy use their page name. That's normal; they aren't meant to rank.

---

## 7. Fixed today

- 80 new blog posts (100 in total), each with 4 credited, licence-checked photos, plus photo tiles on the blog index and homepage
- Blog photos added to the image sitemap, plus a 768 px size so phones download about 90 KiB less per post
- "Related guides" links on each post, spread across all 100 posts
- Per-post and per-category social-share images
- 6 photos replaced: 4 linked to a Flickr account now flagged adult content, and 2 whose pages were deleted. CC0 licence links fixed
- ai-catalog.json brought to the official schema (Agentic Browsing 3/4 → 4/4)
- Per-page OAuth protected-resource metadata (agent readiness on blog posts 73 → 80)
- 101 URLs submitted to IndexNow. Google indexing continues through the daily Search Console task

## 8. Recommended next steps (in priority order)

1. **Approve a Vercel CDN cache purge for static files only, not the image cache.** It clears Rank Math's last fixable fail. Alternatively, I can rename the chunks.
2. **Fresh Semrush exports** with transactional and commercial phrases for each cut and category, so products and categories can reach the 45/45/10 mix and get supporting keywords.
3. **Real customer reviews.** Once you have genuine reviews, they can be added to product schema for star ratings in search results.
4. **Your own product and blog photos,** where library photos only approximate the dish (camel, kangaroo and a few other posts).
5. **Search Console and Bing:** keep the daily indexing task running until all 336 URLs show as indexed.
