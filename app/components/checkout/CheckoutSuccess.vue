<script setup lang="ts">
import type { Order } from '#shared/types/order'

/** Order confirmation, shown after checkout.placeOrder() succeeds. */
defineProps<{ order: Order }>()
</script>

<template>
  <div class="mx-auto max-w-lg py-10 text-center">
    <span class="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600">
      <Icon name="lucide:check" class="size-8" aria-hidden="true" />
    </span>
    <h1 class="mt-5 font-display text-2xl font-bold text-text-primary sm:text-3xl">Order placed!</h1>
    <p class="mt-2 text-sm text-text-secondary">
      Your order <span class="font-semibold text-text-primary">#{{ order.reference }}</span> has been confirmed and is being prepared.
    </p>

    <div class="mt-6 rounded-card bg-surface-card p-5 text-left text-sm">
      <div class="flex items-center justify-between">
        <span class="text-text-secondary">Total paid</span>
        <span class="font-bold text-text-primary">{{ formatCurrency(order.total) }}</span>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-text-secondary">Payment method</span>
        <span class="font-semibold text-text-primary capitalize">{{ order.paymentMethod.replace('-', ' ') }}</span>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-text-secondary">Delivering to</span>
        <span class="max-w-[60%] text-right font-semibold text-text-primary">{{ order.shippingAddress.addressLine }}, {{ order.shippingAddress.city }}</span>
      </div>
    </div>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <BaseButton to="/marketplace" variant="primary">Continue shopping</BaseButton>
      <BaseButton to="/orders" variant="ghost">View my orders</BaseButton>
    </div>
  </div>
</template>
