<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - My Addresses' })

const user = useUserStore()

const pendingDeleteId = ref<string | null>(null)
const pendingDeleteAddress = computed(() => user.addresses.find((a) => a.id === pendingDeleteId.value))

function confirmDelete() {
  if (pendingDeleteId.value) user.removeAddress(pendingDeleteId.value)
  pendingDeleteId.value = null
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">My addresses</h1>
        <p class="mt-1 text-sm text-text-secondary">Manage your saved delivery addresses</p>
      </div>
      <BaseButton to="/account/addresses/new" variant="dark" size="sm">
        <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
        Add new address
      </BaseButton>
    </div>

    <div v-if="user.addresses.length === 0" class="mt-6 flex flex-col items-center gap-3 rounded-card bg-white py-20 text-center">
      <Icon name="lucide:map-pin" class="size-14 text-border-strong" aria-hidden="true" />
      <p class="font-display text-xl font-bold text-text-primary">No Saved Addresses</p>
      <p class="max-w-xs text-sm text-text-muted">Add an address to make checkout faster and easier</p>
      <BaseButton to="/account/addresses/new" variant="dark" size="sm" class="mt-2">+ Add new address</BaseButton>
    </div>

    <div v-else class="mt-4 space-y-4">
      <div v-for="address in user.addresses" :key="address.id" class="rounded-card bg-white p-6">
        <div class="flex items-start justify-between gap-3">
          <p class="font-display text-xl font-bold text-text-primary">{{ address.label }}</p>
          <span v-if="address.isDefault" class="flex shrink-0 items-center gap-1 rounded-full bg-green-950 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            <Icon name="lucide:check" class="size-3" aria-hidden="true" />
            Default
          </span>
        </div>
        <p class="mt-2 text-sm text-text-secondary">
          {{ address.addressLine }}<span v-if="address.apartment">, {{ address.apartment }}</span><br>
          {{ address.city }}<br>
          {{ address.state }}<br>
          {{ address.country }}<br>
          Phone: {{ address.phone }}
        </p>

        <div class="mt-4 flex flex-wrap gap-3">
          <button
            v-if="!address.isDefault"
            type="button"
            class="rounded-full bg-gold-500 px-5 py-2 text-sm font-bold text-gray-950 hover:bg-gold-400"
            @click="user.setDefaultAddress(address.id)"
          >
            Set as default
          </button>
          <NuxtLink
            :to="`/account/addresses/${address.id}/edit`"
            class="rounded-full bg-surface-input px-5 py-2 text-sm font-bold text-text-primary hover:bg-gray-400"
          >
            Edit
          </NuxtLink>
          <button
            type="button"
            class="rounded-full bg-surface-input px-5 py-2 text-sm font-bold text-text-primary hover:bg-gray-400"
            @click="pendingDeleteId = address.id"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="pendingDeleteAddress" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4" @click.self="pendingDeleteId = null">
      <div class="w-full max-w-sm rounded-card bg-white p-6 text-center">
        <span class="mx-auto flex size-16 items-center justify-center rounded-full bg-gray-100">
          <span class="flex size-11 items-center justify-center rounded-field bg-gold-500 text-gray-950">
            <Icon name="lucide:alert-triangle" class="size-5" aria-hidden="true" />
          </span>
        </span>
        <h2 class="mt-4 font-display text-lg font-bold text-text-primary">Delete this address?</h2>
        <p class="mt-1 text-sm text-text-secondary">
          Are you sure, you want to remove this saved address? This action cannot be undone.
        </p>
        <div class="mt-5 flex flex-col gap-3">
          <button type="button" class="rounded-full bg-danger px-6 py-3 text-base font-semibold text-white hover:bg-red-700" @click="confirmDelete">
            Delete address
          </button>
          <BaseButton variant="ghost" @click="pendingDeleteId = null">Cancel</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
