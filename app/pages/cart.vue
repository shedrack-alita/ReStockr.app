<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

useSeoMeta({ title: 'ReStockr - Your Cart' })

const cart = useCart()
const products = useProductsStore()

onMounted(() => void products.fetch())

const mode = ref<'view' | 'manage'>('view')
const selectedIds = ref<Set<string>>(new Set())

watch(
  () => cart.lines.value.map((l) => l.id).join(','),
  () => {
    selectedIds.value = new Set()
  },
)

function toggleSelect(id: string) {
  const next = new Set(selectedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selectedIds.value = next
}

const allSelected = computed(() => cart.lines.value.length > 0 && selectedIds.value.size === cart.lines.value.length)

function toggleSelectAll() {
  selectedIds.value = allSelected.value ? new Set() : new Set(cart.lines.value.map((l) => l.id))
}

function handleSaveForLater() {
  // No "saved for later" list exists yet — closest honest action is removing the picked lines from the cart.
  for (const id of selectedIds.value) cart.removeItem(id)
  mode.value = 'view'
}

type AcceptanceState = 'idle' | 'requesting' | 'accepted'
const acceptance = ref<AcceptanceState>('idle')

watch(() => cart.lines.value.length, () => (acceptance.value = 'idle'))

function handleRequestAcceptance() {
  if (acceptance.value !== 'idle') return
  acceptance.value = 'requesting'
  setTimeout(() => (acceptance.value = 'accepted'), 1500)
}

const recommended = computed(() =>
  products.newlyListed.filter((p) => !cart.lines.value.some((l) => l.productId === p.id)).slice(0, 3),
)

function addRecommended(productId: string) {
  const product = products.items.find((p) => p.id === productId)
  if (product) cart.addItem(product)
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Your Cart ({{ cart.itemCount.value }} items)</h1>
      <NuxtLink to="/marketplace" class="text-sm font-bold text-green-700 hover:underline">Continue Shopping</NuxtLink>
    </div>

    <div v-if="cart.isEmpty.value" class="mt-10 flex flex-col items-center gap-3 rounded-card bg-surface-card py-20 text-center">
      <Icon name="lucide:shopping-cart" class="size-12 text-text-muted" aria-hidden="true" />
      <p class="text-base font-semibold text-text-primary">Your cart is empty</p>
      <p class="max-w-xs text-sm text-text-muted">Browse the marketplace and add items to get started.</p>
      <BaseButton to="/marketplace" variant="primary" class="mt-3">Start shopping</BaseButton>
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div class="divide-y divide-border-subtle rounded-card bg-green-50 px-4 sm:px-6">
          <CartItem
            v-for="line in cart.lines.value"
            :key="line.id"
            :line="line"
            :selectable="mode === 'manage'"
            :selected="selectedIds.has(line.id)"
            @toggle-select="toggleSelect(line.id)"
          />
        </div>

        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            v-if="mode === 'view'"
            type="button"
            class="flex items-center gap-2 text-sm font-semibold text-text-secondary underline hover:text-danger"
            @click="cart.clear()"
          >
            <Icon name="lucide:trash-2" class="size-4" aria-hidden="true" />
            Clear all
          </button>
          <label v-else class="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <button
              type="button"
              class="flex size-5 items-center justify-center rounded-md border-2"
              :class="allSelected ? 'border-green-600 bg-green-600' : 'border-border-strong'"
              @click="toggleSelectAll"
            >
              <Icon v-if="allSelected" name="lucide:check" class="size-3.5 text-white" aria-hidden="true" />
            </button>
            Select all ({{ selectedIds.size }})
          </label>

          <div class="flex items-center gap-3">
            <BaseButton v-if="mode === 'manage'" variant="primary" size="sm" :disabled="selectedIds.size === 0" @click="handleSaveForLater">
              Save for Later
            </BaseButton>
            <button type="button" class="text-sm font-bold text-text-secondary underline hover:text-text-primary" @click="mode = mode === 'view' ? 'manage' : 'view'">
              {{ mode === 'view' ? 'Manage cart' : 'Done' }}
            </button>
          </div>
        </div>

        <div v-if="recommended.length" class="mt-6 rounded-card bg-green-100 p-5 sm:p-6">
          <h2 class="font-display text-lg font-bold text-text-primary">You might also like</h2>
          <div class="mt-4 flex flex-wrap gap-6">
            <div v-for="product in recommended" :key="product.id" class="flex items-center gap-3">
              <NuxtLink :to="`/product/${product.slug}`" class="size-14 shrink-0 overflow-hidden rounded-field bg-white">
                <NuxtImg :src="product.images[0]!.url" :alt="product.images[0]!.alt" width="56" height="56" class="size-full object-cover" />
              </NuxtLink>
              <div>
                <p class="font-display text-sm font-bold text-text-primary">{{ product.name }}</p>
                <p class="text-sm text-text-secondary">{{ formatCurrency(product.price) }}</p>
                <button type="button" class="mt-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-text-primary ring-1 ring-border-subtle hover:bg-gray-100" @click="addRecommended(product.id)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="mode === 'view'" class="h-fit rounded-card bg-surface-card p-5 lg:sticky lg:top-24">
        <h2 class="font-display text-lg font-bold text-text-primary">Order Summary</h2>
        <div class="mt-4 space-y-2 text-sm">
          <div class="flex items-center justify-between text-text-secondary">
            <span>Subtotal</span>
            <span class="font-semibold text-text-primary">{{ formatCurrency(cart.subtotal.value) }}</span>
          </div>
          <div class="flex items-center justify-between text-text-secondary">
            <span>Shipping</span>
            <span class="font-semibold text-success">FREE</span>
          </div>
          <div class="flex items-center justify-between text-text-secondary">
            <span>Estimated Tax</span>
            <span class="font-semibold text-text-primary">₦0</span>
          </div>
          <div class="flex items-center justify-between border-t border-border-subtle pt-2 text-base font-bold text-text-primary">
            <span>Total</span>
            <span>{{ formatCurrency(cart.subtotal.value) }}</span>
          </div>
        </div>

        <BaseButton
          variant="primary"
          block
          size="lg"
          class="mt-5"
          :disabled="acceptance !== 'idle'"
          :loading="acceptance === 'requesting'"
          @click="handleRequestAcceptance"
        >
          {{ acceptance === 'accepted' ? 'Order Accepted' : 'Request for Acceptance' }}
        </BaseButton>
        <p class="mt-2 flex items-center justify-center gap-1.5 text-xs text-text-muted">
          <Icon name="lucide:lock" class="size-3.5" aria-hidden="true" />
          Secure and encrypted
        </p>

        <BaseButton to="/checkout" variant="dark" block size="lg" class="mt-3" :disabled="acceptance !== 'accepted'">
          Proceed to Checkout
        </BaseButton>
      </div>
    </div>
  </div>
</template>
