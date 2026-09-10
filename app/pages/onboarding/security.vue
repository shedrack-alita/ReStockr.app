<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Set up security' })

const onboarding = useOnboardingStore()

function finish(passkeyEnabled: boolean) {
  onboarding.setPasskeyEnabled(passkeyEnabled)
  navigateTo('/onboarding/all-set')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <div class="rounded-card border-1 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <OnboardingSteps current="security" class="mb-6" />

      <p class="text-sm font-bold text-green-600">Set up - Security</p>
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Faster checkout, less typing.</h1>
      <p class="mt-2 text-sm text-text-secondary">Use your device biometrics instead of re-entering your password.</p>

      <div class="mt-5 flex items-start gap-3 rounded-field bg-white p-4">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-field border-1 border-green-500 text-green-600">
          <Icon name="lucide:fingerprint" class="size-5" aria-hidden="true" />
        </span>
        <div>
          <p class="font-display text-lg font-bold text-text-primary">Enable Passkey for faster checkout?</p>
          <p class="mt-1 text-sm text-text-secondary">Use Touch ID instead of your password when you return.</p>
        </div>
      </div>

      <ul class="mt-4 space-y-2 text-sm text-text-secondary">
        <li class="flex items-center gap-2">
          <Icon name="lucide:zap" class="size-4 text-text-muted" aria-hidden="true" />
          Check out in one tap, no password typing.
        </li>
        <li class="flex items-center gap-2">
          <Icon name="lucide:shield-check" class="size-4 text-info" aria-hidden="true" />
          Your biometric data never leaves your device.
        </li>
      </ul>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <BaseButton type="button" variant="outline" class="flex-1 text-text-primary" @click="finish(true)">
          Enable Touch ID
        </BaseButton>
        <BaseButton type="button" variant="dark" class="flex-1" @click="finish(false)">Not now</BaseButton>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm">
      <NuxtLink to="/onboarding/delivery" class="font-semibold text-text-secondary underline hover:text-text-primary">Back</NuxtLink>
      <button type="button" class="font-semibold text-text-secondary underline hover:text-text-primary" @click="finish(false)">
        Skip this step
      </button>
    </div>
  </div>
</template>
