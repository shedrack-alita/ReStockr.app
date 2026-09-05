export function useWishlist() {
  const store = useWishlistStore()
  const products = useProductsStore()

  const items = computed(() => products.items.filter((p) => store.has(p.id)))

  return {
    productIds: computed(() => store.productIds),
    items,
    has: store.has,
    toggle: store.toggle,
  }
}
