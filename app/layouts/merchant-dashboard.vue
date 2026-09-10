<script setup lang="ts">
import { mockMerchantBusiness } from '~/demo/merchant'

const auth = useAuth()
const business = mockMerchantBusiness

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
})


const nav = [
  { to: '/merchant/orders', label: 'Orders', icon: 'lucide:clipboard-check', badge: business.pendingOrdersCount },
  { to: '/merchant/fulfilment', label: 'Fulfilment', icon: 'lucide:package-check' },
  { to: '/merchant/products', label: 'Products', icon: 'lucide:package' },
  { to: '/merchant/products/inventory', label: 'Inventory', icon: 'lucide:boxes' },
]

const route = useRoute()
function isActive(to: string) {
  return route.path.startsWith(to)
}

async function handleLogout() {
  await auth.signOut()
  await navigateTo('/merchant/welcome')
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-gradient-to-b from-[#091d05] via-[#184c0e] to-[#143d0c] lg:flex-row">
    <aside class="flex shrink-0 flex-col px-4 py-6 text-white sm:px-6 lg:w-72 lg:py-8">
      <NuxtLink to="/merchant/dashboard" class="flex items-center gap-2" aria-label="ReStockr merchant home">
        <AppLogo tone="dark" />
        <span class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">Merchant</span>
      </NuxtLink>

      <NuxtLink
        to="/merchant/settings"
        class="mt-6 flex flex-col items-center gap-2 rounded-field border border-white/15 bg-white/5 p-5 text-center transition-colors hover:bg-white/10"
      >
        <span class="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-400 to-green-600">
          <Icon name="lucide:user-round" class="size-10 text-white" aria-hidden="true" />
        </span>
        <p class="font-display text-base font-bold text-white">{{ business.ownerName }}</p>
        <p class="flex items-center gap-1 text-sm">
          <Icon name="lucide:star" class="size-3.5 fill-gold-400 text-gold-400" aria-hidden="true" />
          <span class="font-bold text-white">{{ business.rating }}</span>
          <span class="text-white/60">Rating</span>
        </p>
        <span
          v-if="business.verified"
          class="flex items-center gap-1 rounded-full border border-green-400/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-300"
        >
          <Icon name="lucide:check" class="size-3" aria-hidden="true" />
          Verified Merchant
        </span>
      </NuxtLink>

      <nav class="mt-6 flex flex-1 flex-col gap-1" aria-label="Merchant">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-semibold transition-colors"
          :class="isActive(item.to) ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'"
        >
          <span class="flex size-9 items-center justify-center rounded-field border border-white/20">
            <Icon :name="item.icon" class="size-4" aria-hidden="true" />
          </span>
          <span class="flex-1">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="flex size-5 shrink-0 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-white"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <div class="rounded-field border border-white/15 bg-white/5 p-4">
        <div class="flex items-start gap-3">
          <span class="flex size-9 shrink-0 items-center justify-center rounded-field border border-white/20">
            <Icon name="lucide:store" class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0">
            <p class="font-display text-base font-bold leading-tight text-white">{{ business.storeName }}</p>
            <p class="text-sm text-white/60">{{ business.shortAddress }}</p>
          </div>
        </div>
        <p v-if="business.acceptingOrders" class="mt-3 flex items-center gap-1.5 text-sm font-semibold text-green-300">
          <span class="size-1.5 rounded-full bg-green-400" aria-hidden="true" />
          Accepting orders
        </p>
      </div>

      <button
        type="button"
        class="mt-3 flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-danger hover:underline"
        @click="handleLogout"
      >
        <Icon name="lucide:log-out" class="size-4" aria-hidden="true" />
        Logout
      </button>
    </aside>

    <main class="flex-1 p-3 pb-6 sm:p-4 lg:py-6 lg:pr-6">
      <div class="min-h-full rounded-card border-1 border-white bg-surface-card p-5 sm:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
