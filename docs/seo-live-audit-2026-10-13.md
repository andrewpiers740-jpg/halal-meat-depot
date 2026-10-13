# Halal Meat Depot — live SEO & AI-visibility audit

Audited: **https://halalmeatdepot.com.au** (live, release 5766361) · 13 October 2026
Method: full crawl of all 241 live URLs · Google PageSpeed Insights (homepage) and Lighthouse 12 mobile (product, category, blog, Wagyu pages) · Google Search Console and Bing Webmaster Tools · `site:` checks on Google and Bing.

---

## 1. The headline

**On-site SEO is in excellent shape. The site is not yet indexed by Google or Bing** — a `site:halalmeatdepot.com.au` search returns zero results on both. That is normal for a domain that went live days ago, but until pages are indexed they cannot rank, and AI assistants (ChatGPT search uses Bing's index; Google AI Overviews and Gemini use Google's) cannot cite them. **Getting indexed is now priority #1.**

Good news: Google has already read the sitemap successfully and **discovered all 236 URLs** (Search Console, 13 Oct). Bing has the sitemap queued.

---

## 2. Scores (mobile)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Homepage (PageSpeed Insights) | **99** | 96 | **100** | **100** |
| Product — beef eye fillet | 89 | 96 | **100** | 92 |
| Category — halal beef | 87 | 96 | **100** | 92 |
| Blog — halal beef cuts | 93 | 92 | **100** | 92 |
| Wagyu steak page | 84 | 96 | **100** | 92 |

Homepage Core Web Vitals: LCP **2.3 s** (good, was 2.9 s), CLS 0.003, TBT 20 ms.

### Already fixed in the next release (waiting for your push approval)

| Issue (Lighthouse) | Pages | Fix | Expected effect |
|---|---|---|---|
| robots.txt "Unknown directive" (`Content-Signal` line) | all | Line kept as a comment | **SEO 92 → 100** on every page |
| "Add to cart" accessible name doesn't start with the visible label | product, category, Wagyu | aria-label now "Add to cart: …" | Accessibility ↑ |
| Phone and WhatsApp links too small to tap | all | 44 px tap targets | Accessibility ↑ |
| Heading contrast on dark card ("Shop certified halal meat") | blog | White heading text | Accessibility ↑ |
| Images cached only 7 days | all | 1-year immutable cache (filenames are versioned) | Performance ↑ on repeat visits |
| Hero images larger than phones need | homepage | Extra 640 px AVIF size | ≈100 KB less on mobile |

Build check after these fixes: 11,584 tests, all passing.

---

## 3. Full crawl results (241 live pages)

| Check | Result |
|---|---|
| HTTP status | ✅ 241/241 return 200 |
| Canonical tags | ✅ 241/241 correct |
| One H1 per page, H1 contains the focus keyword | ✅ |
| Titles ≤ 60 / descriptions 110–158, all unique | ✅ |
| Focus keyword in title, description, slug | ✅ |
| Structured data valid | ✅ every page |
| Product schema | ✅ Product, Offer, ImageObject, shipping details, **delivery time (0–1 day handling, 2–5 days transit)**, **return policy**, keywords |
| Images: alt text / formats | ✅ 0 missing alt · WebP products, AVIF hero, SVG logos |
| Product content | ✅ median 671 words (524–752), overlap between products 29% (was 39%) |
| Internal links | ✅ every product has 3–8 inbound links and 8–11 outbound; posts have 19–99 inbound |
| Redirects | ✅ old URLs, retired products and the vercel.app host all go one hop to the final page |
| HTTPS, HSTS, security headers | ✅ |
| Sitemap | ✅ real last-modified dates; Google: "Success, 236 discovered" |

---

## 4. AI visibility (ChatGPT, Gemini, Perplexity, Google AI Overviews)

| Signal | Status |
|---|---|
| AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot…) | ✅ |
| llms.txt + llms-full.txt (full catalogue) | ✅ |
| Structured data: Organization/Store, LocalBusiness, Product, FAQ, Article, Breadcrumb | ✅ |
| Answer-first FAQ sections on homepage, categories, Wagyu, Aqeeqah pages | ✅ |
| Social profiles linked (Facebook, TikTok, Pinterest) | ✅ |
| Published halal certificate + number (trust signal AI answers repeat) | ✅ |
| **Indexed by Bing** (feeds ChatGPT search, Copilot) | ❌ 0 pages |
| **Indexed by Google** (feeds AI Overviews, Gemini) | ❌ 0 pages |
| **Mentions on other websites** (directories, news, community sites, Reddit, Google reviews) | ❌ none found — this is what AI assistants weigh most when recommending a business |
| **Google Business Profile** | ❌ not set up |
| **Customer reviews** | ❌ none |

AI assistants recommend businesses they can (1) find in a search index and (2) see corroborated elsewhere. The site itself is ready; the missing pieces are indexing and off-site presence.

---

## 5. What you need to do to push scores and AI visibility up

### A. I can do (with your OK)
1. **Push the fixes in §2** → Lighthouse SEO 100 on every page, higher accessibility.
2. **Request indexing in Google Search Console** for the homepage, 10 categories, Wagyu, Aqeeqah and the top products (Search Console allows ~10–12 requests a day; I can do a batch daily).
3. **Submit all 236 URLs to Bing via IndexNow** (the site already has an IndexNow key) — usually gets Bing indexing within days, which is what ChatGPT search draws on.
4. **Cut JavaScript on long pages** (TBT 270–460 ms on product/category pages) — load "Add to cart" buttons more lightly on listing pages to lift Performance from the high 80s towards 95+.
5. **Write blog posts 6–20** from the strategy plan (more indexable pages answering real questions).
6. **Build a genuine review system** (post-delivery email → stars appear in Google once real reviews exist) — needs the Upstash database connected in Vercel.

### B. Only you can do
1. **Google Business Profile** — service-area business, Greenacre, delivery only. The single biggest lever for "halal butcher near me" (5,400/mo) and for AI assistants recommending you.
2. **Real Google reviews** — ask every happy customer; even 10–20 reviews changes how Google and AI tools treat a business.
3. **Get mentioned elsewhere** — list the business on True Local, Yellow Pages, Hotfrog, StartLocal, halal directories and Muslim community sites/groups in Sydney; ask suppliers/partners to link to you; share products on your Facebook, TikTok and Pinterest regularly with links back to the site.
4. **Confirm Priority Delivery (24 h)** — price and coverage area — so it can be offered at checkout and in Google.
5. **Product claims** — which products (if any) are genuinely free range, grass-fed or organic, per supplier paperwork.

### C. A note on "100/100"
- **Lighthouse/PageSpeed scores:** SEO 100 and Best Practices 100 are reachable on every page once §2 is pushed; Accessibility should reach 98–100; Performance will sit in the 90s on most pages after the JavaScript work (100 on every page is rarely achieved by real shops).
- **"AI visibility" has no official 100-point score.** It is earned through indexing, reviews, a Business Profile and mentions on other sites — the items in §5B. The site is technically ready for it now.
