<script setup lang="ts">

const auth = useAuth()
const cart = useCart()
const products = useProductsStore()

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
  void products.fetch()
})

const searchQuery = ref('')
const isCategoryNavOpen = ref(false)
const isUserMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

const headerEl = useTemplateRef('headerEl')

function handleDocumentClick(event: MouseEvent) {
  if (headerEl.value && !headerEl.value.contains(event.target as Node)) {
    isCategoryNavOpen.value = false
    isUserMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleDocumentClick))
onUnmounted(() => document.removeEventListener('click', handleDocumentClick))

function handleSearchSubmit() {
  const query = searchQuery.value.trim()
  navigateTo(query ? { path: '/marketplace', query: { q: query } } : '/marketplace')
}
</script>

<template>
  <header ref="headerEl" class="sticky top-0 z-30">
    <div class="hidden border-b border-border-subtle bg-gray-100 py-1.5 text-center text-xs text-text-secondary sm:block">
      Email: Support&#64;restockr.co | Call us +1673 456 839
    </div>

    <div class="bg-gray-100">
      <div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <NuxtLink to="/marketplace" class="shrink-0" aria-label="ReStockr marketplace">
          <AppLogo tone="light" />
        </NuxtLink>

        <form class="hidden flex-1 sm:block " role="search" @submit.prevent="handleSearchSubmit">
          <label class="sr-only" for="marketplace-search">Search for products</label>
          <div class="relative">
            <Icon name="lucide:search" class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <input
              id="marketplace-search"
              v-model="searchQuery"
              type="search"
              placeholder="Search for products..."
              class="w-full rounded-full bg-gray-200 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
            >
          </div>
        </form>

        <div class="ml-auto flex items-center gap-2">
          <NuxtLink
            to="/marketplace"
            aria-label="Home"
            class="flex size-10 items-center justify-center rounded-full bg-gold-500 text-gray-950 transition-colors hover:bg-gold-400"
          >
            <Icon name="lucide:home" class="size-4.5" aria-hidden="true" />
          </NuxtLink>

          <button
            type="button"
            aria-label="Open cart"
            class="relative flex size-10 items-center justify-center rounded-full bg-gold-500 text-gray-950 transition-colors hover:bg-gold-400"
            @click="cart.openDrawer()"
          >
            <Icon name="lucide:shopping-cart" class="size-4.5" aria-hidden="true" />
            <span
              class="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-green-950 text-[10px] font-bold text-white"
            >
              {{ cart.itemCount.value }}
            </span>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            class="hidden size-10 items-center justify-center rounded-full bg-gold-500 text-gray-950 transition-colors hover:bg-gold-400 sm:flex"
          >
            <Icon name="lucide:bell" class="size-4.5" aria-hidden="true" />
          </button>

          <div class="relative hidden sm:block">
            <button
              type="button"
              class="flex items-center gap-2 rounded-full bg-gray-200 py-1.5 pl-2 pr-3 text-sm font-semibold text-text-primary transition-colors hover:bg-gray-200"
              aria-haspopup="true"
              :aria-expanded="isUserMenuOpen"
              @click="isUserMenuOpen = !isUserMenuOpen; isCategoryNavOpen = false"
            >
              <Icon name="lucide:circle-user" class="size-5" aria-hidden="true" />
              {{ auth.isSignedIn.value ? `Welcome, ${auth.user.value?.name.split(' ')[0]}!` : 'Welcome!' }}
            </button>
            <div v-if="isUserMenuOpen" class="absolute right-0 top-full z-40 mt-2">
              <MarketplaceUserMenu @close="isUserMenuOpen = false" />
            </div>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            :aria-expanded="isMobileMenuOpen"
            class="flex size-10 items-center justify-center rounded-full text-text-primary hover:bg-gray-100 sm:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Icon :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <nav class="bg-green-950 text-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wide sm:text-sm"
            aria-haspopup="true"
            :aria-expanded="isCategoryNavOpen"
            @click="isCategoryNavOpen = !isCategoryNavOpen; isUserMenuOpen = false"
          >
            <Icon name="lucide:menu" class="size-4" aria-hidden="true" />
            Shop by categories
            <Icon name="lucide:chevron-down" class="size-4 transition-transform" :class="isCategoryNavOpen ? 'rotate-180' : ''" aria-hidden="true" />
          </button>
          <div v-if="isCategoryNavOpen" class="absolute left-0 top-full z-40 mt-0">
            <MarketplaceCategoryNav :categories="products.categories" @close="isCategoryNavOpen = false" />
          </div>
        </div>

        <div class="hidden items-center gap-6 text-xs font-bold uppercase tracking-wide sm:flex">
          <a href="#faq" class="hover:text-gold-300">FAQ</a>
          <a href="#about" class="hover:text-gold-300">About us</a>
          <a href="#contact" class="hover:text-gold-300">Contact</a>
        </div>
      </div>
    </nav>

    <div v-if="isMobileMenuOpen" class="space-y-3 border-t border-border-subtle bg-white p-4 sm:hidden">
      <form role="search" @submit.prevent="handleSearchSubmit">
        <label class="sr-only" for="marketplace-search-mobile">Search for products</label>
        <input
          id="marketplace-search-mobile"
          v-model="searchQuery"
          type="search"
          placeholder="Search for products..."
          class="w-full rounded-full bg-surface-sunken px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
        >
      </form>
      <MarketplaceUserMenu class="!w-full" @close="isMobileMenuOpen = false" />
    </div>
  </header>
</template>
