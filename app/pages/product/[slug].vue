<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

const route = useRoute()
const slug = route.params.slug as string
const { product, status } = useProduct(slug)
const productsStore = useProductsStore()
const cart = useCart()

const quantity = ref(1)
const justAdded = ref(false)
const activeTab = ref<'description' | 'review'>('description')

watch(product, () => (quantity.value = 1))

useSeoMeta({
  title: () => (product.value ? `ReStockr - ${product.value.name}` : 'ReStockr - Product'),
  description: () => product.value?.summary,
})

function handleAddToCart() {
  if (!product.value) return
  cart.addItem(product.value, quantity.value)
  justAdded.value = true
  setTimeout(() => (justAdded.value = false), 1600)
}

async function handleBuyNow() {
  if (!product.value) return
  cart.addItem(product.value, quantity.value)
  await navigateTo('/checkout')
}

const related = computed(() => {
  if (!product.value) return []
  return productsStore.byCategory(product.value.category).filter((p) => p.id !== product.value!.id).slice(0, 5)
})

const rating = computed(() => (product.value ? pseudoRating(product.value.id) : 0))
const reviewCount = computed(() => (product.value ? pseudoReviewCount(product.value.id) : 0))
const merchantRating = computed(() => (product.value ? pseudoRating(product.value.merchantName) : 0))
const merchantReviewCount = computed(() => (product.value ? pseudoReviewCount(product.value.merchantName) : 0))
const percentOff = computed(() => {
  if (!product.value || product.value.comparePrice <= product.value.price) return 0
  return Math.round(((product.value.comparePrice - product.value.price) / product.value.comparePrice) * 100)
})

const trustBadges = [
  { icon: 'lucide:shield-check', label: '100% Original Products' },
  { icon: 'lucide:truck', label: 'Fast & Reliable Delivery' },
  { icon: 'lucide:rotate-ccw', label: '7 Days Easy Return' },
]

const sampleReviews = [
  { name: 'Amaka Okafor', when: '2 hours ago', rating: 5, quote: 'Consistent premium quality, always tracked correctly and arrived exactly on time. Highly recommend!' },
  { name: 'Graceful Akpan', when: 'Yesterday', rating: 4, quote: 'Great product and helpful support. There was a tiny delay in packing, but communication was spot-on.' },
]

