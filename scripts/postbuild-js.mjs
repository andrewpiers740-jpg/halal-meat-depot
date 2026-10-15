// Post-build: put every client JS chunk on one line.
// Next.js's own runtime keeps real line breaks inside template strings (its error messages), so
// SEO checkers that count lines (Rank Math "Minify JavaScript") flag the file as unminified.
// This rewrites ONLY those line breaks as \n escapes inside template literals. Safety:
//   - template ranges come from a real parser (acorn), never a regex over the code
//   - every template's cooked value must be identical before and after, and the result must parse
//   - files using String.raw are skipped (escaping would change their raw value)
// Any failure leaves the original file untouched. Runs after `next build` (see package.json).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import * as acorn from 'acorn'

const root = join(process.cwd(), '.next', 'static')
const files = []
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.js') && files.push(p) } }
walk(root)

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

let changed = 0, skipped = 0
for (const file of files) {
  const src = readFileSync(file, 'utf8')
  if (!/\n./.test(src.trimEnd()) || src.includes('String.raw')) continue
  try {
    const ranges = []
    const before = cookedValues(parse(src, (t) => { if (t.type.label === 'template' && /[\r\n]/.test(src.slice(t.start, t.end))) ranges.push([t.start, t.end]) }))
    if (!ranges.length) continue
    let out = src
    for (const [s, e] of ranges.reverse()) out = out.slice(0, s) + out.slice(s, e).replace(/\r\n|\r|\n/g, '\\n') + out.slice(e)
    const after = cookedValues(parse(out))
    if (before.length !== after.length || before.some((v, i) => v !== after[i])) throw new Error('template values changed')
    writeFileSync(file, out)
    changed++
  } catch (e) {
    skipped++
    console.warn(`postbuild-js: left ${file} unchanged (${e.message})`)
  }
}
console.log(`postbuild-js: ${changed} chunk(s) put on one line, ${skipped} skipped, ${files.length} checked`)
