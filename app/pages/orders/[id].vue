<script setup lang="ts">
import type { OrderStatus } from '#shared/types/order'

definePageMeta({ layout: 'account' })

const route = useRoute()
const orders = useOrdersStore()

onMounted(() => void orders.fetch())

const order = computed(() => orders.byId(route.params.id as string))

useSeoMeta({ title: () => (order.value ? `ReStockr - Order #${order.value.reference}` : 'ReStockr - Order') })

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'pending-acceptance', label: 'Pending Acceptance' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
]

const currentIndex = computed(() => (order.value ? steps.findIndex((s) => s.key === order.value!.status) : -1))
const isCancelled = computed(() => order.value?.status === 'cancelled')
</script>

<template>
  <div>
    <NuxtLink to="/orders" class="flex items-center gap-2 text-sm font-bold text-green-700">
      <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
      Back to My Orders
    </NuxtLink>

    <div v-if="!order" class="mt-8 rounded-card bg-white p-8 text-center text-sm text-text-muted">Order not found.</div>

    <template v-else>
      <div class="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Order #{{ order.reference }}</h1>
          <p class="mt-1 text-sm text-text-secondary">
            Placed on {{ new Date(order.placedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) }}
            · {{ order.lines.length }} item{{ order.lines.length === 1 ? '' : 's' }}
          </p>
        </div>
        <AccountOrderStatusLabel :status="order.status" />
      </div>

      <ol v-if="!isCancelled" class="mt-8 flex items-start justify-between" aria-label="Order status">
        <template v-for="(step, i) in steps" :key="step.key">
          <li class="flex flex-col items-center gap-2 text-center">
            <span
              class="flex size-9 items-center justify-center rounded-full text-sm font-bold"
              :class="i <= currentIndex ? 'bg-green-700 text-white' : 'bg-white text-text-muted ring-1 ring-border-strong'"
            >
              <Icon v-if="i < currentIndex" name="lucide:check" class="size-4" aria-hidden="true" />
            </span>
            <span class="text-xs font-bold sm:text-sm" :class="i <= currentIndex ? 'text-text-primary' : 'text-text-muted'">{{ step.label }}</span>
            <span v-if="i === currentIndex" class="text-[11px] text-text-muted">
              {{ new Date(order.placedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) }}
            </span>
          </li>
          <li v-if="i < steps.length - 1" class="mt-4.5 h-px flex-1" :class="i < currentIndex ? 'bg-green-700' : 'bg-border-strong'" aria-hidden="true" />
        </template>
      </ol>

      <div class="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div class="space-y-3 rounded-card bg-white p-4">
          <div v-for="line in order.lines" :key="line.id" class="flex items-center gap-3 border-b border-border-subtle pb-3 last:border-0 last:pb-0">
            <NuxtImg
              :src="line.image.url"
              :alt="line.image.alt"
              width="64"
              height="64"
              class="size-14 shrink-0 rounded-field bg-gray-100 object-cover"
            />
            <div class="min-w-0 flex-1">
              <NuxtLink :to="`/product/${line.slug}`" class="truncate text-sm font-semibold text-text-primary hover:underline">{{ line.name }}</NuxtLink>
              <p class="text-xs text-text-muted">Qty: {{ line.quantity }}</p>
              <NuxtLink :to="`/marketplace?merchant=${encodeURIComponent(line.merchantName)}`" class="text-xs font-semibold text-green-700 underline">View Store</NuxtLink>
            </div>
            <p class="text-sm font-bold text-text-primary">{{ formatCurrency(line.unitPrice * line.quantity) }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-card bg-white p-5">
            <h2 class="font-display text-lg font-bold text-text-primary">Order Summary</h2>
            <div class="mt-3 space-y-2 text-sm">
              <div class="flex items-center justify-between text-text-secondary">
                <span>Subtotal</span>
                <span class="font-semibold text-text-primary">{{ formatCurrency(order.subtotal) }}</span>
              </div>
              <div class="flex items-center justify-between text-text-secondary">
                <span>Shipping</span>
                <span class="font-semibold" :class="order.deliveryFee > 0 ? 'text-text-primary' : 'text-success'">
                  {{ order.deliveryFee > 0 ? formatCurrency(order.deliveryFee) : 'FREE' }}
                </span>
              </div>
              <div class="flex items-center justify-between text-text-secondary">
                <span>Estimated Tax</span>
                <span class="font-semibold text-text-primary">₦0</span>
              </div>
              <div class="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-bold text-text-primary">
                <span>Total</span>
                <span>{{ formatCurrency(order.total) }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-card bg-white p-5">
            <div class="flex items-center justify-between">
              <h2 class="font-display text-lg font-bold text-text-primary">Delivery Address</h2>
              <NuxtLink to="/account/addresses" class="text-xs font-bold text-text-secondary underline hover:text-text-primary">Edit</NuxtLink>
            </div>
            <p class="mt-2 text-sm text-text-secondary">
              {{ order.shippingAddress.fullName }}<br>
              {{ order.shippingAddress.addressLine }}, {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }}, {{ order.shippingAddress.country }}<br>
              {{ order.shippingAddress.phone }}
            </p>

            <h3 class="mt-4 font-display text-base font-bold text-text-primary">Delivery Option</h3>
            <p class="mt-1 text-sm text-text-secondary">{{ order.deliveryOption.label }} ({{ order.deliveryOption.description }})</p>
          </div>

          <div class="rounded-card bg-white p-5">
            <h2 class="font-display text-lg font-bold text-text-primary">Payment Method</h2>
            <p class="mt-2 flex items-center gap-2 text-sm capitalize text-text-secondary">
              {{ order.paymentMethod.replace('-', ' ') }}
              <Icon v-if="order.paymentMethod === 'card'" name="logos:visa" class="h-4 w-auto" aria-hidden="true" />
              <Icon v-if="order.paymentMethod === 'card'" name="logos:mastercard" class="h-4 w-auto" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>

      <div v-if="order.status === 'pending-acceptance'" class="mt-6 flex items-start gap-3 rounded-card bg-white p-4">
        <Icon name="lucide:check-circle" class="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" />
        <div>
          <p class="text-sm font-bold text-text-primary">Waiting for merchant to accept</p>
          <p class="mt-0.5 text-sm text-text-secondary">The merchant will review your order and confirm availability. You'll be notified once they accept.</p>
        </div>
      </div>
    </template>
  </div>
</template>
