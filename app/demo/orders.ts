import type { Order } from '#shared/types/order'
import { findMockProductBySlug } from './products'

function orderFromProduct(slug: string, overrides: Omit<Order, 'lines' | 'subtotal' | 'deliveryFee' | 'total' | 'shippingAddress' | 'deliveryOption' | 'paymentMethod'>): Order {
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
        merchantName: product.merchantName,
        image: product.images[0]!,
        unitPrice: product.price,
        comparePrice: product.comparePrice,
        quantity,
        maxQuantity: 99,
      },
    ],
    subtotal: product.price * quantity,
    deliveryFee: 0,
    total: product.price * quantity,
    shippingAddress: {
      fullName: 'Amaka Okafor',
      phone: '+234 568 5678 567',
      addressLine: 'KM 14 Ekamba Nsukara, Nwaniba Road',
      city: 'Uyo',
      state: 'Akwa Ibom State',
      country: 'Nigeria',
    },
    deliveryOption: { key: 'standard', label: 'Standard Delivery', description: '3-5 business days', fee: 0 },
    paymentMethod: 'card',
  }
}

export const mockOrders: Order[] = [
  orderFromProduct('wireless-earbuds', {
    id: 'order-rr475686',
    reference: 'RR475686',
    status: 'delivered',
    placedAt: '2026-09-01T09:00:00.000Z',
  }),
  orderFromProduct('nike-dunk-low', {
    id: 'order-rr475641',
    reference: 'RR475641',
    status: 'shipped',
    placedAt: '2026-09-11T09:00:00.000Z',
  }),
  orderFromProduct('hugo-boss-bottled-night', {
    id: 'order-rr475602',
    reference: 'RR475602',
    status: 'pending-acceptance',
    placedAt: '2026-09-12T09:00:00.000Z',
  }),
]
