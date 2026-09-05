<script setup lang="ts">
export type OnboardingStepKey = 'profile' | 'preferences' | 'delivery' | 'security'

const props = defineProps<{ current: OnboardingStepKey }>()

const steps: { key: OnboardingStepKey; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'preferences', label: 'Preferences' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'security', label: 'Security' },
]

const currentIndex = computed(() => steps.findIndex((s) => s.key === props.current))
</script>

<template>
  <ol class="flex items-center justify-end gap-2 text-sm sm:gap-3" aria-label="Onboarding progress">
    <li v-for="(step, i) in steps" :key="step.key" class="flex items-center gap-1.5">
      <span class="size-1.5 rounded-full" :class="i <= currentIndex ? 'bg-text-primary' : 'bg-border-strong'" aria-hidden="true" />
      <span :class="i === currentIndex ? 'font-bold text-text-primary' : 'text-text-muted'">{{ step.label }}</span>
    </li>
  </ol>
</template>
