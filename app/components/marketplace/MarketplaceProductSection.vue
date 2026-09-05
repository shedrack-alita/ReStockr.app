<script setup lang="ts">
import type { Product } from '#shared/types/product'

defineProps<{
  id?: string
  title: string
  subtitle: string
  products: Product[]
  showStars?: boolean
  cardTooltip: 'quick-view' | 'add-to-cart'
}>()

const quickViewProduct = ref<Product | null>(null)
</script>

<template>
  <section :id="id" class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h2 class="flex flex-wrap items-center gap-2 font-sans text-xl font-extrabold uppercase tracking-tight text-text-primary sm:text-2xl">
          {{ title }}
          <span v-if="showStars" class="flex gap-0.5 text-gold-500" aria-hidden="true">
            <Icon v-for="i in 5" :key="i" name="lucide:star" class="size-4" />
          </span>
        </h2>
        <p class="mt-1 text-sm text-text-secondary">{{ subtitle }}</p>
      </div>
      <NuxtLink to="/marketplace" class="shrink-0 text-sm font-semibold text-text-primary underline underline-offset-2 hover:no-underline">
        See All
      </NuxtLink>
    </div>

    <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      <ProductsProductCard
        v-for="(product, i) in products"
        :key="product.id"
        :product="product"
        :tooltip="cardTooltip"
        :eager="i < 2"
        @quick-view="quickViewProduct = $event"
      />
    </div>

    <ProductsProductQuickView v-if="quickViewProduct" :product="quickViewProduct" @close="quickViewProduct = null" />
  </section>
</template>
