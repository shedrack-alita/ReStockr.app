import type { Order } from '#shared/types/order'
import { mockOrders } from '~/demo/orders'

/**
 * Order history state, backed by MOCK data (app/demo/orders.ts) until
 * server/api/orders/* (still a placeholder, see its README) exists —
 * swap fetch()'s body for `await $fetch<Order[]>('/api/orders')` then,
 * same pattern as app/stores/products.ts.
 */
export const useOrdersStore = defineStore('orders', () => {
  const items = ref<Order[]>([])
  const status = ref<'idle' | 'pending' | 'ready'>('idle')

  async function fetch() {
    if (status.value !== 'idle') return
    status.value = 'pending'
    items.value = mockOrders
    status.value = 'ready'
  }

  function byId(id: string) {
    return items.value.find((order) => order.id === id)
  }

  return { items, status, fetch, byId }
})
