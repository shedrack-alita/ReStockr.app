<script setup lang="ts">
import type { DeliveryOption } from '#shared/types/checkout'
import { DELIVERY_OPTIONS } from '~/stores/checkout'

const props = defineProps<{ selected: DeliveryOption }>()
const emit = defineEmits<{ submit: [option: DeliveryOption]; back: [] }>()

const icons: Record<DeliveryOption['key'], string> = {
  standard: 'lucide:truck',
  express: 'lucide:zap',
  'same-day': 'lucide:timer',
}

const selectedKey = ref(props.selected.key)
</script>

<template>
  <div>
    <h2 class="font-display text-xl font-bold text-text-primary">Choose Delivery Option</h2>
    <p class="mt-1 text-sm text-text-secondary">Select how you want your order delivered</p>

    <div class="mt-5 space-y-3" role="radiogroup" aria-label="Delivery option">
      <button
        v-for="option in DELIVERY_OPTIONS"
        :key="option.key"
        type="button"
        role="radio"
        :aria-checked="selectedKey === option.key"
        class="flex w-full items-center gap-4 rounded-card p-5 text-left transition-colors"
        :class="selectedKey === option.key ? 'bg-green-50 ring-2 ring-green-500' : 'bg-surface-card hover:bg-gray-200'"
        @click="selectedKey = option.key"
      >
        <span class="flex size-10 shrink-0 items-center justify-center text-text-primary">
          <Icon :name="icons[option.key]" class="size-6" aria-hidden="true" />
        </span>
        <span class="flex-1">
          <span class="block font-display text-lg font-bold text-text-primary">{{ option.label }}</span>
          <span class="block text-sm text-text-secondary">{{ option.description }}</span>
        </span>
        <span class="shrink-0 font-display text-base font-bold text-text-primary">{{ option.fee > 0 ? formatCurrency(option.fee) : 'Free' }}</span>
        <span
          class="ml-2 flex size-5 shrink-0 items-center justify-center rounded-full border-2"
          :class="selectedKey === option.key ? 'border-green-600' : 'border-border-strong'"
        >
          <span v-if="selectedKey === option.key" class="size-2.5 rounded-full bg-green-600" />
        </span>
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <BaseButton variant="outline" size="lg" class="text-text-primary" @click="emit('back')">
        <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        back
      </BaseButton>
      <BaseButton variant="dark" size="lg" @click="emit('submit', DELIVERY_OPTIONS.find((o) => o.key === selectedKey)!)">
        Proceed to Payment
      </BaseButton>
    </div>
  </div>
</template>
