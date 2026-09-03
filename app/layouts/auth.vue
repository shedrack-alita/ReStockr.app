<script setup lang="ts">
/**
 * Split-screen auth shell, per the design mocks (Sign In.png, Create
 * account.png, Password recovery.png, Reset Link.png): a green brand
 * panel on the left (hidden below `lg`, where there isn't room for it)
 * and a light-gray panel on the right where each page renders its own
 * card + everything below it via the default slot.
 *
 * The left panel's headline/subtext is mock-specific copy that differs
 * per page but isn't itself page content — it's swapped by route name
 * here rather than threaded through as page props, since Nuxt layouts
 * only expose a single default slot to `definePageMeta({ layout })` pages.
 */
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
}

const content = computed(() => leftPanelContent[route.name as string] ?? leftPanelContent.login)
</script>

<template>
  <div class="flex min-h-dvh flex-col lg:flex-row">
    <!-- Mobile/tablet: compact green header bar, since the full brand panel doesn't fit. -->
    <div class="flex items-center bg-green-950 px-4 py-4 sm:px-6 lg:hidden">
      <NuxtLink to="/" aria-label="ReStockr home">
        <AppLogo tone="dark" />
      </NuxtLink>
    </div>

    <div class="relative hidden overflow-hidden bg-gradient-to-b from-green-900 via-green-950 to-green-950 text-white lg:flex lg:w-[42%] lg:shrink-0 lg:flex-col lg:justify-between lg:p-10 xl:p-14">
      <NuxtLink to="/" aria-label="ReStockr home">
        <AppLogo tone="dark" />
      </NuxtLink>

      <NuxtImg
        src="/images/home/hero-cart.png"
        alt=""
        width="812"
        height="939"
        sizes="320px"
        class="mx-auto w-full max-w-[280px] xl:max-w-xs"
      />

      <div>
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
</template>
