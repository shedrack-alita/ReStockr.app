<script setup lang="ts">

withDefaults(
  defineProps<{
    price: number
    comparePrice?: number
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { comparePrice: undefined, size: 'md' },
)

const sizeClass: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
}
</script>

<template>
  <p class="flex flex-wrap items-baseline gap-1.5" :class="sizeClass[size]">
    <span class="font-bold text-text-primary">{{ formatCurrency(price) }}</span>
    <span v-if="comparePrice && comparePrice > price" class="text-text-muted line-through" :class="size === 'lg' ? 'text-base' : 'text-xs'">
      {{ formatCurrency(comparePrice) }}
    </span>
  </p>
</template>
