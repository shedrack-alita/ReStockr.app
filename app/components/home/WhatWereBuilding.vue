<script setup lang="ts">

const pillars = [
  {
    eyebrow: 'Sourcing',
    title: 'Supplier Network',
    description: 'Connecting businesses directly with verified suppliers and manufacturers.',
    icon: 'lucide:package-search',
  },
  {
    eyebrow: 'Intelligence',
    title: 'Inventory Intelligence',
    description: 'Real-time stock visibility and demand forecasting, so you never run out or overstock.',
    icon: 'lucide:monitor-cog',
  },
  {
    eyebrow: 'Automation',
    title: 'Procurement',
    description: 'Automating sourcing and purchasing processes end to end.',
    icon: 'lucide:refresh-cw',
  },
  {
    eyebrow: 'Logistics',
    title: 'Fulfillment Infrastructure',
    description: 'Warehousing, distribution and last-mile delivery connected in one network.',
    icon: 'lucide:warehouse',
  },
  {
    eyebrow: 'Insight',
    title: 'Business Analytics',
    description: 'Actionable insights for growth and decision-making.',
    icon: 'lucide:bar-chart-3',
  },
  {
    eyebrow: 'Capital',
    title: 'Embedded Finance',
    description: 'Payments, credit, insurance, and working capital access.',
    icon: 'lucide:credit-card',
  },
]

const rows = [pillars.slice(0, 3), pillars.slice(3)]
</script>

<template>
  <section class="py-14 text-center text-white sm:py-20">
    <p class="font-display-alt text-lg text-gold-400 sm:text-xl">What We're Building</p>
    <h2 class="font-display-alt mx-auto mt-2 max-w-4xl px-4 text-3xl leading-[1.15] sm:text-5xl">
      Not A Marketplace.
      <span class="block">An Intelligence Commerce OS.</span>
    </h2>
    <p class="mx-auto mt-5 max-w-2xl px-4 text-white/80">
      Supplier networks, inventory intelligence, procurement, fulfillment, analytics, and embedded finance, one
      ecosystem.
    </p>

    <div class="mt-10 space-y-4">
      <div v-for="(row, i) in rows" :key="i" class="flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:justify-center sm:px-6">
        <article
          v-for="pillar in row"
          :key="pillar.title"
          class="w-72 shrink-0 snap-start rounded-card bg-gradient-to-b from-white/15 to-white/5 p-6 text-left"
        >
          <span class="flex size-12 items-center justify-center rounded-field bg-green-950">
            <Icon :name="pillar.icon" class="size-6 text-white" aria-hidden="true" />
          </span>
          <p class="mt-4 inline-block rounded-full bg-green-800/60 px-3 py-1 text-xs font-semibold">{{ pillar.eyebrow }}</p>
          <h3 class="mt-2 font-display text-xl font-bold">{{ pillar.title }}</h3>
          <p class="mt-2 text-sm text-white/80">{{ pillar.description }}</p>
        </article>
      </div>
    </div>

    <a
      href="#how-it-works"
      class="mt-10 inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
    >
      How ReStockr Works
    </a>
  </section>
</template>
