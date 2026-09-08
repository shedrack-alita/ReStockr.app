import type { MerchantProduct, MerchantProductCategory } from '#shared/types/merchant'
import { mockMerchantCategories, mockMerchantProducts } from '~/demo/merchantCatalog'

/**
 * A merchant's own product/category catalog — MOCK data (app/demo/merchantCatalog.ts)
 * kept in memory, same pattern as app/stores/products.ts (customer marketplace) and
 * app/stores/cart.ts. Swap for real `$fetch` calls once server/api/merchant/* exists.
 */
export const useMerchantCatalogStore = defineStore('merchantCatalog', () => {
  const products = ref<MerchantProduct[]>([...mockMerchantProducts])
  const categories = ref<MerchantProductCategory[]>([...mockMerchantCategories])

  function addProduct(product: MerchantProduct) {
    products.value = [product, ...products.value]
    const category = categories.value.find((c) => c.name === product.category)
    if (category) category.productCount += 1
  }

  function byId(id: string) {
    return products.value.find((p) => p.id === id)
  }

  return { products, categories, addProduct, byId }
})
