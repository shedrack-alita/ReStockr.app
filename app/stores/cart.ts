/**
 * Cart state — not built yet. A previous localStorage-only implementation
 * was removed along with the mock backend (see server/api/cart/README.md);
 * rebuild this against the real backend API once the product catalog
 * exists to add items from. See app/stores/auth.ts for the pattern this
 * should follow once it's real.
 */
export const useCartStore = defineStore('cart', () => {
  // TODO: lines, itemCount, subtotal, addItem, updateQuantity, removeItem, clear.
  return {}
})
