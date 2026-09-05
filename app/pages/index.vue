<script setup lang="ts">
useSeoMeta({
  title: 'ReStockr',
  description:
    "ReStockr is building the digital infrastructure layer connecting customers, retailers, suppliers, and fulfillment partners into one intelligent, scalable Commerce Operating System, starting with Africa's fastest-growing retail economy.",
  ogTitle: 'ReStockr — The Intelligence Layer for Global Commerce',
  ogDescription: "Africa's no. 1 auto-restocking platform.",
})
</script>

<template>
  <div>
    <HomeIntelligenceHero />
    <HomeWhatWereBuilding />
    <HomeHowItWorksCarousel />
    <HomeHero />
    <HomeProductShowcase />
    <HomeMerchantsOfMonth />
    <HomeHowItWorks />
    <HomeFaq />

    <section class="relative overflow-hidden bg-green-950 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 class="font-display text-3xl font-bold sm:text-4xl">Your No. 1 Platform for Restocking Everything You Need.</h2>
        <p class="mt-3 text-white/85">Making everyday shopping simpler, faster, and more convenient.</p>
        <BaseButton to="/welcome" variant="primary" size="lg" class="mt-6">Sign in/Register</BaseButton>
      </div>

      <span
        class="absolute right-6 top-1/2 hidden size-24 -translate-y-1/2 items-center justify-center rounded-2xl rounded-bl-none bg-green-800 sm:flex lg:right-16"
        aria-hidden="true"
      >
        <AppLogo mark-only tone="dark" />
      </span>
    </section>
  </div>
</template>
