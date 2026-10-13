# Halal Meat Depot — project instructions

Next.js 16 (App Router, JavaScript) ecommerce site for a Greenacre, Sydney halal meat supplier. Deploy target: Vercel (auto-deploy on push to `main`). Built with the WebForge skill.

## Non-negotiable: halal certification claims
- The ONLY certifier is **Halal Control Australia**. Never name any other certifier (HCAA, AFIC, ANIC, "NSW Halal Board/Authority", etc.).
- Never claim "hand-slaughtered", "hand Zabiha", "non-stunned", "Zabiha certified", "organic", "grass-fed" or "MSA graded" for our products — the owner has not confirmed them.
- Never invent licence numbers, certificate numbers, reviews, awards, statistics or milestones. Licence numbers will be supplied later.
- The real halal certificate (owner-supplied) is `assets/halal-certificate.jpg`; its number and expiry live in `SITE.certificate`. Update both when it is renewed.
- Authority: Australian Consumer Law (misleading claims). These terms are in `COMPLIANCE.bannedTerms` and the crosscheck fails the build if they appear.
- If a request would require breaking any of the above, stop and say so rather than complying.

## Architecture
- `src/config/site.js` (+ `products.js`, `content.js`) is the single source of truth: products, categories, posts, FAQs, order rules, payment methods, `REPLY` (emails/portal).
- Adding a product = one `p(...)` line in `products.js`; page, route, schema, sitemap, search, API and MCP output follow automatically.
- Never hand-edit generated files: `public/llms.txt`, `public/auth.md`, `public/.well-known/*`, `public/js/webmcp.js`, `vercel.json` — edit config; `scripts/gen-agent-files.mjs` regenerates them.
- Domain lives ONLY in `SITE.domain` (currently pending: `DOMAIN.com`, so URLs fall back to the Vercel production URL).
- Totals are always recomputed on the server (`computeTotals` in `src/lib/order.js`). Crypto = 10% off meat subtotal, automatic.
- Delivery (owner, 2026-10-13): Standard 2–5 days, free over $500 else $25. Priority Delivery priced by distance from Greenacre — zones (postcode ranges), prices and times live ONLY in `src/config/delivery.js`; checkout, server totals, emails, delivery page, Product schema (`shippingDetails`) and llms.txt read from it.

