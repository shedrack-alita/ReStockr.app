<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { merchantSignUpSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'ReStockr - Register your store' })

const auth = useAuth()

const registerSchema = merchantSignUpSchema
  .extend({ confirmPassword: z.string().min(1, 'Confirm your password') })
  .refine((v) => v.password === v.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
})

const [fullName, fullNameAttrs] = defineField('fullName')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const submitError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signUpMerchant({ fullName: values.fullName, email: values.email, phone: values.phone, password: values.password })
    await navigateTo({
      path: '/verify',
      query: { channel: 'email', destination: values.email, next: '/merchant/onboarding/profile' },
    })
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

      <p class="mt-6 text-sm font-bold text-green-600">Merchant Registration</p>
      <h1 class="font-display text-3xl font-bold text-text-primary">Create your merchant account</h1>
      <p class="mt-2 text-sm text-text-secondary">Join thousands of sellers and grow your business with us.</p>

      <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
        <BaseInput v-model="fullName" v-bind="fullNameAttrs" label="Full name" autocomplete="name" :error="errors.fullName" />
        <BaseInput v-model="email" v-bind="emailAttrs" label="Email" type="email" autocomplete="email" :error="errors.email" />
        <BaseInput v-model="phone" v-bind="phoneAttrs" label="Phone Number" type="tel" autocomplete="tel" :error="errors.phone" />
        <BaseInput
          v-model="password"
          v-bind="passwordAttrs"
          label="Password"
          type="password"
          autocomplete="new-password"
          :error="errors.password"
        />
        <BaseInput
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          label="Confirm Password"
          type="password"
          autocomplete="new-password"
          :error="errors.confirmPassword"
        />

        <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
      </form>
    </div>

    <div class="mt-6 flex justify-center">
      <BaseButton type="button" variant="primary" size="lg" :loading="isSubmitting" class="w-full max-w-xs" @click="onSubmit">
        Register as Merchant
      </BaseButton>
    </div>
    <p class="mt-3 text-center text-sm text-text-secondary">
      Already have an account?
      <NuxtLink to="/merchant/login" class="font-semibold text-text-primary hover:underline">Log In</NuxtLink>
    </p>
  </div>
</template>
