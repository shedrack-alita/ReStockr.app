<script setup lang="ts">

const products = useProductsStore()

const slides = computed(() => {
  const featured = products.newlyListed.filter((p) => p.heroImage).slice(0, 4)
  return featured.length > 0 ? featured : [undefined]
})

const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function start() {
  stop()
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.value.length
  }, 6000)
}
function stop() {
  if (timer) clearInterval(timer)
}

onMounted(start)
onUnmounted(stop)

const activeSlide = computed(() => slides.value[activeIndex.value])
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
    <div class="relative overflow-hidden rounded-card bg-green-150 px-6 py-10 sm:px-12 sm:py-16 shadow-md">
      <div class="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <p class="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
            New Arrivals
            <span class="h-1 w-10 rounded-full bg-green-500" aria-hidden="true" />
          </p>
          <h2 class="mt-2 font-display text-4xl font-bold leading-[1.05] text-text-primary sm:text-6xl">
            {{ activeSlide?.name.split(' ').slice(0, -1).join(' ') || activeSlide?.name || 'New arrivals' }}
          </h2>
          <p v-if="activeSlide" class="mt-1 font-display text-xl font-bold text-text-primary sm:text-2xl">
            {{ activeSlide.name.split(' ').at(-1) }}
          </p>
          <p class="mt-4 max-w-sm text-sm font-medium text-text-secondary sm:text-base">
            Discover the latest gadgets with innovative features and premium designs
          </p>
          <BaseButton :to="activeSlide ? `/product/${activeSlide.slug}` : '/marketplace'" variant="dark" class="mt-6">
            Shop Now
            <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
          </BaseButton>
        </div>

        <div class="relative">
          <NuxtImg
            v-if="activeSlide?.heroImage"
            :src="activeSlide.heroImage.url"
            :alt="activeSlide.heroImage.alt"
            width="375"
            height="375"
            sizes="70vw sm:360px"
            class="relative z-10 mx-auto h-auto w-full max-w-[220px] drop-shadow-2xl sm:max-w-[280px]"
          />
          <div class="absolute inset-x-8 bottom-0 h-10 rounded-full bg-black/20 blur-xl" aria-hidden="true" />
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-2 sm:justify-start" role="tablist" aria-label="Promo slides">
        <button
          v-for="(slide, i) in slides"
          :key="slide?.id ?? i"
          type="button"
          role="tab"
          :aria-selected="i === activeIndex"
          :aria-label="`Show slide ${i + 1}`"
          class="h-2 rounded-full transition-all"
          :class="i === activeIndex ? 'w-6 bg-green-950' : 'w-2 bg-gray-300 hover:bg-gray-400'"
          @click="activeIndex = i"
        />
      </div>
    </div>
  </section>
</template>
