<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Edit Profile' })

const auth = useAuth()
const user = useUserStore()

const editProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
  phone: z.string().trim().min(7, 'Enter a valid phone number'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
})

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(editProfileSchema),
  initialValues: {
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    phone: user.profile.phone,
    email: auth.user.value?.email ?? '',
  },
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')

const avatarPreview = ref(user.profile.avatarDataUrl ?? null)
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

function handlePhotoChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => (avatarPreview.value = reader.result as string)
  reader.readAsDataURL(file)
}

const onSubmit = handleSubmit((values) => {
  user.updateProfile({
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    avatarDataUrl: avatarPreview.value ?? undefined,
  })
  navigateTo('/account/profile')
})
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Edit Profile details</h1>
    <p class="mt-1 text-sm text-text-secondary">Update your personal information</p>

    <form novalidate @submit="onSubmit">
      <div class="mt-6 flex items-center gap-4 rounded-card bg-white p-6">
        <button
          type="button"
          class="relative flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-400 focus-visible:outline-2 focus-visible:outline-focus-ring"
          aria-label="Change profile photo"
          @click="fileInput?.click()"
        >
          <img v-if="avatarPreview" :src="avatarPreview" alt="" class="size-full rounded-full object-cover">
          <Icon v-else name="lucide:user" class="size-8 text-gray-600" aria-hidden="true" />
          <span class="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-gray-950 text-white">
            <Icon name="lucide:camera" class="size-3" aria-hidden="true" />
          </span>
        </button>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handlePhotoChange">
        <div>
          <button
            type="button"
            class="rounded-full bg-white px-4 py-2 text-sm font-bold text-text-primary shadow-sm ring-1 ring-border-subtle hover:bg-gray-100"
            @click="fileInput?.click()"
          >
            Change Photo
          </button>
          <p class="mt-1.5 text-xs text-text-muted">JPG, PNG. Max size 2MB</p>
        </div>
      </div>

      <div class="mt-4 rounded-card bg-white p-6">
        <h2 class="font-display text-lg font-bold text-text-primary">Personal details</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <BaseInput v-model="firstName" v-bind="firstNameAttrs" label="First Name" autocomplete="given-name" :error="errors.firstName" />
          <BaseInput v-model="lastName" v-bind="lastNameAttrs" label="Last Name" autocomplete="family-name" :error="errors.lastName" />
          <BaseInput v-model="phone" v-bind="phoneAttrs" label="Phone Number" type="tel" autocomplete="tel" :error="errors.phone" />
          <BaseInput v-model="email" v-bind="emailAttrs" label="Email address" type="email" autocomplete="email" :error="errors.email">
            <template #label-extra>
              <span class="flex items-center gap-1 rounded-full bg-green-950 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                <Icon name="lucide:check" class="size-3" aria-hidden="true" />
                Verified
              </span>
            </template>
          </BaseInput>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <BaseButton type="submit" variant="dark" size="lg">Save changes</BaseButton>
        <BaseButton to="/account/profile" variant="ghost" size="lg">Cancel</BaseButton>
      </div>
    </form>
  </div>
</template>
