// Minify step for Next.js client chunks. Runs BETWEEN the two halves of the build (see package.json "build"):
//   next build --experimental-build-mode compile   → writes .next/static chunks + manifests
//   node scripts/postbuild-js.mjs                  → this file
//   next build --experimental-build-mode generate  → prerenders pages, then Vercel's onBuildComplete copies the output
// Why mid-build (2026-11-12): Vercel copies .next/static during `next build` (onBuildComplete), so a step that ran AFTER
// `next build` (as this one did until now) never reached the deployment — the live chunks kept their line breaks and
// Rank Math "Minify JavaScript" kept flagging them.
//
// What it does: Next.js's own runtime keeps real line breaks inside template strings (its error messages), so SEO checkers
// that count lines flag the chunk as unminified. This rewrites ONLY those line breaks as \n escapes inside template literals.
// Safety:
//   - template ranges come from a real parser (acorn), never a regex over the code
//   - every template's cooked value must be identical before and after, and the result must parse
//   - files using String.raw are skipped (escaping would change their raw value)
// Renaming: Vercel serves /_next/static/immutable/... keyed by PATH, and never replaces a path it already has (ETag = path), so a
// changed chunk under its old name would keep serving the old copy. Every chunk this step changes therefore gets a new
// content-based name of the same length, and every manifest that lists it is rewritten. Afterwards the script checks that every
// static/chunks/*.js reference in the manifests exists on disk and that no old name survives. If ANY check fails, every file is put
// back exactly as it was (the build still succeeds, with the original chunks) — it never leaves a half-renamed build.
import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { createHash } from 'node:crypto'
import * as acorn from 'acorn'

const nextDir = join(process.cwd(), '.next')
const staticDir = join(nextDir, 'static')
if (!existsSync(staticDir)) {
  console.log('postbuild-js: no .next/static — nothing to do')
  process.exit(0)
}

const listFiles = (dir, test, skipTop = new Set()) => {
  const out = []
  const walk = (d, top) => {
    for (const f of readdirSync(d)) {
      if (top && skipTop.has(f)) continue
      const p = join(d, f)
      statSync(p).isDirectory() ? walk(p, false) : test(p) && out.push(p)
    }
  }
  walk(dir, true)
  return out
}

const parse = (src, onToken) => acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', allowHashBang: true, allowReturnOutsideFunction: true, onToken })
const cookedValues = (ast) => {
  const out = []
  const visit = (n) => {
    if (!n || typeof n.type !== 'string') return
    if (n.type === 'TemplateElement') out.push(n.value.cooked)
    for (const k in n) {
      const v = n[k]
      if (Array.isArray(v)) v.forEach((x) => x && typeof x === 'object' && visit(x))
      else if (v && typeof v === 'object' && k !== 'loc') visit(v)
    }
  }
  visit(ast)
  return out
}

// ── 1. process chunks (in memory) ────────────────────────────────────────
const chunkFiles = listFiles(staticDir, (p) => p.endsWith('.js'))
const existing = new Set(chunkFiles.map((f) => f.replace(/^.*[\\/]/, '')))
const plan = [] // { file, src, out, oldName, newName }
let skipped = 0
for (const file of chunkFiles) {
  const src = readFileSync(file, 'utf8')
  if (!/\n./.test(src.trimEnd()) || src.includes('String.raw')) continue
  try {
    const ranges = []
    const before = cookedValues(parse(src, (t) => { if (t.type.label === 'template' && /[\r\n]/.test(src.slice(t.start, t.end))) ranges.push([t.start, t.end]) }))
    if (!ranges.length) continue
    let out = src
    for (const [s, e] of [...ranges].reverse()) out = out.slice(0, s) + out.slice(s, e).replace(/\r\n|\r|\n/g, '\\n') + out.slice(e)
    const after = cookedValues(parse(out))
    if (before.length !== after.length || before.some((v, i) => v !== after[i])) throw new Error('template values changed')
    plan.push({ file, src, out, oldName: file.replace(/^.*[\\/]/, ''), newName: null })
  } catch (e) {
    skipped++
    console.warn(`postbuild-js: left ${file} unchanged (${e.message})`)
  }
}

