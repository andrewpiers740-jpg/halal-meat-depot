// Post-build: put every client JS chunk on one line.
// Next.js's own runtime keeps real line breaks inside template strings (its error messages — Turbopack's minifier even creates them,
// because a real line break is one byte shorter than \n), so SEO checkers that count lines (Rank Math "Minify JavaScript") flag the
// file as unminified. This rewrites ONLY those line breaks as \n escapes inside template literals. Safety:
//   - template ranges come from a real parser (acorn), never a regex over the code
//   - every template's cooked value must be identical before and after, and the result must parse
//   - files using String.raw are skipped (escaping would change their raw value)
// Any failure leaves the original file untouched. Runs after `next build` (see package.json).
//
// Two places are fixed:
//  A. .next/static           — what `next start` serves (local builds). Fixed in place, names unchanged.
//  B. .next/output           — what the Vercel adapter staged for deployment (it copies .next/static there DURING `next build`, so
//                              step A alone never reached the live site, 2026-11-12). The deployed output is content-addressed:
//                              .next/output/immutable.json maps every chunk path to an ID, and Vercel never replaces a path whose
//                              ID it already has. So each fixed chunk gets a NEW name and a NEW ID, immutable.json is updated, and
//                              every page that references the chunk is rewritten. Everything is verified afterwards and, if any
//                              check fails, put back exactly as it was (the build still succeeds, with the original chunks).
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'
import { createHash } from 'node:crypto'
import * as acorn from 'acorn'

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

// Returns the fixed source, or null when nothing needs fixing. Throws when a safety check fails.
function fixSource(src) {
  if (!/\n./.test(src.trimEnd()) || src.includes('String.raw')) return null
  const ranges = []
  const before = cookedValues(parse(src, (t) => { if (t.type.label === 'template' && /[\r\n]/.test(src.slice(t.start, t.end))) ranges.push([t.start, t.end]) }))
  if (!ranges.length) return null
  let out = src
  for (const [s, e] of [...ranges].reverse()) out = out.slice(0, s) + out.slice(s, e).replace(/\r\n|\r|\n/g, '\\n') + out.slice(e)
  const after = cookedValues(parse(out))
  if (before.length !== after.length || before.some((v, i) => v !== after[i])) throw new Error('template values changed')
  return out
}

const listFiles = (dir, test) => {
  const out = []
  const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : test(p) && out.push(p) } }
  if (existsSync(dir)) walk(dir)
  return out
}

// ── A. .next/static, in place ────────────────────────────────────────────
{
  const files = listFiles(join(process.cwd(), '.next', 'static'), (p) => p.endsWith('.js'))
  let changed = 0, skipped = 0
  for (const file of files) {
    try {
      const out = fixSource(readFileSync(file, 'utf8'))
      if (out === null) continue
      writeFileSync(file, out)
      changed++
    } catch (e) {
      skipped++
      console.warn(`postbuild-js: left ${file} unchanged (${e.message})`)
    }
  }
  console.log(`postbuild-js: ${changed} chunk(s) put on one line, ${skipped} skipped, ${files.length} checked`)
}

