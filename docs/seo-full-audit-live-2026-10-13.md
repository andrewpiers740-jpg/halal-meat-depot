# Halal Meat Depot — full SEO audit (live site)

Audited **https://halalmeatdepot.com.au** after release 58ea118 · 13 October 2026.
Checks:
- a crawl of all 241 sitemap pages (as Googlebot);
- a check of every link and asset (2,134);
- PageSpeed Insights on all 241 pages;
- Google Rich Results Test;
- Search Console;
- `site:` and brand searches on Google and Bing.

---

## 1. Scorecard

| Area | Result | Grade |
|---|---|---|
| Crawlability & indexability | 241/241 pages return 200; canonicals correct; no noindex; robots.txt and sitemap valid | ✅ |
| On-page SEO | Unique titles (≤60) and meta descriptions (110–158) on every page; one H1 each; correct heading order | ✅ |
| Structured data | Valid on every page; Google confirms **Product snippets, Merchant listings, Breadcrumbs** are eligible | ✅ |
| Speed (PageSpeed, mobile) | Average **Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100** across 241 pages | ✅ |
| Links | 0 broken internal links, 0 redirect chains on your domain | ✅ |
| Content | Products 540–772 words, all unique (median overlap 30%) | ✅ |
| Site structure | Every page within 2 clicks of the homepage | ✅ |
| **Indexing** | **Google: ~10 pages indexed** (up from 0 this morning). Bing: 0 so far (submitted today) | 🟡 In progress |
| **Off-site** | No Google Business Profile, no reviews, no directory listings or backlinks yet | 🔴 Biggest gap |

**Bottom line:** the website itself has no SEO errors. What now limits rankings is time (indexing) and off-site signals (Business Profile, reviews, links), not anything on the site.

---

## 2. Indexing and visibility (today)

- **Google:** a `site:` search now shows about **10 pages**:
  - shop, lamb, Wagyu, chicken, wholesale, beef, Aqeeqah, bulk boxes, goat and the beef-cuts guide.
  - Most are the pages we asked Google to index this morning.
- **Brand search "halal meat depot" (Google Australia):** your site holds **positions 1, 2 and 5**:
  - #1 shop page;
  - #2 wholesale;
  - #5 beef.

  The homepage isn't showing for the brand search yet. It is indexed ("URL is on Google") and should replace the shop page at #1 once Google re-processes it.
- **Search Console:** the Page indexing report still says "Processing data, check again in a day or so". That's normal for a new property.
- **Bing (also feeds ChatGPT search):** 0 results yet. All 241 URLs were submitted through IndexNow today, and Bing usually indexes within a few days to two weeks.
- **Tomorrow 12:30:** the scheduled task requests indexing for the next 10 pages.

---

## 3. Technical SEO

| Check | Result |
|---|---|
| HTTP status | 241/241 = 200 |
| HTTPS, HSTS, security headers | ✅ |
| `http://`, `www.` → `https://halalmeatdepot.com.au` | ✅ 1 hop (2 for `http://www.`, set by the hosting platform) |
| Old URLs, retired products, moved pages | ✅ all 301 in one hop |
| Canonical tags | ✅ 241/241 self-referencing and correct |
| robots.txt | ✅ valid; private pages blocked; AI crawlers allowed; sitemap listed |
| Sitemap | ✅ index + 4 child sitemaps, 241 URLs, real last-modified dates; Google: "Success" |
| Language | ✅ `en-AU` on every page |
| Mobile viewport | ✅ every page |
| Open Graph / Twitter cards | ✅ complete on every page |
| Server response | ✅ average 0.8 s full page download (Googlebot user agent, from UK) |
| favicon.ico, api-catalog | ✅ fixed today |

---

## 4. On-page SEO

| Check | Result |
|---|---|
| Titles | ✅ 30–60 characters, all unique, focus keyword in every title |
| Meta descriptions | ✅ 110–158 characters, all unique, focus keyword in every one |
| H1 | ✅ exactly one per page, contains the focus keyword |
| Heading order | ✅ no skipped levels on any page (shop page fixed today) |
| Image alt text | ✅ every content image has keyword alt text; the header logo is correctly marked decorative |
| URLs | ✅ short, keyword-based, lowercase, trailing slash, consistent |

