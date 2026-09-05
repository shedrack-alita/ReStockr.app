<script setup lang="ts">

const stats = [
  { label: 'Businesses served by 2036', value: '1M+' },
  { label: 'Annual commerce volume (2036 target)', value: '$10B+' },
  { label: 'Suppliers onboarded (2036 target)', value: '100K+' },
  { label: 'Customer satisfaction target', value: '95%' },
]
</script>

<template>
  <section class="px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
    <div class="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <p class="font-display-alt text-lg text-gold-400 sm:text-xl">More Than Storefronts:</p>
        <h1 class="font-display-alt mt-2 text-4xl leading-[1.15] text-white sm:text-5xl lg:text-6xl">
          The Intelligence Layer For Global
          <span class="block text-white/90">Commerce</span>
        </h1>
        <p class="mt-5 max-w-lg text-white/80">
          ReStockr is building the digital infrastructure layer connecting customers, retailers, suppliers, and
          fulfillment partners into one intelligent, scalable Commerce Operating System, starting with Africa's
          fastest-growing retail economy.
        </p>
        <a
          href="#showcase"
          class="mt-6 inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Explore
        </a>
      </div>

      <div class="aspect-square w-full overflow-hidden rounded-card bg-gray-100 shadow-xl lg:aspect-[4/3.2]">
        <NuxtImg
          src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Modern_warehouse_with_pallet_rack_storage_system.jpg"
          alt="Warehouse shelving stacked with boxed inventory, ready for fulfillment"
          width="900"
          height="720"
          sizes="90vw sm:480px lg:600px"
          loading="lazy"
          class="size-full object-cover"
        />
      </div>
    </div>

    <dl class="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-card bg-white/10 p-5">
        <dt class="text-sm text-white/75">{{ stat.label }}</dt>
        <dd class="font-display-alt mt-2 text-3xl text-white sm:text-4xl">{{ stat.value }}</dd>
      </div>
    </dl>
  </section>
</template>
