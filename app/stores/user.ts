import type { UserAddress, UserProfile } from '#shared/types/user'

const PROFILE_STORAGE_KEY = 'restockr:user-profile'
const ADDRESSES_STORAGE_KEY = 'restockr:user-addresses'

/**
 * Signed-in user's profile/addresses — distinct from app/stores/auth.ts
 * (session identity only). Backed by MOCK data, persisted to
 * localStorage like app/stores/cart.ts — there's no `server/api/user/*`
 * yet (see shared/types/user.ts), so "Save changes" on the Edit Profile/
 * Address pages has nothing real to call. The identity here (Amaka
 * Okafor, same phone/address) matches the one already used in
 * CheckoutShippingForm.vue's saved-address demo, rather than the demo'
 * own inconsistent placeholder names, so the account area and checkout
 * agree with each other.
 */
export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile>({ firstName: 'Amaka', lastName: 'Okafor', phone: '+234 568 5678 567' })

  const addresses = ref<UserAddress[]>([
    {
      id: 'addr-1',
      fullName: 'Amaka Okafor',
      label: 'Home',
      addressLine: 'KM 14 Ekamba Nsukara, Nwaniba Road, Uyo',
      city: 'Uyo',
      state: 'Akwa Ibom',
      postalCode: '520001',
      country: 'Nigeria',
      phone: '+234 568 5678 567',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: 'Amaka Okafor',
      label: 'Office',
      addressLine: 'Old Ring Road, Off Nwaniba Road, Uyo',
      city: 'Uyo',
      state: 'Akwa Ibom',
      postalCode: '520001',
      country: 'Nigeria',
      phone: '+234 568 5678 567',
      isDefault: false,
    },
  ])

  if (import.meta.client) {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (raw) profile.value = { ...profile.value, ...(JSON.parse(raw) as Partial<UserProfile>) }
    } catch {
      // Corrupt or inaccessible storage — keep the defaults rather than failing to load the page.
    }
    try {
      const raw = localStorage.getItem(ADDRESSES_STORAGE_KEY)
      if (raw) addresses.value = JSON.parse(raw) as UserAddress[]
    } catch {
      // Corrupt or inaccessible storage — keep the defaults rather than failing to load the page.
    }
    watch(
      profile,
      (value) => {
        try {
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(value))
        } catch {
          // Storage full/unavailable (private browsing) — still works for this session.
        }
      },
      { deep: true },
    )
    watch(
      addresses,
      (value) => {
        try {
          localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(value))
        } catch {
          // Storage full/unavailable (private browsing) — still works for this session.
        }
      },
      { deep: true },
    )
  }

  function updateProfile(next: UserProfile) {
    profile.value = next
  }

  function byId(id: string) {
    return addresses.value.find((address) => address.id === id)
  }

  /** New address becomes default automatically if it's the first one, or if the form asked for it. */
  function addAddress(input: Omit<UserAddress, 'id' | 'isDefault'> & { isDefault?: boolean }) {
    const isDefault = input.isDefault ?? addresses.value.length === 0
    const address: UserAddress = { ...input, id: `addr-${Date.now()}`, isDefault }
    if (isDefault) addresses.value = addresses.value.map((a) => ({ ...a, isDefault: false }))
    addresses.value.push(address)
    return address
  }

  function updateAddress(id: string, input: Omit<UserAddress, 'id' | 'isDefault'> & { isDefault?: boolean }) {
    const existing = byId(id)
    if (!existing) return
    const isDefault = input.isDefault ?? existing.isDefault
    if (isDefault) addresses.value = addresses.value.map((a) => ({ ...a, isDefault: a.id === id }))
    addresses.value = addresses.value.map((a) => (a.id === id ? { ...a, ...input, isDefault } : a))
  }

  function setDefaultAddress(id: string) {
    addresses.value = addresses.value.map((address) => ({ ...address, isDefault: address.id === id }))
  }

  function removeAddress(id: string) {
    addresses.value = addresses.value.filter((address) => address.id !== id)
  }

  return { profile, addresses, updateProfile, byId, addAddress, updateAddress, setDefaultAddress, removeAddress }
})
