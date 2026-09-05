<script setup lang="ts">
import type { Product } from '#shared/types/product'

definePageMeta({ layout: 'marketplace' })

useSeoMeta({
  title: 'ReStockr - Marketplace',
  description: 'Shop newly listed products and best sellers from verified ReStockr merchants.',
})

const route = useRoute()
const products = useProductsStore()

onMounted(() => void products.fetch())

const category = computed(() => (typeof route.query.category === 'string' ? route.query.category : undefined))
const searchQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q.toLowerCase() : undefined))

function matches(list: Product[]) {
  return list.filter((p) => {
    if (category.value && p.category !== category.value) return false
    if (searchQuery.value && !p.name.toLowerCase().includes(searchQuery.value)) return false
    return true
  })
}

const newlyListed = computed(() => matches(products.newlyListed))
const bestSellers = computed(() => matches(products.bestSellers))
</script>

<template>
  <div>
    <MarketplaceHero />

    <div v-if="category || searchQuery" class="mx-auto max-w-6xl px-4 sm:px-6">
      <p class="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        Showing results for
        <span class="font-semibold text-text-primary">{{ category ?? searchQuery }}</span>
        <NuxtLink to="/marketplace" class="text-xs font-semibold text-text-secondary underline hover:text-text-primary">Clear</NuxtLink>
      </p>
    </div>

    <MarketplaceProductSection
      title="Newly Listed"
      subtitle="Discover the latest and newly listed products by Our reputable merchants"
      :products="newlyListed"
      card-tooltip="quick-view"
    />

    <MarketplaceProductSection
      id="best-sellers"
      title="Best Sellers"
      subtitle="Discover the latest and newly listed products by Our reputable merchants"
      :products="bestSellers"
      card-tooltip="add-to-cart"
      show-stars
    />

    <MarketplaceCategoryGrid :categories="products.categories" />
  </div>
</template>
