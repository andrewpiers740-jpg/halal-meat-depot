# Halal Meat Depot — keyword mapping: rules, prompts and commands

Everything used to choose and place the **primary (focus)** and **secondary (supporting)** keywords. Compiled 2026-11-09 from `CLAUDE.md`, `docs/seo-strategy-report.md`, `docs/SEO-Website-Build-Playbook-Prompt.md`, the `keyword-engine` skill, `scripts/keywords/`, `src/config/seo.js` and `scripts/crosscheck.mjs`. Dates are the owner's rule dates.

---

## 1. Source of keywords

- **Only the owner's Semrush exports** (Australia database): 93 CSV files, `Desktop\Halal Meat Depot\keywords\*.csv`. Columns: Keyword, Intent, Volume, Keyword Difficulty (KD), CPC. The CSVs are not in the repo.
- 180,648 rows → 98,821 unique keywords after de-duplication (highest-volume row kept per exact phrase).
- Keywords with no KD score are excluded (cannot be judged).

## 2. Owner's selection criteria (applied to the files, 2026-10-13)

1. KD 0–29 is the overall ceiling.
2. No informational-only keyword under 500 volume.
3. Informational-only: KD 0–15 and high volume (500+).
4. Commercial / Navigational / Transactional: KD 0–25, volume 20+ (mixed intents such as "Informational, Transactional" count here).
5. Relevance filter by hand: drop other businesses, supermarkets, other cities, products we don't sell, supplements, pet food, typos and junk.

Result: 2,722 keywords passed the numbers; 634 keywords went onto 86 pages and 300 onto 38 blog topics (strategy report, 2026-10-13).

Keyword-engine skill triage (used when planning, not a hard rule on the site): T1 quick win KD 0–19, T2 worth targeting KD 20–34, T3 supporting only KD 35–54, drop KD 55+. Volume floors: Transactional/Question 20+, Commercial/Informational 50+.

## 3. Exact-keyword rule (owner, 2026-10-13, non-negotiable)

- Every focus and supporting keyword (products, categories, pages, posts) is an **exact phrase from the Semrush files**: never modified, pluralised, re-ordered or invented.
- "Buy … online", "… price", "… supplier" patterns are **not allowed** unless that exact phrase is in the files.
- Matching (`containsExact` in `scripts/crosscheck.mjs`): only letter case and punctuation are ignored. In slugs only, "&" reads as "and".
- **Fallback (owner, 2026-10-13):** where a page has no qualifying keyword, use exact file keywords with **KD 0–29**. If the files have none that truthfully describe it, the product name stays as the focus and it gets fewer supporting keywords. Never pad with made-up or misdescriptive phrases (no other species, brands, places, "australian" origin, supplements).
- **Owner request 2026-10-16:** products, pages and categories lacking real keywords get exact file keywords with KD 0–29, **including Navigational**. Navigational phrases are mostly other businesses' names, so only generic ones are used (e.g. "fresh poultry", "wagyu beef sydney"). Never competitor, other-city, people or brand names.

## 4. Primary (focus) keyword rules

- **One unique focus keyword per indexable page**, stored in `src/config/seo.js` (`PRODUCT_SEO`, `CATEGORY_SEO`, `PAGE_SEO`, `POST_SEO`). A new product defaults to its own name.
- It must appear **word for word** in: SEO title, meta description, **slug** (homepage exempt) and **H1**. Crosscheck F1–F5, F9.
- **Intent:** product and category focus keywords must be Transactional or Commercial (Semrush), favouring high volume and low KD (F12). Blog posts: Informational. Homepage: "halal meat".
- Product head terms Semrush labels "Informational" (e.g. eye fillet, gravy beef) go on the **product page**, not a blog post. Exceptions are flagged `ownerOk: true` in `seo.js`. Owner-approved: lamb neck, gravy beef, beef rump cap, chicken livers.
- **Changing a URL** = add the old one to the 301s (`REDIRECTS`, built in `src/config/redirects.js` from products, categories, `PAGE_MOVES`). Product images keep their original slug (`imageSlug`).
- **Keyword map v4 (owner, 2026-11-02):** many product slugs and focus keywords were re-mapped; "buy … online" focus keywords lead as-is without a "halal" prefix.

## 5. Secondary (supporting) keyword rules

- **5–10 per page**, each an exact file phrase. Targets are reported, not forced (the 45/45/10 mix and 5-minimum may be missed when the files have nothing relevant; never invent).
- **Product mix target:** ~45% Transactional / 45% Commercial / 10% Informational. Generated, not hand-edited: `src/config/product-keywords.js`.
- **Category and page supporting keywords:** `src/config/support-keywords.js`, written verbatim into a copy block (`<KeywordNotes>`).
- **Blog posts:** `keywords` list ~50% Informational / 25% Commercial / 25% Transactional. **v4 posts (2026-11-02):** 10–15 keywords, Informational at most 30%, 1,500+ words, every linked keyword links to its page. Post keywords live in `posts-blog-keywords.js` and `post-keywords-v4.js`.
- **One keyword = one page** for focus keywords (no cannibalisation). Post keywords are reserved before product keywords are allocated. From the v4 map (2026-11-02) a *supporting* keyword may support more than one category/page; crosscheck F15 only fails a keyword listed twice on the same page.
- **Placement:** product copy places each supporting keyword verbatim via `sentence()` in `src/lib/productContent.js`. Description leads with the focus keyword (first 20%), has H2/H3s carrying the focus or supporting keywords, 400+ words (F16). Every product needs `short`, `desc` and an entry in `src/config/product-about.js` (unique cut profile).

