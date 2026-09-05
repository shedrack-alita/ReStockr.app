<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

useSeoMeta({ title: 'ReStockr - Your Cart' })

const cart = useCart()
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Your Cart</h1>

    <div v-if="cart.isEmpty.value" class="mt-10 flex flex-col items-center gap-3 rounded-card bg-surface-card py-20 text-center">
      <Icon name="lucide:shopping-cart" class="size-12 text-text-muted" aria-hidden="true" />
      <p class="text-base font-semibold text-text-primary">Your cart is empty</p>
      <p class="max-w-xs text-sm text-text-muted">Browse the marketplace and add items to get started.</p>
      <BaseButton to="/marketplace" variant="primary" class="mt-3">Start shopping</BaseButton>
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div class="divide-y divide-border-subtle rounded-card bg-surface-card px-4 sm:px-6">
        <CartItem v-for="line in cart.lines.value" :key="line.id" :line="line" />
      </div>

      <div class="h-fit rounded-card bg-surface-card p-5 lg:sticky lg:top-24">
        <h2 class="font-display text-lg font-bold text-text-primary">Order Summary</h2>
        <CartSummary class="mt-4" />
      </div>
    </div>
  </div>
</template>
