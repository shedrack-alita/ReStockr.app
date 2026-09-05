<script setup lang="ts">

withDefaults(defineProps<{ showPlaceOrder?: boolean }>(), { showPlaceOrder: false })
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
  <div class="rounded-card bg-surface-card p-5">
    <h2 class="font-display text-lg font-bold text-text-primary">Order Summary</h2>

    <ul class="mt-4 max-h-64 space-y-3 overflow-y-auto">
      <li v-for="line in cart.lines.value" :key="line.id" class="flex items-center gap-3">
        <span class="relative size-12 shrink-0 overflow-hidden rounded-field bg-white">
          <NuxtImg :src="line.image.url" :alt="line.image.alt" width="48" height="48" class="size-full object-cover" />
          <span class="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-green-950 text-[10px] font-bold text-white">
            {{ line.quantity }}
          </span>
        </span>
        <span class="min-w-0 flex-1 truncate text-sm text-text-secondary">{{ line.name }}</span>
        <span class="shrink-0 text-sm font-semibold text-text-primary">{{ formatCurrency(line.unitPrice * line.quantity) }}</span>
      </li>
    </ul>

    <div class="mt-4 space-y-2 border-t border-border-subtle pt-4 text-sm">
      <div class="flex items-center justify-between text-text-secondary">
        <span>Subtotal</span>
        <span class="font-semibold text-text-primary">{{ formatCurrency(cart.subtotal.value) }}</span>
      </div>
      <div class="flex items-center justify-between text-text-secondary">
        <span>Delivery fee</span>
        <span class="font-semibold text-text-primary">{{ formatCurrency(checkout.deliveryFee.value) }}</span>
      </div>
      <div class="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-bold text-text-primary">
        <span>Total</span>
        <span>{{ formatCurrency(checkout.total.value) }}</span>
      </div>
    </div>

    <div v-if="checkout.shippingAddress.value" class="mt-4 border-t border-border-subtle pt-4 text-sm">
      <p class="font-semibold text-text-primary">Deliver to</p>
      <p class="mt-1 text-text-secondary">
        {{ checkout.shippingAddress.value.fullName }} · {{ checkout.shippingAddress.value.addressLine }}, {{ checkout.shippingAddress.value.city }}
      </p>
    </div>

    <BaseButton v-if="showPlaceOrder" variant="primary" block size="lg" class="mt-5" :loading="placing" @click="handlePlaceOrder">
      Place Order
    </BaseButton>
  </div>
</template>
