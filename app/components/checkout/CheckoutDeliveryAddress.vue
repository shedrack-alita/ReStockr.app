<script setup lang="ts">
const props = defineProps<{ selectedId: string | null }>()
const emit = defineEmits<{ submit: [addressId: string] }>()

const user = useUserStore()

const selected = ref(props.selectedId ?? user.addresses.find((a) => a.isDefault)?.id ?? user.addresses[0]?.id ?? null)

function handleSubmit() {
  if (selected.value) emit('submit', selected.value)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 class="font-display text-xl font-bold text-text-primary">Select Delivery Address</h2>
        <p class="mt-1 text-sm text-text-secondary">Choose from your saved addresses or add a new one.</p>
      </div>
      <NuxtLink
        to="/account/addresses/new?redirect=/checkout"
        class="rounded-full border border-border-strong px-4 py-2 text-sm font-bold text-text-primary hover:bg-gray-100"
      >
        + Add New Address
      </NuxtLink>
    </div>

    <div v-if="user.addresses.length === 0" class="mt-6 rounded-card bg-surface-card p-8 text-center text-sm text-text-muted">
      No saved addresses yet. Add one to continue.
    </div>

    <div v-else class="mt-6 space-y-4" role="radiogroup" aria-label="Delivery address">
      <button
        v-for="address in user.addresses"
        :key="address.id"
        type="button"
        role="radio"
        :aria-checked="selected === address.id"
        class="w-full rounded-card p-5 text-left transition-colors"
        :class="selected === address.id ? 'bg-green-50 ring-2 ring-green-500' : 'bg-surface-card hover:bg-gray-200'"
        @click="selected = address.id"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <span
              class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2"
              :class="selected === address.id ? 'border-green-600' : 'border-border-strong'"
            >
              <span v-if="selected === address.id" class="size-2.5 rounded-full bg-green-600" />
            </span>
            <div>
              <p class="flex items-center gap-2 font-display text-lg font-bold text-text-primary">
                {{ address.label }}
                <span v-if="address.isDefault" class="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">Default</span>
              </p>
              <p class="mt-1 text-sm text-text-secondary">
                {{ address.fullName }}<br>
                {{ address.addressLine }}<span v-if="address.apartment">, {{ address.apartment }}</span>, {{ address.city }}, {{ address.state }}, {{ address.country }}<br>
                {{ address.phone }}
              </p>
            </div>
          </div>
          <NuxtLink
            :to="`/account/addresses/${address.id}/edit?redirect=/checkout`"
            class="shrink-0 text-sm font-bold text-text-secondary underline hover:text-text-primary"
            @click.stop
          >
            Edit
          </NuxtLink>
        </div>
      </button>
    </div>

    <div class="mt-6 flex justify-end">
      <BaseButton variant="dark" size="lg" :disabled="!selected" @click="handleSubmit">Proceed to Delivery Option</BaseButton>
    </div>
  </div>
</template>
