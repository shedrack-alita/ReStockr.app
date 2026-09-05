<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Complete your profile' })

const auth = useAuth()
const onboarding = useOnboardingStore()

const firstName = ref(onboarding.profile?.firstName ?? auth.user.value?.name.split(' ')[0] ?? '')
const lastName = ref(onboarding.profile?.lastName ?? auth.user.value?.name.split(' ').slice(1).join(' ') ?? '')
const phone = ref(onboarding.profile?.phone ?? '')
const avatarPreview = ref<string | null>(null)
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const errors = reactive<{ firstName?: string; lastName?: string; phone?: string }>({})

function handlePhotoChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (avatarPreview.value = reader.result as string)
  reader.readAsDataURL(file)
}

function handleSubmit() {
  errors.firstName = firstName.value.trim() ? undefined : 'Enter your first name'
  errors.lastName = lastName.value.trim() ? undefined : 'Enter your last name'
  errors.phone = phone.value.trim() ? undefined : 'Enter your phone number'
  if (errors.firstName || errors.lastName || errors.phone) return

  onboarding.setProfile({ firstName: firstName.value.trim(), lastName: lastName.value.trim(), phone: phone.value.trim() })
  navigateTo('/onboarding/preferences')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <OnboardingSteps current="profile" class="mb-4" />

    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <h1 class="font-display text-2xl font-bold text-text-primary">Complete your profile</h1>
      <p class="mt-1 text-sm text-text-secondary">Let's get your account ready for a better shopping experience</p>

      <p class="mt-6 text-sm font-semibold text-text-primary">Profile photo (Optional)</p>
      <button
        type="button"
        class="relative mt-2 flex size-20 items-center justify-center rounded-full bg-gray-400 focus-visible:outline-2 focus-visible:outline-focus-ring"
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
        <BaseInput v-model="firstName" label="First Name" autocomplete="given-name" :error="errors.firstName" />
        <BaseInput v-model="lastName" label="Last Name" autocomplete="family-name" :error="errors.lastName" />
        <BaseInput v-model="phone" label="Phone number" type="tel" autocomplete="tel" :error="errors.phone" class="sm:col-span-2" />
        <BaseInput
          :model-value="auth.user.value?.email ?? ''"
          label="Email Address"
          disabled
          hint="Verified — can't be changed here"
          class="sm:col-span-2"
        />

        <BaseButton type="submit" variant="dark" size="lg" block class="sm:col-span-2">Save & Continue</BaseButton>
      </form>
    </div>
  </div>
</template>