function starFill(index: number, value: number) {
  return index < Math.round(value)
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div v-if="status === 'pending'" class="py-24 text-center text-sm text-text-muted">Loading product…</div>

    <div v-else-if="!product" class="flex flex-col items-center gap-3 py-24 text-center">
      <Icon name="lucide:search-x" class="size-10 text-text-muted" aria-hidden="true" />
      <p class="text-base font-semibold text-text-primary">Product not found</p>
      <BaseButton to="/marketplace" variant="primary" class="mt-2">Back to marketplace</BaseButton>
    </div>

    <template v-else>
      <nav class="flex flex-wrap items-center gap-1.5 text-xs text-text-muted" aria-label="Breadcrumb">
        <NuxtLink to="/marketplace" class="hover:text-text-primary hover:underline">Home</NuxtLink>
        <Icon name="lucide:chevron-right" class="size-3" aria-hidden="true" />
        <NuxtLink :to="`/marketplace?category=${encodeURIComponent(product.category)}`" class="hover:text-text-primary hover:underline">
          {{ product.category }}
        </NuxtLink>
        <Icon name="lucide:chevron-right" class="size-3" aria-hidden="true" />
        <span class="text-text-secondary">{{ product.name }}</span>
      </nav>

      <div class="mt-4 grid gap-8 lg:grid-cols-[1fr_1fr_320px]">
        <ProductsProductGallery :images="product.images" :product-name="product.name" class="lg:col-span-1" />

        <div class="lg:col-span-1">
          <div class="flex flex-wrap items-center gap-2">
            <span v-if="product.badge === 'best-seller'" class="rounded-full bg-green-950 px-3 py-1 text-xs font-bold text-white">Best Seller</span>
            <span v-else-if="product.badge === 'new'" class="rounded-full bg-green-950 px-3 py-1 text-xs font-bold text-white">New</span>
          </div>

          <h1 class="mt-3 font-display text-2xl font-bold text-text-primary sm:text-3xl">{{ product.name }}</h1>

          <div class="mt-2 flex flex-wrap items-center gap-2">
            <span class="flex items-center gap-0.5">
              <Icon
                v-for="i in 5"
                :key="i"
                name="lucide:star"
                class="size-4"
                :class="starFill(i - 1, rating) ? 'fill-gold-500 text-gold-500' : 'text-border-strong'"
                aria-hidden="true"
              />
            </span>
            <span class="text-sm font-semibold text-text-primary">{{ rating }}</span>
            <span class="text-sm text-text-muted">({{ reviewCount.toLocaleString() }} Reviews)</span>
            <span
              class="rounded-full px-2 py-0.5 text-xs font-bold"
              :class="product.stockStatus === 'out-of-stock' ? 'bg-danger-surface text-danger' : 'bg-green-100 text-green-700'"
            >
              {{ product.stockStatus === 'out-of-stock' ? 'Out of stock' : 'In stock' }}
            </span>
          </div>

          <div class="mt-3 flex flex-wrap items-baseline gap-2">
            <span class="font-display text-3xl font-bold text-text-primary">{{ formatCurrency(product.price) }}</span>
            <span v-if="product.comparePrice > product.price" class="text-lg text-text-muted line-through">{{ formatCurrency(product.comparePrice) }}</span>
            <span v-if="percentOff > 0" class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">{{ percentOff }}% OFF</span>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-text-secondary">{{ product.summary }}</p>

          <div class="mt-6 flex items-center gap-3">
            <div class="flex items-center rounded-full border border-border-subtle" role="group" aria-label="Quantity">
              <button
                type="button"
                class="flex size-11 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
                aria-label="Decrease quantity"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                <Icon name="lucide:minus" class="size-4" aria-hidden="true" />
              </button>
              <span class="w-10 text-center text-sm font-semibold" aria-live="polite">{{ quantity }}</span>
              <button
                type="button"
                class="flex size-11 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
                aria-label="Increase quantity"
                @click="quantity++"
              >
                <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
              </button>
            </div>
            <BaseButton variant="primary" size="lg" class="flex-1" @click="handleAddToCart">
              <Icon :name="justAdded ? 'lucide:check' : 'lucide:shopping-cart'" class="size-4" aria-hidden="true" />
              {{ justAdded ? 'Added to cart' : 'Add To Cart' }}
            </BaseButton>
          </div>
          <BaseButton variant="dark" size="lg" block class="mt-3" @click="handleBuyNow">Buy Now</BaseButton>
        </div>

        <div class="space-y-4 lg:col-span-1">
          <div class="rounded-card bg-surface-card p-5">
            <p class="text-sm text-text-secondary">
              Sold By
              <NuxtLink :to="`/store/${slugifyMerchant(product.merchantName)}`" class="font-bold text-text-primary hover:underline">{{ product.merchantName }}</NuxtLink>
              <Icon name="lucide:badge-check" class="ml-1 inline size-4 text-green-600" aria-hidden="true" />
            </p>
            <p class="mt-1 text-xs text-text-muted">{{ merchantRating }}% Positive Rating ({{ (merchantReviewCount / 100).toFixed(1) }}k)</p>
            <BaseButton :to="`/store/${slugifyMerchant(product.merchantName)}`" variant="outline" block class="mt-3 text-text-primary">Visit Store</BaseButton>

            <ul class="mt-4 space-y-2 border-t border-border-subtle pt-4">
              <li v-for="badge in trustBadges" :key="badge.label" class="flex items-center gap-2 text-sm text-text-secondary">
                <Icon :name="badge.icon" class="size-4 shrink-0 text-text-muted" aria-hidden="true" />
                {{ badge.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <div class="flex gap-1 border-b border-border-subtle" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'description'"
            class="border-b-2 px-4 py-2.5 text-sm font-semibold"
            :class="activeTab === 'description' ? 'border-green-600 text-green-700' : 'border-transparent text-text-secondary hover:text-text-primary'"
            @click="activeTab = 'description'"
          >
            Description
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'review'"
            class="border-b-2 px-4 py-2.5 text-sm font-semibold"
            :class="activeTab === 'review' ? 'border-green-600 text-green-700' : 'border-transparent text-text-secondary hover:text-text-primary'"
            @click="activeTab = 'review'"
          >
            Review ({{ reviewCount.toLocaleString() }})
          </button>
        </div>

        <div v-if="activeTab === 'description'" class="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
          {{ product.description }}
        </div>
        <div v-else class="mt-4 max-w-3xl space-y-4">
          <div v-for="review in sampleReviews" :key="review.name" class="rounded-field bg-surface-input/50 p-4">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-bold text-text-primary">{{ review.name }} <span class="font-normal text-text-muted">· {{ review.when }}</span></p>
              <span class="flex gap-0.5">
                <Icon
                  v-for="i in 5"
                  :key="i"
                  name="lucide:star"
                  class="size-3.5"
                  :class="i <= review.rating ? 'fill-gold-500 text-gold-500' : 'text-border-strong'"
                  aria-hidden="true"
                />
              </span>
            </div>
            <p class="mt-1.5 text-sm text-text-secondary">"{{ review.quote }}"</p>
          </div>
        </div>
      </div>

      <section v-if="related.length" class="mt-14">
        <h2 class="font-display text-lg font-bold text-text-primary">You may also like</h2>
        <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          <ProductsProductCard v-for="p in related" :key="p.id" :product="p" tooltip="quick-view" />
        </div>
      </section>
    </template>
  </div>
</template>
