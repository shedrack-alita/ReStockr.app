<script setup lang="ts">

defineProps<{ name: string; image?: { url: string; alt: string } }>()
</script>

<template>
  <NuxtLink
    :to="`/marketplace?category=${encodeURIComponent(name)}`"
    class="group relative flex h-32 items-end overflow-hidden rounded-card bg-gradient-to-br from-green-400 via-green-600 to-green-800 p-5 shadow-sm transition-transform hover:-translate-y-0.5 sm:h-36"
  >
    <NuxtImg
      v-if="image"
      :src="image.url"
      :alt="image.alt"
      width="500"
      height="300"
      class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-950/30 to-green-950/10" aria-hidden="true" />
    <span class="relative font-display text-lg font-bold text-white drop-shadow sm:text-xl">{{ name }}</span>
  </NuxtLink>
</template>
