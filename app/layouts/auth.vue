<script setup lang="ts">

const route = useRoute()

const leftPanelContent: Record<string, { headline: string[]; subtext: string }> = {
  login: {
    headline: ['On your Doorstep', 'by Morning.'],
    subtext: 'Order before 6pm and it ships the same evening, tracked end to end.',
  },
  register: {
    headline: ['Objects chosen,', 'not listed'],
    subtext: 'A small team of buyers edits every drop, so the catalogue stays worth scrolling.',
  },
  'forgot-password': {
    headline: ['Discover gears', 'that earns its shelf.'],
    subtext: 'Audio, home and desk essentials, tested before they make the shelf.',
  },
  'reset-password': {
    headline: ['Discover gears', 'that earns its shelf.'],
    subtext: 'Audio, home and desk essentials, tested before they make the shelf.',
  },
  welcome: {
    headline: ['Restock Everything', 'at One Place.'],
    subtext: 'A place where you can get all you want from the store to your doorstep.',
  },
  'merchant-welcome': {
    headline: ['Restock Everything', 'at One Place.'],
    subtext: 'A place where you can get all you want from the store to your doorstep.',
  },
  'merchant-login': {
    headline: ["Today's queue is", 'waiting.'],
    subtext: 'Accept, pack and hand off orders without leaving the counter.',
  },
  'rider-login': {
    headline: ['Short hops, paid', 'the same day.'],
    subtext: 'Pick up from local stores and drop within a 5km radius. Choose your own hours.',
  },
  'rider-register': {
    headline: ['Short hops, paid', 'the same day.'],
    subtext: 'Pick up from local stores and drop within a 5km radius. Choose your own hours.',
  },
}


const content = computed(() => leftPanelContent[route.name as string] ?? leftPanelContent.login!)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <div class="flex flex-1 flex-col lg:min-h-[80dvh] lg:flex-row">
      <div class="flex items-center bg-green-950 px-4 py-4 sm:px-6 lg:hidden">
        <NuxtLink to="/" aria-label="ReStockr home">
          <AppLogo tone="dark" />
        </NuxtLink>
      </div>

      <div class="relative hidden overflow-hidden bg-gradient-to-b from-green-900 via-green-950 to-green-950 text-white lg:flex lg:w-[42%] lg:shrink-0 lg:flex-col">
        
        <NuxtImg
          src="/images/home/hero-cart.png"
          alt=""
          width="812"
          height="939"
          sizes="600px"
          class="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[118%] w-auto max-w-none -translate-x-1/2 translate-y-[16%]"
          aria-hidden="true"
        />

        <div class="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-green-950 via-green-950/5 to-transparent" aria-hidden="true" />

        <NuxtLink to="/" aria-label="ReStockr home" class="relative z-20 mx-auto p-10 xl:p-14">
          <AppLogo tone="dark" />
        </NuxtLink>

        <div class="relative z-20 mt-auto p-10 xl:p-14">
          <h2 class="font-display text-4xl font-bold leading-[1.05] xl:text-5xl">
            <span v-for="line in content.headline" :key="line" class="block">{{ line }}</span>
          </h2>
          <p class="mt-3 text-white/80">{{ content.subtext }}</p>
        </div>
      </div>

      <div class="flex flex-1 flex-col items-center justify-center bg-gray-300 px-4 py-10 sm:px-6 lg:py-16">
        <slot />
      </div>
    </div>

    <LayoutFooter dark />
  </div>
</template>
