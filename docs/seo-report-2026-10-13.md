# Halal Meat Depot — SEO implementation report

Date: 13 October 2026 · Scope: your keyword and content rules, plus every fixable item from the SEO audit (docs/seo-audit-2026-10-13.md).
Status: **built and verified locally — not yet live.** The build check now runs **11,584 tests, all passing.** Pushing is also what lets Google Search Console and Bing verify the site (both properties are created and waiting).

Supporting files: [focus-keywords.csv](focus-keywords.csv) (every page: primary keyword, intent, volume, KD, URL, old URL, supporting keywords) · [seo-keywords-selected.csv](seo-keywords-selected.csv) · [seo-strategy-report.md](seo-strategy-report.md) · [seo-audit-2026-10-13.md](seo-audit-2026-10-13.md)

---

## 1. Your rules — status

| Rule | Status | How it's enforced |
|---|---|---|
| Homepage primary keyword "halal meat" | ✅ Commercial, 2,900/mo, KD 25 — in title, meta, H1 | Build check F1–F4, F9 |
| Product & category primary keywords Transactional or Commercial, high volume / low KD | ✅ (see §2 for the 155 products with no Semrush data) | F12 |
| Unique primary keyword per page, in SEO title, meta description and slug | ✅ 241 pages | F1–F5 |
| H1, H2, H3 carry focus keywords | ✅ H1 contains the focus on every page; product H2 contains it; product H3s carry the focus or a supporting keyword | F9, F10 |
| Primary keyword in the first 20% of the product description | ✅ it's in the first sentence of all 212 | F10 |
| Every product has a description and a short description | ✅ 212/212, plus a new unique "about this cut" paragraph for each | F10 |
| 5–10 supporting keywords per product, no stuffing | ✅ 7–9 per product, each used once in a natural sentence | F10 |
| Product keyword mix 45% T / 45% C / 10% I | ✅ **44.4% / 44.5% / 11.1%** across 1,905 supporting keywords | F10 |
| Blog posts 1,000+ words | ✅ 1,012–1,070 words of article text (1,107–1,172 on the page) | F11 |
| Blog keyword mix 50% I / 25% C / 25% T, high volume / low KD | ✅ every post: 4 informational, 2 commercial, 2 transactional | F11 |
| Image SEO, formats, logos (earlier rules) | ✅ unchanged and still enforced | F6–F8 |

---

## 2. Primary keywords

**Homepage:** "halal meat" (Commercial, 2,900/mo, KD 25).

**Categories** (all Transactional or Commercial):

| Category | Primary keyword | Intent | Vol / KD | URL |
|---|---|---|---|---|
| Beef | halal beef | C | 210 / 12 | /shop/halal-beef/ |
| Lamb | lamb | I,T | 12,100 / 19 | /shop/lamb/ |
| Goat | goat meat for sale | T | 40 / 8 | /shop/goat-meat-for-sale/ |
| Chicken | halal chicken | C | 1,300 / 15 | /shop/halal-chicken/ |
| Camel | camel meat australia | I,C | 50 / 8 | /shop/camel-meat-australia/ |
| Duck | duck meat | C | 880 / 11 | /shop/duck-meat/ |
| Kangaroo | kangaroo meat for sale | T | 110 / 9 | /shop/kangaroo-meat-for-sale/ |
| Water buffalo | buffalo meat | I,C | 590 / 8 | /shop/buffalo-meat/ |
| Offal | beef organ meat | C | 90 / 16 | /shop/offal-beef-organ-meat/ |
| Wholesale cartons | meat boxes | C | 720 / 21 | /shop/bulk-meat-boxes/ |

"goat meat" (1,900/mo) and "camel meat" (720/mo) have more volume but are Informational-only, so they were moved to supporting/blog use under your rule.

**New Wagyu page** `/wagyu-steak/` — "wagyu steak" (Commercial, 2,400/mo, KD 19), gathering all 23 Wagyu products.

