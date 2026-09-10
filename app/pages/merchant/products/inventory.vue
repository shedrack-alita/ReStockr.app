<script setup lang="ts">
definePageMeta({ layout: 'merchant' })

useSeoMeta({ title: 'ReStockr - Inventory Management' })

const catalog = useMerchantCatalogStore()

function isLowStock(quantity: number, threshold: number) {
  return quantity > 0 && quantity <= threshold
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Inventory Management</h1>
        <p class="mt-1 text-sm text-text-secondary">Track stock levels across all your products.</p>
      </div>
      <BaseButton to="/merchant/products/new" variant="dark" size="sm">
        <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
        Add Product
      </BaseButton>
    </div>

    <div class="mt-6 overflow-x-auto rounded-card border-1 border-white bg-surface-card shadow-md">
      <table class="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr class="border-b border-border-subtle text-xs font-bold uppercase tracking-wide text-text-muted">
            <th class="px-5 py-4">Product</th>
            <th class="px-5 py-4">SKU</th>
            <th class="px-5 py-4">Quantity in Stock</th>
            <th class="px-5 py-4">Low Stock Threshold</th>
            <th class="px-5 py-4">Backorders</th>
            <th class="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in catalog.products" :key="product.id" class="border-b border-border-subtle last:border-0">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <NuxtImg
                  :src="product.images[0]!.url"
                  :alt="product.images[0]!.alt"
                  width="40"
                  height="40"
                  class="size-10 shrink-0 rounded-full bg-gray-100 object-cover"
                />
                <span class="font-semibold text-text-primary">{{ product.name }}</span>
              </div>
            </td>
            <td class="px-5 py-4 text-text-secondary">{{ product.sku }}</td>
            <td class="px-5 py-4 font-semibold text-text-primary">{{ product.quantityInStock }}</td>
            <td class="px-5 py-4 text-text-secondary">{{ product.lowStockThreshold }}</td>
            <td class="px-5 py-4 text-text-secondary">{{ product.allowBackorders ? 'Allowed' : 'Not allowed' }}</td>
            <td class="px-5 py-4">
              <span
                v-if="product.quantityInStock === 0"
                class="rounded-full bg-danger-surface px-2.5 py-1 text-xs font-bold text-danger"
              >
                Out of stock
              </span>
              <span
                v-else-if="isLowStock(product.quantityInStock, product.lowStockThreshold)"
                class="rounded-full bg-gold-200 px-2.5 py-1 text-xs font-bold text-gold-800"
              >
                Low stock
              </span>
              <span v-else class="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">In stock</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
