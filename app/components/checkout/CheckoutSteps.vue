<script setup lang="ts">
import type { CheckoutStep } from '~/stores/checkout'

const props = defineProps<{ current: CheckoutStep }>()

const steps: { key: CheckoutStep; label: string }[] = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' },
]

const currentIndex = computed(() => steps.findIndex((s) => s.key === props.current))
</script>

<template>
  <ol class="flex items-center gap-2 sm:gap-4" aria-label="Checkout progress">
    <template v-for="(step, i) in steps" :key="step.key">
      <li class="flex items-center gap-2">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          :class="i <= currentIndex ? 'bg-green-950 text-white' : 'bg-gray-200 text-text-muted'"
        >
          <Icon v-if="i < currentIndex" name="lucide:check" class="size-3.5" aria-hidden="true" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="text-sm font-semibold" :class="i <= currentIndex ? 'text-text-primary' : 'text-text-muted'">{{ step.label }}</span>
      </li>
      <li v-if="i < steps.length - 1" class="h-px w-6 shrink-0 bg-border-subtle sm:w-12" aria-hidden="true" />
    </template>
  </ol>
</template>
