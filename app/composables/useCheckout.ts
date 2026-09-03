/** Public surface for the checkout flow — not built yet. Depends on the cart feature. */
export function useCheckout() {
  const store = useCheckoutStore()
  // TODO: expose step, canPlaceOrder, placeOrder().
  return store
}
