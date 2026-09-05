<script setup lang="ts">
definePageMeta({ layout: 'auth' })

useSeoMeta({ title: 'ReStockr - Set up preferences' })

const products = useProductsStore()
const onboarding = useOnboardingStore()

onMounted(() => void products.fetch())

const categoryIcons: Record<string, string> = {
  'Home Decor': 'lucide:sofa',
  Electronics: 'lucide:monitor-smartphone',
  Power: 'lucide:zap',
  'Personal Care': 'lucide:sparkles',
  'Home Appliances': 'lucide:refrigerator',
  "Women's": 'lucide:shirt',
  "Men's": 'lucide:shirt',
  Kiddies: 'lucide:baby',
  'Office Appliances': 'lucide:printer',
}

const selected = ref<string[]>(
  onboarding.preferredCategories.length ? [...onboarding.preferredCategories] : [...products.categories],
)

watch(
  () => products.categories,
  (categories) => {
    if (!onboarding.preferredCategories.length && selected.value.length === 0) selected.value = [...categories]
  },
)

function toggle(category: string) {
  selected.value = selected.value.includes(category)
    ? selected.value.filter((c) => c !== category)
    : [...selected.value, category]
}

function handleContinue() {
  onboarding.setPreferredCategories(selected.value)
  navigateTo('/onboarding/delivery')
}
</script>

<template>
  <div class="w-full max-w-lg">
    <OnboardingSteps current="preferences" class="mb-4" />

    <div class="rounded-card border-2 border-white bg-surface-card p-6 shadow-xl sm:p-8">
      <p class="text-sm font-bold text-green-600">Set up Preferences</p>
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">What should we show you first?</h1>

      <p class="mt-6 text-sm font-semibold text-text-primary">Category</p>
      <div class="mt-3 grid grid-cols-3 gap-3">
        <button
          v-for="category in products.categories"
          :key="category"
          type="button"
          class="relative flex flex-col items-center gap-2 rounded-field bg-white p-4 text-center transition-colors"
          :class="selected.includes(category) ? 'ring-2 ring-green-500' : 'hover:bg-gray-100'"
          @click="toggle(category)"
        >
          <span
            class="absolute right-2 top-2 flex size-4 items-center justify-center rounded-[4px]"
            :class="selected.includes(category) ? 'bg-gold-500' : 'border border-border-strong'"
          >
            <Icon v-if="selected.includes(category)" name="lucide:check" class="size-3 text-gray-950" aria-hidden="true" />
          </span>
          <Icon :name="categoryIcons[category] ?? 'lucide:shapes'" class="size-7 text-text-primary" aria-hidden="true" />
          <span class="text-xs font-medium text-text-secondary">{{ category }}</span>
        </button>
      </div>

      <p class="mt-4 text-xs text-text-muted">
        {{ selected.length }} selected — you can change these anytime in <span class="font-semibold text-text-primary">settings</span>.
      </p>

      <BaseButton type="button" variant="primary" size="lg" block class="mt-6" @click="handleContinue">Continue</BaseButton>
    </div>
  </div>
</template>
