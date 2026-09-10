<script setup lang="ts">
import type { CartLine } from '#shared/types/cart'

const props = defineProps<{ line: CartLine; compact?: boolean; selectable?: boolean; selected?: boolean }>()
const emit = defineEmits<{ 'toggle-select': [] }>()

const cart = useCart()

const lineTotal = computed(() => props.line.unitPrice * props.line.quantity)
</script>

<template>
  <div class="flex gap-3 py-4" :class="compact ? '' : 'sm:gap-4'">
    <button
      v-if="selectable"
      type="button"
      class="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border-2"
      :class="selected ? 'border-green-600 bg-green-600' : 'border-border-strong'"
      :aria-label="`Select ${line.name}`"
      @click="emit('toggle-select')"
    >
      <Icon v-if="selected" name="lucide:check" class="size-3.5 text-white" aria-hidden="true" />
    </button>

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
        <div class="min-w-0">
          <NuxtLink :to="`/product/${line.slug}`" class="block truncate font-display text-base font-bold text-text-primary hover:underline">{{ line.name }}</NuxtLink>
          <p class="mt-0.5 text-xs text-text-muted">Sold by: <span class="font-semibold text-text-secondary">{{ line.merchantName }}</span></p>
          <span class="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">In stock</span>
        </div>
        <button
          type="button"
          class="shrink-0 flex size-8 items-center justify-center rounded-full text-text-muted hover:bg-gray-100 hover:text-danger focus-visible:outline-2 focus-visible:outline-focus-ring"
          :aria-label="`Remove ${line.name} from cart`"
          @click="cart.removeItem(line.id)"
        >
          <Icon name="lucide:trash-2" class="size-4" aria-hidden="true" />
        </button>
      </div>

      <div class="mt-auto flex items-end justify-between pt-2">
        <div class="flex items-center rounded-full border border-border-subtle bg-white" role="group" :aria-label="`Quantity for ${line.name}`">
          <button
            type="button"
            class="flex size-8 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
            aria-label="Decrease quantity"
            @click="cart.updateQuantity(line.id, line.quantity - 1)"
          >
            <Icon name="lucide:minus" class="size-3.5" aria-hidden="true" />
          </button>
          <span class="w-7 text-center text-sm font-semibold" aria-live="polite">{{ line.quantity }}</span>
          <button
            type="button"
            class="flex size-8 items-center justify-center text-text-primary hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-focus-ring"
            aria-label="Increase quantity"
            :disabled="line.quantity >= line.maxQuantity"
            @click="cart.updateQuantity(line.id, line.quantity + 1)"
          >
            <Icon name="lucide:plus" class="size-3.5" aria-hidden="true" />
          </button>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-text-primary">{{ formatCurrency(lineTotal) }}</p>
          <p v-if="line.comparePrice > line.unitPrice" class="text-xs text-text-muted line-through">{{ formatCurrency(line.comparePrice * line.quantity) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
