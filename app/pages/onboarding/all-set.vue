<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: "ReStockr - You're all set" })

const onboarding = useOnboardingStore()

function handleStartShopping() {
  onboarding.reset()
  navigateTo('/marketplace')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <div class="rounded-card border-1 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <p class="text-sm font-bold text-green-600">ALL SET</p>
      <h1 class="font-display text-4xl font-bold text-text-primary">You're all set.</h1>
      <p class="mt-3 text-sm text-text-secondary">
        Your feed is personalized and your details are saved. Everything is editable in Settings.
      </p>

      <div class="mt-5 flex items-start gap-3 rounded-field bg-white p-4">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-surface text-danger">
          <Icon name="lucide:sparkles" class="size-4" aria-hidden="true" />
        </span>
        <p class="text-sm text-text-secondary">
          New arrivals in chosen categories will land at the top of your home feed each Thursday.
        </p>
      </div>

      <BaseButton type="button" variant="dark" size="lg" class="mt-6" @click="handleStartShopping">
        Start Shopping
        <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
      </BaseButton>
    </div>
  </div>
</template>
