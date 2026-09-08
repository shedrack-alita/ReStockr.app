<script setup lang="ts">
import type { MerchantProduct } from '#shared/types/merchant'

definePageMeta({ layout: 'merchant' })

useSeoMeta({ title: 'ReStockr - Create New Product' })

const catalog = useMerchantCatalogStore()

type StepKey = 'basic' | 'images' | 'inventory' | 'pricing' | 'review'
const steps: { key: StepKey; label: string }[] = [
  { key: 'basic', label: 'Basic Information' },
  { key: 'images', label: 'Images' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'pricing', label: 'Pricing & Shipping' },
  { key: 'review', label: 'Review' },
]
const stepIndex = ref(0)
const currentStep = computed(() => steps[stepIndex.value]!.key)
const furthestStep = ref(0)

const categoryOptions = computed(() => catalog.categories.map((c) => ({ value: c.name, label: c.name })))

const form = reactive({
  name: '',
  category: categoryOptions.value[0]?.value ?? '',
  subcategory: '',
  brand: '',
  description: '',
  images: [] as { url: string; alt: string }[],
  sku: '',
  barcode: '',
  stockManagement: true,
  quantityInStock: 0,
  lowStockThreshold: 10,
  allowBackorders: false,
  trackInventory: true,
  regularPrice: 0,
  salePrice: undefined as number | undefined,
  costPrice: undefined as number | undefined,
  status: 'active' as MerchantProduct['status'],
  visibility: 'everyone' as MerchantProduct['visibility'],
})

const errors = reactive<Record<string, string | undefined>>({})

function validateStep(key: StepKey): boolean {
  if (key === 'basic') {
    errors.name = form.name.trim() ? undefined : 'Product name is required'
    errors.category = form.category ? undefined : 'Category is required'
    return !errors.name && !errors.category
  }
  if (key === 'inventory') {
    errors.sku = form.sku.trim() ? undefined : 'SKU is required'
    errors.quantityInStock = form.quantityInStock >= 0 ? undefined : 'Enter a valid quantity'
    return !errors.sku && !errors.quantityInStock
  }
  if (key === 'pricing') {
    errors.regularPrice = form.regularPrice > 0 ? undefined : 'Regular price is required'
    return !errors.regularPrice
  }
  return true
}

function goToStep(index: number) {
  if (index <= furthestStep.value) stepIndex.value = index
}

function handleBack() {
  if (stepIndex.value === 0) navigateTo('/merchant/products')
  else stepIndex.value -= 1
}

function handleContinue() {
  if (!validateStep(currentStep.value)) return

  if (stepIndex.value === steps.length - 1) {
    const product: MerchantProduct = {
      id: `mp-${Date.now()}`,
      name: form.name.trim(),
      sku: form.sku.trim(),
      barcode: form.barcode.trim() || undefined,
      category: form.category,
      subcategory: form.subcategory.trim() || undefined,
      brand: form.brand.trim() || undefined,
      description: form.description.trim(),
      images: form.images.length ? form.images : [{ url: '/images/products/wireless-earbuds.jpg', alt: form.name }],
      regularPrice: form.regularPrice,
      salePrice: form.salePrice,
      costPrice: form.costPrice,
      quantityInStock: form.quantityInStock,
      lowStockThreshold: form.lowStockThreshold,
      allowBackorders: form.allowBackorders,
      trackInventory: form.trackInventory,
      status: form.status,
      availability: form.quantityInStock > 0 ? 'in-stock' : 'out-of-stock',
      visibility: form.visibility,
    }
    catalog.addProduct(product)
    navigateTo('/merchant/products')
    return
  }

  stepIndex.value += 1
  furthestStep.value = Math.max(furthestStep.value, stepIndex.value)
}

function handleFileChange(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = () => form.images.push({ url: reader.result as string, alt: form.name || file.name })
    reader.readAsDataURL(file)
  }
}

function removeImage(index: number) {
  form.images.splice(index, 1)
}

