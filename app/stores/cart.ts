import type { CartLine } from '#shared/types/cart'
import type { Product } from '#shared/types/product'

const STORAGE_KEY = 'restockr:cart'

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([])
  const isDrawerOpen = ref(false)

  if (import.meta.client) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) lines.value = JSON.parse(raw) as CartLine[]
    } catch {
      // Corrupt or inaccessible storage — start with an empty cart rather than failing to load the page.
    }
    watch(
      lines,
      (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch {
          // Storage full/unavailable (private browsing) — the cart still works for this session, it just won't survive a reload.
        }
      },
      { deep: true },
    )
  }

  const itemCount = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))
  const subtotal = computed(() => lines.value.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0))
  const compareSubtotal = computed(() => lines.value.reduce((sum, line) => sum + line.comparePrice * line.quantity, 0))
  const isEmpty = computed(() => lines.value.length === 0)

  function addItem(product: Product, quantity = 1) {
    const existing = lines.value.find((line) => line.productId === product.id)
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, existing.maxQuantity)
      return
    }
    lines.value.push({
      id: product.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]!,
      unitPrice: product.price,
      comparePrice: product.comparePrice,
      quantity: Math.min(quantity, 99),
      maxQuantity: 99,
    })
  }

  function updateQuantity(lineId: string, quantity: number) {
    const line = lines.value.find((l) => l.id === lineId)
    if (!line) return
    if (quantity <= 0) {
      removeItem(lineId)
      return
    }
    line.quantity = Math.min(quantity, line.maxQuantity)
  }

  function removeItem(lineId: string) {
    lines.value = lines.value.filter((l) => l.id !== lineId)
  }

  function clear() {
    lines.value = []
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  return {
    lines,
    isDrawerOpen,
    itemCount,
    subtotal,
    compareSubtotal,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    openDrawer,
    closeDrawer,
  }
})
