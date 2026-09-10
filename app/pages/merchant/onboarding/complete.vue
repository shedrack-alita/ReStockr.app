<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: "ReStockr - You're all set" })

const auth = useAuth()

async function handleLogout() {
  await auth.signOut()
  await navigateTo('/merchant/welcome')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <div class="rounded-card border-1 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <span class="mx-auto flex size-24 items-center justify-center rounded-full bg-green-100">
        <Icon name="lucide:check" class="size-11 text-green-700" aria-hidden="true" />
      </span>

      <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Onboarding complete</h1>
      <p class="mt-2 text-sm text-text-secondary">Your information has been submitted successfully.</p>
      <p class="mt-2 text-sm text-text-secondary">We will review your application and get back to you soon.</p>

      <BaseButton to="/merchant/application-status" variant="dark" size="lg" class="mt-6">Continue</BaseButton>
      <button type="button" class="mt-3 block w-full text-sm font-semibold text-text-secondary hover:text-text-primary" @click="handleLogout">
        Log out
      </button>
    </div>
  </div>
</template>
