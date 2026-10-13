# SEO Website Build Playbook — reusable prompt

> **How to use:** paste everything below the line into your AI coding agent (Claude Code or similar) at the start of a new website build, after filling in the `{{PLACEHOLDERS}}` in Step 0. Attach or point it to your keyword export files.
>
> **Benchmark this playbook produced** (Halal Meat Depot, Next.js ecommerce site, 256 indexable pages, October 2026):
> - On-page SEO score: **99.8 / 100 average**; 236 of 256 pages scored 100 (rubric in Step 16)
> - Google Lighthouse / PageSpeed SEO category: **100 on every page tested** (241 pages)
> - Automated build check: **11,442 checks passed, 0 failed** across 266 pages (indexable and utility)
> - All 212 product pages with complete Product, Offer, shipping and return-policy schema
>
> Aim to match or beat these numbers.

---

You are building (or rebuilding) a website for **{{BUSINESS_NAME}}** with maximum, honest, durable SEO. Follow every step below, in order. Each step has rules and a "done when" test. Do not skip the automated checks: they are what keep the site at 100 as it grows.

## Step 0: Inputs (ask me for anything missing before you start)

- Business name, legal entity, ABN/company number, founding year (only real facts)
- Address, service area, phone, hours, delivery or pickup rules
- Products or services with prices, units and descriptions
- Payment methods, order rules (minimums, delivery fees), refund policy
- Certifications, licences, awards, reviews: **only what I can prove**. If I haven't supplied it, it doesn't exist.
- Domain: {{DOMAIN}} · Market/country: {{COUNTRY}} · Language: {{LANGUAGE}}
- Keyword research files: {{PATH_TO_SEMRUSH_OR_AHREFS_CSV_EXPORTS}} (columns: Keyword, Intent, Volume, Keyword Difficulty, CPC)
- Homepage primary keyword: {{HOMEPAGE_KEYWORD}}
- Legal/advertising rules that apply (e.g. Australian Consumer Law, FTC, ASA) and any words I must never use: {{BANNED_TERMS}}
- Hosting/deploy target: {{HOST}} (e.g. Vercel, auto-deploy on push to `main`)

## Step 1: Ground rules (apply to everything you write)

1. **Truth first.** Never invent claims, statistics, reviews, ratings, awards, licence or certificate numbers, origins ("Australian", "organic", "grass-fed", "free range"), or processes. If a claim isn't in my inputs, leave it out. Misleading copy is a legal risk and destroys trust; no ranking is worth it.
2. **Banned-terms list.** Put my banned terms in config, and have the build check fail if any appears anywhere on the site.
3. **State must match reality.** Example: frozen products must never be described as "chilled". Derive wording from product data, never from a generic template.
4. **Never push to production without asking me first,** and only after the build and the SEO check pass.
5. **Never commit secrets** (`.env*`), dependencies or build output.
6. If a request would break any of these rules, stop and tell me rather than complying.

## Step 2: Architecture (single source of truth)

- Keep **all** business facts, products, categories, posts, FAQs, order rules, payment methods, delivery zones and SEO data in a small set of config files (e.g. `src/config/site.js`, `products.js`, `content.js`, `seo.js`, `delivery.js`).
- Adding a product = one line in config. Its page, route, schema, sitemap entry, search, feeds and API output must all follow automatically.
- Generated files (llms.txt, `.well-known/*`, sitemaps, redirects config) are produced by a script at build time. Never hand-edit them.
- The domain lives in exactly one place.
- Prices and totals are recomputed on the server; never trust the client.
- Prefer static generation (SSG) for every public page.
- **Done when:** changing a fact in config updates every page, schema block and generated file that mentions it.

## Step 3: Keyword research and selection

1. **Load every keyword file.** Deduplicate (keep the highest-volume row per exact phrase). Keep Intent, Volume, KD and CPC.
2. **Filter** (record what was dropped and why):
   - Off-niche or irrelevant keywords
   - Competitor brands, retailer names (e.g. supermarkets), other cities or regions you don't serve
   - Wrong product type or species, typos, adult or spam terms
   - Claims you can't make (organic, grass-fed…), supplements, pet food, recipes for foods you don't sell
   - Volume floors: Transactional 20+, Commercial/Informational 50+
   - KD ceiling for primary keywords: 0–34 (prefer 0–19). KD 35–54 = supporting only. KD 55+ = drop.
