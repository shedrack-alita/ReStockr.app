<script setup lang="ts">
import type { PaymentMethod } from '#shared/types/checkout'

const emit = defineEmits<{ submit: [method: PaymentMethod] }>()

const methods: { key: PaymentMethod; label: string; description: string; icon: string }[] = [
  { key: 'card', label: 'Debit / Credit Card', description: 'Pay securely with Visa or Mastercard.', icon: 'lucide:credit-card' },
  { key: 'bank-transfer', label: 'Bank Transfer', description: 'Pay via direct bank transfer.', icon: 'lucide:landmark' },
  { key: 'pay-on-delivery', label: 'Pay on Delivery', description: 'Pay cash when your order arrives.', icon: 'lucide:truck' },
]

const selected = ref<PaymentMethod>('card')
</script>

<template>
  <div>
    <h2 class="font-display text-xl font-bold text-text-primary">Payment method</h2>

    <div class="mt-4 space-y-3" role="radiogroup" aria-label="Payment method">
      <button
        v-for="method in methods"
        :key="method.key"
        type="button"
        role="radio"
        :aria-checked="selected === method.key"
        class="flex w-full items-center gap-3 rounded-card p-4 text-left transition-colors"
        :class="selected === method.key ? 'bg-green-50 ring-2 ring-green-500' : 'bg-surface-card hover:bg-gray-200'"
        @click="selected = method.key"
      >
        <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-text-primary">
          <Icon :name="method.icon" class="size-5" aria-hidden="true" />
        </span>
        <span class="flex-1">
          <span class="block text-sm font-semibold text-text-primary">{{ method.label }}</span>
          <span class="block text-xs text-text-muted">{{ method.description }}</span>
        </span>
        <span
          class="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
          :class="selected === method.key ? 'border-green-500 bg-green-500' : 'border-border-strong'"
        >
          <Icon v-if="selected === method.key" name="lucide:check" class="size-3 text-white" aria-hidden="true" />
        </span>
      </button>
    </div>

    <BaseButton variant="primary" block size="lg" class="mt-6" @click="emit('submit', selected)">Review Order</BaseButton>
  </div>
</template>
