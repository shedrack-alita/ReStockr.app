<script setup lang="ts">
const steps = [
  {
    label: 'Merchants Lists Product',
    url: '/images/home/howitworks-list.jpg',
  },
  {
    label: 'Customer Shops',
    url: '/images/home/howitworks-shop.jpg',
  },
  {
    label: 'Order & Payment',
    url: '/images/home/howitworks-order.jpg',
  },
  {
    label: 'Rider Picks Up',
    url: '/images/home/howitworks-pickup.jpg',
  },
  {
    label: 'Customer Receives',
    url: '/images/home/howitworks-receive.jpg',
  },
]
</script>

<template>
  <section id="how-it-works" class="pb-6">
    <div class="flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:justify-center sm:px-6">
      <div
        v-for="(step, i) in steps"
        :key="step.label"
        class="relative w-36 shrink-0 snap-start overflow-hidden rounded-field sm:w-48"
      >
        <NuxtImg
          :src="step.url"
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
