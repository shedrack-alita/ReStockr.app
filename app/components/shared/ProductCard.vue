<script setup lang="ts">
import type { ShowcaseProduct } from '~/types/product'

defineProps<ShowcaseProduct & { eager?: boolean }>()
</script>

<template>
  <article class="group overflow-hidden rounded-field bg-white">
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <NuxtImg
        :src="image.url"
        :alt="image.alt"
        width="400"
        height="400"
        sizes="45vw sm:180px"
        :loading="eager ? 'eager' : 'lazy'"
        class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span
        class="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-text-primary shadow-sm"
        aria-hidden="true"
      >
        <Icon name="lucide:shopping-cart" class="size-4" />
      </span>
    </div>

    <div class="p-3">
      <p class="truncate text-sm font-semibold text-text-primary">{{ name }}</p>
      <p class="mt-1 flex items-baseline gap-1.5 text-sm">
        <span class="font-bold text-text-primary">{{ formatCurrency(price) }}</span>
        <span class="text-xs text-text-muted line-through">{{ formatCurrency(comparePrice) }}</span>
      </p>
      <p class="mt-0.5 text-xs font-medium text-warning">{{ status }}</p>
    </div>
  </article>
</template>
