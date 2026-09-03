<script setup lang="ts">

</script>

<template>
  <section class="relative text-white">
    <!-- Hero background -->
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-b from-green-900 via-green-950 to-green-950"
      aria-hidden="true"
    />

    <!-- Hero content -->
    <div
      class="mx-auto max-w-4xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-16"
    >
      <h1
        class="font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
      >
        Restock Everything
        <span class="block">All in one place.</span>
      </h1>

      <!-- Mobile description -->
      <p class="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:hidden">
        Africa's auto-restock marketplace.
      </p>

      <!-- Desktop description -->
      <p class="mx-auto mt-4 hidden max-w-xl text-white/85 sm:block">
        Africa's auto-restock marketplace. Order from verified suppliers at
        wholesale prices, then let ReStockr predict every refill and dispatch
        it before you run out.
      </p>

      <!-- Explore button -->
      <a
        href="#showcase"
        class="mt-6 inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        Explore
      </a>
    </div>

    <!-- Hero cart -->
    <div class="relative z-20 mx-auto w-full px-4">
      <NuxtImg
        src="/images/home/hero-cart.png"
        alt="A shopping cart filled with gift-wrapped boxes and shopping bags, representing the ReStockr marketplace"
        width="812"
        height="939"
        sizes="85vw sm:448px lg:512px"
        preload
        fetchpriority="high"
        class="mx-auto h-auto w-full max-w-[420px] drop-shadow-2xl sm:max-w-md lg:max-w-lg"
      />
    </div>
  </section>
</template>