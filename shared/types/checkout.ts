export type PaymentMethod = 'card' | 'bank-transfer' | 'ussd'

export type DeliveryOptionKey = 'standard' | 'express' | 'same-day'

export interface DeliveryOption {
  key: DeliveryOptionKey
  label: string
  description: string
  fee: number
}

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
  deliveryOption: DeliveryOptionKey
  paymentMethod: PaymentMethod
}
