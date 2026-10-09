# Halal Meat Depot — project record

## Identity
- Name: Halal Meat Depot · Tagline: "Certified halal meat at depot prices, delivered Australia-wide"
- Domain: **PENDING** (`SITE.domain = 'DOMAIN.com'`; absolute URLs use the Vercel production URL until set)
- Brand colours: maroon `#9F1D24` (from logo), dark `#1A0D0E`, amber accent `#E3A83F` · Font: Plus Jakarta Sans (self-hosted via next/font)
- Logo: `assets/logo-source.jpg` (logo text reads "SINCE 2023" — owner said founded 2021; **to confirm**)
- GSC: pending · Bing: pending · IndexNow key: `b7f3c2e9a1d84f6c9e2b5a7d3c1f8e4a`

## Deploy
- Target: Vercel · Repo: https://github.com/andrewpiers740-jpg/halal-meat-depot · Vercel project `halal-meat-depot` (scope `piers-andrew`)
- Backend (client CMS): No · Form provider: smtp · Turnstile: no
- Reply Portal: Yes — storage Upstash Redis (to be connected) · admin at `/admin/`
- Customer accounts: Yes, optional (Redis + `SESSION_SECRET`)

## Contact & business
- Address: 43 Banksia Rd, Greenacre NSW 2190 (confirmed real) · ABN 27 093 995 629 (confirmed real)
- Phone/WhatsApp: +61 489 989 442 · Emails: being created (not shown on site until set)
- Hours: Mon–Sat 06:00–18:00, Sun 07:00–16:00 (confirmed real)
- Country AU · Currency AUD · Fresh meat GST-free

## Order rules
- Min order $250 · free delivery $500+ · flat $25 below · free pickup Greenacre (assumed — **owner to confirm pickup is offered**)
- Payment: PayID, bank transfer, crypto (10% off meat subtotal, auto-applied, server-recomputed) — owner confirmed
- Old discount codes (HALAL10, WELCOME5, DEPOT50) removed — not confirmed by owner
- Ordering: order form + WhatsApp, both save the order and email the customer

## Brand entity statement
Halal Meat Depot is a Greenacre, Sydney-based halal meat supplier established in 2021, offering beef, lamb, goat, chicken, camel, duck, kangaroo and water buffalo certified halal by Halal Control Australia. Halal Meat Depot delivers Australia-wide and specialises in bulk packs, whole carcasses and wholesale cartons for households, restaurants and caterers at depot prices.

## Brand authority facts (REAL only)
- Founded 2021, Greenacre, Sydney (owner, 2026-10-09)
- Delivers Australia-wide (owner, 2026-10-09)
- Certifier: Halal Control Australia, all products incl. camel, duck, kangaroo, buffalo (owner, 2026-10-09)
- Licence numbers: to be supplied later · Reviews/awards/press/named people: none supplied

## Compliance
- Banned terms (see `COMPLIANCE.bannedTerms`): other certifier names, hand-slaughtered/hand Zabiha/non-stunned/Zabiha certified, invented licence/certificate numbers, organic, grass-fed, MSA graded, web3forms
- Required framing: "Certified halal by Halal Control Australia"
- Authority: Australian Consumer Law ss18/29 (misleading representations); owner has only confirmed certifier, not slaughter method
- No age gate. Privacy Act 1988 / APPs privacy policy. No tracking cookies → no consent banner.

## Shop structure
Type A (Category → Subcategory → Product). 9 categories: Beef, Lamb, Goat, Chicken, Camel, Duck, Kangaroo, Water Buffalo, Wholesale Cartons. 71 products, one or more per subcategory.

## Pricing basis (researched 2026-10-09 — owner to review)
Owner asked for real wholesale prices sourced from the web. Published Sydney halal wholesale price lists are rare, so prices are set ~10–15% below current Sydney halal butcher retail prices for bulk packs:
- Halal Meat Company (Sydney) — goat curry $18.99/kg, lamb curry $14.99/kg, chicken breast $15.99/kg, thigh $18.99/kg, whole baby goat 11–12kg $230
- Abu Ahmad Butchery (Punchbowl) — whole lamb $18.99/kg, diced lamb $32/kg, Wagyu cuberoll SC8-9 $95/kg, eye fillet $58/kg, chicken breast $13.50/kg
- Australian Meat Emporium — eye fillet $59.99/kg, scotch $39.99/kg, MB9+ Wagyu brisket $37.99/kg, kangaroo loin $32.99/kg
- Sydney Wholesale Meats — whole rump ~$30/kg
- Camel, water buffalo and duck: little or no Australian retail data online — prices are **estimates** (camel export unit value ≈ AUD 20.7/kg used as floor).

## Keyword strategy
Primary keyword: **not set** — owner will choose during the SEO/AI-visibility pass. Current pages target descriptive category terms (see keyword-map.md). All unvalidated.

## Content strategy
5 published guides (certification, beef cuts, goat curry cuts, lean exotic meats, lamb cuts). Next topics in keyword-map.md.

## Reply Portal block
ADMIN_PASSCODE: not set · Redis: not connected · WhatsApp: 61489989442 · Email provider: smtp (creds pending)

## Decisions log
- 2026-10-09 — Rebuilt from Vite/AI Studio SPA to Next.js (WebForge) — SPA had one URL and orders/forms went nowhere.
- 2026-10-09 — Halal Control Australia as sole certifier; removed unverified certifier/slaughter claims and the mock certificate.
- 2026-10-09 — Payment methods reduced to PayID, bank transfer, crypto (owner). Card and cash-on-pickup removed.
- 2026-10-09 — Venison dropped (not in any category; owner didn't confirm).
- 2026-10-09 — Placeholder product images (branded) until owner supplies photos; Unsplash stock removed.
- 2026-10-09 — Policy pages (refund 24-hour window, terms, privacy) drafted — owner to review.
