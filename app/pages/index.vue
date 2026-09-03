<script setup lang="ts">
useSeoMeta({
  title: 'ReStockr Site',
  description:
    "Africa's auto-restock marketplace. Order from verified suppliers at wholesale prices, then let ReStockr predict every refill and dispatch it before you run out.",
  ogTitle: 'ReStockr — Restock everything, all in one place',
  ogDescription: "Africa's auto-restock marketplace.",
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeProductShowcase />
    <HomeMerchantsOfMonth />
    <HomeHowItWorks />
    <HomeFaq />

    <section class="bg-green-950 py-16 text-center text-white">
      <div class="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 class="font-display text-3xl font-bold sm:text-4xl">Your No. 1 Marketplace for Everything You Need.</h2>
        <p class="mt-3 text-white/85">Making everyday shopping simpler, faster, and more convenient.</p>
        <BaseButton to="/login" variant="primary" size="lg" class="mt-6">Sign in/Register</BaseButton>
      </div>
    </section>
  </div>
</template>