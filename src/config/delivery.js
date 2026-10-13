// Delivery zones — priced by distance from the Greenacre depot (2190).
//
// Owner, 2026-10-13: "Priority Delivery" is priced by distance; standard "Free Delivery"
// stays 2–5 days, free over SITE.freeShipOver (else SITE.flatShip). Prices are modelled on
// published Australian online-butcher rates (Sydney metro $15–$30, regional NSW flat $40,
// interstate quoted) plus a premium for express chilled freight. They are the owner's
// prices to adjust: edit the numbers here and checkout, totals, emails, the delivery page
// and the product schema all follow. Totals are still recomputed on the server.
//
// Zones are matched by postcode range (how Australian couriers zone freight); the first
// matching zone wins, so the more specific ranges are listed first. Every Australian
// postcode lands in a zone — unknown ranges fall back to the remote zone.

export const DELIVERY_ZONES = [
  {
    id: 'sydney',
    name: 'Sydney metro',
    distance: 'up to 60 km',
    priorityPrice: 30,
    priorityTime: 'within 24 hours',
    priorityDays: [0, 1],
    ranges: [[2000, 2234], [2555, 2574], [2740, 2772], [1000, 1999]], // 1xxx = Sydney PO boxes
  },
  {
    id: 'surrounds',
    name: 'Central Coast, Blue Mountains, Illawarra, Newcastle & Southern Highlands',
    distance: '60–170 km',
    priorityPrice: 45,
    priorityTime: 'within 24 hours',
    priorityDays: [0, 1],
    ranges: [[2250, 2310], [2500, 2535], [2575, 2579], [2773, 2786]],
  },
  {
    id: 'remote',
    name: 'Remote areas — WA, NT, far west NSW, north & outback QLD',
    distance: '2,000 km+',
    priorityPrice: 150,
    priorityTime: '2–4 business days',
    priorityDays: [2, 4],
    // Listed before the broad state zones so far-west NSW and north QLD match here first.
    ranges: [[800, 999], [2648, 2648], [2834, 2840], [2873, 2880], [4730, 4739], [4800, 4899], [6000, 6999]],
  },
  {
    id: 'regional-nsw',
    name: 'Canberra & regional NSW',
    distance: '170–800 km',
    priorityPrice: 70,
    priorityTime: 'next business day',
    priorityDays: [1, 1],
    ranges: [[2000, 2999], [200, 299]], // 02xx = ACT
  },
  {
    id: 'east-metro',
    name: 'Melbourne, Brisbane, Gold Coast & Sunshine Coast metro',
    distance: '700–1,000 km',
    priorityPrice: 80,
    priorityTime: 'next business day',
    priorityDays: [1, 1],
    ranges: [[3000, 3207], [3335, 3341], [3427, 3429], [3750, 3810], [3910, 3944], [3975, 3978], [4000, 4287], [4300, 4305], [4500, 4519], [4550, 4575], [8000, 9999]], // 8xxx/9xxx = Melbourne/Brisbane PO boxes
  },
  {
    id: 'interstate',
    name: 'Adelaide, Tasmania & regional VIC, QLD and SA',
    distance: '1,000–2,000 km',
    priorityPrice: 110,
    priorityTime: '1–3 business days',
    priorityDays: [1, 3],
    ranges: [[3000, 3999], [4000, 4999], [5000, 5999], [7000, 7999]],
  },
]

const FALLBACK = DELIVERY_ZONES.find((z) => z.id === 'remote')

/** Zone for a 4-digit postcode, or null if the postcode isn't valid yet. */
export function deliveryZone(postcode) {
  const s = String(postcode || '').trim()
  if (!/^\d{4}$/.test(s)) return null
  const n = Number(s)
  return DELIVERY_ZONES.find((z) => z.ranges.some(([a, b]) => n >= a && n <= b)) || FALLBACK
}

/** Last 4-digit group of an address line ("…, Greenacre NSW 2190" → "2190"). */
export function postcodeFromAddress(address) {
  const m = String(address || '').match(/(\d{4})\s*$/)
  return m ? m[1] : ''
}

export const DELIVERY_SPEEDS = ['standard', 'priority']

/** Cheapest and dearest Priority price, for copy such as "from $30". */
export const PRIORITY_FROM = Math.min(...DELIVERY_ZONES.map((z) => z.priorityPrice))
export const PRIORITY_TO = Math.max(...DELIVERY_ZONES.map((z) => z.priorityPrice))

/**
 * Non-overlapping postcode ranges per zone (after first-match-wins), for schema.org
 * PostalCodeRangeSpecification, where ranges must not overlap between zones.
 * Covers 0200–9999 (the Australian postcode space).
 */
export function effectiveRanges(zoneId) {
  const out = []
  let start = null
  for (let n = 200; n <= 10000; n++) {
    const hit = n <= 9999 && deliveryZone(String(n).padStart(4, '0'))?.id === zoneId
    if (hit && start === null) start = n
    if (!hit && start !== null) {
      out.push([start, n - 1])
      start = null
    }
  }
  return out
}

/** Zones nearest-first, for tables and copy (DELIVERY_ZONES is in lookup order). */
export const ZONES_BY_DISTANCE = [...DELIVERY_ZONES].sort((a, b) => a.priorityPrice - b.priorityPrice)
