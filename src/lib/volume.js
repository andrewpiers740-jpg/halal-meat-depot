// Volume pricing, shared by the catalogue (server) and the shop browser (client).
// Pure functions, no imports, so the client can use them without pulling in product data.
//
// The pack weight (the product's listed pack) is the default size and keeps its listed price.
// Heavier orders get cheaper per kg (6.5% lower for every doubling of the weight);
// lighter orders cost a little more per kg (4% higher for every halving). The per-kg price
// therefore falls at every step up in weight.
export const STEP_UP = 0.065
export const STEP_DOWN = 0.04
export const RETAIL_WEIGHTS = [1, 2, 5, 10, 20, 25] // kg offered on every ordinary product
export const MAX_RETAIL_KG = 25
export const MAX_SIZE_KG = 100 // wholesale cartons

export function volumeFactor(defKg, w) {
  return w >= defKg ? 1 - STEP_UP * Math.log2(w / defKg) : 1 + STEP_DOWN * Math.log2(defKg / w)
}

export const round2 = (n) => Math.round(n * 100) / 100

export function sizePrice(perKg, defKg, w) {
  return round2(w * perKg * volumeFactor(defKg, w))
}

/** Weights offered for a retail product: 1-25kg steps plus its own pack weight. */
export function retailWeights(defKg) {
  if (defKg > MAX_RETAIL_KG) return null
  return [...new Set([...RETAIL_WEIGHTS, defKg])].sort((a, b) => a - b)
}

/** One size record per weight; used by the catalogue and (rebuilt from weights) by the browser. */
export function sizeRecord(perKg, defKg, w) {
  const price = sizePrice(perKg, defKg, w)
  return { id: `${w}kg`, kg: w, price, perKg: round2(price / w), isDefault: w === defKg }
}
