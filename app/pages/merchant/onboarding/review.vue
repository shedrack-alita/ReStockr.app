<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Onboarding in progress' })

const onboarding = useMerchantOnboardingStore()

if (!onboarding.store) navigateTo('/merchant/onboarding/store')

const checklist = [
  { label: 'Profile information', icon: 'lucide:user-check' },
  { label: 'Store information', icon: 'lucide:store' },
  { label: 'Documents submitted', icon: 'lucide:file-check-2' },
]

onMounted(() => {
  onboarding.submit()
  setTimeout(() => navigateTo('/merchant/onboarding/complete'), 1800)
})
</script>

<template>
  <div class="w-full max-w-lg">
    <MerchantOnboardingSteps current="review" class="mb-4" />

    <div class="rounded-card border-1 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <NuxtLink to="/merchant/onboarding/documents" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <span class="mx-auto mt-6 flex size-24 items-center justify-center rounded-full bg-gray-200">
        <Icon name="lucide:clipboard-check" class="size-11 text-text-primary" aria-hidden="true" />
      </span>

      <h1 class="mt-6 font-display text-2xl font-bold text-text-primary">Onboarding in progress</h1>
      <p class="mt-1 text-sm text-text-secondary">Thanks you! We're reviewing your information and documents</p>

      <ul class="mt-6 space-y-3 text-left">
        <li v-for="item in checklist" :key="item.label" class="flex items-center gap-3 rounded-field bg-white p-3">
          <Icon :name="item.icon" class="size-4 shrink-0 text-green-600" aria-hidden="true" />
          <span class="flex-1 text-sm font-semibold text-text-primary">{{ item.label }}</span>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-green-600 text-white">
            <Icon name="lucide:check" class="size-3.5" aria-hidden="true" />
          </span>
        </li>
        <li class="flex items-center gap-3 rounded-field bg-white p-3">
          <Icon name="lucide:info" class="size-4 shrink-0 text-text-secondary" aria-hidden="true" />
          <span class="flex-1 text-sm font-semibold text-text-primary">Under review</span>
          <Icon name="lucide:loader-2" class="size-5 shrink-0 animate-spin text-text-muted" aria-hidden="true" />
        </li>
      </ul>

      <div class="mt-5 flex items-start gap-2 rounded-field bg-green-100 p-3 text-left text-xs text-green-800">
        <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        All documents must be clear, valid and information should be readable.
      </div>
    </div>
  </div>
</template>
