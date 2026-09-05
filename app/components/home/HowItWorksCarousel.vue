<script setup lang="ts">
const steps = [
  {
    label: 'Merchants Lists Product',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/TV_set_%2846_inch%29_in_self-customized_box_for_sending_via_parcel_service_N.1.jpg',
  },
  {
    label: 'Customer Shops',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Woman_examining_lamps_in_a_store_while_shopping_for_home_decor.jpg',
  },
  {
    label: 'Order & Payment',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Ingenico_iPP350_payment_terminal.jpg',
  },
  {
    label: 'Rider Picks Up',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/PiaggioDeliveryRodos.JPG',
  },
  {
    label: 'Customer Receives',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/A_Delivery_Driver_Knocking_on_a_Door_to_Deliver_Packages.jpg',
  },
]
</script>

<template>
  <section id="how-it-works" class="pb-6">
    <div class="flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:justify-center sm:px-6">
      <div
        v-for="(step, i) in steps"
        :key="step.label"
        class="relative w-36 shrink-0 snap-start overflow-hidden rounded-field sm:w-48"
      >
        <NuxtImg
          :src="step.url"
          :alt="step.label"
          width="300"
          height="380"
          sizes="144px sm:192px"
          loading="lazy"
          class="aspect-[4/5] w-full object-cover"
        />
        <span
          class="absolute left-2 top-2 flex size-7 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-gray-950"
          aria-hidden="true"
        >
          {{ i + 1 }}
        </span>
        <span class="absolute inset-x-0 bottom-0 bg-gold-500 px-2 py-1.5 text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-gray-950">
          {{ step.label }}
        </span>
      </div>
    </div>
  </section>
</template>
