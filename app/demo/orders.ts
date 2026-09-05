import type { Order } from '#shared/types/order'
import { findMockProductBySlug } from './products'

function orderFromProduct(slug: string, overrides: Omit<Order, 'lines' | 'subtotal' | 'deliveryFee' | 'total' | 'shippingAddress' | 'paymentMethod'>): Order {
  const product = findMockProductBySlug(slug)!
  const quantity = 1
  return {
    ...overrides,
    lines: [
      {
        id: product.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]!,
        unitPrice: product.price,
        comparePrice: product.comparePrice,
        quantity,
        maxQuantity: 99,
      },
    ],
    subtotal: product.price * quantity,
    deliveryFee: 1500,
    total: product.price * quantity + 1500,
    shippingAddress: {
      fullName: 'Amaka Okafor',
      phone: '+234 568 5678 567',
      addressLine: 'KM 14 Ekamba Nsukara, Nwaniba Road',
      city: 'Uyo',
      state: 'Akwa Ibom State',
      country: 'Nigeria',
    },
    paymentMethod: 'card',
  }
}

export const mockOrders: Order[] = [
  orderFromProduct('android-smart-tv', {
    id: 'order-rr475686',
    reference: 'RR475686',
    status: 'delivered',
    placedAt: '2026-09-01T09:00:00.000Z',
  }),
  orderFromProduct('smart-watch-series-9', {
    id: 'order-rr475641',
    reference: 'RR475641',
    status: 'in-transit',
    placedAt: '2026-09-11T09:00:00.000Z',
  }),
  orderFromProduct('noise-cancelling-headphones', {
    id: 'order-rr475602',
    reference: 'RR475602',
    status: 'processing',
    placedAt: '2026-09-12T09:00:00.000Z',
  }),
]
