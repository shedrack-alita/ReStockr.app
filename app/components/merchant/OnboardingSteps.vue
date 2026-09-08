<script setup lang="ts">
export type MerchantOnboardingStepKey = 'profile' | 'store' | 'documents' | 'review'

const props = defineProps<{ current: MerchantOnboardingStepKey }>()

const steps: { key: MerchantOnboardingStepKey; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'store', label: 'Store' },
  { key: 'documents', label: 'Documents' },
  { key: 'review', label: 'Review' },
]

const currentIndex = computed(() => steps.findIndex((s) => s.key === props.current))
</script>

<template>
  <ol class="flex items-center justify-end gap-2 text-sm sm:gap-3" aria-label="Merchant onboarding progress">
    <li v-for="(step, i) in steps" :key="step.key" class="flex items-center gap-1.5">
      <span class="size-1.5 rounded-full" :class="i === currentIndex ? 'bg-gray-950' : 'bg-border-strong'" aria-hidden="true" />
      <span :class="i === currentIndex ? 'font-bold text-text-primary' : 'text-text-muted'">{{ step.label }}</span>
    </li>
  </ol>
</template>
