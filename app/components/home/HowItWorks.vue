<script setup lang="ts">
const steps = [
  { label: 'Merchants Lists Product', seed: 'restockr-step-list' },
  { label: 'Customer Shops', seed: 'restockr-step-shop' },
  { label: 'Order & Payment', seed: 'restockr-step-pay' },
  { label: 'Rider Picks Up', seed: 'restockr-step-pickup' },
  { label: 'Customer Receives', seed: 'restockr-step-receive' },
]
</script>

<template>
  <section class="py-14 text-white sm:py-20">
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <h2 class="font-display text-2xl font-bold sm:text-3xl">
        We Are Positioned To Help Businesses And Households Automatically Replenish Products Before They Run Out.
      </h2>

      <a
        href="#showcase"
        class="mt-6 inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        How ReStockr Works
      </a>
    </div>

    <div class="mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:justify-center sm:px-6">
      <div
        v-for="(step, i) in steps"
        :key="step.label"
        class="relative w-36 shrink-0 snap-start overflow-hidden rounded-field sm:w-48"
      >
        <NuxtImg
          :src="`https://picsum.photos/seed/${step.seed}/300/380`"
          :alt="step.label"
          width="300"
          height="380"
          sizes="144px sm:192px"
          loading="lazy"
          class="aspect-[4/5] w-full object-cover"
        />
        <span
          class="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-gray-950"
          aria-hidden="true"
        >
          {{ i + 1 }}
        </span>
        <span class="absolute inset-x-0 bottom-0 bg-gold-500 px-2 py-1.5 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-gray-950">
          {{ step.label }}
        </span>
      </div>
    </div>
  </section>
</template>