**Products (212):**

| Source of the primary keyword | Products | Notes |
|---|---|---|
| Transactional/Commercial keyword from your Semrush data | **53** | e.g. sausages (5,400/23), sirloin steak beef (4,400/17), oxtail (4,400/24), chicken feet (3,600/18), kangaroo steak (2,900/15), beef eye fillet (2,400/18), extra lean beef mince (2,400/19), flat iron steak beef (2,400/15), beef new york steak (1,900/11), beef patties (1,000/11), beef chuck meat (1,000/13), beef tongue (1,000/14) |
| Buying form of the product name ("buy … online") | 4 | lamb neck, gravy beef, beef rump cap, chicken livers — their exact names are Informational in your data |
| Product name | 155 | No Transactional/Commercial keyword for these products passed your KD/volume criteria. A search for an exact product name is a buying search, but there is **no Semrush number** for these — they're labelled "T (product name)" in focus-keywords.csv |

Kept off on purpose (would mislead buyers): "crumbed lamb cutlets" (yours are frenched, not crumbed), "confit duck leg" (sold raw), "frozen chicken tenderloins" (not sold as frozen), "meat goat for sale" (means a live goat), "whole beef sirloin" (the product is a portion), "A5 / Japanese Wagyu".

---

## 3. Product pages — what changed

Every product page now has this structure:

1. **H1** — product name, or "focus keyword — product name" when the name doesn't contain it.
2. **H2** — contains the focus keyword (e.g. "About our halal beef eye fillet", "Buy beef brisket from Halal Meat Depot").
3. **Intro** — first sentence starts with the focus keyword, then the short description.
4. **About this cut** — a new, unique 2–3 sentence paragraph for each of the 212 products (where the cut comes from, texture, best dishes).
5. **H3 "Buy … online: price and delivery"** — transactional supporting keywords (price, order online, for sale, buy online).
6. **H3 "Halal … for restaurants, caterers and families"** — commercial supporting keywords (halal …, wholesale …, bulk …, … supplier).
7. **H3 "How to cook …"** — the informational keyword, with the cooking tip.

Measured result (full crawl):

| Metric | Before | After |
|---|---|---|
| Words per product page (median) | 434 | **656** |
| Text shared between product pages (median) | 39% | **29%** |
| Text shared — worst pair | 79% | **65%** |

Honest note: only 16 of the 1,905 supporting keywords exist word-for-word in your Semrush data; the rest are standard buying patterns built on each product's keyword ("… price", "buy … online", "wholesale …"). They read naturally and match how people search, but have no volume figures.

---

## 4. Blog posts

| Post | Words (article) | Informational (50%) | Commercial (25%) | Transactional (25%) |
|---|---|---|---|---|
| What halal certification means | 1,070 | est halal check (1,000/8), est halal (1,000/7), est halal checker (720/14), halal meat close to me (3,600/15) | halal meat (2,900/25), halal butcher (1,900/17) | halal meat near me (3,600/7), halal butcher near me (5,400/17) |
| Halal beef cuts guide | 1,042 | eye fillet (8,100/9), scotch fillet steak (6,600/9), what is the sirloin steak (590/13), how to cook scotch fillet (1,000/12) | halal steak (720/8), sirloin vs scotch fillet (590/9) | buy beef brisket (260/11), beef eye fillet price (50/5) |
| Goat curry cuts explained | 1,027 | goat meat (1,900/14), which is better goat leg or shoulder (20/12), how to cook goat curry, how much goat per person | diced goat (20/4), goat leg vs shoulder (20/13) | goat meat for sale (40/8), goat price (140/14) |
| Cooking camel, buffalo and kangaroo | 1,012 | camel meat (720/10), is kangaroo halal (720/13), kangaroo recipes (720/11), kangaroo steak recipe (590/10) | kangaroo steak (2,900/15), buffalo meat australia (140/5) | kangaroo meat for sale (110/9), buy kangaroo meat (110/17) |
| Halal lamb cuts guide | 1,034 | slow roast lamb slow cooker (2,900/12), lamb casserole recipe (1,300/13), lamb forequarter chops recipe (1,300/11), slow cooked lamb shanks slow cooker (880/11) | halal lamb (90/10), price for a lamb (210/10) | lamb prices (590/23), buy lamb (90/10) |

