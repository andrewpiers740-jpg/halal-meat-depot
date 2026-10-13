# Halal Meat Depot — keyword map

> **Superseded for keyword selection (2026-10-13):** the owner's Semrush data now drives the plan — see
> [seo-strategy-report.md](seo-strategy-report.md) and [seo-keywords-selected.csv](seo-keywords-selected.csv)
> (634 keywords on 86 pages + 300 blog keywords). The audit findings below remain valid.

Last audit: 2026-10-12 (keyword-engine Mode B). Site: https://halalmeatdepot.com.au (AU market).

**Data quality:** no Semrush/Ahrefs export and no Google Search Console yet, so there are **no volume / KD / CPC figures**.
Every term below is validated only as a real query by Google AU autocomplete (`[autocomplete]`) or taken from the site's
catalogue (`[catalogue]`). Tiers are judgement calls until GSC data exists — re-run this audit 6–8 weeks after GSC is connected.

Competitors checked: meatonline.com.au ("Wholesale Meat Suppliers Australia" — B2B cartons, not halal-specific),
ourcow.com.au ("Meat Delivery Australia | Online Butcher" — sells pork), meatemporium.com.au (blocked our fetch, 429).
Gap we own: **halal-specific** delivery + wholesale with a published certificate (HCA No. HSS 027843).

## Allocation table

| Cluster | Primary KW | Intent | Assigned URL | Page Type | Status | Audit Status | Audit Notes |
|---|---|---|---|---|---|---|---|
| Delivery | halal meat delivery sydney | Trans | / | Homepage | Existing | ✅ PASS | Title, H1, meta retargeted 2026-10-12 (was generic "certified halal meat") |
| Online shop | buy halal meat online | Trans | /shop/ | Category hub | Existing | ✅ PASS | De-cannibalised — "wholesale" removed from title/H1 |
| Wholesale B2B | halal meat wholesalers sydney | Comm/Trans | /wholesale/ | Landing | Existing | ✅ PASS | Retargeted; certificate No. in intro |
| Bulk cartons | bulk halal meat cartons | Trans | /shop/wholesale-cartons/ | Category | Existing | ✅ PASS | Was "wholesale halal meat cartons" (cannibal with /wholesale/) |
| Aqeeqah/Qurbani | whole lamb for sale sydney | Trans | /aqeeqah-qurbani/ | Landing | **New** | ✅ PASS | Built 2026-10-12; FAQPage schema; facts only |
| Beef | halal beef | Trans | /shop/beef/ | Category | Existing | ✅ PASS | Title "Buy Halal Beef Online", mini-FAQ + ItemList added |
| Lamb | halal lamb | Trans | /shop/lamb/ | Category | Existing | ✅ PASS | as above |
| Goat | halal goat meat | Trans | /shop/goat/ | Category | Existing | ✅ PASS | as above |
| Chicken | halal chicken | Trans | /shop/chicken/ | Category | Existing | ✅ PASS | as above |
| Camel | halal camel meat australia | Trans | /shop/camel/ | Category | Existing | ✅ PASS | as above |
| Duck | halal duck | Trans | /shop/duck/ | Category | Existing | ✅ PASS | as above |
| Kangaroo | halal kangaroo meat | Trans | /shop/kangaroo/ | Category | Existing | 🟡 DRIFTED | Thin (≈300 words) — only 2 products; expand intro when range grows |
| Buffalo | halal buffalo meat | Trans | /shop/water-buffalo/ | Category | Existing | ✅ PASS | as above |
| Offal | halal offal | Trans | /shop/offal/ | Category | Existing | ✅ PASS | as above |
| Certification | halal certified meat australia | Info/Trust | /halal-certification/ | Trust page | Existing | ✅ PASS | Certificate image + number published |
| FAQ | halal meat delivery faq | Question | /faq/ | FAQ | Existing | ✅ PASS | Title was "FAQ — Halal Meat Depot" (22 chars) |
| Products | halal + product name | Trans | /product/<slug>/ | Product | Existing | ✅ PASS | Titles now lead with "Halal …" (e.g. "Halal Lamb Shanks") |

## Secondary keywords per page

All `[autocomplete]` unless marked. No keyword appears on two pages.

