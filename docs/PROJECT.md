# Halal Meat Depot — project record

## Identity
- Name: Halal Meat Depot · Tagline: "Certified halal meat at depot prices, delivered Australia-wide"
- Domain: **halalmeatdepot.com.au** (bought and connected by owner 2026-10-09; Vercel redirects www → apex, so vercel.json has no www rule)
- Brand colours: maroon `#9F1D24` (from logo), dark `#1A0D0E`, amber accent `#E3A83F` · Font: Plus Jakarta Sans (self-hosted via next/font)
- Logo: `assets/logo-source.png` — owner-supplied logo (2026-10-09), edited with owner approval: pig removed, emblem now cow, lamb, rooster, kangaroo. No year on the logo; founded **2021**. Favicon/header use the emblem crop; hero/OG use the full logo. Proposal files in `docs/logo-proposal/`.
- GSC: pending · Bing: pending · IndexNow key: `b7f3c2e9a1d84f6c9e2b5a7d3c1f8e4a`

## Deploy
- Target: Vercel · Repo: https://github.com/andrewpiers740-jpg/halal-meat-depot · Vercel project `halal-meat-depot` (scope `piers-andrew`)
- Backend (client CMS): No · Form provider: smtp · Turnstile: no
- Reply Portal: Yes — storage Upstash Redis (to be connected) · admin at `/admin/`
- Customer accounts: Yes, optional (Redis + `SESSION_SECRET`)

## Contact & business
- Address: 43 Banksia Rd, Greenacre NSW 2190 (confirmed real) · ABN 27 093 995 629 (confirmed real)
- Phone/WhatsApp: +61 489 989 442 · Email: sales@halalmeatdepot.com.au (official; receives all orders, contact and wholesale enquiries; shown entity-encoded)
- Hours: Mon–Sat 06:00–18:00, Sun 07:00–16:00 (confirmed real)
- Country AU · Currency AUD · Fresh meat GST-free

## Order rules
- Min order $250 · free delivery $500+ · flat $25 below · **delivery only — no pickup** (owner, 2026-10-09)
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
Type A (Category → Subcategory → Product). 9 categories: Beef, Lamb, Goat, Chicken, Camel, Duck, Kangaroo, Water Buffalo, Wholesale Cartons. 141 products, one or more per subcategory (71 added October 2026, priced against Sydney halal butchers' online listings — Halal Meat Company, Abu Ahmad Butchery, Australian Meat Emporium, Super Butcher — set at depot level below retail; buffalo and duck remain estimates). Camel range (10 frozen products) replaced 10 Oct 2026 on the owner's instruction to match Gamekeepers of Australia's camel range (gamekeepersmeat.com.au/collections/camel), at their listed prices; descriptions are our own. Retired product URLs 301 via RETIRED_PRODUCTS in site.js.

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
ADMIN_PASSCODE: set (owner) · Redis: Upstash free plan `upstash-kv-bole-crystal`, iad1, connected (KV_* vars) · SESSION_SECRET: set · WhatsApp: 61489989442 · Email: Zoho SMTP working

## Decisions log
- 2026-10-09 — Rebuilt from Vite/AI Studio SPA to Next.js (WebForge) — SPA had one URL and orders/forms went nowhere.
- 2026-10-09 — Halal Control Australia as sole certifier; removed unverified certifier/slaughter claims and the mock certificate.
- 2026-10-09 — Payment methods reduced to PayID, bank transfer, crypto (owner). Card and cash-on-pickup removed.
- 2026-10-09 — Venison dropped (not in any category; owner didn't confirm).
- 2026-10-09 — Placeholder product images (branded) until owner supplies photos; Unsplash stock removed.
- 2026-10-09 — Pickup removed site-wide (owner: not offered). Delivery only.
- 2026-10-09 — Founding year 2021 confirmed by owner.
- 2026-10-09 — New logo supplied by owner contained a pig; pig removed and replaced with kangaroo + redrawn rooster, owner approved. Never use logo artwork containing a pig.
- 2026-10-09 — Refund & Returns Policy expanded (/refund/): 48-hour reporting window (was 24h, extended for Australia-wide delivery), ACL mandatory text, cancellations before packing, refunds within 5 business days, crypto refunds in same coin at AUD value.

- 2026-10-09 — Website email working via Zoho SMTP: SMTP_HOST=smtp.zoho.com, port 465, user sales@halalmeatdepot.com.au, Zoho app-specific password (Secret). smtppro.zoho.com returned EAUTH for this account — use smtp.zoho.com. Verified: test enquiry ENQ-OT3X0KCJ arrived in Zoho inbox.
- 2026-10-09 — Upstash Redis (free, iad1) connected; ADMIN_PASSCODE and SESSION_SECRET set by owner. Verified live: test order HMD-TESTTR saved + emailed (shop + customer); /api/account/me enabled:true; admin API returns 401 without passcode.
