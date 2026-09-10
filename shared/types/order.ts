import type { CartLine } from './cart'
import type { DeliveryOption, PaymentMethod, ShippingAddress } from './checkout'

/** See /Updated Customer Features/23-24 — order lifecycle now starts with
 * merchant acceptance before moving into fulfilment. */
export type OrderStatus = 'pending-acceptance' | 'accepted' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  reference: string
  status: OrderStatus
  lines: CartLine[]
  subtotal: number
  deliveryFee: number
  total: number
  shippingAddress: ShippingAddress
  deliveryOption: DeliveryOption
  paymentMethod: PaymentMethod
  placedAt: string
}
