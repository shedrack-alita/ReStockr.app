<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Wishlist' })

const wishlist = useWishlist()
const products = useProductsStore()

onMounted(() => void products.fetch())
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Wishlist</h1>
    <p class="mt-1 text-sm text-text-secondary">Items you've saved for later.</p>

    <div v-if="wishlist.items.value.length" class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      <ProductsProductCard v-for="product in wishlist.items.value" :key="product.id" :product="product" tooltip="add-to-cart" />
    </div>

    <div v-else class="mt-6 flex flex-col items-center gap-3 rounded-card bg-white py-16 text-center">
      <Icon name="lucide:heart" class="size-10 text-text-muted" aria-hidden="true" />
      <p class="text-sm font-semibold text-text-primary">Your wishlist is empty</p>
      <p class="max-w-xs text-sm text-text-muted">Save products you like from the marketplace to see them here.</p>
      <BaseButton to="/marketplace" variant="primary" size="sm" class="mt-2">Browse the marketplace</BaseButton>
    </div>
  </div>
</template>
