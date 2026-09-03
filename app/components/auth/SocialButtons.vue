<script setup lang="ts">
/**
 * Facebook/Google/Apple sign-in buttons, per the design mock (Sign In.png,
 * Create account.png). Not wired to real OAuth — that needs actual
 * provider app registration (client IDs, redirect URIs) which is a
 * backend/infra decision, not a frontend one. Presentational only until
 * that exists.
 */
const providers = [
  { name: 'Facebook', icon: 'simple-icons:facebook', class: 'bg-[#1877F2] text-white' },
  { name: 'Google', icon: 'logos:google-icon', class: 'bg-white border border-border-subtle' },
  { name: 'Apple', icon: 'simple-icons:apple', class: 'bg-gray-950 text-white' },
] as const
</script>

<template>
  <div class="flex items-center justify-center gap-3">
    <button
      v-for="provider in providers"
      :key="provider.name"
      type="button"
      :title="`Continue with ${provider.name} — coming soon`"
      :aria-label="`Continue with ${provider.name}`"
      class="flex size-11 items-center justify-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
      :class="provider.class"
    >
      <Icon :name="provider.icon" class="size-5" aria-hidden="true" />
    </button>
  </div>
</template>
