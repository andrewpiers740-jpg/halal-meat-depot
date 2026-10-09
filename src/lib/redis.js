import { Redis } from '@upstash/redis'

// Checks the common env var names so whichever pair Vercel's Storage tab
// creates just works (the fifth pair is what Vercel generates for an Upstash
// connection with prefix "UPSTASH_REDIS" — it inserts its own "_KV_" segment).
const CREDENTIAL_CANDIDATES = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
]

let cached
export function getRedis() {
  if (cached !== undefined) return cached
  for (const [urlKey, tokenKey] of CREDENTIAL_CANDIDATES) {
    const url = process.env[urlKey]
    const token = process.env[tokenKey]
    if (url && token) {
      cached = new Redis({ url, token })
      return cached
    }
  }
  cached = null
  return null
}

export function isStoreConfigured() {
  return getRedis() !== null
}

export const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v)
