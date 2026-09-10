<script setup lang="ts">
definePageMeta({ layout: 'marketplace' })

useSeoMeta({ title: 'ReStockr - Checkout' })

const cart = useCart()
const checkout = useCheckout()

onMounted(() => {
  if (cart.isEmpty.value && checkout.step.value !== 'success') {
    navigateTo('/cart')
  }
})

function handlePlaceOrder() {
  checkout.placeOrder()
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <template v-if="checkout.step.value === 'success' && checkout.lastOrder.value">
      <CheckoutSuccess :order="checkout.lastOrder.value" />
    </template>

    <template v-else>
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
        <CheckoutSteps :current="checkout.step.value" />

        <div class="min-w-0 flex-1">
          <CheckoutDeliveryAddress
            v-if="checkout.step.value === 'address'"
            :selected-id="checkout.selectedAddress.value?.id ?? null"
            @submit="checkout.setAddress"
          />
          <CheckoutDeliveryOptions
            v-else-if="checkout.step.value === 'delivery'"
            :selected="checkout.deliveryOption.value"
            @submit="checkout.setDeliveryOption"
            @back="checkout.goToStep('address')"
          />
          <CheckoutPaymentMethods
            v-else-if="checkout.step.value === 'payment'"
            :selected="checkout.paymentMethod.value"
            @submit="checkout.setPaymentMethod"
            @back="checkout.goToStep('delivery')"
          />

          <div v-else-if="checkout.step.value === 'review'" class="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 class="font-display text-xl font-bold text-text-primary">Review your Order</h2>
              <p class="mt-1 text-sm text-text-secondary">Please your details before placing your order.</p>

              <div class="mt-5 space-y-5">
                <div>
                  <div class="flex items-center justify-between">
                    <p class="font-display text-base font-bold text-text-primary">Delivery Address</p>
                    <button type="button" class="text-xs font-bold text-text-secondary underline hover:text-text-primary" @click="checkout.goToStep('address')">
                      Edit
                    </button>
                  </div>
                  <p v-if="checkout.selectedAddress.value" class="mt-1 text-sm text-text-secondary">
                    {{ checkout.selectedAddress.value.fullName }}<br>
                    {{ checkout.selectedAddress.value.addressLine }}, {{ checkout.selectedAddress.value.city }}, {{ checkout.selectedAddress.value.state }}, {{ checkout.selectedAddress.value.country }}<br>
                    {{ checkout.selectedAddress.value.phone }}
                  </p>
                </div>

                <div class="flex items-start justify-between border-t border-border-subtle pt-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="font-display text-base font-bold text-text-primary">Delivery Option</p>
                      <button type="button" class="text-xs font-bold text-text-secondary underline hover:text-text-primary" @click="checkout.goToStep('delivery')">
                        Edit
                      </button>
                    </div>
                    <p class="mt-1 text-sm text-text-secondary">{{ checkout.deliveryOption.value.label }} ({{ checkout.deliveryOption.value.description }})</p>
                  </div>
                  <p class="shrink-0 font-display text-sm font-bold text-text-primary">
                    {{ checkout.deliveryOption.value.fee > 0 ? formatCurrency(checkout.deliveryOption.value.fee) : 'Free' }}
                  </p>
                </div>

                <div class="border-t border-border-subtle pt-4">
                  <p class="font-display text-base font-bold text-text-primary">Payment Method</p>
                  <p class="mt-1 flex items-center gap-2 text-sm text-text-secondary">
                    <span class="capitalize">{{ checkout.paymentMethod.value?.replace('-', ' ') }}</span>
                    <Icon v-if="checkout.paymentMethod.value === 'card'" name="logos:visa" class="h-4 w-auto" aria-hidden="true" />
                    <Icon v-if="checkout.paymentMethod.value === 'card'" name="logos:mastercard" class="h-4 w-auto" aria-hidden="true" />
                  </p>
                </div>
              </div>

              <div class="mt-6 flex justify-start">
                <BaseButton variant="outline" size="lg" class="text-text-primary" @click="checkout.goToStep('payment')">
                  <Icon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
                  back
                </BaseButton>
              </div>
            </div>

            <CheckoutOrderSummary @place-order="handlePlaceOrder" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
