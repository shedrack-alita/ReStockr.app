<script setup lang="ts">
useSeoMeta({
  title: 'ReStockr - About',
  description: 'ReStockr Technologies — the Commerce Operating System for Africa and emerging markets.',
})

const audiences = [
  {
    key: 'customers',
    title: 'Customers',
    description: 'Order from verified suppliers at wholesale prices, and let ReStockr predict every refill and dispatch it before you run out.',
    icon: 'lucide:shopping-bag',
  },
  {
    key: 'merchants',
    title: 'Merchants',
    description: 'List your catalog, manage inventory and fulfil orders through a single queue built for restocking, not one-off sales.',
    icon: 'lucide:store',
  },
  {
    key: 'riders',
    title: 'Riders',
    description: 'Pick up delivery offers and get customer orders where they need to go, tracked from pickup to drop-off.',
    icon: 'lucide:bike',
  },
]
</script>

<template>
  <div>
    <section class="relative text-white">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-[#091d05] via-[#184c0e] to-[#143d0c]" aria-hidden="true" />
      <div class="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h1 class="font-display text-4xl font-bold leading-[1.08] sm:text-5xl">About ReStockr</h1>
        <p class="mx-auto mt-4 max-w-xl text-white/85">
          ReStockr Technologies — the Commerce Operating System for Africa and emerging markets.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Africa's auto-restock marketplace</h2>
      <p class="mx-auto mt-4 max-w-2xl text-text-secondary">
        ReStockr connects customers with verified suppliers at wholesale prices, then predicts every refill and
        dispatches it before you run out — so restocking the things you need becomes automatic, not another task
        on your list.
      </p>
    </section>

    <section class="bg-surface-sunken px-4 py-14 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center font-display text-2xl font-bold text-text-primary sm:text-3xl">Built for everyone in the supply chain</h2>
        <div class="mt-10 grid gap-6 sm:grid-cols-3">
          <div v-for="audience in audiences" :key="audience.key" class="rounded-card bg-white p-6 text-center shadow-sm">
            <span class="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Icon :name="audience.icon" class="size-6" aria-hidden="true" />
            </span>
            <h3 class="mt-4 font-display text-lg font-bold text-text-primary">{{ audience.title }}</h3>
            <p class="mt-2 text-sm text-text-secondary">{{ audience.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-green-950 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 class="font-display text-3xl font-bold sm:text-4xl">Your No. 1 Marketplace for Everything You Need.</h2>
        <p class="mt-3 text-white/85">Making everyday shopping simpler, faster, and more convenient.</p>
        <BaseButton to="/marketplace" variant="primary" size="lg" class="mt-6">Explore the marketplace</BaseButton>
      </div>
    </section>
  </div>
</template>
