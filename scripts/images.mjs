// Image pipeline.
//  1. Brand assets from assets/logo-source.png → public/images/logo-v2.webp,
//     src/app/icon.png, src/app/apple-icon.png, public/images/og-v2.webp
//  2. Real product photos: assets/product-photos/<slug>.(jpg|png|webp|…) →
//     trimmed, scaled to fill ~90% of a white 4:3 1600×1200 canvas, adaptive
//     quality under 145KB, written as public/images/products/<slug>.webp + .avif
//  3. Any product WITHOUT a real photo gets a branded placeholder at the same
//     path, so swapping in a real photo later needs no code change.
//  4. Category tiles → public/images/categories/<slug>.webp + .avif
//  Also writes docs/_contact-sheet.png for review.
import sharp from 'sharp'
import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'node:fs'
import { resolve, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRODUCTS, CATEGORIES, categoryImage } from '../src/config/site.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = (p) => resolve(root, p)
const mk = (p) => mkdirSync(dirname(out(p)), { recursive: true })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const writeRetry = async (file, buf) => {
  mk(file)
  for (let i = 0; ; i++) {
    try {
      writeFileSync(out(file), buf)
      return
    } catch (e) {
      if (i >= 8) throw e
      await sleep(150)
    }
  }
}
const CAP = 145 * 1024
async function encodeBoth(pipeline, base) {
  // Lower quality first; if a busy photo (e.g. textured dark background) still
  // exceeds the cap at q40, step the dimensions down too (1600 → 1280 → 1024px).
  for (const [fmt, qStart, ext] of [['webp', 88, 'webp'], ['avif', 62, 'avif']]) {
    let buf
    sizes: for (const width of [null, 1280, 1024]) {
      const src = width ? pipeline.clone().resize({ width }) : pipeline.clone()
      for (let q = qStart; ; q -= 6) {
        buf = await src.clone()[fmt]({ quality: q }).toBuffer()
        if (buf.length <= CAP) break sizes
        if (q <= 40) break
      }
    }
    await writeRetry(`${base}.${ext}`, buf)
  }
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function wrap(text, max) {
  const words = String(text).split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line)
      line = w
    } else line = (line + ' ' + w).trim()
  }
  if (line) lines.push(line)
  return lines
}

// Warm, on-brand tone per category so grids read as intentional, not identical.
const TONES = {
  beef: ['#3b0f13', '#8f1c24'],
  lamb: ['#3a1410', '#9a3b22'],
  goat: ['#2f1a0f', '#8a5426'],
  chicken: ['#3a2508', '#a8701c'],
  camel: ['#33200f', '#94642c'],
  duck: ['#16242a', '#2f5d68'],
  kangaroo: ['#2c120f', '#7d2e22'],
  'water-buffalo': ['#1c1a1f', '#4b3f52'],
  'wholesale-cartons': ['#151b22', '#2f4456'],
}

