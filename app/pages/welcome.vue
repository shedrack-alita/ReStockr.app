<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Welcome' })
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <h1 class="font-display text-3xl font-bold text-text-primary">Welcome to</h1>
      <p class="font-display text-5xl font-extrabold text-green-600">ReStockr</p>
      <p class="mt-3 text-sm text-text-secondary">
        Sign in to pick up your saved bag, or start browsing right away, you can create an account whenever you're
        ready to check out.
      </p>

      <div class="mt-6 space-y-3">
        <BaseButton to="/login" variant="dark" size="lg" block>Sign in</BaseButton>
        <BaseButton to="/register" variant="primary" size="lg" block>Create Account</BaseButton>
        <NuxtLink
          to="/guest"
          class="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-text-primary underline hover:no-underline"
        >
          <Icon name="lucide:shopping-bag" class="size-4" aria-hidden="true" />
          Continue as Guest
        </NuxtLink>
      </div>

      <div class="mt-6 border-t border-border-subtle pt-4 text-xs text-text-muted">
        <p>Not Shopping today?</p>
        <p class="mt-1">
          Join as <NuxtLink to="/merchant/register" class="font-bold text-text-primary hover:underline">Merchant</NuxtLink>
          or Join as <NuxtLink to="/rider/register" class="font-bold text-text-primary hover:underline">Rider</NuxtLink>
        </p>
        <p class="mt-2">
          By continuing you agree to our
          <a href="#" class="underline hover:text-text-primary">Terms of Service</a> and
          <a href="#" class="underline hover:text-text-primary">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</template>
