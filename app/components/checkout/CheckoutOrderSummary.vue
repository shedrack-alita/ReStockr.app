<script setup lang="ts">
const emit = defineEmits<{ 'place-order': [] }>()

const cart = useCart()
const checkout = useCheckout()

const placing = ref(false)

async function handlePlaceOrder() {
  placing.value = true
  try {
    emit('place-order')
  } finally {
    placing.value = false
  }
}
</script>

<template>
  <div class="rounded-card bg-surface-card p-5 sm:p-6">
    <h2 class="font-display text-lg font-bold text-text-primary">Order items ({{ cart.itemCount.value }})</h2>

    <ul class="mt-4 max-h-72 space-y-4 overflow-y-auto">
      <li v-for="line in cart.lines.value" :key="line.id" class="flex items-center gap-3">
        <span class="size-14 shrink-0 overflow-hidden rounded-field bg-white">
          <NuxtImg :src="line.image.url" :alt="line.image.alt" width="56" height="56" class="size-full object-cover" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-bold text-text-primary">{{ line.name }}</span>
          <span class="block text-sm text-text-secondary">{{ formatCurrency(line.unitPrice) }}</span>
        </span>
        <span class="flex size-9 shrink-0 items-center justify-center rounded-field border border-border-strong text-sm font-bold text-text-primary">
          {{ line.quantity }}
        </span>
      </li>
    </ul>

    <div class="mt-4 space-y-2 border-t border-border-subtle pt-4 text-sm">
      <div class="flex items-center justify-between text-text-secondary">
        <span>Subtotal</span>
        <span class="font-semibold text-text-primary">{{ formatCurrency(cart.subtotal.value) }}</span>
      </div>
      <div class="flex items-center justify-between text-text-secondary">
        <span>Shipping</span>
        <span class="font-semibold" :class="checkout.deliveryFee.value > 0 ? 'text-text-primary' : 'text-success'">
          {{ checkout.deliveryFee.value > 0 ? formatCurrency(checkout.deliveryFee.value) : 'FREE' }}
        </span>
      </div>
      <div class="flex items-center justify-between text-text-secondary">
        <span>Estimated Tax</span>
        <span class="font-semibold text-text-primary">₦0</span>
      </div>
      <div class="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-bold text-text-primary">
        <span>Total</span>
        <span>{{ formatCurrency(checkout.total.value) }}</span>
      </div>
    </div>

    <BaseButton variant="dark" block size="lg" class="mt-5" :loading="placing" @click="handlePlaceOrder">
      Place Order
    </BaseButton>
  </div>
</template>
