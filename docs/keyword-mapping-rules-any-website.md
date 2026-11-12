# Keyword mapping rules (reusable for any website)

Rules only. Numbers in **[brackets]** are the defaults we used and can be changed per site.

---

## 1. Source and selection

1. **Use only the site owner's own keyword exports** (Semrush, Ahrefs, etc.). Columns needed: Keyword, Intent, Volume, Keyword Difficulty (KD), CPC.
2. **Load every file, de-duplicate** by exact phrase, keeping the highest-volume row. Drop keywords that have no KD score (they cannot be judged).
3. **Keep Intent, Volume, KD and CPC** with every keyword for the whole process.
4. **Numeric filters** (apply by intent):
   - Overall KD ceiling: **[0–29]**.
   - Informational only: KD **[0–15]**, volume **[500+]**.
   - Commercial / Transactional / Navigational (including mixed intents such as "Informational, Transactional"): KD **[0–25]**, volume **[20+]**.
5. **Relevance filter by hand.** Remove keywords about:
   - competitors, other businesses and retailer names
   - cities or regions you don't serve
   - products or services you don't offer, and the wrong product type
   - claims you can't truthfully make
   - typos, adult or spam terms, and unrelated topics (supplements, pet food, jobs, etc.)
6. **Review the full allocation yourself.** Automated matching produces junk (wrong product, brand names, "near me" variants of a different thing). Remove it and re-run.

## 2. The exact-keyword rule (non-negotiable)

- Every focus and supporting keyword is an **exact phrase from the keyword files**: never changed, pluralised, re-ordered or invented.
- Do not generate patterns such as "buy X online", "X price", "X near me" or "X supplier" unless that exact phrase is in the files.
- **Exact match** means the words appear in order and unchanged. Only letter case and punctuation between words may differ. In slugs only, "&" reads as "and".

## 3. Fallback rule

- If a page has no qualifying keyword, use exact file keywords with **[KD 0–29]**. Navigational phrases may be used only if they are generic (never competitor, brand, person or other-place names).
- If the files have nothing that honestly describes the page, **the page or product name stays as its focus keyword** and it gets fewer supporting keywords.
- **Never pad** with made-up or misdescriptive phrases. Targets for the number or mix of keywords are reported as shortfalls, not forced.

## 4. Primary (focus) keyword

1. **One unique focus keyword per indexable page.** Store it in one config file.
2. It must appear **word for word** in: the SEO title, the meta description, the URL slug (homepage exempt) and the H1.
3. **Intent by page type:**
   - Product and category pages: **Transactional or Commercial**, favouring high volume and low KD.
   - Blog posts / guides: **Informational**.
   - Homepage: the broad head term for the business.
4. **Product head terms that Semrush labels "Informational"** (a product name, a cut, a model) go on the product page, not on a blog post, because search results for them show product pages.
5. **Exceptions** to the intent rule need the owner's approval and are flagged in config (for example an `ownerOk` flag).
6. **Changing a URL** means adding the old URL to a 301 redirect map. Keep product image file names on the original slug.

## 5. Secondary (supporting) keywords

1. **[5–10] per page**, each an exact file phrase.
2. **Target mix:**
   - products and categories: about **[45% Transactional / 45% Commercial / 10% Informational]**
   - blog posts: about **[50% Informational / 25% Commercial / 25% Transactional]**
3. **One keyword = one page** for focus keywords. Never let two pages target the same focus keyword (cannibalisation). Reserve blog keywords before allocating product keywords, and keep a running registry of every keyword used.
4. A supporting keyword may be reused on more than one page only if the owner allows it, and it must never be listed twice on the same page.
5. **Place every supporting keyword verbatim in the page copy.** The description leads with the focus keyword in the first **[20%]** and has H2/H3 headings carrying the focus or supporting keywords.
6. If the files cannot supply enough keywords, **report the shortfall** instead of inventing keywords.
7. **Keywords for pages that aren't products** (categories, info pages) are written into a visible copy block so they appear on the page.

## 6. Allocation order

1. Keywords the strategy already mapped to that page (owner "pass list").
2. Fallback keywords (KD **[0–29]**).
3. A looser second pass for pages still under the minimum, with extra reject lists (nutrition, supplements, unrelated products, language words, specific phrases rejected on review).
4. Each keyword is used on one page only; keywords already reserved for other pages are skipped.

## 7. On-page rules the keywords feed

| Item | Rule |
|---|---|
| SEO title | **[≤ 60]** characters, contains the exact focus keyword, **[1–2]** power words, unique |
| Meta description | **[110–158]** characters, contains the exact focus keyword, unique |
| H1 | Exactly one per page, contains the focus keyword |
| URL slug | Contains the focus keyword (homepage exempt), lowercase, hyphenated |
| H2/H3 | Carry the focus or supporting keywords naturally, no skipped heading levels |
| First paragraph | Focus keyword within the first **[20%]** of the main description |
| Product description | **[400+]** words, unique per product |
| Blog post | **[1,000+]** words (**[1,500+]** for long-form), 100% unique, links to the products or pages it targets |
| Image SEO | alt text, title, visible caption and structured-data description of every page image contain that page's focus keyword |
| Power words | Only true ones (fresh, premium, best, easy, complete, quick, simple, essential, expert…). Never "cheapest", "#1" or "award-winning" unless proven |
| Truthfulness | No invented statistics, reviews, awards, licences or certificates. No claims the owner hasn't confirmed |

## 8. Checks to run before publishing

A script should fail the build if any of these break:

1. Every indexable page has a focus keyword.
2. The focus keyword is in the title, description, slug (except homepage), H1, and image alt/title/caption.
3. No focus keyword is used on two pages.
4. Every supporting keyword appears in its page's copy, and none is listed twice on one page.
5. Product and category focus keywords are Transactional or Commercial (unless flagged by the owner).
6. Every title is within length and has the required power words.
7. Every site keyword is an exact phrase from the files (0 invented keywords).
8. Blog posts meet the word count and keyword mix.

## 9. Process order

1. Collect the owner's keyword files and the criteria numbers (section 1).
2. Filter and de-duplicate (sections 1–2).
3. Assign one focus keyword per page by intent (section 4).
4. Allocate supporting keywords with the allocator and fallback rules (sections 5–6).
5. Review by hand and remove junk, then re-run.
6. Write the copy with every keyword placed verbatim (section 7).
7. Run the checks (section 8) before every release.
8. Keep the allocation script and its input lists in the repo so it can be regenerated.
