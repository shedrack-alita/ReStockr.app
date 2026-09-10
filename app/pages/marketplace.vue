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
const isResultsView = computed(() => !!category.value || !!searchQuery.value)

function matches(list: Product[]) {
  return list.filter((p) => {
    if (category.value && p.category !== category.value) return false
    if (searchQuery.value && !p.name.toLowerCase().includes(searchQuery.value)) return false
    return true
  })
}

const newlyListed = computed(() => matches(products.newlyListed))
const bestSellers = computed(() => matches(products.bestSellers))

// --- Filter sidebar (design 18) ---
const selectedCategories = ref<string[]>([])
const selectedAvailability = ref<string[]>([])
const selectedMinRating = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const sortBy = ref<'popular' | 'price-asc' | 'price-desc'>('popular')

watch(category, (value) => {
  selectedCategories.value = value ? [value] : []
}, { immediate: true })

const baseResults = computed(() => matches(products.items))

const allPrices = computed(() => baseResults.value.map((p) => p.price))
const priceCeiling = computed(() => (allPrices.value.length ? Math.max(...allPrices.value) : 0))
const priceFloor = computed(() => (allPrices.value.length ? Math.min(...allPrices.value) : 0))

const filteredResults = computed(() => {
  let list = baseResults.value
  if (selectedCategories.value.length) list = list.filter((p) => selectedCategories.value.includes(p.category))
  if (selectedAvailability.value.length) {
    list = list.filter((p) =>
      selectedAvailability.value.includes('in-stock') ? p.stockStatus === 'in-stock' : p.stockStatus === 'low-stock',
    )
  }
  if (maxPrice.value != null) list = list.filter((p) => p.price <= maxPrice.value!)
  if (selectedMinRating.value != null) list = list.filter((p) => pseudoRating(p.id) >= selectedMinRating.value!)

  const sorted = [...list]
  if (sortBy.value === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  return sorted
})

function categoryCount(cat: string) {
  return baseResults.value.filter((p) => p.category === cat).length
}

function toggleCategory(value: string) {
  selectedCategories.value = selectedCategories.value.includes(value)
    ? selectedCategories.value.filter((v) => v !== value)
    : [...selectedCategories.value, value]
}

function toggleAvailability(value: string) {
  selectedAvailability.value = selectedAvailability.value.includes(value)
    ? selectedAvailability.value.filter((v) => v !== value)
    : [...selectedAvailability.value, value]
}

function clearFilters() {
  selectedCategories.value = category.value ? [category.value] : []
  selectedAvailability.value = []
  selectedMinRating.value = null
  maxPrice.value = null
}
</script>

<template>
  <div>
    <template v-if="!isResultsView">
      <MarketplaceHero />

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
    </template>

    <div v-else class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Search Results</h1>
          <p class="mt-1 text-sm text-text-secondary">
            Showing {{ filteredResults.length }} result{{ filteredResults.length === 1 ? '' : 's' }} for
            <span class="font-semibold text-text-primary">"{{ category ?? searchQuery }}"</span>
            <NuxtLink to="/marketplace" class="ml-2 text-xs font-semibold text-text-secondary underline hover:text-text-primary">Clear</NuxtLink>
          </p>
        </div>
        <label class="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-text-primary ring-1 ring-border-subtle">
          Sort by:
          <select v-model="sortBy" class="bg-transparent font-bold focus:outline-none">
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside class="h-fit space-y-5 rounded-card bg-white p-5">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-base font-bold text-text-primary">Filter</h2>
            <button type="button" class="text-xs font-semibold text-text-secondary underline hover:text-text-primary" @click="clearFilters">Clear all</button>
          </div>

          <div class="border-t border-border-subtle pt-4">
            <p class="text-sm font-bold text-text-primary">Category</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="cat in products.categories" :key="cat">
                <label class="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    class="rounded"
                    :checked="selectedCategories.includes(cat)"
                    @change="toggleCategory(cat)"
                  >
                  {{ cat }} ({{ categoryCount(cat) }})
                </label>
              </li>
            </ul>
          </div>

          <div class="border-t border-border-subtle pt-4">
            <p class="text-sm font-bold text-text-primary">Price Range</p>
            <input
              v-model.number="maxPrice"
              type="range"
              :min="priceFloor"
              :max="priceCeiling || 1"
              class="mt-3 w-full accent-green-600"
            >
            <div class="mt-1 flex justify-between text-xs text-text-muted">
              <span>{{ formatCurrency(priceFloor) }}</span>
              <span>{{ formatCurrency(maxPrice ?? priceCeiling) }}</span>
            </div>
          </div>

          <div class="border-t border-border-subtle pt-4">
            <p class="text-sm font-bold text-text-primary">Availability</p>
            <ul class="mt-2 space-y-1.5">
              <li>
                <label class="flex items-center gap-2 text-sm text-text-secondary">
                  <input type="checkbox" class="rounded" :checked="selectedAvailability.includes('in-stock')" @change="toggleAvailability('in-stock')">
                  In Stock
                </label>
              </li>
              <li>
                <label class="flex items-center gap-2 text-sm text-text-secondary">
                  <input type="checkbox" class="rounded" :checked="selectedAvailability.includes('low-stock')" @change="toggleAvailability('low-stock')">
                  Low Stock
                </label>
              </li>
            </ul>
          </div>

          <div class="border-t border-border-subtle pt-4">
            <p class="text-sm font-bold text-text-primary">Rating</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="stars in [4, 3]" :key="stars">
                <label class="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    class="rounded"
                    :checked="selectedMinRating === stars"
                    @change="selectedMinRating = selectedMinRating === stars ? null : stars"
                  >
                  <span class="flex gap-0.5">
                    <Icon v-for="i in stars" :key="i" name="lucide:star" class="size-3.5 fill-gold-500 text-gold-500" aria-hidden="true" />
                  </span>
                  & up
                </label>
              </li>
            </ul>
          </div>
        </aside>

        <div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            <ProductsProductCard v-for="product in filteredResults" :key="product.id" :product="product" tooltip="add-to-cart" />
          </div>
          <p v-if="filteredResults.length === 0" class="mt-10 rounded-card bg-white py-16 text-center text-sm text-text-muted">
            No products match your filters.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
