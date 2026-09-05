import type { PaymentMethod, ShippingAddress } from '#shared/types/checkout'
import type { Order } from '#shared/types/order'

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success'

const DELIVERY_FEE = 1500

/**
 * Checkout flow state (shipping address, payment method, order review).
 * server/api/checkout/* (see its README) is still a placeholder — there's
 * no real payment provider decision yet — so placeOrder() builds the
 * `Order` locally instead of posting a `CheckoutPayload`. The step/
 * shippingAddress/paymentMethod/placeOrder() shape is meant to survive
 * that: once a provider is chosen, placeOrder() starts with
 * `await $fetch('/api/checkout', { method: 'POST', body: payload })`
 * instead of constructing the order by hand.
 */
export const useCheckoutStore = defineStore('checkout', () => {
  const step = ref<CheckoutStep>('shipping')
  const shippingAddress = ref<ShippingAddress | null>(null)
  const paymentMethod = ref<PaymentMethod | null>(null)
  const lastOrder = ref<Order | null>(null)

  const deliveryFee = computed(() => DELIVERY_FEE)

  function setShippingAddress(address: ShippingAddress) {
    shippingAddress.value = address
    step.value = 'payment'
  }

  function setPaymentMethod(method: PaymentMethod) {
    paymentMethod.value = method
    step.value = 'review'
  }

  function goToStep(target: CheckoutStep) {
    step.value = target
  }

  /**
   * Builds and "places" the order from the current cart. MOCK — swap the
   * body for a real `$fetch('/api/checkout', ...)` call once
   * server/api/checkout/* exists; keep clearing the cart and setting
   * lastOrder/step from its response.
   */
  function placeOrder(): Order {
    if (!shippingAddress.value || !paymentMethod.value) {
      throw new Error('Cannot place an order without a shipping address and payment method.')
    }
    const cart = useCartStore()
    const subtotal = cart.subtotal
    const order: Order = {
      id: crypto.randomUUID(),
      reference: `RS-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'confirmed',
      lines: cart.lines.map((line) => ({ ...line })),
      subtotal,
      deliveryFee: deliveryFee.value,
      total: subtotal + deliveryFee.value,
      shippingAddress: shippingAddress.value,
      paymentMethod: paymentMethod.value,
      placedAt: new Date().toISOString(),
    }
    lastOrder.value = order
    cart.clear()
    step.value = 'success'
    return order
  }

  function reset() {
    step.value = 'shipping'
    shippingAddress.value = null
    paymentMethod.value = null
    lastOrder.value = null
  }

  return {
    step,
    shippingAddress,
    paymentMethod,
    lastOrder,
    deliveryFee,
    setShippingAddress,
    setPaymentMethod,
    goToStep,
    placeOrder,
    reset,
  }
})
