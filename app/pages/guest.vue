<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Browsing as guest' })
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-1 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <p class="text-xs font-bold uppercase tracking-wide text-green-600">Browsing as guest</p>
      <h1 class="mt-1 font-display text-3xl font-bold text-text-primary">Have a look around.</h1>
      <p class="mt-3 text-sm text-text-secondary">
        Add anything you like to your cart. We'll only ask you to sign in when it's time to checkout.
      </p>

      <div class="mt-5 flex items-start gap-3 rounded-field bg-surface-input/50 p-4">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-surface text-danger">
          <Icon name="lucide:shopping-bag" class="size-4" aria-hidden="true" />
        </span>
        <p class="text-sm text-text-secondary">
          Guest carts are kept for 5 days on this device. Create an account any time to save it for good.
        </p>
      </div>

      <div class="mt-6 space-y-3">
        <BaseButton to="/marketplace" variant="dark" size="lg" block>
          Start Shopping
          <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
        </BaseButton>
        <BaseButton to="/register" variant="ghost" size="lg" block>
          Create an account
        </BaseButton>
      </div>
    </div>
  </div>
</template>
