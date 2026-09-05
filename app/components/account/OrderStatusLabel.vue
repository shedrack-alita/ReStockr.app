<script setup lang="ts">
import type { OrderStatus } from '#shared/types/order'

defineProps<{ status: OrderStatus }>()

const labels: Record<OrderStatus, string> = {
  processing: 'Processing',
  confirmed: 'Confirmed',
  'in-transit': 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

const colorClass: Record<OrderStatus, string> = {
  processing: 'text-text-secondary',
  confirmed: 'text-blue-600',
  'in-transit': 'text-blue-600',
  delivered: 'text-text-primary',
  cancelled: 'text-danger',
}
</script>

<template>
  <span class="text-sm font-extrabold uppercase tracking-wide" :class="colorClass[status]">{{ labels[status] }}</span>
</template>
