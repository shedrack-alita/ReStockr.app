<script setup lang="ts">
defineProps<{ title: string; description: string; icon: string }>()
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">{{ title }}</h1>
    <p class="mt-1 text-sm text-text-secondary">{{ description }}</p>

    <div class="mt-6 flex flex-col items-center gap-3 rounded-card bg-white py-20 text-center">
      <span class="flex size-14 items-center justify-center rounded-full bg-gray-100 text-text-muted">
        <Icon :name="icon" class="size-6" aria-hidden="true" />
      </span>
      <p class="font-display text-xl font-bold text-text-primary">Coming soon</p>
      <p class="max-w-xs text-sm text-text-muted">This section isn't built yet — check back soon.</p>
    </div>
  </div>
</template>
