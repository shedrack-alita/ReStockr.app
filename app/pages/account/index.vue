<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - My Account' })

const auth = useAuth()
const wishlist = useWishlist()
const orders = useOrdersStore()

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
  void orders.fetch()
})

const firstName = computed(() => auth.user.value?.name.split(' ')[0] ?? 'there')
const recentOrders = computed(() => orders.items.slice(0, 2))
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-3xl font-bold text-text-primary">Good morning, {{ firstName }}</h1>
        <p class="mt-1 text-sm text-text-secondary">Welcome to back to your account.</p>
      </div>
      <button
        type="button"
        aria-label="Notifications"
        class="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-text-primary hover:bg-gray-100"
      >
        <Icon name="lucide:bell" class="size-5" aria-hidden="true" />
        <span class="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" aria-hidden="true" />
      </button>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <NuxtLink to="/orders" class="flex items-center justify-between gap-4 rounded-card bg-white p-6 transition-transform hover:-translate-y-0.5">
        <div>
          <p class="font-display text-xl font-bold text-text-primary">Orders</p>
          <p class="mt-2 font-display text-5xl font-bold text-text-primary">{{ orders.items.length }}</p>
          <p class="mt-2 text-sm text-text-secondary">View Your Orders</p>
        </div>
        <span class="flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-4xl">📦</span>
      </NuxtLink>

      <NuxtLink to="/wishlist" class="flex items-center justify-between gap-4 rounded-card bg-white p-6 transition-transform hover:-translate-y-0.5">
        <div>
          <p class="font-display text-xl font-bold text-text-primary">Wishlist</p>
          <p class="mt-2 font-display text-5xl font-bold text-text-primary">{{ wishlist.items.value.length }}</p>
          <p class="mt-2 text-sm text-text-secondary">Saved Items</p>
        </div>
        <span class="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white">
          <Icon name="lucide:star" class="size-7" aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>

    <div class="mt-8">
      <h2 class="font-display text-2xl font-bold text-text-primary">Recent Orders</h2>

      <div class="mt-4 space-y-3">
        <div
          v-for="order in recentOrders"
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
          </div>
          <div class="sm:text-right">
            <AccountOrderStatusLabel :status="order.status" />
            <p class="mt-0.5 text-xs text-text-muted">
              {{
                new Date(order.placedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).toUpperCase()
              }}
            </p>
          </div>
          <BaseButton :to="`/orders/${order.id}`" variant="dark" size="sm">
            {{ order.status === 'in-transit' ? 'Track Order' : 'View Order' }}
          </BaseButton>
        </div>

        <p v-if="recentOrders.length === 0" class="rounded-card bg-white p-8 text-center text-sm text-text-muted">No orders yet.</p>
      </div>
    </div>
  </div>
</template>
