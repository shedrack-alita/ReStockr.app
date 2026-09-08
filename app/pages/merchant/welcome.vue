<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Merchant' })
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <h1 class="font-display text-2xl font-bold text-text-primary">Get Started as a</h1>
      <p class="font-display text-4xl font-extrabold text-gray-950 sm:text-5xl">Merchant</p>
      <p class="mx-auto mt-3 max-w-xs text-sm text-text-secondary">
        Grow your business with intelligence automation and real-time insights.
      </p>

      <div class="mt-6 space-y-3">
        <BaseButton to="/merchant/login" variant="dark" size="lg" block>Sign in</BaseButton>
        <BaseButton to="/merchant/register" variant="primary" size="lg" block>Create Account</BaseButton>
        <NuxtLink
          to="/guest"
          class="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-text-primary underline hover:no-underline"
        >
          <Icon name="lucide:shopping-bag" class="size-4" aria-hidden="true" />
          Continue as Guest
        </NuxtLink>
      </div>

      <div class="mt-4 border-t border-border-subtle pt-4 text-xs text-text-muted">
        <p>
          By continuing you agree to our
          <a href="#" class="underline hover:text-text-primary">Terms of Service</a> and
          <a href="#" class="underline hover:text-text-primary">Privacy Policy</a>.
        </p>
        <p class="mt-2">
          Not selling today?
          Go to <NuxtLink to="/welcome" class="font-bold text-text-primary hover:underline">Customer</NuxtLink>
          or <NuxtLink to="/rider/register" class="font-bold text-text-primary hover:underline">Rider</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
