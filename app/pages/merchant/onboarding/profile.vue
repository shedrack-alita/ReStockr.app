<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Tell us about yourself' })

const auth = useAuth()
const onboarding = useMerchantOnboardingStore()

const fullName = ref(onboarding.profile?.fullName ?? auth.user.value?.name ?? '')
const phone = ref(onboarding.profile?.phone ?? '')
const country = ref(onboarding.profile?.country ?? 'Nigeria')
const dateOfBirth = ref(onboarding.profile?.dateOfBirth ?? '')
const avatarPreview = ref<string | null>(onboarding.profile?.avatarDataUrl ?? null)
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const countryOptions = [
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'South Africa', label: 'South Africa' },
]

const errors = reactive<{ fullName?: string; phone?: string; dateOfBirth?: string }>({})

function handlePhotoChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (avatarPreview.value = reader.result as string)
  reader.readAsDataURL(file)
}

function handleSubmit() {
  errors.fullName = fullName.value.trim() ? undefined : 'Enter your full name'
  errors.phone = phone.value.trim() ? undefined : 'Enter your phone number'
  errors.dateOfBirth = dateOfBirth.value.trim() ? undefined : 'Enter your date of birth'
  if (errors.fullName || errors.phone || errors.dateOfBirth) return

  onboarding.setProfile({
    fullName: fullName.value.trim(),
    phone: phone.value.trim(),
    country: country.value,
    dateOfBirth: dateOfBirth.value.trim(),
    avatarDataUrl: avatarPreview.value ?? undefined,
  })
  navigateTo('/merchant/onboarding/store')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <MerchantOnboardingSteps current="profile" class="mb-4" />

    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/merchant/welcome" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Tell us about yourself</h1>
      <p class="mt-1 text-sm text-text-secondary">Add your personal details</p>

      <button
        type="button"
        class="relative mt-5 flex size-20 items-center justify-center rounded-full bg-gray-400 focus-visible:outline-2 focus-visible:outline-focus-ring"
        aria-label="Upload profile photo"
        @click="fileInput?.click()"
      >
        <img v-if="avatarPreview" :src="avatarPreview" alt="" class="size-full rounded-full object-cover">
        <Icon v-else name="lucide:user" class="size-10 text-gray-600" aria-hidden="true" />
        <span class="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:camera" class="size-3.5" aria-hidden="true" />
        </span>
      </button>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handlePhotoChange">

      <form class="mt-6 grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="handleSubmit">
        <BaseInput v-model="fullName" label="Full Name" autocomplete="name" :error="errors.fullName" />
        <BaseInput v-model="phone" label="Phone number" type="tel" autocomplete="tel" :error="errors.phone" />
        <BaseSelect v-model="country" label="Country" :options="countryOptions" class="sm:col-span-2" />
        <BaseInput v-model="dateOfBirth" label="Date of birth" type="date" :error="errors.dateOfBirth" class="sm:col-span-2" />

        <BaseButton type="submit" variant="dark" size="lg" block class="sm:col-span-2">Save & continue</BaseButton>
      </form>
    </div>
  </div>
</template>