3. **EXACT KEYWORDS RULE (non-negotiable):** every focus and supporting keyword must be an **exact phrase from the keyword files**: never modified, pluralised, re-ordered or invented. Do **not** generate "buy X online", "X price" or "X supplier" patterns unless that exact phrase exists in the files.
4. **Fallback rule:** if a page has no qualifying keyword, use exact file keywords with **KD 0–29**. If the files truly have nothing that honestly describes the page, the product/page name stays as its focus and it gets fewer supporting keywords. **Never pad** with misdescriptive phrases.
5. **Intent mapping:**
   - Product and category pages: Transactional or Commercial focus keyword (favour high volume, low KD)
   - Blog posts: Informational focus keyword
   - Homepage: the broad head term ({{HOMEPAGE_KEYWORD}})
   - Exceptions must be approved by me and flagged in config (e.g. `ownerOk: true`).
6. **One keyword = one page.** Maintain a used-keyword registry across focus keywords, product supporting keywords and blog keywords. No keyword appears as a target on two pages (no cannibalisation). Reserve blog-post keywords before allocating product keywords.
7. **Supporting keywords per page:** 5–10. Target mix for products ~45% Transactional / 45% Commercial / 10% Informational; for blog posts ~50% Informational / 25% Commercial / 25% Transactional. These are targets: if the files can't supply them, report the shortfall instead of inventing keywords.
8. **Review by hand.** Automated matching produces junk (other species, brand names, "near me" variants of a different product, typos). Read the full allocation, remove junk, re-run.
9. Keep the allocation script and its input lists **in the repo** (e.g. `scripts/keywords/`) so it can be regenerated.
- **Done when:** a script shows 0 site keywords that aren't exact phrases in the files, and 0 keywords used on two pages.

## Step 4: On-page rules for every indexable page

| Element | Rule |
|---|---|
| Focus keyword | Unique per page, stored in `seo.js` |
| SEO title | ≤ 60 characters (aim for 30–60), contains the **exact** focus keyword, contains **1–2 power words**, unique |
| Meta description | 110–158 characters, contains the exact focus keyword, unique, written to earn the click |
| H1 | Exactly one per page; contains the exact focus keyword |
| URL slug | Contains the focus keyword (homepage exempt); lowercase, hyphenated, ≤ 75 characters |
| H2/H3 | Carry the focus or supporting keywords naturally; never skip heading levels |
| First paragraph | Focus keyword within the first 20% of the main description |
| Canonical | Self-referencing absolute URL |
| Open Graph + Twitter | title, description, image, url, type, card |

**Exact match** means the keyword's words appear in order, unchanged. Only letter case and punctuation between words may differ (so "T-Bone" matches "t bone"; for slugs only, "&" reads as "and").

**Power words:** keep a list in config, e.g. *Fresh, Premium, Certified, Best, Easy, Complete, Quick, Simple, Essential, Expert, Tender, Ultimate*. Use only words that are **true** for that page; never "cheapest", "#1", "award-winning" unless proven. Don't count more than 2.

**URL changes:** whenever a URL changes, add a permanent (301/308) redirect from every previous URL directly to the final one: no chains. Update internal links to the new URL rather than relying on the redirect.

## Step 5: Product (or service) pages

- **H1:** product name if it contains the exact focus keyword, otherwise "Focus Keyword — Product Name".
- **Opening:** focus keyword + a real one-line summary (`short`).
- **Unique profile paragraph per product** (what it is, where it comes from on the animal or in the process, how it behaves, best uses). This is what stops pages being near-duplicates.
- **Sections** (H3 each): Buy/price and delivery · Trade/wholesale use · How to cook/use.
- **Each supporting keyword placed word-for-word inside a truthful sentence.** Build the sentence by keyword type:
  - price
  - near me
  - where to buy
  - buy/order online
  - "what is" questions
  - comparisons ("X vs Y")
  - recipes/cooking
  - "best …"
  - generic

  Give each type **3–5 phrasings and rotate them per product and per occurrence**, so no sentence repeats on a page. Show the actual price only once per page.
