/** Public surface for the wishlist feature — not built yet. */
export function useWishlist() {
  const store = useWishlistStore()
  // TODO: expose items, has(), toggle().
  return store
}
