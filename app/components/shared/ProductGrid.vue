<script setup lang="ts">
import type { ShowcaseProduct } from '~/types/product'

defineProps<{
  title: string
  categories: string[]
  products: ShowcaseProduct[]
}>()

const activeCategory = ref(0)
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-3">
      <h3 class="font-display text-lg font-bold text-text-primary sm:text-xl">{{ title }}</h3>
      <a href="#" class="text-xs font-semibold text-text-secondary hover:text-text-primary hover:underline">See all</a>
    </div>

    <div class="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" :aria-label="`${title} categories`">
      <button
        v-for="(category, i) in categories"
        :key="category"
        type="button"
        role="tab"
        :aria-selected="activeCategory === i"
        class="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring"
        :class="
          activeCategory === i
            ? 'bg-gold-500 text-gray-950'
            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
        "
        @click="activeCategory = i"
      >
        {{ category }}
      </button>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <SharedProductCard
        v-for="(product, i) in products"
        :key="product.name"
        v-bind="product"
        :eager="i < 2"
      />
    </div>
  </div>
</template>
