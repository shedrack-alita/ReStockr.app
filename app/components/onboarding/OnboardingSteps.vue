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
  <div class="flex items-start" aria-label="Onboarding progress">
    <template v-for="(step, i) in steps" :key="step.key">
      <div class="flex flex-col items-center gap-1.5">
        <span
          class="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:size-9 sm:text-sm"
          :class="
            i < currentIndex
              ? 'bg-green-600 text-white'
              : i === currentIndex
                ? 'bg-gray-950 text-white'
                : 'bg-gray-200 text-text-secondary'
          "
        >
          <Icon v-if="i < currentIndex" name="lucide:check" class="size-4" aria-hidden="true" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span
          class="text-[11px] font-semibold sm:text-xs"
          :class="i <= currentIndex ? 'text-text-primary' : 'text-text-muted'"
        >
          {{ step.label }}
        </span>
      </div>
      <div
        v-if="i < steps.length - 1"
        class="mt-4 h-0.5 flex-1 rounded-full sm:mt-[18px]"
        :class="i < currentIndex ? 'bg-green-600' : 'bg-border-strong'"
        aria-hidden="true"
      />
    </template>
  </div>
</template>