- **Price, unit, per-kg (or per-unit) price, real stock status.**
- **Related products:** pick neighbours with fixed offsets (e.g. +1, −1, +4 in the category list) so every product receives ≥ 3 inbound links.
- **Links to 1–2 relevant guides** (blog posts) and its category.
- **Near-duplicate check:** < 50% shared 5-word sequences with any other product page. If variants (sizes, cuts, flavours) are too similar, add genuinely distinct use and profile copy.
- **Done when:** every product has short + long description + unique profile, 0–10 exact supporting keywords all present on the page, and < 50% overlap with its closest sibling.

## Step 6: Category pages

- H1 and title lead with the exact focus keyword (e.g. "Buy Fresh {{Category Keyword}} Online").
- Intro text (300+ words total on the page), subcategory groupings, a product grid, and a **mini-FAQ built only from catalogue facts** (price range, cuts, delivery rules) with FAQPage schema.
- CollectionPage + ItemList + BreadcrumbList schema.
- If the category is huge, paginate or split it so the HTML stays under ~350 KB.

## Step 7: Blog and content hub

- Each post: **1,000+ words**, an Informational focus keyword (exact file phrase), 6–8 exact supporting keywords at ~50/25/25 I/C/T, each used verbatim in the text.
- Title (H1) and SEO title carry the focus keyword + 1–2 power words. Meta description = excerpt (110–158 characters) containing the focus keyword.
- Structure: intro → H2 sections answering real questions → practical steps/tables → buying section linking to the exact products → related guides.
- **Topic clusters:** group posts on the blog index under topic headings with a short intro; link every product to its most relevant guide and every guide to its products.
- Article/BlogPosting schema with headline, dates, author (the business), image.
- Avoid content you can't stand behind (religious rulings, medical or legal advice, unverified origin claims).
- **Done when:** a script confirms word count, keyword presence and keyword mix for every post.

## Step 8: Static and utility pages

- Home, Shop, About, Contact, FAQ, Delivery/Shipping, Refund/Returns, Terms, Privacy, certification/trust page, wholesale/trade page.
- Each indexable page gets a focus keyword (an exact file phrase where one exists; otherwise its plain name) + 1–2 power words in the title.
- Give thin pages (Contact, About) at least 250 useful words: service area, hours, how to order, what happens next.
- Link About/Terms/Privacy/Refund from body content somewhere (not just the footer) so they get ≥ 3 inbound content links.
- Utility pages (cart, checkout, account, search, thank-you, order status): `noindex`, disallowed in robots.txt, excluded from the sitemap.

## Step 9: Image SEO

- Every content image: `alt`, `title`, visible `<figcaption>` and the JSON-LD `ImageObject.description` all contain that page's exact focus keyword. Build them from one helper so they stay consistent.
- Formats: product/category photos **WebP**; homepage hero **AVIF** with `srcset` (widths no larger than the source); logos and favicon **SVG** (traced vectors); only `apple-touch-icon` and the OG image stay raster.
- Always set `width`/`height` (or a fixed-ratio container) to prevent layout shift, **including hero images**.
- Real photos beat placeholders; name image files by the product's original slug so URL changes don't break them.

## Step 10: Structured data (JSON-LD)

| Page | Schema |
|---|---|
| Home | Organization / LocalBusiness (name, legal name, address, geo, phone, hours, logo, sameAs), WebSite |
| Product | Product (name, image[], description, sku, brand, category) → Offer (price, priceCurrency, priceValidUntil, availability, itemCondition, url, seller) → **shippingDetails** (one OfferShippingDetails per real delivery option/zone with rate, destination, handling + transit time) → **hasMerchantReturnPolicy** (applicableCountry, returnPolicyCategory; if returns are allowed: merchantReturnDays, returnMethod, returnFees) |
| Category | CollectionPage, ItemList, BreadcrumbList, FAQPage |
| Post | Article/BlogPosting, BreadcrumbList |
| FAQ | FAQPage |
| All | BreadcrumbList (except home), ImageObject for the main image |

