<script setup lang="ts">
definePageMeta({ layout: 'account' })

useSeoMeta({ title: 'ReStockr - Personal Information' })

const auth = useAuth()
const user = useUserStore()

onMounted(() => {
  if (auth.status.value === 'idle') void auth.fetchSession()
})

const fullName = computed(() => `${user.profile.firstName} ${user.profile.lastName}`.trim())
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Personal Information</h1>
    <p class="mt-1 text-sm text-text-secondary">Manage your personal details and account information.</p>

    <div class="mt-6 flex flex-col items-start gap-4 rounded-card bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/account/profile/edit" class="relative flex size-16 items-center justify-center rounded-full bg-gray-400" aria-label="Edit profile photo">
          <img v-if="user.profile.avatarDataUrl" :src="user.profile.avatarDataUrl" alt="" class="size-full rounded-full object-cover">
          <Icon v-else name="lucide:user" class="size-8 text-gray-600" aria-hidden="true" />
          <span class="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-gray-950 text-white">
            <Icon name="lucide:camera" class="size-3" aria-hidden="true" />
          </span>
        </NuxtLink>
        <div>
          <p class="font-display text-xl font-bold text-text-primary">{{ fullName || 'Your name' }}</p>
          <p class="text-sm text-text-secondary">{{ auth.user.value?.email ?? '—' }}</p>
        </div>
      </div>
      <BaseButton to="/account/profile/edit" variant="primary" size="sm">
        <Icon name="lucide:pencil" class="size-4" aria-hidden="true" />
        Edit Profile
      </BaseButton>
    </div>

    <div class="mt-4 rounded-card bg-white p-6">
      <h2 class="font-display text-lg font-bold text-text-primary">Personal details</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p class="text-sm font-semibold text-text-primary">First Name</p>
          <p class="mt-1.5 rounded-field bg-surface-input px-4 py-2.5 text-sm text-text-secondary">{{ user.profile.firstName || '—' }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-text-primary">Last Name</p>
          <p class="mt-1.5 rounded-field bg-surface-input px-4 py-2.5 text-sm text-text-secondary">{{ user.profile.lastName || '—' }}</p>
        </div>
        <div class="sm:col-span-2">
          <p class="text-sm font-semibold text-text-primary">Phone Number</p>
          <p class="mt-1.5 rounded-field bg-surface-input px-4 py-2.5 text-sm text-text-secondary">{{ user.profile.phone || '—' }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-card bg-white p-6">
      <h2 class="font-display text-lg font-bold text-text-primary">Account details</h2>
      <div class="mt-4 space-y-4">
        <div>
          <p class="text-sm font-semibold text-text-primary">Email address</p>
          <p class="mt-1.5 rounded-field bg-surface-input px-4 py-2.5 text-sm text-text-secondary">{{ auth.user.value?.email ?? '—' }}</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-sm font-semibold text-text-primary">Account created</p>
            <div class="mt-1.5 flex items-center justify-between rounded-field bg-surface-input px-4 py-2.5">
              <span class="text-sm text-text-secondary">September 30, 2025</span>
              <span class="flex items-center gap-1 rounded-full bg-green-950 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                <Icon name="lucide:check" class="size-3" aria-hidden="true" />
                Verified
              </span>
            </div>
          </div>
          <div>
            <p class="text-sm font-semibold text-text-primary">Google account</p>
            <div class="mt-1.5 flex items-center justify-between rounded-field bg-surface-input px-4 py-2.5">
              <span class="text-sm text-text-secondary">Google connected</span>
              <span class="flex items-center gap-1 rounded-full bg-green-950 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                <Icon name="lucide:check" class="size-3" aria-hidden="true" />
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