- **/** — halal meat sydney · halal meat delivery · halal meat delivery near me · halal butcher sydney · halal meat delivery melbourne/brisbane/perth (answered by "Australia-wide", no city pages)
- **/shop/** — halal meat online · halal meat online order · halal meat online delivery · online halal butcher `[generated]` · halal meat shop near me
- **/wholesale/** — halal meat wholesale suppliers · halal meat suppliers for restaurants · halal meat suppliers australia · halal meat supplier wholesale · halal meat wholesale near me · halal meat distributors `[generated]`
- **/shop/wholesale-cartons/** — bulk halal meat · bulk halal meat delivery · wholesale halal meat · halal chicken wholesale · halal wholesale chicken breast · halal meat cartons `[generated]`
- **/aqeeqah-qurbani/** — whole lamb price · whole lamb for sale · whole lamb sydney · qurbani price australia · online qurbani australia · aqeeqah lamb / goat `[generated]` · whole goat for sale `[generated]`
- **/shop/lamb/** — halal lamb chops · halal lamb cutlets · halal lamb shanks · halal lamb shoulder · halal lamb mince · halal lamb near me
- **/shop/goat/** — halal goat meat near me · halal goat cubes · halal goat · goat curry cut `[catalogue]` · whole goat `[catalogue]`
- **/shop/beef/** — halal wagyu sydney · halal wagyu steak · halal wagyu beef · halal angus beef `[catalogue]` · halal beef mince `[catalogue]`
- **/shop/camel/** — halal camel meat · halal camel meat online · camel mince `[catalogue]` · camel steaks `[catalogue]`

## Cannibalisation flags

⚫ CANNIBAL (resolved 2026-10-12): "wholesale halal meat"
  - /shop/ (title "Shop Wholesale Halal Meat Online"), /wholesale/ ("Wholesale Halal Meat Supply"), /shop/wholesale-cartons/ ("Wholesale Halal Meat Cartons")
  - Resolution: DIFFERENTIATE — /shop/ → "buy halal meat online"; /wholesale/ → "halal meat wholesalers sydney" (B2B accounts);
    /shop/wholesale-cartons/ → "bulk halal meat cartons" (buy cartons now). Category `kw` for cartons changed in products.js.

## Orphan pages

None — every indexable URL is in the sitemap and linked from nav/footer/category chips. /aqeeqah-qurbani/ is linked from the footer;
add a homepage or lamb/goat category link before Eid al-Adha for more weight.

## Bonus opportunities

- 💡 "halal wagyu sydney" — autocomplete-validated; site has 23 Wagyu products. Strengthen /shop/beef/#wagyu-mb5-plus-and-mb9-plus or a blog guide (cluster below).
- 💡 "halal meat delivery melbourne / brisbane / perth" — real demand. Do NOT build city doorway pages; answer in the delivery policy with real per-state delivery info once the owner confirms transit times.
- 💡 "qurbani australia 2026/2027" — seasonal. Most results are overseas-charity Qurbani; ours is meat supply. Publish the Eid guide (cluster below) by March 2027.
- 💡 "halal meat woolworths / coles" — comparison intent. A "bulk vs supermarket price per kg" guide uses our real per-kg prices.

## Revisit when GSC data exists

Mismatch, striking-distance and decay checks (audit Phase 8) were **not run** — GSC is not connected yet.

## Audit metadata

- Date: 2026-10-12 · Pages crawled: 35 of 250 (homepage, all 10 categories, key landing pages, all 5 posts, 10 products)
- Findings before fixes: 1 CANNIBAL, 13 WARNING (generic homepage/product titles, short metas, no category FAQ/ItemList, empty sameAs), 1 DRIFTED (kangaroo thin)
- After fixes: 16/17 planned pages PASS → health ≈ 94/100
- Blog: 5 live posts 🟡 DRIFTED (no FAQ section, 335–556 words) — expand; 20 new clusters queued in keyword-cluster.txt

## Excluded (never target)

- "hand slaughtered halal meat", "zabiha halal", "grass-fed", "organic", "MSA" — not confirmed by owner (ACL)
- Competitor brand names on product/category pages
- City/suburb doorway pages ("halal meat parramatta", "halal butcher revesby" …) — single delivery-only depot
