<script setup lang="ts">
import type { NotificationCategory, NotificationKind } from '#shared/types/notification'

definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Notifications' })

const notifications = useNotificationsStore()
onMounted(() => void notifications.fetch())

const tabs: { key: NotificationCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'orders', label: 'Orders' },
  { key: 'system', label: 'System' },
]
const activeTab = ref<NotificationCategory | 'all'>('all')

const filtered = computed(() =>
  activeTab.value === 'all' ? notifications.items : notifications.items.filter((n) => n.category === activeTab.value),
)

const iconStyle: Record<NotificationKind, string> = {
  'order-accepted': 'bg-green-600',
  'order-shipped': 'bg-gold-500',
  'order-out-for-delivery': 'bg-danger',
  'order-delivered': 'bg-green-600',
  'merchant-message': 'bg-blue-500',
  system: 'bg-purple-500',
}

function timeAgo(iso: string) {
  const hours = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000))
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Notifications</h1>
        <p class="mt-1 text-sm text-text-secondary">Stay updated on your orders and account activity</p>
      </div>
      <span class="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-text-primary">
        <Icon name="lucide:bell" class="size-5" aria-hidden="true" />
        <span v-if="notifications.unreadCount" class="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" aria-hidden="true" />
      </span>
    </div>

    <div class="mt-5 flex w-fit gap-1 rounded-full bg-white p-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
        :class="activeTab === tab.key ? 'bg-gray-950 text-white' : 'text-text-secondary hover:text-text-primary'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="mt-5 divide-y divide-border-subtle rounded-card bg-white px-5">
      <div v-for="item in filtered" :key="item.id" class="flex items-start gap-4 py-5">
        <span class="flex size-7 shrink-0 items-center justify-center rounded-full text-white" :class="iconStyle[item.kind]">
          <Icon name="lucide:check" class="size-3.5" aria-hidden="true" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="font-display text-base font-bold text-text-primary">{{ item.title }}</p>
          <p class="mt-0.5 text-sm text-text-secondary">{{ item.body }}</p>
        </div>
        <span class="shrink-0 text-xs text-text-muted">{{ timeAgo(item.createdAt) }}</span>
      </div>

      <p v-if="filtered.length === 0" class="py-12 text-center text-sm text-text-muted">Nothing here yet.</p>
    </div>
  </div>
</template>
