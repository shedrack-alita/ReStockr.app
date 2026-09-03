<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { forgotPasswordSchema } from '#shared/schemas/auth'

definePageMeta({ layout: 'auth', middleware: 'guest' })

useSeoMeta({ title: 'Reset your password — ReStockr' })

const auth = useAuth()
const submittedEmail = ref<string | null>(null)
const submitError = ref<string | null>(null)

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: { email: '' },
})
const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit(async (values) => {
  submitError.value = null
  try {
    await auth.forgotPassword(values)
    submittedEmail.value = values.email
  } catch (err) {
    submitError.value = getErrorMessage(err)
  }
})

function useDifferentEmail() {
  submittedEmail.value = null
}
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

      <template v-if="submittedEmail">
        <p class="mt-6 text-sm font-bold text-danger">Reset link sent!</p>
        <h1 class="font-display text-3xl font-bold text-text-primary">It's on its way.</h1>
        <p class="mt-3 text-sm text-text-secondary">
          We emailed a link to <span class="font-semibold text-text-primary">{{ submittedEmail }}</span>
          <br>
          The link works and expires in 30 minutes.
        </p>

        <div class="mt-5 rounded-field border border-success-border bg-success-surface p-4">
          <p class="flex items-center gap-2 text-sm font-bold text-success">
            <Icon name="lucide:check-circle" class="size-4" aria-hidden="true" />
            Next steps
          </p>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-text-secondary">
            <li>Open the email from <span class="font-semibold">ReStockr</span></li>
            <li>Tap "Choose a new password"</li>
            <li>Sign in with your new password</li>
          </ul>
        </div>

        <button
          type="button"
          class="mt-5 w-full rounded-full bg-surface-input px-6 py-3 text-sm font-bold text-text-primary transition-colors hover:bg-gray-500/40"
          @click="useDifferentEmail"
        >
          Use a different email
        </button>
        <BaseButton type="button" variant="dark" block class="mt-3" to="/login">Back to Sign In</BaseButton>

        <p class="mt-5 border-t border-border-subtle pt-4 text-center text-xs text-text-muted">
          Nothing after a few minutes? Check your spam folder, or contact support and we'll verify you another way.
        </p>
      </template>

      <template v-else>
        <p class="mt-6 text-sm font-bold text-danger">Password recovery</p>
        <h1 class="font-display text-3xl font-bold text-text-primary">Let's get you back in.</h1>
        <p class="mt-3 text-sm text-text-secondary">Enter the email on your account and we'll send a secure reset link.</p>

        <form class="mt-6 space-y-4" novalidate @submit="onSubmit">
          <BaseInput v-model="email" v-bind="emailAttrs" label="Email address" type="email" autocomplete="email" :error="errors.email" />
          <BaseAlert v-if="submitError" tone="danger">{{ submitError }}</BaseAlert>
          <BaseButton type="submit" variant="dark" block :loading="isSubmitting">Send Reset Link</BaseButton>
        </form>

        <p class="mt-5 flex items-start gap-2 border-t border-border-subtle pt-4 text-xs text-text-muted">
          <span class="flex size-5 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white">
            <Icon name="lucide:star" class="size-3" aria-hidden="true" />
          </span>
          We never change your password for you. The reset link lets you set a new one yourself, so your account stays
          yours.
        </p>
      </template>
    </div>
  </div>
</template>
