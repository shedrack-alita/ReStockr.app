<script setup lang="ts">
import type { ShippingAddress } from '#shared/types/checkout'

definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Set up delivery' })

const onboarding = useOnboardingStore()

const form = reactive<ShippingAddress>(
  onboarding.deliveryAddress ?? {
    fullName: onboarding.profile ? `${onboarding.profile.firstName} ${onboarding.profile.lastName}`.trim() : '',
    phone: onboarding.profile?.phone ?? '',
    addressLine: '',
    city: '',
    state: '',
    country: 'Nigeria',
  },
)

const usingCurrentLocation = ref(false)

function handleUseCurrentLocation() {
  // MOCK — no real geolocation/reverse-geocoding backend to call yet.
  usingCurrentLocation.value = true
  form.addressLine = form.addressLine || '48 Greatman Lane, Apt 3'
  form.city = form.city || 'Nwaniba, Uyo'
  form.state = form.state || 'Akwa Ibom State'
}

function handleContinue() {
  onboarding.setDeliveryAddress({ ...form })
  navigateTo('/onboarding/security')
}

function handleSkip() {
  navigateTo('/onboarding/security')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <OnboardingSteps current="delivery" class="mb-6" />

      <p class="text-sm font-bold text-green-600">Set up - Delivery</p>
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Where should orders go?</h1>
      <p class="mt-2 text-sm text-text-secondary">Optional - but saving it now means one-tap checkout later.</p>

      <button
        type="button"
        class="mt-5 flex w-full items-center gap-3 rounded-field p-4 text-left transition-colors"
        :class="usingCurrentLocation ? 'bg-green-50 ring-2 ring-green-500' : 'bg-white hover:bg-gray-100'"
        @click="handleUseCurrentLocation"
      >
        <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-surface text-danger">
          <Icon name="lucide:map-pin" class="size-4" aria-hidden="true" />
        </span>
        <span>
          <span class="block text-sm font-semibold text-text-primary">Use my current location</span>
          <span class="block text-xs text-text-muted">We'll fill the fields below. You can still make edits</span>
        </span>
      </button>

      <form class="mt-5 grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="handleContinue">
        <BaseInput v-model="form.addressLine" label="Street address" autocomplete="street-address" class="sm:col-span-2" />
        <BaseInput v-model="form.city" label="City" autocomplete="address-level2" />
        <BaseInput v-model="form.state" label="State" autocomplete="address-level1" />

        <BaseButton type="submit" variant="primary" size="lg" block class="sm:col-span-2">Continue</BaseButton>
      </form>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm">
      <NuxtLink to="/onboarding/preferences" class="font-semibold text-text-secondary underline hover:text-text-primary">Back</NuxtLink>
      <button type="button" class="font-semibold text-text-secondary underline hover:text-text-primary" @click="handleSkip">
        Skip for now
      </button>
    </div>
  </div>
</template>
