export interface CartLine {
  id: string
  productId: string
  slug: string
  name: string
  image: import('./product').ProductImage
  unitPrice: number
  comparePrice: number
  quantity: number
  /** Ceiling for the quantity stepper — the product's remaining stock at add-time. */
  maxQuantity: number
}
