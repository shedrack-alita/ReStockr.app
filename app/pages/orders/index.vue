<script setup lang="ts">
import type { OrderStatus } from '#shared/types/order'

definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - My Orders' })

const orders = useOrdersStore()
onMounted(() => void orders.fetch())

const tabs: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All Orders' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'pending-acceptance', label: 'Pending Acceptance' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
]

const activeTab = ref<OrderStatus | 'all'>('all')
const search = ref('')

function countFor(key: OrderStatus | 'all') {
  return key === 'all' ? orders.items.length : orders.items.filter((o) => o.status === key).length
}

const filtered = computed(() =>
  orders.items.filter((order) => {
    const matchesTab = activeTab.value === 'all' || order.status === activeTab.value
    const matchesSearch = !search.value || order.lines.some((l) => l.name.toLowerCase().includes(search.value.toLowerCase()))
    return matchesTab && matchesSearch
  }),
)
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">My Orders</h1>
        <p class="mt-1 text-sm text-text-secondary">Track and manage your orders.</p>
      </div>
      <NuxtLink to="/account/notifications" aria-label="Notifications" class="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-text-primary hover:bg-gray-100">
        <Icon name="lucide:bell" class="size-5" aria-hidden="true" />
        <span class="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" aria-hidden="true" />
      </NuxtLink>
    </div>

    <div class="mt-5 flex gap-1 overflow-x-auto border-b border-border-subtle pb-px" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.key"
        class="shrink-0 border-b-2 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors"
        :class="activeTab === tab.key ? 'border-green-600 text-green-700' : 'border-transparent text-text-secondary hover:text-text-primary'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }} ({{ countFor(tab.key) }})
      </button>
    </div>

    <div class="mt-4 flex flex-col gap-3 sm:flex-row">
      <label class="relative flex-1">
        <Icon name="lucide:search" class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
        <input
          v-model="search"
          type="search"
          placeholder="Search for products..."
          class="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
        >
      </label>
      <select class="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-text-primary">
        <option>All Time</option>
      </select>
    </div>

    <div class="mt-4 space-y-3">
      <div
        v-for="order in filtered"
        :key="order.id"
        class="flex flex-col gap-3 rounded-card bg-white p-4 sm:flex-row sm:items-center sm:gap-4"
      >
        <NuxtImg
          :src="order.lines[0]!.image.url"
          :alt="order.lines[0]!.image.alt"
          width="72"
          height="72"
          class="size-16 shrink-0 rounded-field bg-gray-100 object-cover"
        />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold text-text-primary">#{{ order.reference }}</p>
          <p class="text-xs text-text-muted">
            {{ new Date(order.placedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) }}
            · {{ order.lines.length }} item{{ order.lines.length === 1 ? '' : 's' }}
          </p>
        </div>
        <div class="flex min-w-0 items-center gap-2 sm:w-40">
          <span class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-400 to-green-600 text-white">
            <Icon name="lucide:store" class="size-3.5" aria-hidden="true" />
          </span>
          <span class="truncate text-sm font-semibold text-text-primary">{{ order.lines[0]!.merchantName }}</span>
        </div>
        <div class="sm:w-36">
          <AccountOrderStatusLabel :status="order.status" />
        </div>
        <p class="text-sm font-bold text-text-primary sm:w-28 sm:text-right">{{ formatCurrency(order.total) }}</p>
        <BaseButton :to="`/orders/${order.id}`" variant="dark" size="sm">
          {{ order.status === 'shipped' ? 'Track Order' : 'View Details' }}
        </BaseButton>
      </div>

      <p v-if="filtered.length === 0" class="rounded-card bg-white p-8 text-center text-sm text-text-muted">
        No orders match this filter yet.
      </p>
    </div>
  </div>
</template>
