<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { resetPasswordSchema } from '#shared/schemas/auth'

/**
 * No design mock covers this exact screen (Reset Link.png is the "email
 * sent" confirmation, not this "set a new password" landing page a user
 * reaches from that email) — styled to match the same card language as
 * the rest of the auth feature instead.
 */
definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'Set a new password — ReStockr' })

const route = useRoute()
const auth = useAuth()
const token = computed(() => (typeof route.query.token === 'string' ? route.query.token : ''))

const submitted = ref(false)
const submitError = ref<string | null>(null)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: { token: token.value, password: '' },
})
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.resetPassword({ ...values, token: token.value })
    submitted.value = true
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/login" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back to sign in
      </NuxtLink>

      <template v-if="submitted">
        <p class="mt-6 text-sm font-bold text-green-600">Password updated</p>
        <h1 class="font-display text-3xl font-bold text-text-primary">You're all set.</h1>
        <p class="mt-3 text-sm text-text-secondary">You can now sign in with your new password.</p>
        <BaseButton type="button" variant="dark" block class="mt-5" to="/login">Back to Sign In</BaseButton>
      </template>

      <template v-else>
        <p class="mt-6 text-sm font-bold text-green-600">Reset password</p>
        <h1 class="font-display text-3xl font-bold text-text-primary">Choose a new password.</h1>
        <p class="mt-3 text-sm text-text-secondary">Make it something you haven't used here before.</p>

        <BaseAlert v-if="!token" tone="warning" class="mt-4">
          This link is missing its reset token — request a new one from the
          <NuxtLink to="/forgot-password" class="font-semibold underline">forgot password</NuxtLink> page.
        </BaseAlert>

        <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
          <BaseInput
            v-model="password"
            v-bind="passwordAttrs"
            label="New password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
            :error="errors.password"
            hint="At least 8 characters, with a number and an uppercase letter."
          />
          <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
          <BaseButton type="submit" variant="dark" block :loading="isSubmitting" :disabled="!token">Update Password</BaseButton>
        </form>
      </template>
    </div>
  </div>
</template>
