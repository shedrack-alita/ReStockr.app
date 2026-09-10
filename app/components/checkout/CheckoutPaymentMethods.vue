<script setup lang="ts">
import type { PaymentMethod } from '#shared/types/checkout'

const props = defineProps<{ selected: PaymentMethod | null }>()
const emit = defineEmits<{ submit: [method: PaymentMethod]; back: [] }>()

const methods: { key: PaymentMethod; label: string; description: string; icon: string }[] = [
  { key: 'card', label: 'Card Payment', description: 'Pay securely with your credit or debit card', icon: 'lucide:landmark' },
  { key: 'bank-transfer', label: 'Bank Transfer', description: 'Pay directly from your bank account.', icon: 'lucide:credit-card' },
  { key: 'ussd', label: 'Pay with USSD', description: 'Quick and easy with your mobile number.', icon: 'lucide:smartphone' },
]

const selected = ref<PaymentMethod>(props.selected ?? 'card')
</script>

<template>
  <div>
    <h2 class="font-display text-xl font-bold text-text-primary">Payment Method</h2>
    <p class="mt-1 text-sm text-text-secondary">Choose your preferred method of Payment</p>

    <div class="mt-5 space-y-3" role="radiogroup" aria-label="Payment method">
      <button
        v-for="method in methods"
        :key="method.key"
        type="button"
        role="radio"
        :aria-checked="selected === method.key"
        class="flex w-full items-center gap-4 rounded-card p-5 text-left transition-colors"
        :class="selected === method.key ? 'bg-green-50 ring-2 ring-green-500' : 'bg-surface-card hover:bg-gray-200'"
        @click="selected = method.key"
      >
        <span class="flex size-10 shrink-0 items-center justify-center text-text-primary">
          <Icon :name="method.icon" class="size-6" aria-hidden="true" />
        </span>
        <span class="flex-1">
          <span class="block font-display text-lg font-bold text-text-primary">{{ method.label }}</span>
          <span class="block text-sm text-text-secondary">{{ method.description }}</span>
        </span>
        <span
          v-if="method.key === 'card'"
          class="hidden shrink-0 items-center gap-1.5 sm:flex"
          aria-hidden="true"
        >
          <Icon name="logos:visa" class="h-5 w-auto" />
          <Icon name="logos:mastercard" class="h-5 w-auto" />
        </span>
        <span
          class="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
          :class="selected === method.key ? 'border-green-600' : 'border-border-strong'"
        >
          <span v-if="selected === method.key" class="size-2.5 rounded-full bg-green-600" />
        </span>
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <BaseButton variant="outline" size="lg" class="text-text-primary" @click="emit('back')">
        <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        back
      </BaseButton>
      <BaseButton variant="dark" size="lg" @click="emit('submit', selected)">Continue to Review</BaseButton>
    </div>
  </div>
</template>
