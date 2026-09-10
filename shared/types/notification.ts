export type NotificationCategory = 'orders' | 'system'

export type NotificationKind = 'order-accepted' | 'order-shipped' | 'order-out-for-delivery' | 'order-delivered' | 'merchant-message' | 'system'

export interface AppNotification {
  id: string
  category: NotificationCategory
  kind: NotificationKind
  title: string
  body: string
  createdAt: string
  read: boolean
}