Rules:
- **The return policy in schema must match the refund page** (e.g. perishable goods: `MerchantReturnNotPermitted` for change-of-mind, while faulty items are still refunded under consumer law, and the refund page says exactly that).
- **No `aggregateRating` or `review` without real reviews.**
- Optionally add an organisation-level `hasMerchantReturnPolicy` too.
- Validate: parse every JSON-LD block on every page in the build check.

## Step 11: Technical SEO

- One canonical URL form (pick trailing slash or not, and enforce it everywhere, including client `fetch` calls to API routes).
- `sitemap.xml` as a sitemap index with accurate `lastmod` per page (track content changes in a lastmod file); `robots.txt` pointing to it.
- `lang` attribute, viewport meta, HTTPS, `/favicon.ico` redirect to the SVG icon.
- No broken internal links (check every `href` in the build check, including malformed ones like `href="undefined"`).
- Custom 404 page; no soft-404s.
- Correct media types for special endpoints (e.g. `application/linkset+json` for API catalogs).
- Click depth ≤ 3 from the homepage for every indexable page; every page reachable through links, not just the sitemap.

## Step 12: AI search and agent readiness (GEO/AEO)

- `llms.txt` (summary + key links) and `llms-full.txt` (full catalogue facts), generated from config.
- Clear, quotable answers in FAQs and posts (definitions, prices, delivery rules).
- robots.txt allows AI crawlers to index public content; add content-signal preferences if you want (e.g. `search=yes, ai-input=yes, ai-train=no`).
- IndexNow key file at the site root + `IndexNow-key` meta tag.

## Step 13: Performance (Core Web Vitals)

- Static generation, optimised images (Step 9), `srcset` widths trimmed to the source size, `content-visibility: auto` on long product grids.
- Measure, don't guess: run Lighthouse **twice** per page type (first run warms caches; use the second), then PageSpeed Insights on **all** pages. Treat transient "Error!" results as reruns, not failures.
- Revert any "optimisation" that makes output bigger (e.g. CSS inlining that duplicated stylesheets).
- Targets: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.

## Step 14: Internal linking

- Every indexable page receives ≥ 3 inbound links from other pages' main content.
- Mega-menu/category navigation, breadcrumbs, related products, product ↔ guide links, blog topic clusters, footer links to policies.
- Use descriptive anchor text containing the target's keyword (e.g. "halal meat wholesale", not "click here").

## Step 15: Automated SEO build check (the gate)

Write `scripts/crosscheck.mjs` and run it after every build. **Fail the build** on any violation. Crawl every indexable and utility page from the production build and check:

- **F1** every indexable page has a focus keyword in config
- **F2** exact focus keyword in the SEO title
- **F3** exact focus keyword in the meta description
- **F4** focus keyword in the slug (homepage exempt)
- **F5** focus keywords unique across the site
- **F6** image alt, title and caption contain the page's focus keyword
- **F7** a JSON-LD image description contains the focus keyword
- **F8** image formats (WebP products/categories, AVIF hero, SVG logos and favicon)
- **F9** exact focus keyword in the H1
- **F10** product description: focus in the first 20%; ≤ 10 supporting keywords, each present verbatim; H2 with focus; an H3 with focus or a supporting keyword; short + long + profile copy present
- **F11** blog posts: 1,000+ words; every listed keyword present verbatim; keyword mix
- **F12** product/category focus intent is Transactional/Commercial (unless owner-approved)
- **F13** 1–2 power words in every SEO title
- Plus:
  - exactly one H1
  - title ≤ 60 characters; meta description 110–158 characters
  - no duplicate titles or descriptions
  - canonical present; no `noindex` on indexable pages
  - all internal links resolve; no malformed hrefs
  - JSON-LD parses
  - banned terms absent
  - IndexNow meta present
  - homepage weight budget

Report non-blocking notes separately (e.g. "105 products have < 5 supporting keywords because the files have no more relevant ones").

## Step 16: Audit and score every page (repeat after every major change)

Crawl all sitemap URLs **one at a time** (parallel crawling on a local machine produces fake "slow response" results) and score each page out of 100:

