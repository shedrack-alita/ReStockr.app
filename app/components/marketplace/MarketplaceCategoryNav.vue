<script setup lang="ts">

defineProps<{ categories: readonly string[] }>()
const emit = defineEmits<{ close: [] }>()

const collections = ['Specials Pack', 'Deal of the day', 'Exclusive']
</script>

<template>
  <div class="w-64 rounded-field bg-green-50 p-4 shadow-lg">
    <ul class="space-y-2 text-sm text-text-primary">
      <li>
        <NuxtLink to="/marketplace" class="block hover:font-semibold" @click="emit('close')">New Listed</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/marketplace#best-sellers" class="block hover:font-semibold" @click="emit('close')">Best Sellers</NuxtLink>
      </li>
      <li v-for="category in categories" :key="category">
        <NuxtLink :to="`/marketplace?category=${encodeURIComponent(category)}`" class="block hover:font-semibold" @click="emit('close')">
          {{ category }}
        </NuxtLink>
      </li>
    </ul>
    <ul class="mt-4 space-y-2 border-t border-green-200 pt-4 text-sm font-bold text-text-primary">
      <li v-for="collection in collections" :key="collection">
        <span class="block cursor-default">{{ collection }}</span>
      </li>
    </ul>
  </div>
</template>
