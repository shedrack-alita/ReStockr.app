<script setup lang="ts">
import type { OrderStatus } from '#shared/types/order'

defineProps<{ status: OrderStatus }>()

const labels: Record<OrderStatus, string> = {
  'pending-acceptance': 'Pending Acceptance',
  accepted: 'Accepted',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const colorClass: Record<OrderStatus, string> = {
  'pending-acceptance': 'text-warning',
  accepted: 'text-success',
  processing: 'text-text-secondary',
  shipped: 'text-info',
  delivered: 'text-success',
  cancelled: 'text-danger',
}
</script>

<template>
  <span class="text-sm font-extrabold uppercase tracking-wide" :class="colorClass[status]">{{ labels[status] }}</span>
</template>
