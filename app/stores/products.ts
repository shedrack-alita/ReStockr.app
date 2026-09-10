import type { Product } from '#shared/types/product'
import { mockCategories, mockProducts } from '~/demo/products'

/**
 * Product catalog state (listing/filter/sort), backed by MOCK data (see
 * app/demo/products.ts) until server/api/products/* (still a
 * placeholder, see its README) exists.
 *
 * Swap-out plan: replace fetch()'s body with
 * `items.value = await $fetch<Product[]>('/api/products')` — everything
 * that reads from this store (getters, components) already consumes real
 * `Product[]`, so nothing downstream changes.
 */
export const useProductsStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const categories = ref<readonly string[]>([])
  const status = ref<'idle' | 'pending' | 'ready'>('idle')

  /** Safe to call more than once — later calls are no-ops once loaded. */
  async function fetch() {
    if (status.value !== 'idle') return
    status.value = 'pending'
    // MOCK — swap for `await $fetch<Product[]>('/api/products')` once the
    // real endpoint exists.
    items.value = mockProducts
    categories.value = mockCategories
    status.value = 'ready'
  }

  const newlyListed = computed(() => items.value.filter((p) => p.badge === 'new'))
  const bestSellers = computed(() => items.value.filter((p) => p.badge === 'best-seller'))

  function bySlug(slug: string) {
    return items.value.find((p) => p.slug === slug)
  }

  function byCategory(category: string) {
    return items.value.filter((p) => p.category === category)
  }

  function byMerchantSlug(slug: string) {
    return items.value.filter((p) => slugifyMerchant(p.merchantName) === slug)
  }

  return { items, categories, status, fetch, newlyListed, bestSellers, bySlug, byCategory, byMerchantSlug }
})
