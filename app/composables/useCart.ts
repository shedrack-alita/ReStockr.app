/**
 * Public surface for the cart feature, mirroring app/composables/useAuth.ts
 * — not built yet, waiting on app/stores/cart.ts (currently an empty
 * shell) and the product catalog to add items from.
 */
export function useCart() {
  const store = useCartStore()
  // TODO: expose itemCount, subtotal, addItem, updateQuantity, removeItem.
  return store
}
