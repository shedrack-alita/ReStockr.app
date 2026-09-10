import type { DeliveryOption, PaymentMethod } from '#shared/types/checkout'
import type { Order } from '#shared/types/order'

export type CheckoutStep = 'address' | 'delivery' | 'payment' | 'review' | 'success'

/** See /Updated Customer Features/27-30 — Standard/Express/Same-day. */
export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { key: 'standard', label: 'Standard Delivery', description: '3-5 business days', fee: 0 },
  { key: 'express', label: 'Express Delivery', description: '1-2 business days', fee: 1000 },
  { key: 'same-day', label: 'Same day delivery', description: 'within 24 hours (selected cities)', fee: 10000 },
]

/**
 * Checkout flow state (delivery address, delivery option, payment method,
 * order review). server/api/checkout/* (see its README) is still a
 * placeholder — there's no real payment provider decision yet — so
 * placeOrder() builds the `Order` locally instead of posting a
 * `CheckoutPayload`. The step/selectedAddressId/deliveryOption/
 * paymentMethod/placeOrder() shape is meant to survive that: once a
 * provider is chosen, placeOrder() starts with `await $fetch('/api/checkout',
 * { method: 'POST', body: payload })` instead of constructing the order by hand.
 */
export const useCheckoutStore = defineStore('checkout', () => {
  const step = ref<CheckoutStep>('address')
  const selectedAddressId = ref<string | null>(null)
  const deliveryOption = ref<DeliveryOption>(DELIVERY_OPTIONS[0]!)
  const paymentMethod = ref<PaymentMethod | null>(null)
  const lastOrder = ref<Order | null>(null)

  function setAddress(addressId: string) {
    selectedAddressId.value = addressId
    step.value = 'delivery'
  }

  function setDeliveryOption(option: DeliveryOption) {
    deliveryOption.value = option
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
    const user = useUserStore()
    const address = user.addresses.find((a) => a.id === selectedAddressId.value) ?? user.addresses.find((a) => a.isDefault)
    if (!address || !paymentMethod.value) {
      throw new Error('Cannot place an order without a delivery address and payment method.')
    }
    const cart = useCartStore()
    const subtotal = cart.subtotal
    const order: Order = {
      id: crypto.randomUUID(),
      reference: `RS${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: 'pending-acceptance',
      lines: cart.lines.map((line) => ({ ...line })),
      subtotal,
      deliveryFee: deliveryOption.value.fee,
      total: subtotal + deliveryOption.value.fee,
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        country: address.country,
      },
      deliveryOption: deliveryOption.value,
      paymentMethod: paymentMethod.value,
      placedAt: new Date().toISOString(),
    }
    lastOrder.value = order
    cart.clear()
    step.value = 'success'
    return order
  }

  function reset() {
    step.value = 'address'
    selectedAddressId.value = null
    deliveryOption.value = DELIVERY_OPTIONS[0]!
    paymentMethod.value = null
    lastOrder.value = null
  }

  return {
    step,
    selectedAddressId,
    deliveryOption,
    paymentMethod,
    lastOrder,
    setAddress,
    setDeliveryOption,
    setPaymentMethod,
    goToStep,
    placeOrder,
    reset,
  }
})
