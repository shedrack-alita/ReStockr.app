<script setup lang="ts">

withDefaults(
  defineProps<{
    ctaLabel?: string
    ctaTo?: string
    showCta?: boolean
  }>(),
  { ctaLabel: 'Proceed to Checkout', ctaTo: '/checkout', showCta: true },
)

const cart = useCart()
const savings = computed(() => cart.compareSubtotal.value - cart.subtotal.value)
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between text-sm text-text-secondary">
      <span>Subtotal ({{ cart.itemCount.value }} item{{ cart.itemCount.value === 1 ? '' : 's' }})</span>
      <span class="font-semibold text-text-primary">{{ formatCurrency(cart.subtotal.value) }}</span>
    </div>
    <div v-if="savings > 0" class="flex items-center justify-between text-sm text-success">
      <span>You're saving</span>
      <span class="font-semibold">{{ formatCurrency(savings) }}</span>
    </div>
    <div class="flex items-center justify-between border-t border-border-subtle pt-3 text-base font-bold text-text-primary">
      <span>Total</span>
      <span>{{ formatCurrency(cart.subtotal.value) }}</span>
    </div>
    <p class="text-xs text-text-muted">Delivery fee is calculated at checkout.</p>

    <BaseButton v-if="showCta" :to="ctaTo" variant="primary" block :disabled="cart.isEmpty.value" size="lg">
      {{ ctaLabel }}
    </BaseButton>
  </div>
</template>
