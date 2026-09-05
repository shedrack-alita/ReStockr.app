<script setup lang="ts">

const route = useRoute()

const providers = [
  { key: 'facebook', name: 'Facebook', icon: 'simple-icons:facebook', class: 'bg-[#1877F2] text-white' },
  { key: 'google', name: 'Google', icon: 'logos:google-icon', class: 'bg-white border border-border-subtle' },
  { key: 'apple', name: 'Apple', icon: 'simple-icons:apple', class: 'bg-gray-950 text-white' },
] as const
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <NuxtLink
      v-for="provider in providers"
      :key="provider.name"
      :to="{ path: '/auth/connecting', query: { provider: provider.key, next: route.path } }"
      :aria-label="`Continue with ${provider.name}`"
      class="flex size-11 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
      :class="provider.class"
    >
      <Icon :name="provider.icon" class="size-5" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>
