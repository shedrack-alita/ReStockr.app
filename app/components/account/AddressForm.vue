<script setup lang="ts">
import type { UserAddress } from '#shared/types/user'

const props = defineProps<{
  initial?: UserAddress
  submitLabel: string
}>()

const emit = defineEmits<{ submit: [value: Omit<UserAddress, 'id' | 'isDefault'> & { isDefault: boolean }] }>()

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]
const stateOptions = NIGERIAN_STATES.map((state) => ({ value: state, label: state }))

const labelOptions = [
  { value: 'Home', label: 'Home' },
  { value: 'Office', label: 'Office' },
  { value: 'Other', label: 'Other' },
]

const form = reactive({
  fullName: props.initial?.fullName ?? '',
  phone: props.initial?.phone ?? '',
  label: props.initial?.label ?? 'Home',
  addressLine: props.initial?.addressLine ?? '',
  apartment: props.initial?.apartment ?? '',
  city: props.initial?.city ?? '',
  state: props.initial?.state ?? 'Akwa Ibom',
  postalCode: props.initial?.postalCode ?? '',
  country: props.initial?.country ?? 'Nigeria',
})
const isDefault = ref(props.initial?.isDefault ?? false)

const errors = reactive<Partial<Record<'fullName' | 'phone' | 'addressLine' | 'city' | 'postalCode', string>>>({})

function validate(): boolean {
  errors.fullName = form.fullName.trim() ? undefined : 'Full name is required'
  errors.phone = form.phone.trim() ? undefined : 'Enter a valid phone number'
  errors.addressLine = form.addressLine.trim() ? undefined : 'Street address is required'
  errors.city = form.city.trim() ? undefined : 'City is required'
  errors.postalCode = form.postalCode.trim() ? undefined : 'Postal code is required'
  return !errors.fullName && !errors.phone && !errors.addressLine && !errors.city && !errors.postalCode
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form, isDefault: isDefault.value })
}
</script>

<template>
  <form class="rounded-card bg-white p-6" novalidate @submit.prevent="handleSubmit">
    <h2 class="font-display text-lg font-bold text-text-primary">Contact Information</h2>
    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <BaseInput v-model="form.fullName" label="Full Name" autocomplete="name" :error="errors.fullName" />
      <BaseInput v-model="form.phone" label="Phone Number" type="tel" autocomplete="tel" :error="errors.phone" />
    </div>

    <h2 class="mt-6 font-display text-lg font-bold text-text-primary">Address</h2>
    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <BaseSelect v-model="form.label" label="Address label" :options="labelOptions" />
      <BaseInput v-model="form.addressLine" label="Street address" autocomplete="street-address" :error="errors.addressLine" />

      <BaseInput v-model="form.apartment" label="Apartment, suite no etc (optional)" class="sm:col-span-2" />

      <div class="grid gap-4 sm:col-span-2 sm:grid-cols-3">
        <BaseInput v-model="form.city" label="City" autocomplete="address-level2" :error="errors.city" />
        <BaseSelect v-model="form.state" label="State" :options="stateOptions" />
        <BaseInput v-model="form.postalCode" label="Postal Code" autocomplete="postal-code" :error="errors.postalCode" />
      </div>

      <BaseInput v-model="form.country" label="Country" autocomplete="country-name" class="sm:col-span-2" />
    </div>

    <BaseCheckbox v-model="isDefault" class="mt-4">Set as default address</BaseCheckbox>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <BaseButton type="submit" variant="dark" size="lg">{{ submitLabel }}</BaseButton>
      <BaseButton to="/account/addresses" variant="ghost" size="lg">Cancel</BaseButton>
    </div>
  </form>
</template>
