const STORAGE_KEY = 'restockr:wishlist'

/**
 * Wishlist state — product IDs only, resolved against
 * app/stores/products.ts for display. Persists to localStorage exactly
 * like app/stores/cart.ts (MOCK — no `server/api/wishlist/*` yet), same
 * reasoning: no account to sync a real wishlist against server-side.
 */
export const useWishlistStore = defineStore('wishlist', () => {
  const productIds = ref<string[]>([])

  if (import.meta.client) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) productIds.value = JSON.parse(raw) as string[]
    } catch {
      // Corrupt or inaccessible storage — start empty rather than failing to load the page.
    }
    watch(
      productIds,
      (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch {
          // Storage full/unavailable (private browsing) — still works for this session.
        }
      },
      { deep: true },
    )
  }

  function has(productId: string) {
    return productIds.value.includes(productId)
  }

  function toggle(productId: string) {
    productIds.value = has(productId) ? productIds.value.filter((id) => id !== productId) : [...productIds.value, productId]
  }

  return { productIds, has, toggle }
})
