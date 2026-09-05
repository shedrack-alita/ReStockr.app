<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    tone?: 'light' | 'dark'
    markOnly?: boolean
  }>(),
  {
    tone: 'light',
    markOnly: false,
  },
)

const src = computed(() => {
  if (props.markOnly) return props.tone === 'dark' ? '/images/logo/logomark-white.svg' : '/images/logo/logomark-green.svg'
  return props.tone === 'dark' ? '/images/logo/logo-full-white.svg' : '/images/logo/logo-full-black.svg'
})
</script>

<template>
  <img
    :src="src"
    alt="ReStockr"
    :class="markOnly ? 'h-9 w-9' : 'h-8 w-auto'"
    width="160"
    height="48"
  />
</template>
