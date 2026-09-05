<script setup lang="ts">

const cart = useCart()
</script>

<template>
  <div v-if="cart.isDrawerOpen.value" class="fixed inset-0 z-50 bg-gray-950/50" @click.self="cart.closeDrawer()">
    <aside
      class="ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
    >
      <div class="flex items-center justify-between border-b border-border-subtle px-5 py-4">
        <h2 class="font-display text-lg font-bold text-text-primary">Your Cart ({{ cart.itemCount.value }})</h2>
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-full text-text-secondary hover:bg-gray-100 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
          aria-label="Close cart"
          @click="cart.closeDrawer()"
        >
          <Icon name="lucide:x" class="size-5" aria-hidden="true" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-5">
        <div v-if="cart.isEmpty.value" class="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
          <Icon name="lucide:shopping-cart" class="size-10 text-text-muted" aria-hidden="true" />
          <p class="text-sm font-semibold text-text-primary">Your cart is empty</p>
          <p class="max-w-[220px] text-xs text-text-muted">Add items from the marketplace to see them here.</p>
          <BaseButton to="/marketplace" variant="primary" size="sm" class="mt-2" @click="cart.closeDrawer()">Start shopping</BaseButton>
        </div>
        <div v-else class="divide-y divide-border-subtle">
          <CartItem v-for="line in cart.lines.value" :key="line.id" :line="line" compact />
        </div>
      </div>

      <div v-if="!cart.isEmpty.value" class="border-t border-border-subtle px-5 py-4">
        <CartSummary @click="cart.closeDrawer()" />
      </div>
    </aside>
  </div>
</template>
