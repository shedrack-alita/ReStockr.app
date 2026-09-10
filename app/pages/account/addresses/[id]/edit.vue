<script setup lang="ts">
definePageMeta({ layout: 'account' })

const route = useRoute()
const user = useUserStore()

const address = computed(() => user.byId(route.params.id as string))
const redirect = computed(() => (typeof route.query.redirect === 'string' ? route.query.redirect : '/account/addresses'))

useSeoMeta({ title: 'ReStockr - Edit Address' })

function handleSubmit(value: Parameters<typeof user.updateAddress>[1]) {
  user.updateAddress(route.params.id as string, value)
  navigateTo(redirect.value)
}
</script>

<template>
  <div>
    <template v-if="address">
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">+Edit New Address</h1>
      <p class="mt-1 text-sm text-text-secondary">Update your Delivery address</p>

      <AccountAddressForm :initial="address" submit-label="Save changes" class="mt-6" @submit="handleSubmit" />
    </template>
    <div v-else class="mt-8 rounded-card bg-white p-8 text-center text-sm text-text-muted">
      Address not found. <NuxtLink to="/account/addresses" class="font-semibold text-text-primary underline">Back to addresses</NuxtLink>
    </div>
  </div>
</template>
