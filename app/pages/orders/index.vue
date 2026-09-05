<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - My Orders' })

const orders = useOrdersStore()
onMounted(() => void orders.fetch())
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">My Orders</h1>
    <p class="mt-1 text-sm text-text-secondary">Track and review everything you've ordered.</p>

    <div class="mt-6 space-y-3">
      <div
        v-for="order in orders.items"
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
          <p class="truncate font-display text-lg font-semibold italic text-text-secondary">{{ order.lines[0]!.name }}</p>
          <p class="text-xs text-text-muted">{{ order.lines.length }} item{{ order.lines.length === 1 ? '' : 's' }} · {{ formatCurrency(order.total) }}</p>
        </div>
        <div class="sm:text-right">
          <AccountOrderStatusLabel :status="order.status" />
          <p class="mt-0.5 text-xs text-text-muted">
            {{ new Date(order.placedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).toUpperCase() }}
          </p>
        </div>
        <BaseButton :to="`/orders/${order.id}`" variant="dark" size="sm">
          {{ order.status === 'in-transit' ? 'Track Order' : 'View Order' }}
        </BaseButton>
      </div>

      <p v-if="orders.items.length === 0" class="rounded-card bg-white p-8 text-center text-sm text-text-muted">
        You haven't placed any orders yet.
      </p>
    </div>
  </div>
</template>
