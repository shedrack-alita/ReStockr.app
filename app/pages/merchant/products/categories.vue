<script setup lang="ts">
definePageMeta({ layout: 'merchant' })

useSeoMeta({ title: 'ReStockr - Product Categories' })

const catalog = useMerchantCatalogStore()

const openMenuId = ref<string | null>(null)

function toggleMenu(id: string) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function toggleStatus(id: string) {
  const category = catalog.categories.find((c) => c.id === id)
  if (category) category.status = category.status === 'active' ? 'inactive' : 'active'
  openMenuId.value = null
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Product Categories</h1>
        <p class="mt-1 text-sm text-text-secondary">Create and manage product categories to organize your store.</p>
      </div>
      <BaseButton to="/merchant/products/new" variant="dark" size="sm">
        <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
        Add Product
      </BaseButton>
    </div>

    <div class="mt-6 overflow-x-auto rounded-card border-1 border-white bg-surface-card shadow-md">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr class="rounded-card border-1 border-white bg-surface-card text-xs font-bold uppercase tracking-wide text-text-muted">
            <th class="px-5 py-4">Category Name</th>
            <th class="px-5 py-4">Description</th>
            <th class="px-5 py-4">Status</th>
            <th class="px-5 py-4">Products</th>
            <th class="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in catalog.categories" :key="category.id" class="border-b border-border-subtle last:border-0">
            <td class="px-5 py-4 font-semibold text-text-primary">{{ category.name }}</td>
            <td class="px-5 py-4 text-text-secondary">{{ category.description }}</td>
            <td class="px-5 py-4">
              <span
                class="rounded-full px-2.5 py-1 text-xs font-bold capitalize"
                :class="category.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-danger-surface text-danger'"
              >
                {{ category.status }}
              </span>
            </td>
            <td class="px-5 py-4 text-text-secondary">{{ category.productCount }}</td>
            <td class="relative px-5 py-4 text-right">
              <button
                type="button"
                class="rounded-full p-1.5 text-text-muted hover:bg-gray-100"
                :aria-label="`Actions for ${category.name}`"
                @click="toggleMenu(category.id)"
              >
                <Icon name="lucide:more-horizontal" class="size-4" aria-hidden="true" />
              </button>
              <div
                v-if="openMenuId === category.id"
                class="absolute right-5 top-12 z-10 w-40 rounded-field bg-white p-1 text-left shadow-lg ring-1 ring-border-subtle"
              >
                <button type="button" class="block w-full rounded-field px-3 py-2 text-sm hover:bg-gray-100" @click="toggleStatus(category.id)">
                  {{ category.status === 'active' ? 'Set inactive' : 'Set active' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
