<script setup lang="ts">
const merchants = [
  {
    name: 'David Okolie',
    blurb:
      "Merchant of the week, proudly serving ReStockr customers with great dedication and reliable service. David continues to raise the bar for product quality, consistency, and commitment to customer satisfaction.",
    icon: 'lucide:user-round',
    ring: 'bg-blue-500/20 text-blue-100',
  },
  {
    name: 'Grace Manuella',
    blurb:
      "Merchant of the week, bringing a wonderful selection of quality items to ReStockr customers. With an impressive 78% sales rate, Grace continues to stand out for quality products and excellent customer service.",
    icon: 'lucide:user-round',
    ring: 'bg-pink-500/20 text-pink-100',
  },
]
</script>

<template>
  <section class="px-4 py-14 text-white sm:px-6 sm:py-20">
    <div class="mx-auto max-w-4xl">
      <h2 class="font-display text-2xl font-bold sm:text-3xl">Merchants of the Month</h2>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <article
          v-for="merchant in merchants"
          :key="merchant.name"
          class="flex items-center gap-4 rounded-card border border-white/15 bg-white/5 p-4"
        >
          <span class="flex size-14 shrink-0 items-center justify-center rounded-full" :class="merchant.ring">
            <Icon :name="merchant.icon" class="size-7" aria-hidden="true" />
          </span>
          <div>
            <p class="text-sm font-bold uppercase tracking-wide">{{ merchant.name }}</p>
            <p class="mt-1 text-xs leading-relaxed text-white/75">{{ merchant.blurb }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
