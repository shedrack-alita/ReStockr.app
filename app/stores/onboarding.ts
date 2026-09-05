import type { ShippingAddress } from '#shared/types/checkout'

export interface OnboardingProfile {
  firstName: string
  lastName: string
  phone: string
}

/**
 * Post-signup onboarding wizard state (see ReStockr UI/Authentication
 * Pages: Profile Intialization.png, Preferences.png, Delivery.png,
 * Security.png, All Set.png). Client-only and in-memory — there's no
 * `server/api/onboarding/*` (nothing in the API contract needs one yet;
 * this is presentation-layer wizard progress, not account data), so
 * unlike app/stores/auth.ts this never calls $fetch. Each step's setter
 * just records the value and advances; app/pages/onboarding/all-set.vue
 * is the only place any of it is read back.
 */
export const useOnboardingStore = defineStore('onboarding', () => {
  const profile = ref<OnboardingProfile | null>(null)
  const preferredCategories = ref<string[]>([])
  const deliveryAddress = ref<ShippingAddress | null>(null)
  const passkeyEnabled = ref(false)

  function setProfile(value: OnboardingProfile) {
    profile.value = value
  }

  function setPreferredCategories(categories: string[]) {
    preferredCategories.value = categories
  }

  function setDeliveryAddress(address: ShippingAddress) {
    deliveryAddress.value = address
  }

  function setPasskeyEnabled(value: boolean) {
    passkeyEnabled.value = value
  }

  function reset() {
    profile.value = null
    preferredCategories.value = []
    deliveryAddress.value = null
    passkeyEnabled.value = false
  }

  return {
    profile,
    preferredCategories,
    deliveryAddress,
    passkeyEnabled,
    setProfile,
    setPreferredCategories,
    setDeliveryAddress,
    setPasskeyEnabled,
    reset,
  }
})