---

## 5. Structured data

- **Types in use:**
  - business identity: Organization / Store, LocalBusiness, WebSite with SearchAction;
  - products: Product with Offer, OfferShippingDetails (7 delivery options with postcode zones), MerchantReturnPolicy, ImageObject and Brand;
  - navigation and listings: BreadcrumbList, CollectionPage, ItemList, OfferCatalog;
  - content: FAQPage, Article, AboutPage, ImageGallery.
- **Google Rich Results Test (product page):** 3 valid items:
  - Product snippets ✅
  - Merchant listings ✅
  - Breadcrumbs ✅
- **Non-critical warnings only:**
  - `validFrom` (optional): no real effect.
  - Missing `review` / `aggregateRating`: these produce the star ratings in Google. They can only be added once you have **genuine** customer reviews.

---

## 6. Content

- **Product pages:** 540–772 words each (median 691), all with a unique description and cut profile.
- **Duplication:** median overlap between product pages is 30%, which is good. The most similar pairs (59–62%) are close variants:
  - Angus porterhouse vs Angus rump;
  - two marinated chicken wings;
  - beef porterhouse portion vs MB4 version.

  That's acceptable, but these are the first to rewrite if any variant struggles to rank.
- **Lighter pages:**
  - **Blog index:** 252 words. It will grow as posts are added; an intro paragraph would help now.
  - **Contact:** 121 words. Normal for a contact page.
- **Blog:** 5 posts of 1,000+ words. The strategy plans 20; more posts means more pages that can rank and more questions answered for AI assistants.

---

## 7. Internal linking

- Every page is **≤ 2 clicks from the homepage**:
  - 35 pages at 1 click;
  - 205 pages at 2 clicks.
- Every product has 3+ links from other pages' content.
- About, Terms and Privacy are linked only from the footer. That's normal and fine.

---

## 8. Speed (PageSpeed Insights, mobile, all 241 pages)

- **Averages:** Performance 98.2 · Accessibility 100 · Best Practices 100 · SEO 100.
- **Performance spread:** 48 pages at 100; 177 at 95–99; 16 at 90–94; none below 90.
- **The 16 pages at 90–94:** their image happened to load more slowly in that run. Re-runs give 97–100.
- **What's left:** the ~50 KB of unused JS and 14 KB of legacy JS that PageSpeed flags are inside the Next.js framework itself.

Full table: `docs/pagespeed-all-pages-2026-10-13.md`.

---

## 9. Links

- **Internal:** 0 broken across 2,134 links and assets.
- **External:** all reachable for visitors:
  - `halalcontrol.com.au` blocks automated checkers only.
  - `www.ausmeat.com.au` only accepts Australian visitors. The link was updated today.

---

## 10. Off-site SEO & AI visibility — the remaining gap

| Signal | Status | Who |
|---|---|---|
| Google Business Profile (service-area, Greenacre, delivery only) | ❌ not set up | You |
| Google reviews | ❌ none | You (customers) |
| Directory listings: **halalfood.com.au "Halal Meat Directory"** (it ranks #4 for your brand name), True Local, Yellow Pages, Hotfrog, StartLocal | ❌ none | You |
| Link from your certifier (Halal Control Australia) | ❌ ask them | You |
| Social profiles linking to the site | ✅ Facebook, TikTok, Pinterest in schema | Keep posting |
| Bing / ChatGPT search index | 🟡 submitted today | Automatic |

---

## 11. Action list (priority order)

1. **Set up your Google Business Profile.** It's the biggest single lever for "halal butcher near me" and Maps.
2. **Get genuine Google reviews.** Once real reviews exist, I can add them to the site and stars become possible in Google.
3. **List the business on halalfood.com.au** (it already appears for your brand name) and 4–5 Australian directories, using exactly the same name, address and phone number everywhere.
4. **Let the indexing run:** the daily Search Console batches, starting tomorrow 12:30. Re-check the Page indexing report in 2–3 days.
5. **Optional site improvements I can do:**
   - add an intro to the blog index;
   - make the 3–4 near-duplicate product pairs more distinct;
   - write blog posts 6–20 from the plan.
