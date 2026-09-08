/** See /Merchant feature (repo root) for the source designs these types back. */

export interface MerchantOnboardingProfile {
  fullName: string
  phone: string
  country: string
  dateOfBirth: string
  avatarDataUrl?: string
}

export interface MerchantStoreInfo {
  storeName: string
  storeCategory: string
  storeDescription: string
}

export type MerchantDocumentKey = 'businessRegistration' | 'governmentId' | 'utilityBill'

export interface MerchantDocumentSlot {
  key: MerchantDocumentKey
  label: string
  hint: string
  fileName?: string
}

export type MerchantApplicationStatus = 'under-review' | 'rejected' | 'approved'

export interface MerchantProductCategory {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  productCount: number
}

export type MerchantProductStatus = 'active' | 'inactive' | 'draft'
export type MerchantProductAvailability = 'in-stock' | 'out-of-stock'

export interface MerchantProduct {
  id: string
  name: string
  sku: string
  barcode?: string
  category: string
  subcategory?: string
  brand?: string
  description: string
  images: { url: string; alt: string }[]
  regularPrice: number
  salePrice?: number
  costPrice?: number
  quantityInStock: number
  lowStockThreshold: number
  allowBackorders: boolean
  trackInventory: boolean
  status: MerchantProductStatus
  availability: MerchantProductAvailability
  visibility: 'everyone' | 'hidden'
}