const savings = computed(() => {
  if (!form.salePrice || form.salePrice >= form.regularPrice) return null
  const amount = form.regularPrice - form.salePrice
  const percent = Math.round((amount / form.regularPrice) * 100)
  return { amount, percent }
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">
          {{ currentStep === 'review' ? 'Review & Publish' : 'Create New Product' }}
        </h1>
        <p class="mt-1 text-sm text-text-secondary">
          {{ currentStep === 'review' ? 'Review your product details before publishing.' : 'Add a new product to your store.' }}
        </p>
      </div>
      <div class="flex gap-3">
        <BaseButton variant="outline" class="text-text-primary" @click="handleBack">{{ stepIndex === 0 ? 'Cancel' : 'Back' }}</BaseButton>
        <BaseButton variant="dark" @click="handleContinue">{{ stepIndex === steps.length - 1 ? 'Publish Product' : 'Save & continue' }}</BaseButton>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
      <div class="space-y-2 rounded-card bg-white p-3">
        <button
          v-for="(step, i) in steps"
          :key="step.key"
          type="button"
          class="flex w-full items-center gap-3 rounded-field px-3 py-3 text-left text-sm font-semibold transition-colors"
          :class="i === stepIndex ? 'bg-gray-100 text-text-primary' : 'text-text-secondary hover:bg-gray-50'"
          :disabled="i > furthestStep"
          @click="goToStep(i)"
        >
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            :class="i < furthestStep ? 'bg-green-700 text-white' : i === stepIndex ? 'bg-green-700 text-white' : 'border border-border-strong text-text-muted'"
          >
            <Icon v-if="i < furthestStep" name="lucide:check" class="size-4" aria-hidden="true" />
            <template v-else>{{ i + 1 }}</template>
          </span>
          {{ step.label }}
        </button>
      </div>

      <div class="rounded-card bg-white p-6">
        <!-- Step 1: Basic Information -->
        <template v-if="currentStep === 'basic'">
          <h2 class="font-display text-lg font-bold text-text-primary">Basic Information</h2>
          <div class="mt-4 space-y-4">
            <BaseInput v-model="form.name" label="Product Name" :error="errors.name" />
            <div class="grid gap-4 sm:grid-cols-2">
              <BaseSelect v-model="form.category" label="Category" :options="categoryOptions" :error="errors.category" />
              <BaseInput v-model="form.subcategory" label="Subcategory (optional)" placeholder="e.g. Headphones" />
            </div>
            <BaseInput v-model="form.brand" label="Brand" />
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-text-primary">Detailed Description</span>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full resize-none rounded-field border border-border-subtle bg-surface-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-focus-ring"
                placeholder="Describe your product"
              />
            </label>
          </div>
        </template>

        <!-- Step 2: Images -->
        <template v-else-if="currentStep === 'images'">
          <h2 class="font-display text-lg font-bold text-text-primary">Upload images</h2>
          <div class="mt-3 flex items-start gap-2 rounded-field bg-surface-input/60 p-3 text-xs text-text-secondary">
            <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            First image will be your product thumbnail.
          </div>

          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label
              class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-field border-2 border-dashed border-border-strong bg-surface-input/40 p-8 text-center hover:bg-surface-input/60"
            >
              <Icon name="lucide:upload" class="size-6 text-text-secondary" aria-hidden="true" />
              <span class="text-sm text-text-secondary">Drag & drop images here or</span>
              <span class="rounded-full bg-white px-4 py-2 text-sm font-bold text-text-primary shadow-sm ring-1 ring-border-subtle">Browse Files</span>
              <span class="text-xs text-text-muted">JPG, PNG or WEBP (Max 5MB)</span>
              <input type="file" accept="image/*" multiple class="hidden" @change="handleFileChange">
            </label>

            <div v-if="form.images.length" class="grid grid-cols-3 gap-2 content-start">
              <div v-for="(image, i) in form.images" :key="i" class="group relative aspect-square overflow-hidden rounded-field bg-gray-100">
                <img :src="image.url" alt="" class="size-full object-cover">
                <span v-if="i === 0" class="absolute left-1.5 top-1.5 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">Main</span>
                <button
                  type="button"
                  class="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-gray-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  :aria-label="`Remove image ${i + 1}`"
                  @click="removeImage(i)"
                >
                  <Icon name="lucide:x" class="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Step 3: Inventory -->
        <template v-else-if="currentStep === 'inventory'">
          <h2 class="font-display text-lg font-bold text-text-primary">Inventory Management</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <BaseInput v-model="form.sku" label="SKU" :error="errors.sku" />
            <BaseInput v-model="form.barcode" label="Barcode (UPC etc.)" />
          </div>

          <div class="mt-5 flex items-center justify-between rounded-field bg-surface-input/50 p-4">
            <div>
              <p class="text-sm font-bold text-text-primary">Stock Management</p>
              <p class="text-xs text-text-muted">Track inventory for this product</p>
            </div>
            <BaseToggle v-model="form.stockManagement" />
          </div>

          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <BaseInput
              :model-value="String(form.quantityInStock)"
              label="Quantity in Stock"
              type="number"
              :error="errors.quantityInStock"
              @update:model-value="form.quantityInStock = Number($event) || 0"
            />
            <BaseInput
              :model-value="String(form.lowStockThreshold)"
              label="Low stock threshold"
              type="number"
              @update:model-value="form.lowStockThreshold = Number($event) || 0"
            />
          </div>

          <div class="mt-4 flex items-center justify-between rounded-field bg-surface-input/50 p-4">
            <div>
              <p class="text-sm font-bold text-text-primary">Allow Backorders</p>
              <p class="text-xs text-text-muted">Allow customers to purchase when out of stock.</p>
            </div>
            <BaseToggle v-model="form.allowBackorders" />
          </div>

          <div class="mt-4 flex items-center justify-between rounded-field bg-surface-input/50 p-4">
            <div>
              <p class="text-sm font-bold text-text-primary">Track inventory</p>
              <p class="text-xs text-text-muted">Automatically track product inventory.</p>
            </div>
            <BaseToggle v-model="form.trackInventory" />
          </div>
        </template>

        <!-- Step 4: Pricing & Shipping -->
        <template v-else-if="currentStep === 'pricing'">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 class="font-display text-lg font-bold text-text-primary">Pricing</h2>
              <div class="mt-4 space-y-4">
                <BaseInput
                  :model-value="String(form.regularPrice || '')"
                  label="Regular Price"
                  type="number"
                  :error="errors.regularPrice"
                  @update:model-value="form.regularPrice = Number($event) || 0"
                />
                <BaseInput
                  :model-value="form.salePrice != null ? String(form.salePrice) : ''"
                  label="Sale Price"
                  type="number"
                  @update:model-value="form.salePrice = $event ? Number($event) : undefined"
                />
                <BaseInput
                  :model-value="form.costPrice != null ? String(form.costPrice) : ''"
                  label="Cost Price"
                  type="number"
                  @update:model-value="form.costPrice = $event ? Number($event) : undefined"
                />
              </div>
            </div>

            <div>
              <h2 class="font-display text-lg font-bold text-text-primary">Product Availability</h2>
              <div class="mt-4 space-y-4">
                <BaseSelect
                  v-model="form.status"
                  label="Product status"
                  :options="[
                    { value: 'active', label: 'Active' },
                    { value: 'draft', label: 'Draft' },
                    { value: 'inactive', label: 'Inactive' },
                  ]"
                />
                <BaseSelect
                  v-model="form.visibility"
                  label="Visibility"
                  :options="[
                    { value: 'everyone', label: 'Visible (Everyone)' },
                    { value: 'hidden', label: 'Hidden' },
                  ]"
                  hint="Product status will be visible to all customers"
                />
                <div class="flex items-start gap-2 rounded-field bg-green-100 p-3 text-sm text-green-800">
                  <Icon name="lucide:check-circle" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <div>
                    <p class="font-bold">{{ form.quantityInStock > 0 ? 'In Stock' : 'Out of Stock' }}</p>
                    <p class="text-xs">
                      {{ form.quantityInStock > 0 ? 'This product is available for purchase.' : 'This product cannot be purchased yet.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Step 5: Review -->
        <template v-else>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-field bg-surface-input/50 p-4">
              <h3 class="font-display text-base font-bold text-text-primary">Product</h3>
              <div class="mt-3 flex items-center gap-3">
                <img
                  v-if="form.images[0]"
                  :src="form.images[0].url"
                  alt=""
                  class="size-16 shrink-0 rounded-field bg-gray-100 object-cover"
                >
                <span v-else class="flex size-16 shrink-0 items-center justify-center rounded-field bg-gray-200 text-text-muted">
                  <Icon name="lucide:image" class="size-6" aria-hidden="true" />
                </span>
                <div class="min-w-0">
                  <p class="truncate font-bold text-text-primary">{{ form.name || 'Untitled product' }}</p>
                  <p class="text-xs text-text-muted">{{ form.category }} <span v-if="form.subcategory">▸ {{ form.subcategory }}</span></p>
                  <p class="text-xs text-text-muted">SKU: {{ form.sku || '—' }}</p>
                  <span
                    class="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize"
                    :class="form.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-danger-surface text-danger'"
                  >
                    {{ form.status }}
                  </span>
                </div>
              </div>
            </div>

            <div class="rounded-field bg-surface-input/50 p-4">
              <h3 class="font-display text-base font-bold text-text-primary">Price</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between"><dt class="text-text-secondary">Regular Price:</dt><dd class="font-semibold text-text-primary">₦{{ form.regularPrice.toLocaleString('en-NG') }}</dd></div>
                <div v-if="form.salePrice" class="flex justify-between"><dt class="text-text-secondary">Sale Price:</dt><dd class="font-semibold text-text-primary">₦{{ form.salePrice.toLocaleString('en-NG') }}</dd></div>
                <div v-if="savings" class="flex justify-between"><dt class="text-text-secondary">You save:</dt><dd class="font-semibold text-green-700">₦{{ savings.amount.toLocaleString('en-NG') }} ({{ savings.percent }}%)</dd></div>
              </dl>
            </div>

            <div class="rounded-field bg-surface-input/50 p-4">
              <h3 class="font-display text-base font-bold text-text-primary">Inventory</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between"><dt class="text-text-secondary">Quantity in Stock:</dt><dd class="font-semibold text-text-primary">{{ form.quantityInStock }}</dd></div>
                <div class="flex justify-between"><dt class="text-text-secondary">Low Stock Threshold:</dt><dd class="font-semibold text-text-primary">{{ form.lowStockThreshold }}</dd></div>
                <div class="flex justify-between"><dt class="text-text-secondary">Track Inventory:</dt><dd class="font-semibold text-text-primary">{{ form.trackInventory ? 'Yes' : 'No' }}</dd></div>
                <div class="flex justify-between"><dt class="text-text-secondary">Allow Backorders:</dt><dd class="font-semibold text-text-primary">{{ form.allowBackorders ? 'Yes' : 'No' }}</dd></div>
              </dl>
            </div>

            <div class="rounded-field bg-surface-input/50 p-4">
              <h3 class="font-display text-base font-bold text-text-primary">Images ({{ form.images.length }})</h3>
              <div v-if="form.images.length" class="mt-3 grid grid-cols-4 gap-2">
                <img v-for="(image, i) in form.images" :key="i" :src="image.url" alt="" class="aspect-square rounded-field object-cover">
              </div>
              <p v-else class="mt-3 text-sm text-text-muted">No images uploaded.</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