// Full logo (wordmark + emblem) and the emblem alone (cow, lamb, rooster,
// kangaroo) — the emblem is used wherever the logo is shown small.
const logo = out('assets/logo-source.png')
const emblem = await sharp(logo).extract({ left: 340, top: 195, width: 575, height: 418 }).resize(512, 512, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toBuffer()
const logoCircle = async (size, src = emblem) => {
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`)
  const inner = Math.round(size * 0.8)
  const disc = sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } }).composite([{ input: await sharp(src).resize(inner, inner, { fit: 'contain', background: '#ffffff' }).png().toBuffer(), gravity: 'centre' }])
  return sharp(await disc.png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()
}

function placeholderSvg({ w, h, tone, eyebrow, title, sub, foot, titleSize }) {
  const [a, b] = tone
  const lines = wrap(title, Math.round((w * 0.62) / (titleSize * 0.56)))
  const lh = titleSize * 1.12
  const startY = h / 2 - ((lines.length - 1) * lh) / 2 + titleSize * 0.1
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <pattern id="p" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="36" fill="#ffffff" fill-opacity="0.04"/></pattern>
    <radialGradient id="r" cx="0.85" cy="0.15" r="0.8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#p)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <text x="${w * 0.07}" y="${h * 0.13}" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${Math.round(titleSize * 0.32)}" letter-spacing="4" fill="#E3A83F">${esc(eyebrow)}</text>
  ${lines.map((l, i) => `<text x="${w * 0.07}" y="${startY + i * lh}" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${titleSize}" fill="#ffffff">${esc(l)}</text>`).join('\n  ')}
  ${sub ? `<text x="${w * 0.07}" y="${startY + lines.length * lh + titleSize * 0.15}" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="${Math.round(titleSize * 0.42)}" fill="#F3DCD8">${esc(sub)}</text>` : ''}
  <rect x="${w * 0.07}" y="${h * 0.86}" width="${w * 0.12}" height="4" fill="#E3A83F"/>
  <text x="${w * 0.07}" y="${h * 0.93}" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="${Math.round(titleSize * 0.3)}" fill="#F3DCD8">${esc(foot)}</text>
</svg>`)
}

async function placeholder({ w, h, tone, eyebrow, title, sub, foot, titleSize, base, badgeSize }) {
  const badge = await logoCircle(badgeSize)
  const pipe = sharp(placeholderSvg({ w, h, tone, eyebrow, title, sub, foot, titleSize })).composite([
    { input: badge, top: Math.round(h * 0.07), left: Math.round(w - badgeSize - w * 0.06) },
  ])
  const flat = sharp(await pipe.png().toBuffer())
  await encodeBoth(flat, base)
}

// 1 — brand assets
await writeRetry('public/images/logo-v2.webp', await sharp(logo).resize(512, 512).webp({ quality: 86 }).toBuffer())
await writeRetry('public/images/logo-mark-v2.webp', await sharp(emblem).resize(128, 128).webp({ quality: 88 }).toBuffer())
await writeRetry('src/app/icon.png', await sharp(emblem).resize(192, 192).png().toBuffer())
await writeRetry('src/app/apple-icon.png', await sharp(emblem).resize(180, 180).png().toBuffer())
{
  const svg = placeholderSvg({ w: 1200, h: 630, tone: ['#1a0d0e', '#6e1419'], eyebrow: 'HALAL MEAT DEPOT · SYDNEY', title: 'Certified halal meat, delivered Australia-wide', sub: '', foot: 'Certified by Halal Control Australia', titleSize: 64 })
  const badge = await logoCircle(230, logo)
  const buf = await sharp(svg).composite([{ input: badge, top: 60, left: 1200 - 230 - 60 }]).webp({ quality: 84 }).toBuffer()
  await writeRetry('public/images/og-v2.webp', buf)
}
console.log('brand assets: logo-v2.webp, logo-mark-v2.webp, icon.png, apple-icon.png, og-v2.webp')

// 2 — real product photos
// assets/product-photos/<slug>.<ext> → that product. Files starting with "_" are
// shared photos: _shared.json maps each one to a list of product slugs, e.g.
// { "_carton.webp": ["beef-mince-carton", …] }, so one image serves many
// products without storing copies.
const srcDir = out('assets/product-photos')
const IMG_RE = /\.(jpe?g|png|webp|avif|tiff?)$/i
const photos = existsSync(srcDir) ? readdirSync(srcDir).filter((f) => IMG_RE.test(f) && !f.startsWith('_')) : []
const sharedMap = existsSync(resolve(srcDir, '_shared.json')) ? JSON.parse(readFileSync(resolve(srcDir, '_shared.json'), 'utf8')) : {}
const real = new Set()
const W = 1600, H = 1200, FILL = 0.9
const productBase = (slug) => {
  const prod = PRODUCTS.find((p) => p.slug === slug)
  return `public/images/products/${prod ? prod.images[0].replace(/\.webp$/, '') : slug}`
}
for (const [file, slugs] of Object.entries(sharedMap)) {
  const { pipeline } = await framePhoto(resolve(srcDir, file), W, H)
  const [first, ...rest] = slugs
  await encodeBoth(pipeline, productBase(first))
  for (const slug of rest) for (const ext of ['webp', 'avif']) copyFileSync(out(`${productBase(first)}.${ext}`), out(`${productBase(slug)}.${ext}`))
  slugs.forEach((s) => real.add(s))
}
// Trim the background, fit the subject to FILL of a white WxH canvas.
async function framePhoto(src, W, H) {
  const meta = await sharp(src).rotate().metadata()
  let buf = await sharp(src).rotate().toBuffer()
  let tw = meta.width, th = meta.height
  try {
    const t = await sharp(buf).trim({ threshold: 12 }).toBuffer({ resolveWithObject: true })
    if (t.info.width >= meta.width * 0.12 && t.info.height >= meta.height * 0.12) {
      buf = t.data
      tw = t.info.width
      th = t.info.height
    }
  } catch {}
  const scale = Math.min((W * FILL) / tw, (H * FILL) / th)
  let inner = sharp(buf).resize(Math.round(W * FILL), Math.round(H * FILL), { fit: 'inside', kernel: 'lanczos3' })
  if (scale > 1.1) inner = inner.sharpen({ sigma: 1 })
  const canvas = sharp({ create: { width: W, height: H, channels: 4, background: '#ffffff' } })
    .composite([{ input: await inner.toBuffer(), gravity: 'centre' }])
    .flatten({ background: '#ffffff' })
  return { pipeline: sharp(await canvas.png().toBuffer()), tw, th }
}
for (const file of photos) {
  const slug = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (real.has(slug)) continue
  const { pipeline, tw, th } = await framePhoto(resolve(srcDir, file), W, H)
  await encodeBoth(pipeline, productBase(slug))
  real.add(slug)
  if (Math.min(tw, th) < 500) console.log(`  low-res source (reshoot candidate): ${file} (${tw}x${th})`)
}
console.log(`product photos processed: ${real.size}`)

// 3 — placeholders for products without photos
let ph = 0
for (const p of PRODUCTS) {
  if (real.has(p.slug)) continue
  const cat = CATEGORIES.find((c) => c.slug === p.cat)
  await placeholder({
    w: 1600, h: 1200, tone: TONES[p.cat] || TONES.beef, titleSize: 104, badgeSize: 280,
    eyebrow: `HALAL MEAT DEPOT · ${cat.name.toUpperCase()}`,
    title: p.name,
    sub: p.unit,
    foot: 'Certified halal · Halal Control Australia',
    base: `public/images/products/${p.images[0].replace(/\.webp$/, '')}`,
  })
  ph++
}
console.log(`product placeholders: ${ph}`)

// 4 — category tiles: a real photo from assets/category-photos/<slug>.<ext> if present
const catDir = out('assets/category-photos')
const catPhotos = existsSync(catDir) ? readdirSync(catDir).filter((f) => IMG_RE.test(f)) : []
for (const c of CATEGORIES) {
  const photo = catPhotos.find((f) => basename(f, extname(f)) === c.slug)
  if (photo) {
    const { pipeline } = await framePhoto(resolve(catDir, photo), 1200, 900)
    await encodeBoth(pipeline, `public/images/categories/${categoryImage(c.slug).replace(/\.webp$/, '')}`)
    continue
  }
  await placeholder({
    w: 1200, h: 900, tone: TONES[c.slug] || TONES.beef, titleSize: 120, badgeSize: 220,
    eyebrow: 'HALAL MEAT DEPOT',
    title: '',
    sub: '',
    foot: '',
    base: `public/images/categories/${categoryImage(c.slug).replace(/\.webp$/, '')}`,
  })
}
console.log(`category tiles: ${CATEGORIES.length}`)

// prune image files no product/category uses any more (old versions)
{
  const { unlinkSync } = await import('node:fs')
  const keep = new Set([
    ...PRODUCTS.flatMap((p) => p.images.flatMap((i) => [i, i.replace(/\.webp$/, '.avif')])),
    ...CATEGORIES.flatMap((c) => [categoryImage(c.slug), categoryImage(c.slug).replace(/\.webp$/, '.avif')]),
  ])
  let pruned = 0
  for (const dir of ['public/images/products', 'public/images/categories']) {
    for (const f of readdirSync(out(dir))) {
      if (!keep.has(f)) {
        unlinkSync(out(`${dir}/${f}`))
        pruned++
      }
    }
  }
  console.log(`pruned old image files: ${pruned}`)
}

// contact sheet (first 24 products) for review — docs/ never deploys
{
  const tiles = await Promise.all(
    PRODUCTS.slice(0, 24).map(async (p) => ({ input: await sharp(out(`public/images/products/${p.images[0]}`)).resize(400, 300).png().toBuffer() }))
  )
  const cols = 6
  const sheet = sharp({ create: { width: cols * 400, height: Math.ceil(tiles.length / cols) * 300, channels: 3, background: '#ffffff' } }).composite(
    tiles.map((t, i) => ({ ...t, left: (i % cols) * 400, top: Math.floor(i / cols) * 300 }))
  )
  await writeRetry('docs/_contact-sheet.png', await sheet.png().toBuffer())
}
console.log('contact sheet: docs/_contact-sheet.png')
