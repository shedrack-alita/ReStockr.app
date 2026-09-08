<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Set up your store' })

const onboarding = useMerchantOnboardingStore()

if (!onboarding.profile) navigateTo('/merchant/onboarding/profile')

const storeName = ref(onboarding.store?.storeName ?? '')
const storeCategory = ref(onboarding.store?.storeCategory ?? '')
const storeDescription = ref(onboarding.store?.storeDescription ?? '')

const categoryOptions = [
  { value: '', label: 'Select a category' },
  { value: 'Gadgets', label: 'Gadgets' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Home & Living', label: 'Home & Living' },
  { value: 'Beauty & Personal Care', label: 'Beauty & Personal Care' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Other', label: 'Other' },
]

const errors = reactive<{ storeName?: string; storeCategory?: string }>({})

function handleSubmit() {
  errors.storeName = storeName.value.trim() ? undefined : 'Enter your store name'
  errors.storeCategory = storeCategory.value.trim() ? undefined : 'Choose a store category'
  if (errors.storeName || errors.storeCategory) return

  onboarding.setStore({
    storeName: storeName.value.trim(),
    storeCategory: storeCategory.value,
    storeDescription: storeDescription.value.trim(),
  })
  navigateTo('/merchant/onboarding/documents')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <MerchantOnboardingSteps current="store" class="mb-4" />

    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/merchant/onboarding/profile" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Let's set up your store</h1>
      <p class="mt-1 text-sm text-text-secondary">Add your store information</p>

      <form class="mt-6 space-y-4" novalidate @submit.prevent="handleSubmit">
        <BaseInput v-model="storeName" label="Store name" :error="errors.storeName" />
        <BaseSelect v-model="storeCategory" label="Store Category" :options="categoryOptions" :error="errors.storeCategory" />

        <label class="block">
          <span class="mb-1.5 block text-sm font-semibold text-text-primary">Store Description</span>
          <textarea
            v-model="storeDescription"
            rows="4"
            class="w-full resize-none rounded-field border border-border-subtle bg-surface-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
            placeholder="We sell quality and affordable gadgets"
          />
        </label>

        <BaseButton type="submit" variant="dark" size="lg" block>Save & continue</BaseButton>
      </form>
    </div>
  </div>
</template>
