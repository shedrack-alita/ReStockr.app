<script setup lang="ts">
import type { MerchantDocumentKey } from '#shared/types/merchant'

definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Upload required documents' })

const onboarding = useMerchantOnboardingStore()

if (!onboarding.store) navigateTo('/merchant/onboarding/store')

const fileInputs = useTemplateRef<HTMLInputElement[]>('fileInputs')

function triggerUpload(index: number) {
  fileInputs.value?.[index]?.click()
}

function handleFileChange(key: MerchantDocumentKey, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  onboarding.setDocument(key, file.name)
}

function handleSubmit() {
  navigateTo('/merchant/onboarding/review')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <MerchantOnboardingSteps current="documents" class="mb-4" />

    <div class="rounded-card border-1 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <NuxtLink to="/merchant/onboarding/store" class="flex items-center gap-2 text-sm font-bold text-text-primary">
        <span class="flex size-8 items-center justify-center rounded-full bg-gray-950 text-white">
          <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
        </span>
        back
      </NuxtLink>

      <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Upload required documents</h1>
      <p class="mt-1 text-sm text-text-secondary">These documents help us verify your business</p>

      <div class="mt-5 space-y-3">
        <div
          v-for="(doc, i) in onboarding.documents"
          :key="doc.key"
          class="flex items-center gap-3 rounded-field bg-surface-input/50 p-3"
        >
          <span class="flex size-9 shrink-0 items-center justify-center rounded-field bg-white text-text-secondary">
            <Icon name="lucide:file-text" class="size-4" aria-hidden="true" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-bold text-text-primary">{{ doc.label }}</p>
            <p class="truncate text-xs text-text-muted">{{ doc.fileName ?? doc.hint }}</p>
          </div>
          <button
            type="button"
            class="flex size-9 shrink-0 items-center justify-center rounded-full transition-colors"
            :class="doc.fileName ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'"
            :aria-label="`Upload ${doc.label}`"
            @click="triggerUpload(i)"
          >
            <Icon :name="doc.fileName ? 'lucide:check' : 'lucide:upload'" class="size-4" aria-hidden="true" />
          </button>
          <input
            ref="fileInputs"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            class="hidden"
            @change="handleFileChange(doc.key, $event)"
          >
        </div>
      </div>

      <div class="mt-4 flex items-start gap-2 rounded-field bg-green-100 p-3 text-xs text-green-800">
        <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        All documents must be clear, valid and information should be readable.
      </div>

      <BaseButton type="button" variant="dark" size="lg" block class="mt-6" @click="handleSubmit">Save & continue</BaseButton>
    </div>
  </div>
</template>
