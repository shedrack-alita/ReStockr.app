<script setup lang="ts">
import type { CheckoutStep } from '~/stores/checkout'

const props = defineProps<{ current: CheckoutStep }>()

const steps: { key: CheckoutStep; label: string }[] = [
  { key: 'address', label: 'Delivery Address' },
  { key: 'delivery', label: 'Delivery Option' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review & Place Order' },
]

const currentIndex = computed(() => steps.findIndex((s) => s.key === props.current))
</script>

<template>
  <ol class="w-full shrink-0 rounded-card bg-surface-card p-5 sm:w-56" aria-label="Checkout progress">
    <li v-for="(step, i) in steps" :key="step.key" class="relative flex items-start gap-3 pb-8 last:pb-0">
      <span v-if="i < steps.length - 1" class="absolute left-3.5 top-7 h-full w-px" :class="i < currentIndex ? 'bg-green-600' : 'bg-border-strong'" aria-hidden="true" />
      <span
        class="z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        :class="i < currentIndex ? 'bg-green-600 text-white' : i === currentIndex ? 'bg-green-950 text-white' : 'bg-white text-text-muted ring-1 ring-border-strong'"
      >
        <Icon v-if="i < currentIndex" name="lucide:check" class="size-3.5" aria-hidden="true" />
        <template v-else>{{ i + 1 }}</template>
      </span>
      <span class="pt-0.5 text-sm font-bold" :class="i <= currentIndex ? 'text-green-700' : 'text-text-muted'">{{ step.label }}</span>
    </li>
  </ol>
</template>
