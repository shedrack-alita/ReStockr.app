import type { AppNotification } from '#shared/types/notification'

/** See /Updated Customer Features/34. Customer - Order Notifications.png. */
export const mockNotifications: AppNotification[] = [
  {
    id: 'ntf-1',
    category: 'orders',
    kind: 'order-accepted',
    title: 'Order accepted',
    body: 'Your order #SP123456789 has been accepted by the merchant.',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf-2',
    category: 'orders',
    kind: 'order-shipped',
    title: 'Order shipped',
    body: 'Your order #SP123456789 has been shipped. Tracking number: "GL123456789"',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf-3',
    category: 'orders',
    kind: 'order-out-for-delivery',
    title: 'Order out for delivery',
    body: 'Your order #SP123456789 is out for delivery.',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf-4',
    category: 'orders',
    kind: 'order-delivered',
    title: 'Order delivered',
    body: 'Your order #SP123456789 has been delivered. Enjoy your purchase!',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf-5',
    category: 'orders',
    kind: 'merchant-message',
    title: 'New message from merchant',
    body: 'The merchant has sent you a message regarding your order #SP123456789.',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: false,
  },
  {
    id: 'ntf-6',
    category: 'system',
    kind: 'system',
    title: 'System update',
    body: 'Your account has been successfully verified.',
    createdAt: '2026-09-10T08:00:00.000Z',
    read: true,
  },
]