New sections added include EST numbers and halal checks, storing/freezing guides, cut-by-dish lists, simple recipes and seasoning guides. Each post now has an "updated 13 October 2026" date. The goat post's "how to cook goat curry" and "how much goat per person" are not in your data (no volume figures).

---

## 5. SEO audit fixes

| # | Audit item | Status |
|---|---|---|
| C1 | Google Search Console | 🟡 Property created (URL prefix, HTML tag added to the site). **Verify + sitemap submission happen right after the push.** |
| C2 | Google Business Profile | ⏳ Owner task |
| C3 | Duplicate site on halal-meat-depot.vercel.app | ✅ Permanently redirects to halalmeatdepot.com.au |
| C4 | Old URLs after the URL changes | ✅ 137 permanent redirects (55 moved URLs + retired products), all one hop |
| H1 | Thin / templated product content | ✅ Unique paragraph for all 212; pages +51% longer; overlap 39% → 29% |
| H2 | Blog too small and thin | ✅ 5 posts expanded to 1,000+ words (new posts from the 20-post plan are the next step) |
| H3 | Product schema: return policy / delivery time | ✅ Return policy added (matches your Refund page: no change-of-mind returns). ⏳ Delivery time needs your real dispatch/transit times |
| H4 | No reviews | ⏳ Owner task — genuine Google reviews only |
| H5 | Sitemap dates all the same | ✅ Real per-page "last modified" dates that only change when the page's content changes |
| M1 | Weak links to Wagyu products | ✅ New Wagyu page; Beef page links to it |
| M2 | Aqeeqah page only in the footer | ✅ Linked from homepage, Lamb, Goat and blog posts |
| M3 | Heavy Beef page | ✅ 23 Wagyu products moved to their own page |
| M4 | Homepage speed (LCP 2.9 s) | ⏳ Re-test after the push (new AVIF banner) |
| M5 | Tap targets too small | ✅ Footer links and breadcrumbs enlarged on mobile |
| M6 | No llms-full.txt | ✅ Full catalogue for AI assistants (110 KB), linked from llms.txt |
| Also | Google & Bing verification tags | ✅ In the homepage, both properties created |

---

## 6. URL changes in this release (all redirect permanently)

- **4 pages:** /shop/ → /halal-meat-shop/, /wholesale/ → /halal-meat-wholesale/, /aqeeqah-qurbani/ → /whole-lamb-aqeeqah-qurbani/, /shipping/ → /halal-meat-delivery/
- **9 categories:** e.g. /shop/goat/ → /shop/goat-meat-for-sale/, /shop/offal/ → /shop/offal-beef-organ-meat/
- **41 products:** e.g. /product/beef-brisket-whole/ → /product/buy-beef-brisket-whole/
- **1 new page:** /wagyu-steak/

Full list with old → new: focus-keywords.csv.

---

## 7. Still needs you

1. **Approve the push** → I then verify Google + Bing and submit the sitemaps.
2. **Google Business Profile** (service area, Greenacre — hide the address; delivery only).
3. **Genuine Google reviews** from customers.
4. **Typical delivery times** (e.g. Sydney next day, interstate 2–4 days) → delivery-time schema.
5. **Claims** — which products are free range / grass-fed / organic, and slaughter method — before those keywords (≈16,000 searches/mo combined) are used.
6. **Optional:** stock the gaps with demand — beef tallow (~9,600/mo), skirt steak (~6,000), kangaroo mince (2,400), beef/veal schnitzel (~2,000).
7. **Optional:** replace hero photos 1 and 3 (possible pork) with your own photography.
