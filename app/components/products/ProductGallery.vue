<script setup lang="ts">
import type { ProductImage } from '#shared/types/product'

const props = defineProps<{
  images: ProductImage[]
  productName: string
}>()

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value] ?? props.images[0]!)
</script>

<template>
  <div>
    <div class="aspect-square overflow-hidden rounded-field bg-white">
      <NuxtImg
        :src="activeImage.url"
        :alt="activeImage.alt"
        width="800"
        height="800"
        sizes="90vw sm:480px"
        class="size-full object-cover"
      />
    </div>
    <div v-if="images.length > 1" class="mt-3 flex gap-2">
      <button
        v-for="(image, i) in images"
        :key="image.url"
        type="button"
        class="size-16 shrink-0 overflow-hidden rounded-field border-2 transition-colors"
        :class="i === activeIndex ? 'border-green-500' : 'border-transparent hover:border-border-strong'"
        :aria-label="`Show image ${i + 1} of ${productName}`"
        :aria-current="i === activeIndex"
        @click="activeIndex = i"
      >
        <NuxtImg :src="image.url" :alt="''" width="64" height="64" class="size-full object-cover" />
      </button>
    </div>
  </div>
</template>
