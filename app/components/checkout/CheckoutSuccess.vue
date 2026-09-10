<script setup lang="ts">
import type { Order } from '#shared/types/order'

/** Order confirmation, shown after checkout.placeOrder() succeeds. */
const props = defineProps<{ order: Order }>()

const auth = useAuth()

const placedAt = computed(() => new Date(props.order.placedAt))
function formatStep(offsetDays = 0) {
  const d = new Date(placedAt.value)
  d.setDate(d.getDate() + offsetDays)
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
    <div class="text-center lg:pt-10 lg:text-left">
      <span class="mx-auto flex size-24 items-center justify-center rounded-full bg-green-700 text-white lg:mx-0">
        <Icon name="lucide:check" class="size-11" aria-hidden="true" />
      </span>
      <h1 class="mt-6 font-display text-3xl font-bold text-text-primary sm:text-4xl">Order Placed Successfully</h1>
      <p class="mx-auto mt-3 max-w-sm text-text-secondary lg:mx-0">
        Thank you for your order. We've sent a confirmation email to
        <span class="font-semibold text-text-primary">{{ auth.user.value?.email ?? 'yourname@gmail.com' }}</span>
      </p>

      <p class="mt-6 text-text-muted">Order Number: <span class="font-semibold text-text-primary">#{{ order.reference }}</span></p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <BaseButton :to="`/orders/${order.id}`" variant="dark" size="lg">View order details</BaseButton>
        <BaseButton to="/marketplace" variant="outline" size="lg" class="text-text-primary">Continue Shopping</BaseButton>
      </div>
    </div>

    <div class="rounded-card bg-surface-card p-6 sm:p-8">
      <h2 class="font-display text-lg font-bold text-text-primary">What's next?</h2>

      <ol class="relative mt-5 space-y-8 border-l border-border-strong pl-6">
        <li class="relative">
          <span class="absolute -left-[29px] top-0.5 size-3 rounded-full border-2 border-text-primary bg-surface-card" aria-hidden="true" />
          <p class="font-display text-base font-bold text-text-primary">Order Confirmed</p>
          <p class="text-sm text-text-muted">{{ formatStep(0) }}</p>
        </li>
        <li class="relative">
          <span class="absolute -left-[29px] top-0.5 size-3 rounded-full border-2 border-text-primary bg-surface-card" aria-hidden="true" />
          <p class="font-display text-base font-bold text-text-primary">Processing</p>
          <p class="text-sm text-text-muted">We're preparing your items</p>
        </li>
        <li class="relative">
          <span class="absolute -left-[29px] top-0.5 size-3 rounded-full border-2 border-text-primary bg-surface-card" aria-hidden="true" />
          <div class="flex flex-wrap items-center gap-2">
            <p class="font-display text-base font-bold text-text-primary">Out for Delivery</p>
            <NuxtLink :to="`/orders/${order.id}`" class="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-primary ring-1 ring-border-subtle hover:bg-gray-100">
              Track here
            </NuxtLink>
          </div>
          <p class="text-sm text-text-muted">You'll get a tracking link soon.</p>
        </li>
        <li class="relative">
          <span class="absolute -left-[29px] top-0.5 size-3 rounded-full border-2 border-text-primary bg-surface-card" aria-hidden="true" />
          <p class="font-display text-base font-bold text-text-primary">Delivered</p>
          <p class="text-sm text-text-muted">Estimated {{ formatStep(1) }} – {{ formatStep(4) }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>
