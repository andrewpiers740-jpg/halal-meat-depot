# Halal Meat Depot

Online store for Halal Meat Depot, Greenacre NSW — certified halal meat (Halal Control Australia), delivered Australia-wide.

**Stack:** Next.js 16 (App Router, JavaScript) · Vercel · Upstash Redis · SMTP (nodemailer)

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Generate agent files, start dev server on http://localhost:3000 |
| `npm run build` | Generate agent files + production build |
| `npm run crosscheck` | Start the built site and run the full pre-ship check (run after `build`) |
| `npm run images` | Regenerate logo/icons, product photos and placeholders |

## Editing content

- **Products / prices / categories:** `src/config/products.js`
- **Blog posts and FAQs:** `src/config/content.js`
- **Business details, order rules, payment methods, emails:** `src/config/site.js`
- **Product photos:** save as `assets/product-photos/<product-slug>.jpg` (2000px+, white background), then `npm run images`.

## Deploy

Push to `main` → Vercel builds and deploys automatically (`vercel.json` sets the framework to Next.js).

### One-time Vercel setup (Settings → Environment Variables / Storage)

1. **Storage → Create Database → Upstash Redis** → connect to this project (adds the Redis URL/token).
2. `ADMIN_PASSCODE` — a strong passcode for `/admin/`.
3. `SESSION_SECRET` — 32+ random characters (enables optional customer accounts).
4. SMTP: `SMTP_HOST`, `SMTP_PORT` (465), `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, plus `ORDER_EMAIL`, `CONTACT_EMAIL`, `WHOLESALE_EMAIL`.
5. Redeploy after adding variables.

Until each is set the site still works: orders/enquiries fall back to WhatsApp, the admin returns "not configured", accounts show "coming soon".

### Connecting the domain

1. Vercel → Settings → Domains → add the domain and `www`, set the DNS records shown.
2. In `src/config/site.js` change `domain: 'DOMAIN.com'` to the real domain.
3. `npm run build && npm run crosscheck` → commit → push.

## How orders work

Customer checks out (website or WhatsApp) → order saved + emailed to the shop + confirmation emailed to the customer → you open `/admin/orders/`, paste the real PayID/bank/wallet details → customer gets a payment-details email (and optional WhatsApp) with tap-to-copy fields → customer uploads a payment screenshot → order marked "payment confirmed".
