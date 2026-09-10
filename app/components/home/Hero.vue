<script setup lang="ts">

</script>

<template>
  <section class="relative overflow-hidden text-white">
    <div
      class="mx-auto max-w-4xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-16"
    >
      <h1
        class="font-display-alt text-4xl uppercase leading-[1.15] sm:text-5xl lg:text-6xl"
      >
        Auto-Restock Everything
        <span class="block">All in one place.</span>
      </h1>

      <p class="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:hidden">
        Africa's no. 1 auto-restocking platform.
      </p>

      <p class="mx-auto mt-4 hidden max-w-xl text-white/85 sm:block">
        Africa's no. 1 auto-restocking platform. Order from verified suppliers at
        wholesale prices, then let <span class="font-bold text-gold-400">ReStockr</span> predict every refill and
        dispatch it before you run out.
      </p>

      <NuxtLink
        to="/marketplace"
        class="mt-6 inline-flex items-center justify-center rounded-full border-1 border-white/70 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        Explore
      </NuxtLink>
    </div>

    <div class="relative z-20 mx-auto w-full px-4">
      <NuxtImg
        src="/images/home/hero-cart.png"
        alt=""
        width="1000"
        height="1000"
        sizes="35vw"
        class="pointer-events-none absolute left-[-20%] top-4 z-0 w-full max-w-[40%] opacity-60 brightness-90 saturate-75 sm:left-[-30%] sm:-top-90"
        aria-hidden="true"
      />
      <NuxtImg
        src="/images/home/hero-cart.png"
        alt=""
        width="1000"
        height="1000"
        sizes="35vw"
        class="pointer-events-none absolute right-[-20%] top-4 z-0 w-full max-w-[40%] opacity-60 brightness-90 saturate-75 sm:right-[-30%] sm:-top-90"
        aria-hidden="true"
      />
      <NuxtImg
        src="/images/home/hero-cart.png"
        alt="A shopping cart filled with gift-wrapped boxes and shopping bags, representing the ReStockr marketplace"
        width="1000"
        height="1000"
        sizes="95vw sm:480px lg:900px"
        preload
        fetchpriority="high"
        class="relative z-10 mx-auto h-auto w-full max-w-[100%] drop-shadow-2xl sm:max-w-md lg:max-w-[50%]"
      />
    </div>
  </section>
</template>