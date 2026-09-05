<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Settings' })

const auth = useAuth()
const orderUpdates = ref(true)
const marketingEmails = ref(false)

async function handleLogout() {
  await auth.signOut()
  await navigateTo('/welcome')
}
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Settings</h1>
    <p class="mt-1 text-sm text-text-secondary">Manage notifications and your account.</p>

    <div class="mt-6 rounded-card bg-white p-6">
      <h2 class="font-display text-lg font-bold text-text-primary">Notifications</h2>
      <div class="mt-4 space-y-3">
        <div class="flex items-center justify-between gap-3 rounded-field bg-surface-input/50 p-3">
          <div>
            <p class="text-sm font-semibold text-text-primary">Order updates</p>
            <p class="text-xs text-text-muted">Delivery status and order confirmations</p>
          </div>
          <BaseToggle v-model="orderUpdates" />
        </div>
        <div class="flex items-center justify-between gap-3 rounded-field bg-surface-input/50 p-3">
          <div>
            <p class="text-sm font-semibold text-text-primary">New arrivals & deals</p>
            <p class="text-xs text-text-muted">Not more than twice a month</p>
          </div>
          <BaseToggle v-model="marketingEmails" />
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-card bg-white p-6">
      <h2 class="font-display text-lg font-bold text-text-primary">Password</h2>
      <p class="mt-1 text-sm text-text-secondary">Send yourself a reset link by email.</p>
      <BaseButton to="/forgot-password" variant="ghost" size="sm" class="mt-3">Reset password</BaseButton>
    </div>

    <div class="mt-4 rounded-card border border-danger-border bg-danger-surface p-6">
      <h2 class="font-display text-lg font-bold text-danger">Sign out</h2>
      <p class="mt-1 text-sm text-text-secondary">You'll need to sign in again to access your account.</p>
      <BaseButton variant="dark" size="sm" class="mt-3" @click="handleLogout">Sign out</BaseButton>
    </div>
  </div>
</template>
