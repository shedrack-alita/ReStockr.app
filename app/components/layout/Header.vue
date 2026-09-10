<script setup lang="ts">
const audiences = [
  { key: 'customers', label: 'Customers', to: '/welcome' },
  { key: 'merchants', label: 'Merchants', to: '/merchant/welcome' },
  { key: 'riders', label: 'Riders', to: '/rider/register' },
  { key: 'enterprise', label: 'Enterprise', to: '/enterprise' },
] as const

const route = useRoute()
const isLandingPage = computed(() => route.path === '/')
const activeAudience = computed<(typeof audiences)[number]['key']>(() => {
  if (route.path.startsWith('/merchant')) return 'merchants'
  if (route.path.startsWith('/rider')) return 'riders'
  if (route.path.startsWith('/enterprise')) return 'enterprise'
  return 'customers'
})
const isMenuOpen = ref(false)

const auth = useAuth()

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
})

async function handleSignOut() {
  await auth.signOut()
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-30 text-white"
    :class="
      isLandingPage
        ? 'bg-gradient-to-b from-[#184c0e] from-[0%] via-[#1e6f12] via-[47%] to-[#1b5e10] to-[95%]'
        : 'bg-gradient-to-b from-[#091d05] via-[#184c0e] to-[#143d0c]'
    "
  >
    <div class="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink to="/" class="shrink-0" aria-label="ReStockr home">
          <AppLogo tone="dark" />
        </NuxtLink>

        <div class="flex items-center gap-1">
          <nav class="hidden items-center gap-4 text-xs font-bold uppercase tracking-wide sm:flex" aria-label="Primary">
            <NuxtLink to="/#platform" class="hover:text-white/80">Platform</NuxtLink>
            <NuxtLink to="/#showcase" class="hover:text-white/80">Explore</NuxtLink>
            <NuxtLink to="/marketplace" class="hover:text-white/80">Marketplace</NuxtLink>
            <NuxtLink to="/about" class="hover:text-white/80">About us</NuxtLink>
            <button
              v-if="auth.isSignedIn.value"
              type="button"
              class="rounded-full border border-white/40 px-4 py-1.5 normal-case tracking-normal hover:bg-white/10"
              @click="handleSignOut"
            >
              Sign out
            </button>
          </nav>

          <NuxtLink
            to="/marketplace"
            aria-label="Explore the marketplace"
            class="flex size-10 items-center justify-center rounded-full hover:bg-white/10 sm:hidden"
          >
            <Icon name="lucide:shopping-bag" class="size-5" aria-hidden="true" />
          </NuxtLink>
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="true"
            :aria-expanded="isMenuOpen"
            class="flex size-10 items-center justify-center rounded-full hover:bg-white/10 sm:hidden"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Audience switcher — deliberately its own row, not inline with the logo/nav. -->
      <div
        class="mx-auto mt-4 flex w-full max-w-xs justify-center gap-1 rounded-full bg-white/10 p-1 sm:w-fit"
        role="tablist"
        aria-label="Browsing as"
      >
        <NuxtLink
          v-for="audience in audiences"
          :key="audience.key"
          :to="audience.to"
          role="tab"
          :aria-selected="activeAudience === audience.key"
          class="flex-1 rounded-full px-3 py-1.5 text-center text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-white sm:flex-none sm:px-4 sm:text-xs"
          :class="activeAudience === audience.key ? 'bg-gold-500 text-gray-950' : 'bg-black text-white hover:bg-gray-800'"
        >
          {{ audience.label }}
        </NuxtLink>
      </div>
    </div>

    <nav
      v-if="isMenuOpen"
      class="flex flex-col gap-1 border-t border-white/10 px-4 py-3 text-sm font-semibold sm:hidden"
      aria-label="Primary"
    >
      <NuxtLink to="/#platform" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Platform</NuxtLink>
      <NuxtLink to="/#showcase" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Explore</NuxtLink>
      <NuxtLink to="/marketplace" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Marketplace</NuxtLink>
      <NuxtLink to="/about" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">About us</NuxtLink>
      <button v-if="auth.isSignedIn.value" type="button" class="rounded-field px-2 py-2 text-left hover:bg-white/10" @click="handleSignOut">
        Sign out
      </button>
      <NuxtLink v-else to="/welcome" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Sign in</NuxtLink>
    </nav>
  </header>
</template>
