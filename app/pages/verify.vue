<script setup lang="ts">
import type { OtpChannel } from '#shared/types/auth'

definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Check your inbox' })

const route = useRoute()
const router = useRouter()
const auth = useAuth()

const channel = computed<OtpChannel>(() => (route.query.channel === 'phone' ? 'phone' : 'email'))
const destination = computed(() => (typeof route.query.destination === 'string' ? route.query.destination : 'your account'))
const next = computed(() => (typeof route.query.next === 'string' ? route.query.next : '/onboarding/profile'))

const digits = ref(['', '', '', ''])
const inputRefs = useTemplateRef<HTMLInputElement[]>('inputRefs')
const isSubmitting = ref(false)
const error = ref<string | null>(null)

const RESEND_SECONDS = 30
const secondsLeft = ref(RESEND_SECONDS)
let timer: ReturnType<typeof setInterval> | undefined

function startTimer() {
  clearInterval(timer)
  secondsLeft.value = RESEND_SECONDS
  timer = setInterval(() => {
    if (secondsLeft.value > 0) secondsLeft.value--
    else clearInterval(timer)
  }, 1000)
}
onMounted(startTimer)
onUnmounted(() => clearInterval(timer))

function handleResend() {
  if (secondsLeft.value > 0) return
  startTimer()
}

function handleDigitInput(index: number, event: Event) {
  const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1)
  digits.value[index] = value
  if (value && index < digits.value.length - 1) inputRefs.value?.[index + 1]?.focus()
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value?.[index - 1]?.focus()
  }
}

const code = computed(() => digits.value.join(''))
const isComplete = computed(() => code.value.length === 4)

async function handleSubmit() {
  if (!isComplete.value) return
  error.value = null
  isSubmitting.value = true
  try {
    await auth.verifyOtp({ channel: channel.value, destination: destination.value, code: code.value })
    await router.push(next.value)
  } catch (err) {
    error.value = getErrorMessage(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-card border-1 border-white bg-surface-card p-6 text-center shadow-xl sm:p-8">
      <NuxtLink to="/login" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <p class="mt-6 text-left text-sm font-bold text-danger">Verify</p>
      <h1 class="text-left font-display text-3xl font-bold text-text-primary">
        {{ channel === 'phone' ? 'Check your phone' : 'Check your inbox' }}
      </h1>

      <Icon
        :name="channel === 'phone' ? 'lucide:message-circle' : 'lucide:mail'"
        class="mx-auto mt-6 size-24 text-gold-500"
        aria-hidden="true"
      />

      <p class="mt-6 text-sm font-semibold text-text-primary">4-digit Verification Code</p>
      <div class="mt-3 flex justify-center gap-3">
        <input
          v-for="(digit, i) in digits"
          :key="i"
          ref="inputRefs"
          type="text"
          inputmode="numeric"
          maxlength="1"
          :value="digit"
          class="size-14 rounded-field border border-border-subtle bg-surface-input text-center text-2xl font-bold text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
          :aria-label="`Digit ${i + 1} of 4`"
          @input="handleDigitInput(i, $event)"
          @keydown="handleKeydown(i, $event)"
        >
      </div>

      <p class="mt-4 text-sm text-text-secondary">
        Enter the code sent to
        <br>
        <span class="font-semibold text-gold-600">{{ destination }}</span>
      </p>

      <button
        type="button"
        class="mt-2 text-sm text-text-muted disabled:cursor-default"
        :disabled="secondsLeft > 0"
        @click="handleResend"
      >
        <span v-if="secondsLeft > 0">Resend Code in 0:{{ secondsLeft.toString().padStart(2, '0') }}</span>
        <span v-else class="font-semibold text-text-primary underline">Resend code</span>
      </button>

      <BaseAlert v-if="error" tone="danger" class="mt-4 text-left">{{ error }}</BaseAlert>
    </div>

    <BaseButton
      type="button"
      variant="primary"
      size="lg"
      block
      class="mt-6"
      :disabled="!isComplete"
      :loading="isSubmitting"
      @click="handleSubmit"
    >
      Verify & Continue
    </BaseButton>
  </div>
</template>
