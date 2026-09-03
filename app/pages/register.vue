<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { signUpSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'Create account — ReStockr' })

const auth = useAuth()

/**
 * Extends the shared signUpSchema with a field that only exists for this
 * form's own UX (terms agreement) — not part of the actual API contract
 * (shared/types/auth.ts SignUpPayload), so only
 * { name, email, password, marketingOptIn } gets sent to auth.signUp().
 * No confirm-password field — the design (Create account.png) doesn't
 * have one, just the live requirement checklist below the single field.
 */
const registerSchema = signUpSchema.extend({
  agreeToTerms: z.boolean().refine((v) => v === true, 'You must agree to the terms to continue'),
})

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: { name: '', email: '', password: '', agreeToTerms: false, marketingOptIn: false },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [agreeToTerms] = defineField('agreeToTerms')
const [marketingOptIn] = defineField('marketingOptIn')

const passwordChecks = computed(() => {
  const value = password.value ?? ''
  return [
    { label: 'At least 8 characters', met: value.length >= 8 },
    { label: 'Includes a number', met: /\d/.test(value) },
    { label: 'Includes an uppercase letter', met: /[A-Z]/.test(value) },
  ]
})

const submitError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signUp({ name: values.name, email: values.email, password: values.password, marketingOptIn: values.marketingOptIn })
    await navigateTo('/')
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

      <p class="mt-6 text-sm font-bold text-green-600">Create Account</p>
      <h1 class="font-display text-3xl font-bold text-text-primary">Join the List</h1>
      <p class="mt-2 text-sm text-text-secondary">One account for your cart, orders and saved addresses.</p>

      <div class="mt-4">
        <AuthSocialButtons />
      </div>

      <div class="mt-6 flex items-center gap-3 text-xs font-medium text-text-muted">
        <span class="h-px flex-1 bg-border-strong" />
        Or Sign Up with Email
        <span class="h-px flex-1 bg-border-strong" />
      </div>

      <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
        <BaseInput v-model="name" v-bind="nameAttrs" label="Full Name" autocomplete="name" :error="errors.name" />
        <BaseInput v-model="email" v-bind="emailAttrs" label="Email" type="email" autocomplete="email" :error="errors.email" />

        <div>
          <BaseInput
            v-model="password"
            v-bind="passwordAttrs"
            label="Password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
            :error="errors.password"
          />
          <ul class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <li
              v-for="check in passwordChecks"
              :key="check.label"
              class="flex items-center gap-1 text-xs"
              :class="check.met ? 'text-success' : 'text-text-muted'"
            >
              <Icon name="lucide:check" class="size-3.5" aria-hidden="true" />
              {{ check.label }}
            </li>
          </ul>
        </div>

        <div class="space-y-2 rounded-field bg-surface-input/50 p-3">
          <BaseCheckbox v-model="agreeToTerms" :error="errors.agreeToTerms">
            I agree to the <a href="#" class="font-semibold underline">Terms of Service</a> and
            <a href="#" class="font-semibold underline">Privacy Policy</a>.
          </BaseCheckbox>
          <BaseCheckbox v-model="marketingOptIn">Email me new drops. Not more than twice a month.</BaseCheckbox>
        </div>

        <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
      </form>
    </div>

    <BaseButton type="button" variant="primary" size="lg" block :loading="isSubmitting" class="mt-6" @click="onSubmit">
      Create Account
    </BaseButton>
    <p class="mt-3 text-center text-sm text-text-secondary">
      Already have an account?
      <NuxtLink to="/login" class="font-semibold text-text-primary hover:underline">Log In</NuxtLink>
    </p>
  </div>
</template>
