export function useCart() {
  const store = useCartStore()

  return {
    lines: computed(() => store.lines),
    itemCount: computed(() => store.itemCount),
    subtotal: computed(() => store.subtotal),
    compareSubtotal: computed(() => store.compareSubtotal),
    isEmpty: computed(() => store.isEmpty),
    isDrawerOpen: computed(() => store.isDrawerOpen),
    addItem: store.addItem,
    updateQuantity: store.updateQuantity,
    removeItem: store.removeItem,
    clear: store.clear,
    openDrawer: store.openDrawer,
    closeDrawer: store.closeDrawer,
  }
}
