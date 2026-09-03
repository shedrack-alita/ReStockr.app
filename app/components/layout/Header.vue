<script setup lang="ts">
/**
 * The Customers/Merchants/Riders switcher is purely a visual audience
 * selector for now — this site is a single landing page with no separate
 * per-audience routes yet, so it just tracks which pill is highlighted.
 * Wire it to real destinations once those pages/backend exist.
 */
const audiences = [
  { key: 'customers', label: 'Customers' },
  { key: 'merchants', label: 'Merchants' },
  { key: 'riders', label: 'Riders' },
] as const

const activeAudience = ref<(typeof audiences)[number]['key']>('customers')
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
  <header class="sticky top-0 z-30 bg-green-950 text-white">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-5 sm:px-6 sm:py-6">
      <NuxtLink to="/" class="order-1 shrink-0" aria-label="ReStockr home">
        <AppLogo tone="dark" />
      </NuxtLink>

      <div
        class="order-3 flex w-full justify-center gap-1 rounded-full bg-white/10 p-1 sm:order-2 sm:w-auto"
        role="tablist"
        aria-label="Browsing as"
      >
        <button
          v-for="audience in audiences"
          :key="audience.key"
          type="button"
          role="tab"
          :aria-selected="activeAudience === audience.key"
          class="rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-white sm:px-4 sm:text-xs"
          :class="activeAudience === audience.key ? 'bg-gold-500 text-gray-950' : 'bg-black text-white hover:bg-gray-800'"
          @click="activeAudience = audience.key"
        >
          {{ audience.label }}
        </button>
      </div>

      <div class="order-2 flex items-center gap-1 sm:order-3">
        <nav class="hidden items-center gap-2 text-xs font-bold uppercase tracking-wide sm:flex" aria-label="Primary">
          <a href="#showcase" class="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10">Explore</a>
          <a href="#about" class="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10">About us</a>
          <button
            v-if="auth.isSignedIn.value"
            type="button"
            class="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10"
            @click="handleSignOut"
          >
            Sign out
          </button>
          <NuxtLink v-else to="/login" class="rounded-full border border-white/40 px-4 py-1.5 hover:bg-white/10">Sign in</NuxtLink>
        </nav>

        <a
          href="#showcase"
          aria-label="Explore the marketplace"
          class="flex size-10 items-center justify-center rounded-full hover:bg-white/10 sm:hidden"
        >
          <Icon name="lucide:shopping-bag" class="size-5" aria-hidden="true" />
        </a>
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

    <nav
      v-if="isMenuOpen"
      class="flex flex-col gap-1 border-t border-white/10 px-4 py-3 text-sm font-semibold sm:hidden"
      aria-label="Primary"
    >
      <a href="#showcase" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Explore</a>
      <a href="#about" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">About us</a>
      <button v-if="auth.isSignedIn.value" type="button" class="rounded-field px-2 py-2 text-left hover:bg-white/10" @click="handleSignOut">
        Sign out
      </button>
      <NuxtLink v-else to="/login" class="rounded-field px-2 py-2 hover:bg-white/10" @click="isMenuOpen = false">Sign in</NuxtLink>
    </nav>
  </header>
</template>
