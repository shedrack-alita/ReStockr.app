<script setup lang="ts">
import type { ShippingAddress } from '#shared/types/checkout'

const emit = defineEmits<{ submit: [address: ShippingAddress] }>()

const savedAddress: ShippingAddress = {
  fullName: 'Amaka Okafor',
  phone: '+234 568 5678 567',
  addressLine: 'KM 14 Ekamba Nsukara, Nwaniba Road',
  city: 'Uyo',
  state: 'Akwa Ibom State',
  country: 'Nigeria',
}

const useSavedAddress = ref(true)

const form = reactive<ShippingAddress>({ fullName: '', phone: '', addressLine: '', city: '', state: '', country: 'Nigeria' })

const errors = reactive<Partial<Record<keyof ShippingAddress, string>>>({})

function validate(): boolean {
  for (const key of Object.keys(errors) as (keyof ShippingAddress)[]) errors[key] = undefined
  let valid = true
  for (const field of ['fullName', 'phone', 'addressLine', 'city', 'state'] as const) {
    if (!form[field].trim()) {
      errors[field] = 'This field is required.'
      valid = false
    }
  }
  return valid
}

function handleSubmit() {
  if (useSavedAddress.value) {
    emit('submit', savedAddress)
    return
  }
  if (validate()) emit('submit', { ...form })
}
</script>

<template>
  <div>
    <h2 class="font-display text-xl font-bold text-text-primary">Shipping address</h2>

    <button
      type="button"
      class="mt-4 w-full rounded-card p-4 text-left transition-colors"
      :class="useSavedAddress ? 'bg-green-50 ring-2 ring-green-500' : 'bg-surface-card hover:bg-gray-200'"
      @click="useSavedAddress = true"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="font-semibold text-text-primary">{{ savedAddress.fullName }}</p>
          <p class="mt-1 text-sm text-text-secondary">
            {{ savedAddress.addressLine }}<br>
            {{ savedAddress.city }}, {{ savedAddress.state }}<br>
            {{ savedAddress.country }}<br>
            Phone: {{ savedAddress.phone }}
          </p>
        </div>
        <span class="flex shrink-0 items-center gap-1 rounded-full bg-green-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          <Icon name="lucide:check" class="size-3" aria-hidden="true" />
          Default
        </span>
      </div>
    </button>

    <button
      type="button"
      class="mt-3 flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary"
      @click="useSavedAddress = !useSavedAddress"
    >
      <Icon :name="useSavedAddress ? 'lucide:plus' : 'lucide:minus'" class="size-4" aria-hidden="true" />
      {{ useSavedAddress ? 'Use a different address' : 'Use saved address instead' }}
    </button>

    <form v-if="!useSavedAddress" class="mt-4 grid gap-4 sm:grid-cols-2" @submit.prevent="handleSubmit">
      <BaseInput v-model="form.fullName" label="Full name" autocomplete="name" :error="errors.fullName" class="sm:col-span-2" />
      <BaseInput v-model="form.phone" label="Phone number" type="tel" autocomplete="tel" :error="errors.phone" class="sm:col-span-2" />
      <BaseInput v-model="form.addressLine" label="Delivery address" autocomplete="street-address" :error="errors.addressLine" class="sm:col-span-2" />
      <BaseInput v-model="form.city" label="City" autocomplete="address-level2" :error="errors.city" />
      <BaseInput v-model="form.state" label="State" autocomplete="address-level1" :error="errors.state" />
      <BaseInput v-model="form.country" label="Country" autocomplete="country-name" class="sm:col-span-2" />
    </form>

    <BaseButton variant="primary" block size="lg" class="mt-6" @click="handleSubmit">Continue to Payment</BaseButton>
  </div>
</template>
