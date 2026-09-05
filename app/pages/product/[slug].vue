<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

const route = useRoute()
const slug = route.params.slug as string
const { product, status } = useProduct(slug)
const productsStore = useProductsStore()
const cart = useCart()

const quantity = ref(1)
const justAdded = ref(false)

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

const related = computed(() => {
  if (!product.value) return []
  return productsStore.byCategory(product.value.category).filter((p) => p.id !== product.value!.id).slice(0, 5)
})
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
      <nav class="flex items-center gap-1.5 text-xs text-text-muted" aria-label="Breadcrumb">
        <NuxtLink to="/marketplace" class="hover:text-text-primary hover:underline">Marketplace</NuxtLink>
        <Icon name="lucide:chevron-right" class="size-3" aria-hidden="true" />
        <NuxtLink :to="`/marketplace?category=${encodeURIComponent(product.category)}`" class="hover:text-text-primary hover:underline">
          {{ product.category }}
        </NuxtLink>
        <Icon name="lucide:chevron-right" class="size-3" aria-hidden="true" />
        <span class="text-text-secondary">{{ product.name }}</span>
      </nav>

      <div class="mt-4 grid gap-8 sm:grid-cols-2">
        <ProductsProductGallery :images="product.images" :product-name="product.name" />

        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-text-muted">{{ product.category }}</p>
          <h1 class="mt-1 font-display text-3xl font-bold text-text-primary">{{ product.name }}</h1>
          <p class="mt-2 text-sm text-text-secondary">{{ product.summary }}</p>

          <ProductsProductPrice :price="product.price" :compare-price="product.comparePrice" size="lg" class="mt-4" />
          <p class="mt-1 text-sm font-medium text-danger">{{ product.stockLabel }}</p>

          <p class="mt-5 text-sm leading-relaxed text-text-secondary">{{ product.description }}</p>
          <p class="mt-4 text-xs text-text-muted">Sold by <span class="font-semibold text-text-secondary">{{ product.merchantName }}</span></p>

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
              {{ justAdded ? 'Added to cart' : 'Add to cart' }}
            </BaseButton>
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
