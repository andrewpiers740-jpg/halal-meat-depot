import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, parse } from 'node:path'

// Build-time only: which products have a real photo (vs a generated placeholder).
// Mirrors scripts/images.mjs — assets/product-photos/<slug>.<ext> or _shared.json.
let cache
export function hasRealPhoto(slug) {
  if (!cache) {
    const dir = join(process.cwd(), 'assets/product-photos')
    cache = new Set()
    if (existsSync(dir)) {
      for (const f of readdirSync(dir)) if (!f.startsWith('_')) cache.add(parse(f).name)
      const shared = join(dir, '_shared.json')
      if (existsSync(shared)) for (const slugs of Object.values(JSON.parse(readFileSync(shared, 'utf8')))) slugs.forEach((s) => cache.add(s))
    }
  }
  return cache.has(slug)
}
