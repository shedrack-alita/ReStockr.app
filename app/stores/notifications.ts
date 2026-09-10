import type { AppNotification } from '#shared/types/notification'
import { mockNotifications } from '~/demo/notifications'

/**
 * Customer notifications — MOCK data (app/demo/notifications.ts) until
 * server/api/notifications/* exists, same pattern as app/stores/orders.ts.
 */
export const useNotificationsStore = defineStore('notifications', () => {
  const items = ref<AppNotification[]>([])
  const status = ref<'idle' | 'pending' | 'ready'>('idle')

  async function fetch() {
    if (status.value !== 'idle') return
    status.value = 'pending'
    items.value = mockNotifications
    status.value = 'ready'
  }

  const unreadCount = computed(() => items.value.filter((n) => !n.read).length)

  function markAllRead() {
    items.value = items.value.map((n) => ({ ...n, read: true }))
  }

  return { items, status, fetch, unreadCount, markAllRead }
})
