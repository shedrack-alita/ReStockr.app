<script setup lang="ts">
import type { Product } from '#shared/types/product'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ close: [] }>()

const cart = useCart()
const quantity = ref(1)

watch(
  () => props.product,
  () => (quantity.value = 1),
)

function handleAddToCart() {
  cart.addItem(props.product, quantity.value)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/60 p-0 sm:items-center sm:p-4" @click.self="emit('close')">
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="`Quick view: ${product.name}`"
        class="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-card bg-white p-5 shadow-xl sm:rounded-card sm:p-6"
      >
        <div class="flex justify-end">
          <button
            type="button"
            class="flex size-9 items-center justify-center rounded-full text-text-secondary hover:bg-gray-100 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
            aria-label="Close quick view"
            @click="emit('close')"
          >
            <Icon name="lucide:x" class="size-5" aria-hidden="true" />
          </button>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <ProductsProductGallery :images="product.images" :product-name="product.name" />

          <div class="flex flex-col">
            <p class="text-xs font-semibold uppercase tracking-wide text-text-muted">{{ product.category }}</p>
            <h2 class="mt-1 font-display text-2xl font-bold text-text-primary">{{ product.name }}</h2>
            <p class="mt-1 text-sm text-text-secondary">{{ product.summary }}</p>

            <ProductsProductPrice :price="product.price" :compare-price="product.comparePrice" size="lg" class="mt-4" />
            <p class="mt-1 text-sm font-medium text-danger">{{ product.stockLabel }}</p>

            <p class="mt-4 text-sm text-text-secondary">{{ product.description }}</p>
            <p class="mt-3 text-xs text-text-muted">Sold by <span class="font-semibold text-text-secondary">{{ product.merchantName }}</span></p>

            <div class="mt-5 flex items-center gap-3">
              <div class="flex items-center rounded-full border border-border-subtle" role="group" aria-label="Quantity">
                <button
                  type="button"
                  class="flex size-10 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
                  aria-label="Decrease quantity"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  <Icon name="lucide:minus" class="size-4" aria-hidden="true" />
                </button>
                <span class="w-8 text-center text-sm font-semibold" aria-live="polite">{{ quantity }}</span>
                <button
                  type="button"
                  class="flex size-10 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
                  aria-label="Increase quantity"
                  @click="quantity++"
                >
                  <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
                </button>
              </div>
              <BaseButton variant="primary" class="flex-1" @click="handleAddToCart">Add to cart</BaseButton>
            </div>

            <NuxtLink
              :to="`/product/${product.slug}`"
              class="mt-4 text-center text-sm font-semibold text-text-secondary hover:text-text-primary hover:underline"
              @click="emit('close')"
            >
              View full details
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
