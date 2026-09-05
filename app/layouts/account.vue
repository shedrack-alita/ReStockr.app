<script setup lang="ts">

const route = useRoute()
const auth = useAuth()

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
})

const nav = [
  { to: '/account', label: 'Overview', icon: 'lucide:home', badge: undefined as number | undefined },
  { to: '/orders', label: 'Orders', icon: 'lucide:calendar-days', badge: 3 },
  { to: '/account/profile', label: 'Profile', icon: 'lucide:user', badge: undefined },
  { to: '/account/addresses', label: 'Address', icon: 'lucide:map-pin', badge: undefined },
  { to: '/wishlist', label: 'Wishlist', icon: 'lucide:heart', badge: undefined },
  { to: '/account/settings', label: 'Settings', icon: 'lucide:settings', badge: undefined },
]

function isActive(to: string) {
  return to === '/account' ? route.path === '/account' : route.path.startsWith(to)
}

async function handleLogout() {
  await auth.signOut()
  await navigateTo('/welcome')
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-gradient-to-b from-green-900 via-green-950 to-green-950 lg:flex-row">
    <aside class="flex shrink-0 flex-col px-4 py-6 text-white sm:px-6 lg:w-72 lg:py-8">
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="ReStockr home">
        <AppLogo tone="dark" />
        <span class="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide">Customer</span>
      </NuxtLink>

      <nav class="mt-8 flex flex-1 flex-col gap-1" aria-label="Account">
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
          {{ item.label }}
          <span v-if="item.badge" class="ml-auto flex size-5 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-white">
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-danger hover:underline"
        @click="handleLogout"
      >
        <Icon name="lucide:log-out" class="size-4" aria-hidden="true" />
        Logout
      </button>
    </aside>

    <main class="flex-1 p-3 pb-6 sm:p-4 lg:py-6 lg:pr-6">
      <div class="min-h-full rounded-card bg-surface-card p-5 sm:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
