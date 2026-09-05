<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Connecting' })

const route = useRoute()

const providers: Record<string, { label: string; icon: string }> = {
  google: { label: 'Google', icon: 'logos:google-icon' },
  facebook: { label: 'Facebook', icon: 'simple-icons:facebook' },
  apple: { label: 'Apple', icon: 'simple-icons:apple' },
}
const provider = computed(() => providers[route.query.provider as string] ?? providers.google!)
const back = computed(() => (typeof route.query.next === 'string' ? route.query.next : '/login'))

const connected = ref(false)
onMounted(() => {
  setTimeout(() => (connected.value = true), 1600)
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <template v-if="!connected">
        <span class="mx-auto flex size-24 items-center justify-center rounded-full bg-gray-200">
          <Icon :name="provider.icon" class="size-11" aria-hidden="true" />
        </span>
        <h1 class="mt-6 font-display text-2xl font-bold text-text-primary">Connecting to {{ provider.label }}...</h1>
        <p class="mt-2 text-sm text-text-secondary">Please wait while we secure a connection to your {{ provider.label }} account.</p>
        <Icon name="lucide:loader-2" class="mx-auto mt-6 size-8 animate-spin text-text-muted" aria-hidden="true" />
      </template>

      <template v-else>
        <span class="mx-auto flex size-24 items-center justify-center rounded-full bg-danger-surface text-danger">
          <Icon name="lucide:plug-zap" class="size-10" aria-hidden="true" />
        </span>
        <h1 class="mt-6 font-display text-2xl font-bold text-text-primary">Not available yet</h1>
        <p class="mt-2 text-sm text-text-secondary">
          Signing in with {{ provider.label }} isn't connected yet — we're still wiring up real provider access. Please
          continue with email for now.
        </p>
        <BaseButton :to="back" variant="dark" block class="mt-6">Continue with email</BaseButton>
      </template>
    </div>
  </div>
</template>
