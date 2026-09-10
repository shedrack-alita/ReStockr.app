<script setup lang="ts">
import { mockMerchantBusiness } from '~/demo/merchant'

const route = useRoute()
const auth = useAuth()
const business = mockMerchantBusiness

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
})

const productsOpen = computed(() => route.path.startsWith('/merchant/products'))

const nav = [
  { to: '/merchant/dashboard', label: 'Dashboard', icon: 'lucide:home' },
  {
    label: 'Products',
    icon: 'lucide:package',
    children: [
      { to: '/merchant/products', label: 'All Products' },
      { to: '/merchant/products/categories', label: 'Categories' },
      { to: '/merchant/products/inventory', label: 'Inventory' },
    ],
  },
  { to: '/merchant/orders', label: 'Orders', icon: 'lucide:calendar-days' },
  { to: '/merchant/customers', label: 'Customers', icon: 'lucide:user' },
  { to: '/merchant/marketing', label: 'Marketing', icon: 'lucide:send' },
  { to: '/merchant/report', label: 'Report', icon: 'lucide:bar-chart-2' },
  { to: '/merchant/settings', label: 'Settings', icon: 'lucide:settings' },
]

function isActive(to: string) {
  return to === '/merchant/products' ? route.path === '/merchant/products' : route.path.startsWith(to)
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

      <nav class="mt-8 flex flex-1 flex-col gap-1" aria-label="Merchant">
        <template v-for="item in nav" :key="item.label">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-semibold transition-colors"
            :class="isActive(item.to) ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'"
          >
            <span class="flex size-9 items-center justify-center rounded-field border border-white/20">
              <Icon :name="item.icon" class="size-4" aria-hidden="true" />
            </span>
            {{ item.label }}
          </NuxtLink>

          <div v-else>
            <div class="flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-semibold" :class="productsOpen ? 'text-white' : 'text-white/70'">
              <span class="flex size-9 items-center justify-center rounded-field border border-white/20">
                <Icon :name="item.icon" class="size-4" aria-hidden="true" />
              </span>
              {{ item.label }}
            </div>
            <div class="ml-12 flex flex-col gap-0.5 border-l border-white/10 pl-3">
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="rounded-field px-3 py-2 text-sm font-medium transition-colors"
                :class="isActive(child.to) ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>

      <div class="flex items-center gap-3 rounded-field border border-white/15 bg-white/5 p-3">
        <span class="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-400 to-green-600">
          <Icon name="lucide:user-round" class="size-5 text-white" aria-hidden="true" />
        </span>
        <div class="min-w-0">
          <p class="truncate text-sm font-bold text-white">{{ business.ownerName }}</p>
          <span
            v-if="business.verified"
            class="mt-1 flex w-fit items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
          >
            <Icon name="lucide:check" class="size-2.5" aria-hidden="true" />
            Verified Merchant
          </span>
        </div>
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