// ── B. the Vercel adapter's staged output ────────────────────────────────
const outDir = join(process.cwd(), '.next', 'output')
const immutablePath = join(outDir, 'immutable.json')
const chunkDir = join(outDir, 'static', '_next', 'static', 'immutable', 'chunks')
if (existsSync(immutablePath) && existsSync(chunkDir)) {
  const hash13 = (text, salt) => BigInt('0x' + createHash('sha256').update(salt + text).digest('hex')).toString(36).padStart(25, '0').slice(0, 25)
  const baseOf = (file) => file.replace(/^.*[\\/]/, '').replace(/\.js$/, '')
  const urlKey = (base) => `/_next/static/immutable/chunks/${base}.js`
  const hashesPath = join(process.cwd(), '.next', 'immutable-static-hashes.json')
  const textExts = new Set(['.html', '.json', '.js', '.txt', '.rsc', '.segment'])

  const existingBases = new Set(listFiles(chunkDir, () => true).map((f) => f.replace(/^.*[\\/]/, '').replace(/\.(js|css)$/, '')))
  const items = [] // { file, src, out, oldBase, newBase, id }
  let skippedB = 0
  for (const file of listFiles(chunkDir, (p) => p.endsWith('.js'))) {
    try {
      const src = readFileSync(file, 'utf8')
      const out = fixSource(src)
      if (out === null) continue
      const oldBase = baseOf(file)
      const m = /^(.*?)([0-9a-z_-]{13})$/.exec(oldBase)
      if (!m) throw new Error('unusual chunk name, not renamed')
      let salt = 'n'
      let newBase
      do { newBase = `${m[1]}${hash13(out, salt).slice(0, 13)}`; salt += '+' } while (existingBases.has(newBase))
      existingBases.add(newBase)
      items.push({ file, src, out, oldBase, newBase, id: `${newBase}${hash13(out, 'id').slice(0, 12)}` })
    } catch (e) {
      skippedB++
      console.warn(`postbuild-js: output chunk ${file} left unchanged (${e.message})`)
    }
  }

  if (items.length) {
    const backups = new Map() // patched file -> original text
    const created = []
    const rollback = (why) => {
      for (const f of created) { try { unlinkSync(f) } catch { /* ignore */ } }
      for (const [p, text] of backups) writeFileSync(p, text)
      console.warn(`postbuild-js: output ROLLED BACK (${why}) — deployment chunks left exactly as Next.js built them`)
    }
    try {
      // 1. new chunk files (the old ones stay until everything verifies)
      for (const it of items) {
        const target = join(chunkDir, `${it.newBase}.js`)
        writeFileSync(target, it.out)
        created.push(target)
      }
      // 2. immutable.json (+ .next/immutable-static-hashes.json): drop the old path, add the new path with its new ID
      const updateMap = (path, keyOf, wrapped) => {
        if (!existsSync(path)) return
        const text = readFileSync(path, 'utf8')
        const json = JSON.parse(text)
        const map = wrapped ? json.hashes : json
        for (const it of items) {
          if (!(keyOf(it.oldBase) in map)) throw new Error(`${path} has no entry for ${it.oldBase}`)
          delete map[keyOf(it.oldBase)]
          map[keyOf(it.newBase)] = it.id
        }
        const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
        backups.set(path, text)
        writeFileSync(path, JSON.stringify(wrapped ? { ...json, hashes: sorted } : sorted))
      }
      updateMap(immutablePath, urlKey, true)
      updateMap(hashesPath, (b) => `static/immutable/chunks/${b}.js`, false)
      // 3. every page that references a renamed chunk
      const targets = listFiles(outDir, (p) => textExts.has(extname(p)) && p !== immutablePath)
      let patched = 0
      for (const p of targets) {
        let text
        try { text = readFileSync(p, 'utf8') } catch { continue }
        let next = text
        for (const it of items) if (next.includes(`${it.oldBase}.js`)) next = next.split(`${it.oldBase}.js`).join(`${it.newBase}.js`)
        if (next !== text) { backups.set(p, text); writeFileSync(p, next); patched++ }
      }
      // 4. verify
      const oldFiles = new Set(items.map((it) => `${it.oldBase}.js`))
      const present = new Set(listFiles(chunkDir, () => true).map((f) => f.replace(/^.*[\\/]/, '')).filter((n) => !oldFiles.has(n)))
      let refs = 0
      for (const p of targets) {
        let text
        try { text = readFileSync(p, 'utf8') } catch { continue }
        for (const f of oldFiles) if (text.includes(f)) throw new Error(`${f} still referenced in ${p}`)
        for (const m of text.matchAll(/\/_next\/static\/immutable\/chunks\/([0-9A-Za-z_.-]+?\.(?:js|css))(?![0-9A-Za-z_.-])/g)) {
          refs++
          if (!present.has(m[1])) throw new Error(`${p} references missing chunk ${m[1]}`)
        }
      }
      const hashes = JSON.parse(readFileSync(immutablePath, 'utf8')).hashes
      const inMap = new Set(Object.keys(hashes).filter((k) => k.startsWith('/_next/static/immutable/chunks/')).map((k) => k.split('/').pop()))
      for (const n of present) if (!inMap.has(n)) throw new Error(`immutable.json has no entry for ${n}`)
      for (const n of inMap) if (!present.has(n)) throw new Error(`immutable.json lists missing file ${n}`)
      for (const it of items) if (!String(hashes[urlKey(it.newBase)]).startsWith(it.newBase)) throw new Error(`bad ID for ${it.newBase}`)
      // 5. success: remove the superseded files
      for (const it of items) unlinkSync(it.file)
      console.log(`postbuild-js: deployment output — ${items.length} chunk(s) put on one line and renamed, ${patched} page(s) updated, ${refs} chunk references verified, ${skippedB} skipped`)
    } catch (e) {
      rollback(e.message)
    }
  } else {
    console.log('postbuild-js: deployment output — no chunks needed fixing')
  }
}