## 6. Filters the allocator applies (`scripts/keywords/allocate.mjs`)

Rejects, in every pass: supermarket and brand names (Coles, Woolworths, Aldi, IGA, Costco…), other cities (Melbourne, Perth, Brisbane…), unconfirmed claims, typos/duplicated words, other species than the product, grammatically broken phrases, anything over 7 words (6 in the loose pass). Loose second-pass extras: nutrition/calories, supplements, pet treats, jerky, bacon, tallow, thermometers, language words, specific rejected phrases (`REJECT`). Reviewed by hand (2026-10-16).

Order of use: (1) owner "pass list" keywords mapped by the strategy (`pass.txt`, `mapped.json`) → (2) fallback KD 0–29 file keywords → (3) loose second pass for products under 5 supporting keywords. Each keyword used on one product only; post keywords reserved.

## 7. Related on-page rules the keywords feed

| Rule | Value |
|---|---|
| SEO title | ≤ 60 chars, exact focus keyword, **1–2 power words** (F13) |
| Meta description | 110–158 chars, exact focus keyword, unique |
| H1 | exactly one per page, contains the focus keyword |
| Power words (`POWER_WORDS`) | fresh, premium, certified, best, easy, ultimate, complete, quick, simple, essential, expert, tender, delicious. Only true ones; never "cheapest", "#1", "award-winning" |
| Image SEO | alt, title, visible `<figcaption>` and JSON-LD ImageObject description all contain the page's focus keyword (F6, F7). Build with `src/lib/imageSeo.js` |
| Image formats | product/category WebP, hero AVIF, logos/favicon SVG (F8) |
| Blog | 100 posts; 1,000+ words (1,500+ for v4); recipes halal (no pork/alcohol); only the site's own product images |
| Truthfulness | Only certifier: Halal Control Australia. Never "hand-slaughtered", "Zabiha certified", "MSA graded". Owner-confirmed claims allowed in keywords: grass fed, lean, organic, cheap, free range, frozen (frozen only on products sold frozen). Banned terms fail the build |

## 8. Commands

```bash
# regenerate product supporting keywords (needs the owner's CSVs in DIR)
node scripts/keywords/allocate.mjs          # rewrites src/config/product-keywords.js

npm run build                               # prebuild generators + next build + postbuild
npm run crosscheck                          # must pass before every push (F1–F16 keyword rules)
npm run images                              # product/category image pipeline
node scripts/gen-new-post-images.mjs        # 4 product photos per blog post
```

Crosscheck keyword checks: F1 focus exists · F2 in title · F3 in description · F4 in slug · F5 unique · F6 image alt/title/caption · F7 JSON-LD image description · F8 image formats · F9 in H1 · F10 product description rules · F11 blog rules · F12 intent T/C · F13 power words · F14 supporting keywords present in copy · F15 no keyword listed twice on a page · F16 400+ word product description.

## 9. Prompts and skills used

- **`docs/SEO-Website-Build-Playbook-Prompt.md`** — the reusable build prompt. Step 3 is the keyword research and selection procedure (load files, filter, exact-keyword rule, fallback, intent mapping, one keyword per page, 5–10 supporting, hand review, keep scripts in repo). Step 4 is the on-page rules.
- **`keyword-engine` skill** — Mode A (pre-build strategy: filter, intent classification, KD/volume tiers, clusters, page mapping, blog briefs, FAQ bank, product gaps, AI visibility) and Mode B (post-build audit: crawl, implementation check vs `keyword-map.md`, cannibalisation, orphans, blog clusters, GSC performance). Produced `docs/keyword-map.md` and `docs/keyword-cluster.txt`.
- **`webforge` skill** — site build/update/audit; reads `CLAUDE.md` and enforces the rules above.
- **Owner instructions recorded in `CLAUDE.md`** (dated 2026-10-13, 10-15, 10-16, 11-02): content rules, exact-keyword rule, fallback rule, power words, image SEO, product description rules, blog rules, Navigational keywords allowed, supporting keyword reuse on pages (v4).
- Reports produced: `docs/seo-strategy-report.md`, `docs/seo-keywords-selected.csv`, `docs/keyword-report-2026-11-02*.md/.csv`, `docs/keyword-usage-report-2026-10-16.*`, `docs/secondary-keywords-added-2026-10-31/11-01*.md`.

## 10. Known gaps

- `CLAUDE.md` still states "each keyword used on one page only (F15)"; since keyword map v4 (2026-11-02) supporting keywords may repeat across pages, and F15 only blocks duplicates on the same page.
- Mix targets (45/45/10 for products) are currently 54/45/1 T/C/I, and one product has fewer than 5 supporting keywords because the files had no more relevant ones (reported by crosscheck as a note, not a failure).
