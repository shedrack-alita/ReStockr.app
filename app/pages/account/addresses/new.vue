<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Add New Address' })

const user = useUserStore()

function handleSubmit(value: Parameters<typeof user.addAddress>[0]) {
  user.addAddress(value)
  navigateTo('/account/addresses')
}
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">+ Add New Address</h1>
    <p class="mt-1 text-sm text-text-secondary">Add a new Delivery address</p>

    <AccountAddressForm submit-label="Save changes" class="mt-6" @submit="handleSubmit" />
  </div>
</template>
