<script setup lang="ts">
import { mockMerchantBusiness } from '~/demo/merchant'

definePageMeta({ layout: 'merchant' })

useSeoMeta({ title: 'ReStockr - Merchant Dashboard' })

const business = mockMerchantBusiness

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

const quickActions = [
  { label: 'View Latest Payouts', icon: 'lucide:credit-card', to: '/merchant/report' },
  { label: 'Download Tax Reports', icon: 'lucide:file-text', to: '/merchant/report' },
  { label: 'Promotion & Drops Settings', icon: 'lucide:star', to: '/merchant/marketing' },
]

function stars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Good morning, {{ business.ownerName }}</h1>
        <p class="mt-1 text-sm text-text-secondary">Today is {{ today }}</p>
      </div>
      <BaseButton to="/merchant/settings" variant="primary" size="sm">
        <Icon name="lucide:pencil" class="size-4" aria-hidden="true" />
        Edit Profile
      </BaseButton>
    </div>

    <div class="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      <div v-for="stat in business.stats" :key="stat.label" class="rounded-card bg-white p-5">
        <p class="text-xs font-bold uppercase tracking-wide text-text-muted">{{ stat.label }}</p>
        <div class="mt-2 flex items-end justify-between gap-2">
          <p class="font-display text-2xl font-bold text-text-primary">{{ stat.value }}</p>
          <span class="flex items-center gap-0.5 text-xs font-bold text-green-600">
            <Icon name="lucide:trending-up" class="size-3.5" aria-hidden="true" />
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <div class="rounded-card bg-white p-6">
          <h2 class="font-display text-lg font-bold text-text-primary">Business Information</h2>
          <dl class="mt-4 space-y-4">
            <div class="flex items-start gap-3">
              <Icon name="lucide:map-pin" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              <div>
                <dt class="text-xs text-text-muted">Address</dt>
                <dd class="text-sm font-semibold text-text-primary">{{ business.addressLine }}</dd>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:mail" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              <div>
                <dt class="text-xs text-text-muted">Contact Email</dt>
                <dd class="text-sm font-semibold text-text-primary">{{ business.contactEmail }}</dd>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:clock" class="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
              <div>
                <dt class="text-xs text-text-muted">Business Hours</dt>
                <dd class="text-sm font-semibold text-text-primary">{{ business.businessHours }}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div class="rounded-card bg-white p-6">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-lg font-bold text-text-primary">Recent Ratings & Reviews</h2>
            <NuxtLink to="/merchant/report" class="text-xs font-semibold text-text-secondary underline hover:text-text-primary">See All</NuxtLink>
          </div>
          <div class="mt-4 space-y-3">
            <div v-for="review in business.reviews" :key="review.name" class="rounded-field bg-surface-input/50 p-4">
              <div class="flex items-center justify-between gap-3">
                <p class="text-sm font-bold text-text-primary">{{ review.name }} <span class="font-normal text-text-muted">· {{ review.when }}</span></p>
                <span class="flex gap-0.5">
                  <Icon
                    v-for="(filled, i) in stars(review.rating)"
                    :key="i"
                    name="lucide:star"
                    class="size-3.5"
                    :class="filled ? 'fill-gold-500 text-gold-500' : 'text-border-strong'"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <p class="mt-1.5 text-sm text-text-secondary">"{{ review.quote }}"</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="rounded-card bg-white p-6">
          <h2 class="font-display text-lg font-bold text-text-primary">Account Status</h2>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-text-secondary">Current Plan</span>
            <span class="rounded-full bg-gray-950 px-3 py-1 text-[11px] font-bold uppercase text-white">{{ business.plan.name }}</span>
          </div>
          <p class="mt-1 text-xs text-text-muted">Next renewal: {{ business.plan.nextRenewal }} ({{ business.plan.renewalAmount }})</p>

          <div class="mt-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-secondary">Monthly Drop Volume</span>
              <span class="font-bold text-text-primary">{{ business.plan.monthlyDropVolume }} / {{ business.plan.monthlyDropLimit }} drops</span>
            </div>
            <div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                class="h-full rounded-full bg-green-600"
                :style="{ width: `${(business.plan.monthlyDropVolume / business.plan.monthlyDropLimit) * 100}%` }"
              />
            </div>
          </div>
        </div>

        <div class="rounded-card bg-white p-6">
          <h2 class="font-display text-lg font-bold text-text-primary">Quick Portal Actions</h2>
          <div class="mt-4 space-y-2">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="flex items-center gap-3 rounded-field bg-surface-input/50 px-3 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-input"
            >
              <Icon :name="action.icon" class="size-4 shrink-0 text-text-secondary" aria-hidden="true" />
              <span class="flex-1">{{ action.label }}</span>
              <Icon name="lucide:arrow-right" class="size-4 shrink-0 text-text-muted" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
