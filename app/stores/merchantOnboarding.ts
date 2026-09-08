import type {
  MerchantApplicationStatus,
  MerchantDocumentKey,
  MerchantDocumentSlot,
  MerchantOnboardingProfile,
  MerchantStoreInfo,
} from '#shared/types/merchant'

const DOCUMENT_SLOTS: Omit<MerchantDocumentSlot, 'fileName'>[] = [
  { key: 'businessRegistration', label: 'Business Registration Certificate', hint: 'PDF, JPG or PNG (Max 5MB)' },
  { key: 'governmentId', label: "Government ID (e.g Passport, NIN, Driver's License.)", hint: 'PDF, JPG or PNG (Max 5MB)' },
  { key: 'utilityBill', label: 'Utility Bill or Bank Statement', hint: 'PDF, JPG or PNG (Max 5MB)' },
]

/**
 * Post-signup merchant onboarding wizard state (see /Merchant feature
 * 4-8: Profile -> Store -> Documents -> Review -> submitted). Client-only
 * and in-memory, mirroring app/stores/onboarding.ts (the customer
 * equivalent) — there's no server/api/merchant/onboarding/* yet.
 */
export const useMerchantOnboardingStore = defineStore('merchantOnboarding', () => {
  const profile = ref<MerchantOnboardingProfile | null>(null)
  const store = ref<MerchantStoreInfo | null>(null)
  const documents = ref<MerchantDocumentSlot[]>(DOCUMENT_SLOTS.map((slot) => ({ ...slot })))
  const applicationStatus = ref<MerchantApplicationStatus>('under-review')
  const submitted = ref(false)

  const allDocumentsUploaded = computed(() => documents.value.every((d) => !!d.fileName))

  function setProfile(value: MerchantOnboardingProfile) {
    profile.value = value
  }

  function setStore(value: MerchantStoreInfo) {
    store.value = value
  }

  function setDocument(key: MerchantDocumentKey, fileName: string) {
    const slot = documents.value.find((d) => d.key === key)
    if (slot) slot.fileName = fileName
  }

  function submit() {
    submitted.value = true
    applicationStatus.value = 'under-review'
  }

  function reset() {
    profile.value = null
    store.value = null
    documents.value = DOCUMENT_SLOTS.map((slot) => ({ ...slot }))
    applicationStatus.value = 'under-review'
    submitted.value = false
  }

  return {
    profile,
    store,
    documents,
    applicationStatus,
    submitted,
    allDocumentsUploaded,
    setProfile,
    setStore,
    setDocument,
    submit,
    reset,
  }
})
