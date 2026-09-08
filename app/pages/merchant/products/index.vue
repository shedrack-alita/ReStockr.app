<script setup lang="ts">
definePageMeta({ layout: 'merchant' })

useSeoMeta({ title: 'ReStockr - All Products' })

const catalog = useMerchantCatalogStore()

const search = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const availabilityFilter = ref('')

const categoryOptions = computed(() => [
  { value: '', label: 'All Categories' },
  ...catalog.categories.map((c) => ({ value: c.name, label: c.name })),
])
const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' },
]
const availabilityOptions = [
  { value: '', label: 'All Availability' },
  { value: 'in-stock', label: 'In stock' },
  { value: 'out-of-stock', label: 'Out of stock' },
]

const filtered = computed(() =>
  catalog.products.filter((p) => {
    const matchesSearch = !search.value || `${p.name} ${p.category}`.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || p.category === categoryFilter.value
    const matchesStatus = !statusFilter.value || p.status === statusFilter.value
    const matchesAvailability = !availabilityFilter.value || p.availability === availabilityFilter.value
    return matchesSearch && matchesCategory && matchesStatus && matchesAvailability
  }),
)

function formatPrice(value: number) {
  return `₦${value.toLocaleString('en-NG')}`
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">All Products</h1>
        <p class="mt-1 text-sm text-text-secondary">View and manage all your products.</p>
      </div>
      <BaseButton to="/merchant/products/new" variant="dark" size="sm">
        <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
        Add Product
      </BaseButton>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label class="relative flex-1 sm:min-w-[220px]">
        <Icon name="lucide:search" class="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        <input
          v-model="search"
          type="search"
          placeholder="Search name or category"
          class="w-full rounded-full border border-border-subtle bg-white py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
        >
      </label>
      <select v-model="categoryFilter" class="rounded-full border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-primary">
        <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <select v-model="statusFilter" class="rounded-full border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-primary">
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <select v-model="availabilityFilter" class="rounded-full border border-border-subtle bg-white px-4 py-2.5 text-sm text-text-primary">
        <option v-for="opt in availabilityOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <div class="mt-4 overflow-x-auto rounded-card bg-white">
      <table class="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr class="border-b border-border-subtle text-xs font-bold uppercase tracking-wide text-text-muted">
            <th class="w-10 px-5 py-4"><input type="checkbox" class="rounded"></th>
            <th class="px-5 py-4">Product</th>
            <th class="px-5 py-4">SKU</th>
            <th class="px-5 py-4">Category</th>
            <th class="px-5 py-4">Price</th>
            <th class="px-5 py-4">Stock</th>
            <th class="px-5 py-4">Availability</th>
            <th class="px-5 py-4">Status</th>
            <th class="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filtered" :key="product.id" class="border-b border-border-subtle last:border-0">
            <td class="px-5 py-4"><input type="checkbox" class="rounded"></td>
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
            <td class="px-5 py-4 text-text-secondary">{{ product.category }}</td>
            <td class="px-5 py-4 text-text-secondary">{{ formatPrice(product.salePrice ?? product.regularPrice) }}</td>
            <td class="px-5 py-4 text-text-secondary">{{ product.quantityInStock }}</td>
            <td class="px-5 py-4">
              <span
                class="rounded-full px-2.5 py-1 text-xs font-bold"
                :class="product.availability === 'in-stock' ? 'bg-green-100 text-green-700' : 'bg-danger-surface text-danger'"
              >
                {{ product.availability === 'in-stock' ? 'In stock' : 'Out of Stock' }}
              </span>
            </td>
            <td class="px-5 py-4">
              <span
                class="rounded-full px-2.5 py-1 text-xs font-bold capitalize"
                :class="product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-danger-surface text-danger'"
              >
                {{ product.status }}
              </span>
            </td>
            <td class="px-5 py-4 text-right">
              <button type="button" class="rounded-full p-1.5 text-text-muted hover:bg-gray-100" :aria-label="`Actions for ${product.name}`">
                <Icon name="lucide:more-horizontal" class="size-4" aria-hidden="true" />
              </button>
            </td>
          </tr>

          <tr v-if="filtered.length === 0">
            <td colspan="9" class="px-5 py-12 text-center text-sm text-text-muted">No products match your filters.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
