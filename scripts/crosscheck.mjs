// Pre-ship crosscheck — runs against the BUILT site (next start), never source.
// Exits non-zero on any failure. Usage: npm run build && npm run crosscheck
import { spawn, execSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { SITE, PRODUCTS, CATEGORIES, POSTS, COMPLIANCE } from '../src/config/site.js'
import { TOOLS } from '../src/lib/tools.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 3100
const BASE = `http://localhost:${PORT}`
const fails = []
const warns = []
let passes = 0
const fail = (id, msg) => fails.push(`${id}: ${msg}`)
const warn = (id, msg) => warns.push(`${id}: ${msg}`)
const pass = () => passes++
const check = (cond, id, msg) => (cond ? pass() : fail(id, msg))

// ── start the production server ────────────────────────────────────────────
const nextBin = resolve(root, 'node_modules/next/dist/bin/next')
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], { cwd: root, env: { ...process.env, NODE_ENV: 'production' }, stdio: 'ignore' })
const stop = () => {
  try {
    server.kill()
  } catch {}
}
process.on('exit', stop)
for (let i = 0; i < 60; i++) {
  try {
    await fetch(BASE + '/robots.txt')
    break
  } catch {
    await new Promise((r) => setTimeout(r, 500))
  }
}

const get = async (path, opts) => {
  const res = await fetch(BASE + path, { redirect: 'manual', ...opts })
  return { status: res.status, type: res.headers.get('content-type') || '', text: await res.text(), headers: res.headers }
}

// The live URL in built files is SITE.url as resolved at build time.
const builtUrl = SITE.url
const toPath = (u) => u.replace(builtUrl, '').replace(/^https?:\/\/[^/]+/, '') || '/'

// ── B1 domain ──────────────────────────────────────────────────────────────
if (SITE.domainPending) warn('B1', `SITE.domain is still pending (DOMAIN.com). Absolute URLs use ${builtUrl}. Set the real domain before launch marketing.`)

