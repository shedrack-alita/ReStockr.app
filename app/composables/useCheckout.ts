/** Public surface for the checkout flow — components/pages call this rather than reaching into useCheckoutStore() directly. */
export function useCheckout() {
  const store = useCheckoutStore()
  const cart = useCart()

  const total = computed(() => cart.subtotal.value + store.deliveryFee)
  const canPlaceOrder = computed(() => !cart.isEmpty.value && !!store.shippingAddress && !!store.paymentMethod)

  return {
    step: computed(() => store.step),
    shippingAddress: computed(() => store.shippingAddress),
    paymentMethod: computed(() => store.paymentMethod),
    lastOrder: computed(() => store.lastOrder),
    deliveryFee: computed(() => store.deliveryFee),
    total,
    canPlaceOrder,
    setShippingAddress: store.setShippingAddress,
    setPaymentMethod: store.setPaymentMethod,
    goToStep: store.goToStep,
    placeOrder: store.placeOrder,
    reset: store.reset,
  }
}
