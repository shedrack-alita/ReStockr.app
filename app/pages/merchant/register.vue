<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { merchantSignUpSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'ReStockr - Register your store' })

const auth = useAuth()

const extendedSchema = merchantSignUpSchema
  .extend({ confirmPassword: z.string().min(1, 'Confirm your password') })
  .refine((v) => v.password === v.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

const { handleSubmit, errors, defineField, isSubmitting, validate } = useForm({
  validationSchema: toTypedSchema(extendedSchema),
  initialValues: { businessName: '', email: '', phone: '', category: '', password: '', confirmPassword: '' },
})

const [businessName, businessNameAttrs] = defineField('businessName')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [category] = defineField('category')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const categories = ['Home Decor', 'Kitchen', 'Apparel', 'Beauty', 'Other']

const step = ref<1 | 2>(1)
const submitError = ref<string | null>(null)

async function handleContinue() {
  const result = await validate()
  const step1Fields: (keyof typeof result.errors)[] = ['businessName', 'email', 'phone']
  if (step1Fields.some((field) => result.errors[field])) return
  step.value = 2
}

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signUpMerchant({
      businessName: values.businessName,
      email: values.email,
      phone: values.phone,
      category: values.category,
      password: values.password,
    })
    await navigateTo({ path: '/verify', query: { channel: 'email', destination: values.email, next: '/marketplace' } })
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <button
        type="button"
        class="flex items-center gap-2 text-sm font-bold text-text-primary"
        @click="step === 2 ? (step = 1) : navigateTo('/welcome')"
      >
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </button>

      <p class="mt-6 text-sm font-bold text-green-600">Merchant Registration</p>

      <form novalidate @submit="onSubmit">
        <template v-if="step === 1">
          <h1 class="font-display text-3xl font-bold text-text-primary">Open your Storefront</h1>
          <p class="mt-2 text-sm text-text-secondary">
            Takes about three minutes. We verify your business within one working day — you can add products while
            you wait.
          </p>

          <div class="mt-6 space-y-4">
            <BaseInput v-model="businessName" v-bind="businessNameAttrs" label="Business Name" autocomplete="organization" :error="errors.businessName" />
            <BaseInput v-model="email" v-bind="emailAttrs" label="Business Email" type="email" autocomplete="email" :error="errors.email" />
            <BaseInput
              v-model="phone"
              v-bind="phoneAttrs"
              label="Phone Number"
              type="tel"
              autocomplete="tel"
              :error="errors.phone"
              hint="Used for urgent order calls only"
            />
          </div>

          <BaseButton type="button" variant="primary" size="lg" block class="mt-6" @click="handleContinue">Continue</BaseButton>
        </template>

        <template v-else>
          <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">What do you mostly sell?</h1>

          <div class="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="What do you mostly sell?">
            <button
              v-for="option in categories"
              :key="option"
              type="button"
              class="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              :class="category === option ? 'bg-gray-950 text-white' : 'bg-white text-text-primary hover:bg-gray-100'"
              @click="category = option"
            >
              {{ option }}
            </button>
          </div>
          <p v-if="errors.category" class="mt-1.5 text-xs font-medium text-danger">{{ errors.category }}</p>

          <div class="mt-6 space-y-4">
            <BaseInput
              v-model="password"
              v-bind="passwordAttrs"
              label="Password"
              type="password"
              autocomplete="new-password"
              placeholder="Create a password"
              :error="errors.password"
            />
            <BaseInput
              v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"
              label="Confirm password"
              type="password"
              autocomplete="new-password"
              placeholder="Confirm password"
              :error="errors.confirmPassword"
            />
          </div>

          <BaseAlert v-if="submitError" tone="danger" class="mt-4">{{ submitError }}</BaseAlert>

          <BaseButton type="submit" variant="dark" size="lg" block :loading="isSubmitting" class="mt-6">Create Merchant Account</BaseButton>
        </template>
      </form>
    </div>

    <p class="mt-3 text-center text-sm text-text-secondary">
      Already have an account?
      <NuxtLink to="/merchant/login" class="font-semibold text-text-primary hover:underline">Log In</NuxtLink>
    </p>
  </div>
</template>