| Area | Points | Checks |
|---|---|---|
| Technical | 20 | HTTP 200, self-canonical, indexable, lang + viewport, response < 800 ms, HTML < 350 KB |
| Title | 12 | present, 30–60 characters, exact focus keyword, 1–2 power words |
| Meta description | 10 | 110–158 characters, exact focus keyword |
| Headings | 12 | exactly one H1, focus in H1, no skipped levels |
| URL | 5 | focus in slug, short lowercase URL |
| Content | 15 | word count (home 500, product/category 300, post 1,000, page 250), focus in first 150 words, < 50% overlap with any same-type page |
| Images | 8 | alt on every image, dimensions set, an alt contains the focus |
| Structured data | 10 | valid JSON-LD, right types per page, complete Product offer (price, availability, shipping, returns) |
| Social | 4 | Open Graph + Twitter tags |
| Internal links | 4 | ≥ 3 inbound content links, click depth ≤ 3 |

Write a report to `docs/` with: average per page type, every point lost (page, points, reason, fix), and a full table of every page (score, focus keyword, words, depth, inbound links, title). Fix everything that's fixable, then re-run.

## Step 17: Launch and indexing

1. Build → crosscheck passes → **ask me** → push → wait for deploy → spot-check live: new pages return 200, old URLs 301 to the new ones, titles are live.
2. **Google Search Console:**
   - Verify the property.
   - Submit `sitemap.xml`, and resubmit it after big changes.
   - Use URL Inspection → *Request indexing* for the most important new or changed pages.
   - Google allows **about 10 requests per property per day** (its day resets at midnight US Pacific time), so plan batches by priority: new/moved URLs → new content → key category pages → the rest.
   - On "Quota exceeded" stop and continue the next day. On "Something went wrong" retry up to 3 times.
3. **Bing Webmaster Tools:** import from GSC or verify; submit the sitemap.
4. **IndexNow:** POST every new, changed **and** old (redirecting) URL to `https://api.indexnow.org/indexnow` with your key (up to 10,000 URLs per request). This reaches Bing, Yandex, Seznam and Naver.
5. Never sign in, enter passwords or change Search Console settings on my behalf; if a session is signed out, stop and ask me to sign in.

## Step 18: Off-page (what on-page work can't do)

On-page SEO at 100 is the foundation; rankings also need:

- **Google Business Profile:** complete, categories correct, photos, hours, posts; consistent name/address/phone everywhere.
- **Genuine customer reviews** on Google (never fake, never incentivised in breach of platform rules); show them on-site only once real.
- **Citations** in relevant directories and industry associations.
- **Backlinks** from local press, suppliers, community organisations and partners; guest guides on your topic.
- **Time:** new pages typically take weeks to be indexed and months to rank. Track progress in GSC Performance (queries, pages, compare periods) and adjust.

## Step 19: Pitfalls that cost us time (avoid them)

- Generated "buy X online / X price / X supplier" keywords looked neat but weren't real search terms: **use exact file phrases only.**
- Automatic keyword matching attached other species, brands, supplements, typos and "australian" origin claims: **always review by hand.**
- One template sentence repeated five times on a page reads as keyword stuffing: **rotate phrasings and show the price once.**
- Generic copy said "chilled" on frozen products: **derive wording from product data.**
- Variant products (boned vs butterflied, two marinades) drifted above 50% shared text: **write a unique profile for each.**
- Mega-menu links rendered `href="undefined"`: **check for malformed hrefs in the build check.**
- Parallel local crawls reported fake slow pages: **measure sequentially.**
- The Google indexing quota ran out mid-batch: **prioritise and schedule daily batches.**
- String-replace scripts with `$'`/`$$` in replacement text corrupted files: **use split/join or a proper editor for code edits.**

## Step 20: Definition of done

- [ ] Build passes; SEO crosscheck 0 failures
- [ ] Page-score audit average ≥ 99, no page below 95, report saved in `docs/`
- [ ] Lighthouse/PSI SEO 100 on all pages; Performance ≥ 90 on key templates
- [ ] Every keyword is an exact file phrase; no keyword used on two pages
- [ ] Every product has complete Product + Offer + shipping + return-policy schema matching the policy pages
- [ ] No invented claims; banned terms absent
- [ ] Sitemap submitted to Google and Bing; IndexNow sent; Google URL Inspection batches scheduled
- [ ] Project rules file (e.g. `CLAUDE.md`) updated with every rule above, so future changes keep the score
