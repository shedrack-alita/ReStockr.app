<script setup lang="ts">
/**
 * Brand lockup. The icon tile is always brand green (per the logo usage
 * guideline — "do not recolor individual elements of the logo"); only the
 * wordmark switches between black/white depending on what background it
 * sits on. `markOnly` drops the wordmark for tight spaces (e.g. a mobile
 * nav rail) and always uses the green mark, since it never sits on a dark
 * surface in this UI.
 *
 * The site's primary logo is real page content, not UI decoration — it
 * lives in public/images/logo/ (see that folder's README) and is
 * referenced by absolute path, not imported from app/assets/.
 */
const props = withDefaults(
  defineProps<{
    /** Which background this logo sits on. */
    tone?: 'light' | 'dark'
    /** Icon only, no wordmark. */
    markOnly?: boolean
  }>(),
  {
    tone: 'light',
    markOnly: false,
  },
)

const src = computed(() => {
  if (props.markOnly) return '/images/logo/logomark-green.svg'
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
