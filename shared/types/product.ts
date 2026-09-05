export type ProductStockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export type ProductBadge = 'new' | 'best-seller'

export interface ProductImage {
  url: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  summary: string
  description: string
  price: number
  comparePrice: number
  images: ProductImage[]
  category: string
  merchantName: string
  stockStatus: ProductStockStatus
  stockLabel: string
  badge?: ProductBadge
  heroImage?: { url: string; alt: string }
}
