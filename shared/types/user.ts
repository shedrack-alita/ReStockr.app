export interface UserProfile {
  firstName: string
  lastName: string
  phone: string
  avatarDataUrl?: string
}

export interface UserAddress {
  id: string
  fullName: string
  label: string
  addressLine: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}
