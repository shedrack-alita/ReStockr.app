<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { riderSignUpSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'ReStockr - Apply to deliver' })

const auth = useAuth()

const extendedSchema = riderSignUpSchema
  .extend({ confirmPassword: z.string().min(1, 'Confirm your password') })
  .refine((v) => v.password === v.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

const { handleSubmit, errors, defineField, isSubmitting, validate } = useForm({
  validationSchema: toTypedSchema(extendedSchema),
  initialValues: { name: '', phone: '', vehicle: undefined, password: '', confirmPassword: '' },
})

const [name, nameAttrs] = defineField('name')
const [phone, phoneAttrs] = defineField('phone')
const [vehicle] = defineField('vehicle')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const vehicles = [
  { value: 'motorbike', label: 'Motorbike', icon: 'lucide:bike' },
  { value: 'tricycle', label: 'Tricycle', icon: 'lucide:truck' },
  { value: 'van', label: 'Van', icon: 'lucide:truck' },
] as const

const step = ref<1 | 2>(1)
const submitError = ref<string | null>(null)
const idFileName = ref<string | null>(null)

function handleIdChange(event: Event) {
  idFileName.value = (event.target as HTMLInputElement).files?.[0]?.name ?? null
}

async function handleContinue() {
  const result = await validate()
  const step1Fields: (keyof typeof result.errors)[] = ['name', 'phone', 'vehicle']
  if (step1Fields.some((field) => result.errors[field])) return
  step.value = 2
}

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signUpRider({ name: values.name, phone: values.phone, vehicle: values.vehicle, password: values.password })
    await navigateTo({ path: '/verify', query: { channel: 'phone', destination: values.phone, next: '/marketplace' } })
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

      <p class="mt-6 text-sm font-bold text-green-600">Rider Registration</p>

      <form novalidate @submit="onSubmit">
        <template v-if="step === 1">
          <h1 class="font-display text-3xl font-bold text-text-primary">Start delivering this week.</h1>
          <p class="mt-2 text-sm text-text-secondary">
            Sign up in two minutes. We run a background check and you can go online as soon as it clears.
          </p>

          <div class="mt-6 space-y-4">
            <BaseInput v-model="name" v-bind="nameAttrs" label="Full name (as on ID)" autocomplete="name" :error="errors.name" />
            <BaseInput v-model="phone" v-bind="phoneAttrs" label="Mobile number" type="tel" autocomplete="tel" :error="errors.phone" />

            <div>
              <p class="mb-1.5 text-sm font-semibold text-text-primary">Means of Delivery?</p>
              <div class="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Means of delivery">
                <button
                  v-for="option in vehicles"
                  :key="option.value"
                  type="button"
                  class="flex flex-col items-center gap-1.5 rounded-field p-3 text-xs font-semibold transition-colors"
                  :class="vehicle === option.value ? 'bg-gray-950 text-white' : 'bg-white text-text-primary hover:bg-gray-100'"
                  @click="vehicle = option.value"
                >
                  <Icon :name="option.icon" class="size-5" aria-hidden="true" />
                  {{ option.label }}
                </button>
              </div>
              <p v-if="errors.vehicle" class="mt-1.5 text-xs font-medium text-danger">{{ errors.vehicle }}</p>
            </div>
          </div>

          <BaseButton type="button" variant="primary" size="lg" block class="mt-6" @click="handleContinue">Continue</BaseButton>
        </template>

        <template v-else>
          <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Verify your identity</h1>

          <label
            class="mt-4 flex cursor-pointer items-start gap-3 rounded-field bg-white p-4 hover:bg-gray-100"
          >
            <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-danger-surface text-danger">
              <Icon name="lucide:upload" class="size-4" aria-hidden="true" />
            </span>
            <span>
              <span class="block text-sm font-semibold text-text-primary">Upload photo ID</span>
              <span class="block text-xs text-text-muted">Driving licence or passport · checked within 24 hours</span>
              <span v-if="idFileName" class="mt-1 block text-xs font-semibold text-green-600">{{ idFileName }} selected</span>
            </span>
            <input type="file" accept="image/*,application/pdf" class="hidden" @change="handleIdChange">
          </label>

          <div class="mt-4 space-y-4">
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

          <BaseButton type="submit" variant="dark" size="lg" block :loading="isSubmitting" class="mt-6">Create Rider Account</BaseButton>
        </template>
      </form>
    </div>

    <p class="mt-3 text-center text-sm text-text-secondary">
      Already have an account?
      <NuxtLink to="/rider/login" class="font-semibold text-text-primary hover:underline">Log In</NuxtLink>
    </p>
  </div>
</template>