// ── sitemaps ───────────────────────────────────────────────────────────────
const idx = await get('/sitemap.xml')
check(idx.status === 200 && idx.text.includes('<sitemapindex'), '41', 'sitemap.xml is not a sitemap index')
const childUrls = [...idx.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check(childUrls.length === 4, '41', `expected 4 child sitemaps, got ${childUrls.length}`)
const pageUrls = []
for (const c of childUrls) {
  const r = await get(toPath(c))
  check(r.status === 200 && r.text.includes('<urlset'), '41', `child sitemap ${c} invalid`)
  const locs = [...r.text.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const lastmods = (r.text.match(/<lastmod>/g) || []).length
  check(lastmods === locs.length, '8', `${c}: ${locs.length - lastmods} URLs missing <lastmod>`)
  if (c.endsWith('/1.xml')) check((r.text.match(/<image:image>/g) || []).length >= PRODUCTS.length, '41', 'product sitemap missing <image:image> entries')
  pageUrls.push(...locs)
}
check(new Set(pageUrls).size === pageUrls.length, '41', 'a URL appears in two sitemaps')
check(pageUrls.length === 12 + PRODUCTS.length + CATEGORIES.length + POSTS.length, '41', `sitemap URL count ${pageUrls.length} does not match routes`)

// ── crawl every indexable page + the noindex pages ─────────────────────────
const NOINDEX = ['/cart/', '/checkout/', '/account/', '/search/', '/thank-you-order/', '/thank-you-contact/', '/thank-you-wholesale/', '/order/payment-details/', '/order/confirm-payment/', '/account/reset-password/']
const pages = [...pageUrls.map(toPath), ...NOINDEX]
const internalLinks = new Set()
const banned = COMPLIANCE.bannedTerms.map((t) => t.toLowerCase())
const titles = new Map()
const descs = new Map()
let allHtml = ''

for (const path of pages) {
  const r = await get(path)
  if (r.status !== 200) {
    fail('crawl', `${path} returned ${r.status}`)
    continue
  }
  const h = r.text
  allHtml += h
  const indexable = !NOINDEX.includes(path)
  const body = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
  const h1s = (body.match(/<h1[\s>]/g) || []).length
  check(h1s === 1, '4', `${path}: ${h1s} <h1> elements`)
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
  check(title && decode(title).length <= 60, '10', `${path}: title ${decode(title).length} chars "${decode(title)}"`)
  if (indexable) {
    const d = decode(desc)
    check(d.length >= 110 && d.length <= 158, '5', `${path}: meta description ${d.length} chars`)
    if (titles.has(title)) fail('B-dup', `${path}: duplicate title with ${titles.get(title)}`)
    titles.set(title, path)
    if (descs.has(desc)) fail('B-dup', `${path}: duplicate description with ${descs.get(desc)}`)
    descs.set(desc, path)
    check(!/<meta name="robots" content="[^"]*noindex/.test(h), '43', `${path}: indexable page carries noindex`)
    check(/<link rel="canonical" href="[^"]+"/.test(h), '10', `${path}: canonical missing`)
    for (const og of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name', 'og:updated_time']) check(h.includes(`property="${og}"`) || h.includes(`name="${og}"`), '10', `${path}: ${og} missing`)
    check(h.includes('name="twitter:card"'), '10', `${path}: twitter:card missing`)
  } else {
    check(/<meta name="robots" content="[^"]*noindex/.test(h), '43', `${path}: should be noindex`)
  }
  check(/<html lang="en-AU"/.test(h), '10', `${path}: lang missing`)
  check(h.includes('name="viewport"'), '6', `${path}: viewport missing`)
  check(h.includes('class="skip-link"') && h.includes('id="main"'), '44', `${path}: skip-link or #main missing`)
  check(/<header[\s>]/.test(body) && /<footer[\s>]/.test(body) && /<main[\s>]/.test(body), '44', `${path}: landmarks missing`)
  check(h.includes('/js/webmcp.js'), '29', `${path}: webmcp.js not loaded`)
  check(h.includes('name="IndexNow-key"'), 'tech', `${path}: IndexNow meta missing`)
  // heading levels — no skips
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  for (let i = 1; i < levels.length; i++) if (levels[i] > levels[i - 1] + 1) fail('44', `${path}: heading skips h${levels[i - 1]}→h${levels[i]}`)
  // images
  for (const m of body.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) fail('44', `${path}: <img> without alt`)
  check(!/tabindex="[1-9]/.test(body), '44', `${path}: positive tabindex`)
  // emails in plaintext (none should exist while SITE.email is empty)
  const emails = body.replace(/<[^>]+>/g, ' ').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []
  check(!emails.length, '7', `${path}: plaintext email(s) ${emails.join(', ')}`)
  // the raw HTML (incl. serialised component props) must not carry the business email unencoded
  if (SITE.email) check(!h.includes(SITE.email), '7', `${path}: business email appears unencoded in raw HTML`)
  // JSON-LD
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  let types = []
  for (const b of blocks) {
    try {
      const j = JSON.parse(b)
      types.push(...[].concat(j['@type']))
    } catch {
      fail('3', `${path}: invalid JSON-LD`)
    }
  }
  const isProduct = path.startsWith('/product/')
  check(isProduct ? types.filter((t) => t === 'Product').length === 1 : !types.includes('Product'), '3', `${path}: Product schema count wrong (${types.join(',')})`)
  if (indexable && path !== '/') check(types.includes('BreadcrumbList'), '3', `${path}: BreadcrumbList missing`)
  if (blocks.some((b) => /"@type":"Product"/.test(b)) && !isProduct) fail('3', `${path}: nested Product on non-product page`)
  // links
  for (const m of body.matchAll(/href="(\/[^"#]*)"/g)) if (!m[1].startsWith('/_next') && !m[1].startsWith('/api/')) internalLinks.add(m[1].split('?')[0])
  // compliance
  const lower = body.replace(/<[^>]+>/g, ' ').toLowerCase() + ' ' + blocks.join(' ').toLowerCase()
  for (const t of banned) if (lower.includes(t)) fail('B7', `${path}: banned term "${t}"`)
}

// ── broken internal links ─────────────────────────────────────────────────
for (const link of internalLinks) {
  if (pages.includes(link)) continue
  const r = await get(link)
  check(r.status === 200, 'links', `broken internal link ${link} → ${r.status}`)
}

// ── agent files (B6) + placeholders (32) + compliance in agent files ──────
const agentFiles = ['/llms.txt', '/auth.md', '/robots.txt', '/.well-known/api-catalog', '/.well-known/agent-skills/index.json', '/.well-known/mcp/server-card.json', '/.well-known/oauth-protected-resource', '/.well-known/oauth-authorization-server', '/.well-known/openid-configuration', '/.well-known/acp.json', '/.well-known/ucp', '/js/webmcp.js', `/${SITE.indexNowKey}.txt`]
const agentText = {}
for (const f of agentFiles) {
  const r = await get(f)
  check(r.status === 200, 'B6', `${f} returned ${r.status}`)
  agentText[f] = r.text
  check(!/\[(DOMAIN|NUMBER|EMAIL|Brand)\]/.test(r.text), '32', `${f}: unreplaced placeholder`)
  for (const t of banned) if (r.text.toLowerCase().includes(t)) fail('B7', `${f}: banned term "${t}"`)
}
check(agentText['/auth.md'].startsWith('# Auth.md'), '20', 'auth.md must start with "# Auth.md"')
check(agentText['/auth.md'].includes('"agent_auth"'), '20', 'auth.md missing agent_auth block')
const robots = agentText['/robots.txt']
check(robots.includes('Disallow: /admin/'), 'B10', 'robots.txt does not disallow /admin/')
check(['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].every((b) => robots.includes(`User-agent: ${b}`)), '18', 'robots.txt missing AI bots')
check(robots.includes('Sitemap:'), '18', 'robots.txt has no Sitemap line')
for (const f of agentFiles.filter((f) => f.startsWith('/.well-known/'))) {
  try {
    JSON.parse(agentText[f])
    pass()
  } catch {
    fail('21', `${f} is not valid JSON`)
  }
}
const ucp = JSON.parse(agentText['/.well-known/ucp'])
check(ucp.ucp === '1.0', '28', '.well-known/ucp missing "ucp":"1.0"')
const skills = JSON.parse(agentText['/.well-known/agent-skills/index.json'])
check(skills.$schema && skills.skills?.every((s) => s.name && s.type && s.description && s.url && s.sha256), '22', 'agent-skills index incomplete')
const card = JSON.parse(agentText['/.well-known/mcp/server-card.json'])
check(card.serverInfo && card.transport && card.capabilities, '23', 'server-card missing blocks')
check(/^# .+\n\n> /.test(agentText['/llms.txt']), '19', 'llms.txt not in llmstxt.org format')

// ── live layer (B2/B8) ─────────────────────────────────────────────────────
const mcp = async (method, params) => {
  const r = await fetch(BASE + '/api/mcp/', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) })
  return r.json()
}
const init = await mcp('initialize', {})
check(init.result?.serverInfo?.name === SITE.name, 'B8', '/api/mcp initialize failed')
const list = await mcp('tools/list', {})
const live = (list.result?.tools || []).map((t) => t.name).sort().join(',')
const declared = (card.capabilities.tools || []).map((t) => t.name).sort().join(',')
check(live && live === declared, 'B8', `server-card tools (${declared}) ≠ live tools/list (${live})`)
const draft = await mcp('tools/call', { name: 'create_order_draft', arguments: { items: [{ slug: PRODUCTS[0].slug, quantity: 3 }], payment_method: 'crypto' } })
check(Boolean(draft.result?.content?.[0]?.text?.includes('cartUrl')), 'B8', 'create_order_draft failed')
for (const t of TOOLS) for (const b of banned) if (t.description.toLowerCase().includes(b)) fail('B7', `MCP tool ${t.name} description has "${b}"`)
const catalog = JSON.parse(agentText['/.well-known/api-catalog'])
for (const entry of catalog.linkset) {
  const path = toPath(entry.anchor)
  if (path === '/api/mcp/') continue // POST-only JSON-RPC — verified via initialize/tools/list above
  const r = await get(path)
  check(r.status === 200, 'B2', `api-catalog URL ${entry.anchor} → ${r.status}`)
}
const prod = await get('/api/products/')
check(prod.status === 200 && prod.type.includes('application/json') && JSON.parse(prod.text).products.length === PRODUCTS.length, 'V6', '/api/products/ wrong')
const srch = await get('/api/search/?q=goat')
check(srch.status === 200 && JSON.parse(srch.text).products.length > 0, 'V6', '/api/search/ wrong')

// ── forms + reply portal (1, 47, 48, B9) ───────────────────────────────────
const post = (path, body) => fetch(BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
let r = await post('/api/contact/', { formName: 'contact', name: 'x' })
check(r.status === 400, '1', `contact with missing fields should 400, got ${r.status}`)
r = await post('/api/contact/', { formName: 'contact', name: 'Crosscheck', email: 'test@example.com', message: 'crosscheck probe' })
check([200, 503].includes(r.status) && (await r.json()).ok !== undefined, '1/48', `contact submit should 200 or 503 (never crash), got ${r.status}`)
r = await post('/api/contact/', { formName: 'order', orderNumber: 'BAD', customer: {} })
check(r.status === 400, '49', `order with bad ref should 400, got ${r.status}`)
r = await post('/api/contact/', {
  formName: 'order', orderNumber: 'HMD-AAAA22', channel: 'email', customer: { name: 'Probe', email: 'p@example.com', phone: '0400000000' },
  fulfilment: 'pickup', paymentMethod: 'crypto', lines: [{ slug: PRODUCTS[0].slug, qty: 1 }],
})
check(r.status === 400, '1', `order below minimum should 400, got ${r.status}`)
for (const p of ['/api/admin/orders/', '/api/admin/enquiries/']) {
  const a = await get(p)
  check([401, 503].includes(a.status), '47', `${p} without passcode returned ${a.status}`)
  const b = await get(p, { headers: { 'X-Admin-Passcode': 'wrong-passcode' } })
  check([401, 503].includes(b.status), '47', `${p} with wrong passcode returned ${b.status}`)
}
for (const p of ['/api/admin/send-payment-email/', '/api/admin/reply-enquiry/']) {
  const a = await post(p, {})
  check([401, 503].includes(a.status), '47', `${p} without passcode returned ${a.status}`)
}
// B9 — passcode / secrets never in client bundles
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]))
const clientJs = existsSync(resolve(root, '.next/static')) ? walk(resolve(root, '.next/static')).filter((f) => f.endsWith('.js')) : []
const bundle = clientJs.map((f) => readFileSync(f, 'utf8')).join('\n')
check(!/ADMIN_PASSCODE|SMTP_PASS|SESSION_SECRET|UPSTASH_REDIS_REST_TOKEN/.test(bundle), 'B9', 'server secret name found in client bundle')
if (process.env.ADMIN_PASSCODE) check(!bundle.includes(process.env.ADMIN_PASSCODE), 'B9', 'ADMIN_PASSCODE value in client bundle')
// B5 — secrets in tracked files
const tracked = execSync('git ls-files', { cwd: root }).toString().split('\n').filter((f) => f && !f.endsWith('.png') && !f.endsWith('.webp') && !f.endsWith('.avif') && !f.endsWith('.jpg'))
for (const f of tracked) {
  const t = readFileSync(resolve(root, f), 'utf8')
  if (/(SMTP_PASS|ADMIN_PASSCODE|SESSION_SECRET|RESEND_API_KEY|REST_TOKEN)\s*=\s*\S{6,}/.test(t) && !f.endsWith('.env.example')) fail('B5', `possible secret in ${f}`)
}
// B4 — strategy docs never served
for (const p of ['/docs/PROJECT.md', '/docs/keyword-map.md', '/PROJECT.md', '/assets/logo-source.jpg', '/CLAUDE.md']) {
  const x = await get(p)
  check(x.status === 404, 'B4', `${p} is publicly reachable (${x.status})`)
}
// B11
check(!/web3forms/i.test(allHtml + bundle), 'B11', 'web3forms reference found')
// thank-you rule (57)
const ty = await get('/thank-you-order/')
check(!/BSB|account number|wallet address|deadline/i.test(ty.text.replace(/<[^>]+>/g, ' ')), '57', '/thank-you-order/ contains payment instructions')

// ── 42 duplicate body content ──────────────────────────────────────────────
const hashes = new Map()
for (const p of PRODUCTS) {
  for (const field of ['short', 'desc']) {
    const h = createHash('sha1').update(p[field].toLowerCase()).digest('hex')
    if (hashes.has(h)) fail('42', `${p.slug}.${field} duplicates ${hashes.get(h)}`)
    hashes.set(h, `${p.slug}.${field}`)
  }
}
// ── images (11) ────────────────────────────────────────────────────────────
for (const p of PRODUCTS) for (const img of p.images) {
  const base = resolve(root, 'public/images/products', img)
  check(existsSync(base) && existsSync(base.replace(/\.webp$/, '.avif')), '11', `${p.slug}: missing ${img} or AVIF sibling`)
  if (existsSync(base)) check(statSync(base).size <= 150 * 1024, '45', `${img} over 150KB`)
}
// every category has its own tile (WebP + AVIF), and no two products/categories share an image file
const { categoryImage } = await import('../src/config/site.js')
const catFiles = CATEGORIES.map((c) => categoryImage(c.slug))
check(new Set(catFiles).size === CATEGORIES.length && catFiles.every((f) => f.startsWith(CATEGORIES[catFiles.indexOf(f)].slug)), '11', `category images not unique: ${catFiles.join(', ')}`)
for (const f of catFiles) {
  const base = resolve(root, 'public/images/categories', f)
  check(existsSync(base) && existsSync(base.replace(/\.webp$/, '.avif')), '11', `missing category image ${f}`)
}
const prodFiles = PRODUCTS.map((p) => p.images[0])
check(new Set(prodFiles).size === PRODUCTS.length, '11', 'two products share an image file')
// ── CSS (6, 44, 46) ────────────────────────────────────────────────────────
const css = readFileSync(resolve(root, 'src/app/globals.css'), 'utf8')
check(css.includes('overflow-x: hidden') && css.includes("[style*='grid-template-columns']"), '6', 'mobile overflow guards missing')
check(css.includes('prefers-reduced-motion: reduce'), '44', 'reduced-motion block missing')
check(css.includes(':focus-visible'), '44', 'focus-visible styles missing')
check(/--radius:|--shadow:/.test(css), '46', 'design tokens missing')
// ── homepage weight (45) ───────────────────────────────────────────────────
const home = await get('/')
const assets = [...new Set([...home.text.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]))]
let bytes = home.text.length
for (const a of assets) bytes += (await get(a)).text.length
check(bytes < 1.5 * 1024 * 1024, '45', `homepage HTML+JS+CSS ${Math.round(bytes / 1024)}KB`)

stop()
console.log(`\nCROSSCHECK — ${passes} passed, ${fails.length} failed, ${warns.length} warnings`)
console.log(`Pages crawled: ${pages.length} · internal links checked: ${internalLinks.size} · homepage weight ${Math.round(bytes / 1024)}KB (excl. images)`)
for (const w of warns) console.log('  WARN ' + w)
for (const f of fails) console.log('  FAIL ' + f)
process.exit(fails.length ? 1 : 0)
