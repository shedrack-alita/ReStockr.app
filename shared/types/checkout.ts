export type PaymentMethod = 'card' | 'bank-transfer' | 'pay-on-delivery'

export interface ShippingAddress {
  fullName: string
  phone: string
  addressLine: string
  city: string
  state: string
  country: string
}

export interface CheckoutPayload {
  cartId: string
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}
