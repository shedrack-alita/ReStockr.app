<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { signInSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'Sign in — ReStockr' })

const auth = useAuth()
const route = useRoute()

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(signInSchema),
  initialValues: { email: '', password: '', rememberMe: false },
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [rememberMe] = defineField('rememberMe')

const submitError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signIn(values)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await navigateTo(redirect)
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <p class="mt-6 text-sm font-bold text-green-600">Welcome back</p>
      <h1 class="font-display text-3xl font-bold text-text-primary">Pickup where you left</h1>

      <p class="mt-3 text-sm text-text-secondary">Use Passkeys for faster, safer access with no password needed.</p>

      <div class="mt-4">
        <AuthSocialButtons />
      </div>

      <div class="mt-6 flex items-center gap-3 text-xs font-medium text-text-muted">
        <span class="h-px flex-1 bg-border-strong" />
        Or sign in with Email
        <span class="h-px flex-1 bg-border-strong" />
      </div>

      <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
        <BaseInput v-model="email" v-bind="emailAttrs" label="Email" type="email" autocomplete="email" :error="errors.email" />

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

        <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
      </form>
    </div>

    <BaseButton type="button" variant="primary" size="lg" block :loading="isSubmitting" class="mt-6" @click="onSubmit">
      Sign In
    </BaseButton>
    <p class="mt-3 text-center text-sm text-text-secondary">
      New here?
      <NuxtLink to="/register" class="font-semibold text-text-primary hover:underline">Create an account</NuxtLink>
    </p>
  </div>
</template>
