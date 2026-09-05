<script setup lang="ts">
import type { CartLine } from '#shared/types/cart'

const props = defineProps<{ line: CartLine; compact?: boolean }>()

const cart = useCart()

const lineTotal = computed(() => props.line.unitPrice * props.line.quantity)
</script>

<template>
  <div class="flex gap-3 py-4" :class="compact ? '' : 'sm:gap-4'">
    <NuxtLink :to="`/product/${line.slug}`" class="shrink-0 overflow-hidden rounded-field bg-white" :class="compact ? 'size-16' : 'size-20 sm:size-24'">
      <NuxtImg
        :src="line.image.url"
        :alt="line.image.alt"
        width="96"
        height="96"
        class="size-full object-cover"
      />
    </NuxtLink>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-start justify-between gap-2">
        <NuxtLink :to="`/product/${line.slug}`" class="truncate text-sm font-semibold text-text-primary hover:underline">{{ line.name }}</NuxtLink>
        <button
          type="button"
          class="shrink-0 text-text-muted hover:text-danger focus-visible:outline-2 focus-visible:outline-focus-ring"
          :aria-label="`Remove ${line.name} from cart`"
          @click="cart.removeItem(line.id)"
        >
          <Icon name="lucide:trash-2" class="size-4" aria-hidden="true" />
        </button>
      </div>

      <ProductsProductPrice :price="line.unitPrice" :compare-price="line.comparePrice" size="sm" class="mt-1" />

      <div class="mt-auto flex items-center justify-between pt-2">
        <div class="flex items-center rounded-full border border-border-subtle" role="group" :aria-label="`Quantity for ${line.name}`">
          <button
            type="button"
            class="flex size-7 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
            aria-label="Decrease quantity"
            @click="cart.updateQuantity(line.id, line.quantity - 1)"
          >
            <Icon name="lucide:minus" class="size-3.5" aria-hidden="true" />
          </button>
          <span class="w-6 text-center text-xs font-semibold" aria-live="polite">{{ line.quantity }}</span>
          <button
            type="button"
            class="flex size-7 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
            aria-label="Increase quantity"
            :disabled="line.quantity >= line.maxQuantity"
            @click="cart.updateQuantity(line.id, line.quantity + 1)"
          >
            <Icon name="lucide:plus" class="size-3.5" aria-hidden="true" />
          </button>
        </div>
        <p class="text-sm font-bold text-text-primary">{{ formatCurrency(lineTotal) }}</p>
      </div>
    </div>
  </div>
</template>
