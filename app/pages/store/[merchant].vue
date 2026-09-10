<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

const route = useRoute()
const merchantSlug = route.params.merchant as string
const products = useProductsStore()

onMounted(() => void products.fetch())

const merchantProducts = computed(() => products.byMerchantSlug(merchantSlug))
const merchantName = computed(() => merchantProducts.value[0]?.merchantName ?? '')

useSeoMeta({ title: () => (merchantName.value ? `ReStockr - ${merchantName.value}` : 'ReStockr - Store') })

const rating = computed(() => pseudoRating(merchantName.value))
const reviewCount = computed(() => pseudoReviewCount(merchantName.value))
const yearsOnRestockr = computed(() => 1 + (hashSeed(merchantName.value) % 4))

function hashSeed(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  return hash
}

const categoryCounts = computed(() => {
  const counts = new Map<string, number>()
  for (const p of merchantProducts.value) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  return [...counts.entries()]
})

const activeTab = ref<'home' | 'products' | 'about' | 'review'>('home')
const activeCategory = ref<string | null>(null)

const featured = computed(() => merchantProducts.value.slice(0, 4))
const filteredProducts = computed(() =>
  activeCategory.value ? merchantProducts.value.filter((p) => p.category === activeCategory.value) : merchantProducts.value,
)

const sampleReviews = [
  { name: 'Amaka Okafor', when: '2 hours ago', rating: 5, quote: 'Consistent quality, always tracked correctly and arrived exactly on time. Highly recommend!' },
  { name: 'Graceful Akpan', when: 'Yesterday', rating: 4, quote: 'Great stock and helpful support. There was a tiny delay in the packing state, but the communication was spot-on.' },
]
</script>

<template>
  <div>
    <div v-if="merchantProducts.length === 0 && products.status === 'ready'" class="mx-auto max-w-3xl px-4 py-24 text-center">
      <Icon name="lucide:store" class="mx-auto size-10 text-text-muted" aria-hidden="true" />
      <p class="mt-3 text-base font-semibold text-text-primary">Store not found</p>
      <BaseButton to="/marketplace" variant="primary" class="mt-4">Back to marketplace</BaseButton>
    </div>

    <template v-else>
      <section class="relative overflow-hidden bg-gray-950 text-white">
        <NuxtImg
          v-if="featured[0]"
          :src="featured[0].images[0]!.url"
          alt=""
          width="1200"
          height="360"
          class="absolute inset-0 size-full object-cover opacity-40"
          aria-hidden="true"
        />
        <div class="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-6">
          <div class="flex items-center gap-4">
            <span class="flex size-16 shrink-0 items-center justify-center rounded-full bg-white text-gray-950">
              <Icon name="lucide:store" class="size-7" aria-hidden="true" />
            </span>
            <div>
              <p class="flex items-center gap-2 font-display text-2xl font-bold">
                {{ merchantName }}
                <span class="flex items-center gap-1 rounded-full bg-green-600 px-2.5 py-1 text-[10px] font-bold uppercase">
                  <Icon name="lucide:badge-check" class="size-3" aria-hidden="true" />
                  Verified Merchant
                </span>
              </p>
              <p class="mt-1 text-sm text-white/70">Premium products for a better tomorrow.</p>
              <p class="mt-2 flex items-center gap-3 text-sm text-white/80">
                <span class="flex items-center gap-1"><Icon name="lucide:star" class="size-3.5 fill-gold-400 text-gold-400" aria-hidden="true" />{{ rating }}% Positive Rating</span>
                <span>{{ yearsOnRestockr }} Years on ReStockr</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav class="border-b border-border-subtle bg-white" aria-label="Store sections">
        <div class="mx-auto flex max-w-6xl gap-6 px-4 sm:px-6">
          <button
            v-for="tab in (['home', 'products', 'about', 'review'] as const)"
            :key="tab"
            type="button"
            class="border-b-2 py-4 text-sm font-bold capitalize transition-colors"
            :class="activeTab === tab ? 'border-green-600 text-green-700' : 'border-transparent text-text-secondary hover:text-text-primary'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </nav>

      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <template v-if="activeTab === 'home' || activeTab === 'products'">
          <div class="grid gap-6 lg:grid-cols-[240px_1fr]">
            <div class="space-y-4">
              <div class="rounded-card bg-surface-card p-5">
                <h2 class="font-display text-base font-bold text-text-primary">Shop By Category</h2>
                <ul class="mt-3 space-y-1">
                  <li>
                    <button
                      type="button"
                      class="w-full rounded-field px-2 py-2 text-left text-sm font-semibold"
                      :class="!activeCategory ? 'bg-green-100 text-green-700' : 'text-text-secondary hover:bg-gray-100'"
                      @click="activeCategory = null"
                    >
                      All ({{ merchantProducts.length }})
                    </button>
                  </li>
                  <li v-for="[category, count] in categoryCounts" :key="category">
                    <button
                      type="button"
                      class="w-full rounded-field px-2 py-2 text-left text-sm font-semibold"
                      :class="activeCategory === category ? 'bg-green-100 text-green-700' : 'text-text-secondary hover:bg-gray-100'"
                      @click="activeCategory = category; activeTab = 'products'"
                    >
                      {{ category }} ({{ count }})
                    </button>
                  </li>
                </ul>
              </div>

              <div class="rounded-card bg-green-100 p-5">
                <p class="font-display text-lg font-bold text-text-primary">Exclusive Deals</p>
                <NuxtLink to="/marketplace" class="mt-3 inline-flex items-center gap-1 rounded-full bg-green-950 px-4 py-2 text-xs font-bold text-white">
                  Shop Now
                  <Icon name="lucide:arrow-right" class="size-3.5" aria-hidden="true" />
                </NuxtLink>
              </div>
            </div>

            <div>
              <h2 class="font-display text-xl font-bold text-text-primary">{{ activeTab === 'home' ? 'Featured Products' : 'All Products' }}</h2>
              <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                <ProductsProductCard
                  v-for="product in activeTab === 'home' ? featured : filteredProducts"
                  :key="product.id"
                  :product="product"
                  tooltip="add-to-cart"
                />
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="activeTab === 'about'">
          <div class="max-w-2xl">
            <h2 class="font-display text-xl font-bold text-text-primary">About {{ merchantName }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-text-secondary">
              {{ merchantName }} has been serving ReStockr customers for {{ yearsOnRestockr }} year{{ yearsOnRestockr === 1 ? '' : 's' }},
              with a {{ rating }}% positive rating across {{ reviewCount.toLocaleString() }} reviews. Every listing is verified before it goes live,
              so you can shop with confidence.
            </p>
          </div>
        </template>

        <template v-else>
          <div class="max-w-2xl space-y-4">
            <h2 class="font-display text-xl font-bold text-text-primary">Reviews ({{ reviewCount.toLocaleString() }})</h2>
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
        </template>
      </div>
    </template>
  </div>
</template>
