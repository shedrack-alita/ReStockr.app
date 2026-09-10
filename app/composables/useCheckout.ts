/** Public surface for the checkout flow — components/pages call this rather than reaching into useCheckoutStore() directly. */
export function useCheckout() {
  const store = useCheckoutStore()
  const cart = useCart()
  const user = useUserStore()

  const selectedAddress = computed(
    () => user.addresses.find((a) => a.id === store.selectedAddressId) ?? user.addresses.find((a) => a.isDefault) ?? null,
  )
  const total = computed(() => cart.subtotal.value + store.deliveryOption.fee)
  const canPlaceOrder = computed(() => !cart.isEmpty.value && !!selectedAddress.value && !!store.paymentMethod)

  return {
    step: computed(() => store.step),
    selectedAddress,
    deliveryOption: computed(() => store.deliveryOption),
    paymentMethod: computed(() => store.paymentMethod),
    lastOrder: computed(() => store.lastOrder),
    deliveryFee: computed(() => store.deliveryOption.fee),
    total,
    canPlaceOrder,
    setAddress: store.setAddress,
    setDeliveryOption: store.setDeliveryOption,
    setPaymentMethod: store.setPaymentMethod,
    goToStep: store.goToStep,
    placeOrder: store.placeOrder,
    reset: store.reset,
  }
}
