/** URL-safe slug for a merchant's public storefront route, e.g. "/store/lagos-electronics-hub". */
export function slugifyMerchant(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Deterministic-per-id star rating in a believable 4.3-4.9 band — there's no
 * server/api/reviews/* yet, so this stands in until real aggregate ratings exist.
 */
export function pseudoRating(seed: string): number {
  return Math.round((4.3 + (hashString(seed) % 7) / 10) * 10) / 10
}

/** Deterministic-per-id review count, for the same reason as pseudoRating(). */
export function pseudoReviewCount(seed: string): number {
  return 80 + (hashString(seed) % 1200)
}