## Rules
- `npm run build && npm run crosscheck` must pass before every push. Always ask the owner before `git push`.
- One `<h1>` per page. Titles ≤60 chars, meta descriptions 110–158 (use `pageMeta()`).
- Owner rule (2026-10-13): every indexable page has a UNIQUE focus keyword that appears in its SEO title, meta description and slug (homepage exempt from slug). Focus keywords and keyword URLs live in `src/config/seo.js`; a new product defaults to its own name. Changing a URL means adding the old one to the 301s (`REDIRECTS` in `site.js` covers products, categories and `PAGE_MOVES`). Crosscheck F1–F5 enforce this. Product images stay named by the original slug (`imageSlug`).
- Images: `npm run images` (placeholders until real photos go in `assets/product-photos/<slug>.jpg`).
- Content rules (owner, 2026-10-13): homepage primary keyword "halal meat"; product/category primary keywords must be Transactional or Commercial (Semrush) — favour high volume, low KD; H1 contains the focus keyword on every page; product descriptions lead with the focus keyword (first 20%), use 5–10 supporting keywords (~45% T / 45% C / 10% I — `src/config/product-keywords.js`, regenerate rather than hand-edit) and have H2/H3s carrying the focus or supporting keywords; every product needs `short`, `desc` and an entry in `src/config/product-about.js` (unique cut profile). Blog posts: 1,000+ words, `keywords` list ~50% I / 25% C / 25% T. Crosscheck F9–F12 enforce this.
- Exact keywords (owner rule, 2026-10-13): every focus and supporting keyword (products, categories, pages, posts) is an EXACT phrase from the owner's Semrush keyword files (`Desktop\Halal Meat Depot\keywords\*.csv`), never modified, pluralised or invented ("buy … online" patterns are not allowed unless that exact phrase is in the files). The focus keyword appears word-for-word in the SEO title, meta description and H1 (F2/F3/F9 use `containsExact`: only case and punctuation are ignored; the slug check also reads "&" as "and").
  - Fallback (owner, 2026-10-13): where a product or page has no qualifying keyword, use exact file keywords with Keyword Difficulty 0–29. If the files have none that truthfully describe it, the product name stays as its focus and it gets fewer supporting keywords — never pad with made-up or misdescriptive phrases (no other species, brands, places, "australian" origin, supplements etc.). The 45/45/10 mix and the 5-keyword minimum are targets the crosscheck reports, not failures.
  - Product supporting keywords: `node scripts/keywords/allocate.mjs` regenerates `src/config/product-keywords.js` (needs the owner's CSVs; each keyword used on one product only; post keywords are reserved). Product copy places each keyword verbatim via `sentence()` in `src/lib/productContent.js`.
  - Owner-approved exception: lamb neck, gravy beef, beef rump cap and chicken livers use the exact (Informational) file keyword as focus (`ownerOk` in `seo.js`).
- Power words (owner rule, 2026-10-13): every SEO title has 1–2 power words from `POWER_WORDS` in `src/config/seo.js` (Fresh, Premium, Certified, Best, Easy, Complete, Quick, Simple, Essential, Tender…). Use only words that are true; never "cheapest", "#1", "award-winning". Crosscheck F13 enforces it.
- Image SEO (owner rule, 2026-10-13): every product/page image's alt, title, visible caption (`<figcaption>`) and JSON-LD ImageObject description contain that product's/page's focus keyword — build them with `src/lib/imageSeo.js`. Formats: product + category images WebP only (optimiser set to WebP), homepage hero AVIF (`public/images/hero/*.avif`, srcset), logos + favicon SVG (`public/images/logo.svg`, `logo-mark.svg`, `src/app/icon.svg`, traced vectors). Only `apple-icon.png` (iOS) and the og image stay raster. Crosscheck F6–F8 enforce this.
- Client fetches to API routes use a trailing slash (`/api/contact/`).
- Never commit `.env*`, `node_modules/`, `.next/`.

## Live placeholders (Vercel → Settings → Environment Variables)
- Domain: halalmeatdepot.com.au (live). Email sales@halalmeatdepot.com.au receives all orders/enquiries (env vars ORDER_EMAIL etc. override).
- `ADMIN_PASSCODE` — admin dashboard at `/admin/` returns 503 until set.
- Upstash Redis (Vercel Storage) — orders/enquiries/accounts not stored until connected.
- `SESSION_SECRET` (32+ chars) — customer accounts disabled until set.
- `SMTP_HOST/PORT/USER/PASS` (+ optional `SMTP_FROM`) for sales@halalmeatdepot.com.au — no emails are sent until set. Order/contact/wholesale destinations default to sales@ (`ORDER_EMAIL` etc. override).
- GSC/Bing codes: `SITE.gscCode` / `SITE.bingCode`.

## Brand facts (real only)
Legal entity: AUSBD HALAL FOODS PTY LTD ("Halal Meat Depot" is its business name). Founded 2021 (owner confirmed). Logo: `assets/logo-source.png` (cow, lamb, rooster, kangaroo — never any artwork with a pig). Delivery only — no pickup. 43 Banksia Rd, Greenacre NSW 2190. ABN 27 093 995 629. Phone/WhatsApp 0489 989 442 (shown on site; international +61 form only in schema and tel:/WhatsApp links). Mon–Sat 06:00–18:00, Sun 07:00–16:00. Delivers Australia-wide. Payments: PayID, bank transfer, crypto (10% off). Min order $250, free delivery $500+, else $25. No reviews/awards supplied yet.
