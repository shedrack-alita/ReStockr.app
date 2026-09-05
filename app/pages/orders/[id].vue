<script setup lang="ts">
definePageMeta({ layout: 'account' })

const route = useRoute()
const orders = useOrdersStore()

onMounted(() => void orders.fetch())

const order = computed(() => orders.byId(route.params.id as string))

useSeoMeta({ title: () => (order.value ? `ReStockr - Order #${order.value.reference}` : 'ReStockr - Order') })
</script>

<template>
  <div>
    <NuxtLink to="/orders" class="flex items-center gap-2 text-sm font-bold text-text-primary">
      <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
        <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
      </span>
      back to orders
    </NuxtLink>

    <div v-if="!order" class="mt-8 rounded-card bg-white p-8 text-center text-sm text-text-muted">Order not found.</div>

    <template v-else>
      <div class="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Order #{{ order.reference }}</h1>
          <p class="mt-1 text-sm text-text-secondary">
            Placed {{ new Date(order.placedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) }}
          </p>
        </div>
        <AccountOrderStatusLabel :status="order.status" />
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
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
              <p class="text-xs text-text-muted">Qty {{ line.quantity }}</p>
            </div>
            <p class="text-sm font-bold text-text-primary">{{ formatCurrency(line.unitPrice * line.quantity) }}</p>
          </div>
        </div>

        <div class="h-fit space-y-4 rounded-card bg-white p-5">
          <div>
            <p class="text-sm font-semibold text-text-primary">Delivery address</p>
            <p class="mt-1 text-sm text-text-secondary">
              {{ order.shippingAddress.fullName }}<br>
              {{ order.shippingAddress.addressLine }}, {{ order.shippingAddress.city }}
            </p>
          </div>
          <div class="space-y-2 border-t border-border-subtle pt-4 text-sm">
            <div class="flex items-center justify-between text-text-secondary">
              <span>Subtotal</span>
              <span class="font-semibold text-text-primary">{{ formatCurrency(order.subtotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-text-secondary">
              <span>Delivery fee</span>
              <span class="font-semibold text-text-primary">{{ formatCurrency(order.deliveryFee) }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-bold text-text-primary">
              <span>Total</span>
              <span>{{ formatCurrency(order.total) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
