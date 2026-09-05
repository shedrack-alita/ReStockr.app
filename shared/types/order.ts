import type { CartLine } from './cart'
import type { PaymentMethod, ShippingAddress } from './checkout'

export type OrderStatus = 'processing' | 'confirmed' | 'in-transit' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  reference: string
  status: OrderStatus
  lines: CartLine[]
  subtotal: number
  deliveryFee: number
  total: number
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  placedAt: string
}
