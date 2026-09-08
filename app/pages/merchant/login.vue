<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { merchantSignInSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'ReStockr - Merchant sign in' })

const auth = useAuth()

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(merchantSignInSchema),
  initialValues: { email: '', password: '', rememberMe: false },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [rememberMe] = defineField('rememberMe')

const submitError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signInMerchant(values)
    await navigateTo('/merchant/dashboard')
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/merchant/welcome" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <p class="mt-6 text-sm font-bold text-green-600">Merchant Login</p>
      <h1 class="font-display text-3xl font-bold text-text-primary">Back to the counter</h1>
      <p class="mt-3 text-sm text-text-secondary">Sign in to see the live order queue</p>

      <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
        <BaseInput v-model="email" v-bind="emailAttrs" label="Business Email" type="email" autocomplete="email" :error="errors.email" />

        <BaseInput
          v-model="password"
          v-bind="passwordAttrs"
          label="Password"
          type="password"
          autocomplete="current-password"
          :error="errors.password"
        >
          <template #label-extra>
            <NuxtLink to="/forgot-password" class="text-xs font-semibold text-green-600 hover:underline">Forgot Password?</NuxtLink>
          </template>
        </BaseInput>

        <div class="flex items-center justify-between gap-3 rounded-field bg-surface-input/50 p-3">
          <div>
            <p class="text-sm font-semibold text-text-primary">Remember me</p>
            <p class="text-xs text-text-muted">Stay signed in on this device</p>
          </div>
          <BaseToggle v-model="rememberMe" />
        </div>

        <p class="text-xs text-text-muted">
          Staff on the shop floor can use a device PIN instead. Set one up in Console-Team once you're in.
        </p>

        <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
      </form>
    </div>

    <div class="mt-6 flex justify-center">
      <BaseButton type="button" variant="primary" size="lg" :loading="isSubmitting" class="w-full max-w-[220px]" @click="onSubmit">
        Sign In Console
      </BaseButton>
    </div>
    <p class="mt-3 text-center text-sm text-text-secondary">
      New merchant?
      <NuxtLink to="/merchant/register" class="font-semibold text-text-primary hover:underline">Register your store</NuxtLink>
    </p>
  </div>
</template>
