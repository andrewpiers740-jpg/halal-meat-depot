# Halal Meat Depot — project instructions

Next.js 16 (App Router, JavaScript) ecommerce site for a Greenacre, Sydney halal meat supplier. Deploy target: Vercel (auto-deploy on push to `main`). Built with the WebForge skill.

## Non-negotiable: halal certification claims
- The ONLY certifier is **Halal Control Australia**. Never name any other certifier (HCAA, AFIC, ANIC, "NSW Halal Board/Authority", etc.).
- Never claim "hand-slaughtered", "hand Zabiha", "non-stunned", "Zabiha certified", "organic", "grass-fed" or "MSA graded" for our products — the owner has not confirmed them.
- Never invent licence numbers, certificate numbers, reviews, awards, statistics or milestones. Licence numbers will be supplied later.
- Authority: Australian Consumer Law (misleading claims). These terms are in `COMPLIANCE.bannedTerms` and the crosscheck fails the build if they appear.
- If a request would require breaking any of the above, stop and say so rather than complying.

## Architecture
- `src/config/site.js` (+ `products.js`, `content.js`) is the single source of truth: products, categories, posts, FAQs, order rules, payment methods, `REPLY` (emails/portal).
- Adding a product = one `p(...)` line in `products.js`; page, route, schema, sitemap, search, API and MCP output follow automatically.
- Never hand-edit generated files: `public/llms.txt`, `public/auth.md`, `public/.well-known/*`, `public/js/webmcp.js`, `vercel.json` — edit config; `scripts/gen-agent-files.mjs` regenerates them.
- Domain lives ONLY in `SITE.domain` (currently pending: `DOMAIN.com`, so URLs fall back to the Vercel production URL).
- Totals are always recomputed on the server (`computeTotals` in `src/lib/order.js`). Crypto = 10% off meat subtotal, automatic.

## Rules
- `npm run build && npm run crosscheck` must pass before every push. Always ask the owner before `git push`.
- One `<h1>` per page. Titles ≤60 chars, meta descriptions 110–158 (use `pageMeta()`).
- Images: `npm run images` (placeholders until real photos go in `assets/product-photos/<slug>.jpg`).
- Client fetches to API routes use a trailing slash (`/api/contact/`).
- Never commit `.env*`, `node_modules/`, `.next/`.

## Live placeholders (Vercel → Settings → Environment Variables)
- Domain: pending → set `SITE.domain`, rebuild, push.
- `ADMIN_PASSCODE` — admin dashboard at `/admin/` returns 503 until set.
- Upstash Redis (Vercel Storage) — orders/enquiries/accounts not stored until connected.
- `SESSION_SECRET` (32+ chars) — customer accounts disabled until set.
- `SMTP_HOST/PORT/USER/PASS/SMTP_FROM`, `ORDER_EMAIL`, `CONTACT_EMAIL`, `WHOLESALE_EMAIL` — no emails until set (mailboxes being created).
- GSC/Bing codes: `SITE.gscCode` / `SITE.bingCode`.

## Brand facts (real only)
Founded 2021 (logo says "Since 2023" — owner to confirm). 43 Banksia Rd, Greenacre NSW 2190. ABN 27 093 995 629. Phone/WhatsApp +61 489 989 442. Mon–Sat 06:00–18:00, Sun 07:00–16:00. Delivers Australia-wide. Payments: PayID, bank transfer, crypto (10% off). Min order $250, free delivery $500+, else $25. No reviews/awards supplied yet.
