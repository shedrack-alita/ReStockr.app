<script setup lang="ts">
import type { Product } from '#shared/types/product'

const props = withDefaults(
  defineProps<{
    product: Product
    tooltip?: 'quick-view' | 'add-to-cart'
    eager?: boolean
  }>(),
  { tooltip: 'quick-view', eager: false },
)

const emit = defineEmits<{ 'quick-view': [product: Product] }>()

const cart = useCart()
const justAdded = ref(false)

function handleAddToCart() {
  cart.addItem(props.product)
  justAdded.value = true
  setTimeout(() => (justAdded.value = false), 1600)
}
</script>

<template>
  <article class="group overflow-hidden rounded-field bg-surface-card  shadow-lg">
    <div class="relative aspect-square overflow-hidden bg-white">
      <NuxtLink :to="`/product/${product.slug}`" class="absolute inset-0 block" :aria-label="product.name">
        <NuxtImg
          :src="product.images[0]!.url"
          :alt="product.images[0]!.alt"
          width="500"
          height="500"
          sizes="45vw sm:220px"
          :loading="eager ? 'eager' : 'lazy'"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </NuxtLink>

      <!-- Hover tooltip pill -->
      <div
        class="pointer-events-none absolute inset-x-0 top-3 flex justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        <span class="relative rounded-full bg-green-950 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {{ tooltip === 'quick-view' ? 'Quick View' : 'Add to cart' }}
          <span class="absolute left-1/2 top-full -mt-1 size-2 -translate-x-1/2 rotate-45 bg-green-950" />
        </span>
      </div>

      <!-- Action buttons -->
      <div class="absolute inset-x-0 bottom-3 flex justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-full bg-white text-text-primary shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-focus-ring"
          :aria-label="justAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`"
          @click.stop.prevent="handleAddToCart"
        >
          <Icon :name="justAdded ? 'lucide:check' : 'lucide:shopping-cart'" class="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-full bg-gold-500 text-gray-950 shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-focus-ring"
          :aria-label="`Quick view ${product.name}`"
          @click.stop.prevent="emit('quick-view', product)"
        >
          <Icon name="lucide:eye" class="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="p-3">
      <NuxtLink :to="`/product/${product.slug}`" class="block truncate text-sm font-semibold text-text-primary hover:underline">
        {{ product.name }}
      </NuxtLink>
      <ProductsProductPrice :price="product.price" :compare-price="product.comparePrice" size="sm" class="mt-1" />
      <p class="mt-0.5 text-xs font-medium text-danger">{{ product.stockLabel }}</p>
    </div>
  </article>
</template>
