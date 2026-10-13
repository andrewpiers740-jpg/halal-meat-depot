# Halal Meat Depot — final live SEO audit

Audited **https://halalmeatdepot.com.au** after releases 461bde9 (Lighthouse fixes) and ac668b4 (Priority Delivery) · 13 October 2026.

## 1. Scores now (Lighthouse 12, mobile, live site)

| Page | SEO | Accessibility | Best Practices | Performance |
|---|---|---|---|---|
| Homepage | **100** | **100** | **100** | 84 (PageSpeed Insights earlier today: 99) |
| Product — beef eye fillet | **100** | **100** | **100** | 85 |
| Category — halal beef | **100** | **100** | **100** | 80 |
| Blog — halal beef cuts | **100** | **100** | **100** | 89 |
| Wagyu steak | **100** | **100** | **100** | 89 |
| Delivery policy | **100** | **100** | **100** | 94 |

**SEO, Accessibility and Best Practices are 100/100 on every page tested** (they were 92 / 92–96 / 100 this morning).
Performance varies between runs. These runs were made minutes after a deploy, before Vercel's cache had warmed (server response time was up to 2.5 s), so expect higher numbers on a re-test.

## 2. Full crawl (241 live URLs)

All clear:
- **Status:** 241/241 pages return 200.
- **Tags:** 0 canonical errors, 0 noindex, 0 missing alt text, 0 invalid structured data, 0 missing Open Graph tags.
- **Headings and meta:** exactly one H1 per page; 0 titles over 60 characters; 0 descriptions outside 110–158 characters; 0 duplicate titles or descriptions.
- **Product pages:** 538–766 words (median 685); every product has 3+ inbound links in page content.
- **Product schema:** now carries **7 shipping options**, standard plus 6 Priority zones, each with its price, postcode ranges and delivery time, along with the return policy.

## 3. Errors found in this audit

| # | Issue | Status |
|---|---|---|
| 1 | Broken outbound link to your certifier: `www.halalcontrol.com.au` doesn't exist (no DNS record). The correct site is `halalcontrol.com.au` | **Fixed locally**, waiting for push |
| 2 | "Read the guide" links on the homepage and blog: the accessible name didn't match the visible text | **Fixed locally**, waiting for push |
| 3 | Google Search Console "Request indexing" errors on the first attempt (Google-side fault, recovers on retry); daily quota reached after 9 pages | Continue tomorrow |
| 4 | IndexNow's shared endpoint says "site verification not completed" (Bing's own endpoint accepted all 241 URLs) | Self-resolves; resubmit in a few days |
| 5 | Some pages were slow on first load after the deploy (cold cache): Wagyu, Aqeeqah, FAQ, 5 products | Normal after a deploy; no action |
| 6 | Thin pages: /contact/ (121 words), /blog/ index (252 words) | Low priority: contact pages are thin by nature; the blog index grows with each post |
| 7 | About, Terms and Privacy are linked only from the footer | Fine: footer links count; no action |
| 8 | Three government/industry sources (agriculture.gov.au, NSW Food Authority, AUS-MEAT) time out for automated checkers | They load for normal visitors; no action |
| 9 | JavaScript cost: 250–470 ms Total Blocking Time; about 50 KB of unused JS per page | The remaining Performance lever (see §5) |

## 4. Indexing progress

- **Google:** the homepage is now **indexed ("URL is on Google")**. Indexing was requested for the homepage, shop, wholesale, and the beef, lamb, goat, chicken, bulk boxes and Wagyu pages. Daily quota reached.
  Tomorrow: Aqeeqah, delivery, camel, kangaroo, duck, buffalo, offal pages, then the top products.
- **Bing (ChatGPT search, Copilot):** all 241 URLs were submitted through IndexNow and accepted (HTTP 200).

## 5. How to reach 100 — and what "100" can mean

| Score | Now | To reach 100 |
|---|---|---|
| Lighthouse SEO | **100** | Done ✅ |
| Lighthouse Accessibility | **100** | Done ✅ (push fix #2 to keep it on the homepage) |
| Lighthouse Best Practices | **100** | Done ✅ |
| Lighthouse Performance | 80–94 (99 on PSI homepage) | Trim JavaScript: render the "Add to cart" controls on listing pages without loading the full cart script up front, and drop legacy polyfills (14 KB). Realistic target 90–95; a steady 100 on every page is uncommon for a real shop. |
| "AI visibility" | no official score | Off-site work: see below |

**Off-site actions (only you can do these), in order of impact:**
1. **Google Business Profile** (service-area business, delivery only). This drives "halal butcher near me" searches and AI recommendations.
2. **Genuine Google reviews** from real customers.
3. **Directory listings and mentions:** True Local, Yellow Pages, Hotfrog, StartLocal, halal directories, Sydney Muslim community groups and Facebook groups. Ask Halal Control Australia whether they list certified businesses on their site; a link from your certifier is a strong trust signal for Google and AI tools.
4. **Regular social posts** linking back to product pages.
