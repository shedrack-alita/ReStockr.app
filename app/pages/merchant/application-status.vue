<script setup lang="ts">
definePageMeta({ layout: 'plain' })

useSeoMeta({ title: 'ReStockr - Application status' })

const route = useRoute()
const onboarding = useMerchantOnboardingStore()

// The demo backend has no real admin review queue, so a merchant's
// application always lands on "under-review" — `?status=` lets this
// screen's other two outcomes be previewed the same way
// auth/connecting.vue previews providers via a query param.
const status = computed(() => {
  const q = route.query.status
  if (q === 'rejected' || q === 'approved' || q === 'under-review') return q
  return onboarding.applicationStatus
})

const timeline = [
  { key: 'submitted', label: 'Submitted', date: 'May 20, 2024' },
  { key: 'in-review', label: 'In Review', date: 'May 25, 2024' },
  { key: 'decision', label: 'Decision', date: 'May 27, 2024' },
  { key: 'completed', label: 'Completed', date: 'May 27, 2024' },
] as const

const timelineDoneIndex = 1 // "Submitted" and "In Review" are complete while under review
</script>

<template>
  <div class="w-full max-w-xl">
    <!-- Under review -->
    <template v-if="status === 'under-review'">
      <div class="mb-4 flex justify-end">
        <span class="rounded-full bg-gold-200 px-4 py-1.5 text-sm font-bold text-gold-800">Under review</span>
      </div>

      <div class="rounded-card bg-surface-card p-6 shadow-xl sm:p-8">
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Application under review</h1>
        <p class="mt-1 text-sm text-text-secondary">Our team is reviewing your application</p>

        <div class="mt-8 flex items-start justify-between gap-1">
          <template v-for="(step, i) in timeline" :key="step.key">
            <div class="flex flex-col items-center gap-2 text-center">
              <span
                class="flex size-11 items-center justify-center rounded-full border-1 text-sm font-bold"
                :class="
                  i < timelineDoneIndex
                    ? 'border-green-600 bg-green-600 text-white'
                    : i === timelineDoneIndex
                      ? 'border-gold-500 bg-gold-500 text-white'
                      : 'border-border-strong bg-white text-text-muted'
                "
              >
                <Icon v-if="i <= timelineDoneIndex" name="lucide:check" class="size-5" aria-hidden="true" />
              </span>
              <span class="text-xs font-bold text-text-primary sm:text-sm">{{ step.label }}</span>
              <span class="text-[11px] text-text-muted">{{ step.date }}</span>
            </div>
            <span
              v-if="i < timeline.length - 1"
              class="mt-[22px] h-0.5 flex-1"
              :class="i < timelineDoneIndex ? 'bg-green-600' : 'bg-border-strong'"
              aria-hidden="true"
            />
          </template>
        </div>

        <div class="mt-8 rounded-field bg-surface-input/50 p-4">
          <p class="text-sm font-bold text-text-primary">What happens next?</p>
          <ul class="mt-3 space-y-2 text-sm text-text-secondary">
            <li class="flex items-start gap-2">
              <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              We ensure all documents and information are accurate.
            </li>
            <li class="flex items-start gap-2">
              <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              Our team may contact you for more information.
            </li>
            <li class="flex items-start gap-2">
              <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              You will be notified once a decision has been made.
            </li>
          </ul>
        </div>

        <div class="mt-4 rounded-field bg-gray-100 p-4">
          <p class="text-sm font-bold text-text-primary">Need help?</p>
          <p class="mt-1 text-sm text-text-secondary">
            Contact our support team at <a href="mailto:support@restockr.co" class="font-bold text-text-primary">support@restockr.co</a>
          </p>
        </div>
      </div>
    </template>

    <!-- Rejected -->
    <template v-else-if="status === 'rejected'">
      <div class="rounded-card bg-surface-card p-6 text-center shadow-xl sm:p-8">
        <span class="relative mx-auto flex size-24 items-center justify-center rounded-full bg-danger-surface">
          <Icon name="lucide:store" class="size-10 text-danger" aria-hidden="true" />
          <span class="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-danger text-white">
            <Icon name="lucide:x" class="size-4" aria-hidden="true" />
          </span>
        </span>

        <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Application not approved</h1>
        <p class="mt-1 text-sm text-text-secondary">We're unable to approve your application at this time.</p>

        <div class="mt-6 text-left">
          <p class="text-sm font-bold text-text-primary">Reason for rejection</p>
          <p class="mt-2 rounded-field border border-danger bg-danger-surface p-3 text-sm text-danger">
            The business document provided is unclear and does not match the registered name.
          </p>
        </div>

        <p class="mt-4 text-sm text-text-muted">You can update your information and resubmit your application.</p>

        <BaseButton to="/merchant/onboarding/documents" variant="dark" size="lg" block class="mt-5">Update & Resubmit</BaseButton>
        <a href="mailto:support@restockr.co" class="mt-3 block text-sm font-bold text-green-700 hover:underline">Contact Support</a>
      </div>
    </template>

    <!-- Approved -->
    <template v-else>
      <div class="rounded-card bg-surface-card p-6 text-center shadow-xl sm:p-8">
        <span class="relative mx-auto flex size-24 items-center justify-center rounded-full bg-green-100">
          <Icon name="lucide:store" class="size-10 text-green-700" aria-hidden="true" />
          <span class="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-green-700 text-white">
            <Icon name="lucide:check" class="size-4" aria-hidden="true" />
          </span>
        </span>

        <h1 class="mt-6 font-display text-2xl font-bold text-text-primary sm:text-3xl">Congratulations!</h1>
        <p class="mt-1 text-sm text-text-secondary">Your merchant account has been approved.</p>
        <p class="mt-4 text-sm text-text-primary">You can now start listing products and selling on ReStockr.</p>

        <BaseButton to="/merchant/dashboard" variant="dark" size="lg" block class="mt-6">Goto Merchant Dashboard</BaseButton>
        <NuxtLink to="/marketplace" class="mt-3 block text-sm font-bold text-green-700 hover:underline">View Store</NuxtLink>

        <div class="mt-5 rounded-field bg-green-100 p-4">
          <p class="text-sm font-bold text-text-primary">Welcome to ReStockr family! 🎉</p>
          <p class="mt-1 text-sm text-text-secondary">We're excited to have you aboard.</p>
        </div>
      </div>
    </template>
  </div>
</template>