// ── 2. new content-based names (same length, same prefix) ────────────────
const hash13 = (text, salt = '') => BigInt('0x' + createHash('sha256').update(salt + text).digest('hex')).toString(36).padStart(13, '0').slice(0, 13)
const taken = new Set(existing)
for (const item of plan) {
  const base = item.oldName.slice(0, -3)
  const m = /^(.*?)([0-9a-z_-]{13})$/.exec(base)
  if (!m) continue // unusual name: content is still fixed in place, just not renamed
  let salt = ''
  let name
  do {
    name = `${m[1]}${hash13(item.out, salt)}.js`
    salt += '+'
  } while (taken.has(name))
  taken.add(name)
  item.newName = name
}
const renames = plan.filter((p) => p.newName)


// ── 3. apply, then verify; roll everything back on any doubt ─────────────
const chunkDirOf = (file) => file.replace(/[^\\/]+$/, '')
const backups = new Map() // reference files we patched: path -> original text
const created = [] // new chunk files we wrote (to delete on rollback)
const patchTargets = listFiles(nextDir, (p) => ['.js', '.json', '.html', '.rsc', '.txt'].includes(extname(p)), new Set(['cache', 'trace', 'trace-build', 'diagnostics', 'types', 'dev', 'turbopack']))

const rollback = (why) => {
  for (const f of created) { try { unlinkSync(f) } catch { /* ignore */ } }
  for (const item of plan) writeFileSync(item.file, item.src) // original content, original name
  for (const [p, text] of backups) writeFileSync(p, text)
  console.warn(`postbuild-js: ROLLED BACK (${why}) — chunks left exactly as Next.js built them`)
  process.exit(0)
}

try {
  // 3a. new chunk files (renamed ones get a new name; the old file stays until everything verifies)
  for (const item of plan) {
    if (item.newName) {
      const target = join(chunkDirOf(item.file), item.newName)
      writeFileSync(target, item.out)
      created.push(target)
    } else {
      writeFileSync(item.file, item.out)
    }
  }
  // 3b. rewrite every manifest that lists a renamed chunk
  const oldToNew = renames.map((r) => [r.oldName, r.newName])
  for (const p of patchTargets) {
    let text
    try { text = readFileSync(p, 'utf8') } catch { continue }
    let patched = text
    for (const [o, n] of oldToNew) if (patched.includes(o)) patched = patched.split(o).join(n)
    if (patched !== text) {
      backups.set(p, text)
      writeFileSync(p, patched)
    }
  }
  // 3c. verify: every chunk reference resolves to a file that will exist, and no old name survives
  const oldNames = new Set(oldToNew.map(([o]) => o))
  const willExist = new Set(listFiles(staticDir, (p) => p.endsWith('.js')).map((f) => f.replace(/^.*[\\/]/, '')).filter((n) => !oldNames.has(n)))
  let refs = 0
  for (const p of patchTargets) {
    if (renames.some((r) => p === r.file)) continue // superseded originals are deleted below
    let text
    try { text = readFileSync(p, 'utf8') } catch { continue }
    for (const o of oldNames) if (text.includes(o)) throw new Error(`old name ${o} still referenced in ${p}`)
    for (const m of text.matchAll(/static\/chunks\/([0-9A-Za-z_.-]+?\.js)(?![0-9A-Za-z_.-])/g)) {
      refs++
      if (!willExist.has(m[1])) throw new Error(`${p} references missing chunk ${m[1]}`)
    }
  }
  for (const item of renames) {
    parse(readFileSync(join(chunkDirOf(item.file), item.newName), 'utf8'))
    if (!willExist.has(item.newName)) throw new Error(`${item.newName} missing`)
  }
  // 3d. success: remove the superseded originals
  for (const item of renames) unlinkSync(item.file)
  console.log(`postbuild-js: ${plan.length} chunk(s) put on one line (${renames.length} renamed, ${refs} chunk references verified), ${skipped} skipped, ${chunkFiles.length} checked`)
} catch (e) {
  rollback(e.message)
}
