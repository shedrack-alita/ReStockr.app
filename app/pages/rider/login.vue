<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { riderSignInSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'ReStockr - Rider sign in' })

const auth = useAuth()

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(riderSignInSchema),
  initialValues: { phone: '', password: '', rememberMe: false },
})

const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [rememberMe] = defineField('rememberMe')

const submitError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.signInRider(values)
    await navigateTo('/marketplace')
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/welcome" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <p class="mt-6 text-sm font-bold text-green-600">Rider Login</p>
      <h1 class="font-display text-3xl font-bold text-text-primary">Ready to ride?</h1>
      <p class="mt-3 text-sm text-text-secondary">Sign in and you'll go online to get your order</p>

      <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
        <BaseInput v-model="phone" v-bind="phoneAttrs" label="Mobile number" type="tel" autocomplete="tel" :error="errors.phone" />

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
          Riding is hands-free once you're online, offers read out loud and you accept with a single tap.
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
      New rider?
      <NuxtLink to="/rider/register" class="font-semibold text-text-primary hover:underline">Apply to deliver</NuxtLink>
    </p>
  </div>
</template>
