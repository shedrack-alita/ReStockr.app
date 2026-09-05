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
      <h1 class="font-display text-2xl font-bold text-text-primary sm:text-3xl">Checkout</h1>
      <CheckoutSteps :current="checkout.step.value" class="mt-5" />

      <div class="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div class="rounded-card bg-white p-5 sm:p-6">
          <CheckoutShippingForm v-if="checkout.step.value === 'shipping'" @submit="checkout.setShippingAddress" />
          <CheckoutPaymentMethods v-else-if="checkout.step.value === 'payment'" @submit="checkout.setPaymentMethod" />

          <div v-else-if="checkout.step.value === 'review'">
            <h2 class="font-display text-xl font-bold text-text-primary">Review your order</h2>

            <div class="mt-4 rounded-field bg-surface-card p-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-text-primary">Shipping address</p>
                <button type="button" class="text-xs font-semibold text-text-secondary underline hover:text-text-primary" @click="checkout.goToStep('shipping')">
                  Change
                </button>
              </div>
              <p class="mt-1 text-sm text-text-secondary">
                {{ checkout.shippingAddress.value?.fullName }} — {{ checkout.shippingAddress.value?.addressLine }},
                {{ checkout.shippingAddress.value?.city }}, {{ checkout.shippingAddress.value?.state }}
              </p>
            </div>

            <div class="mt-3 rounded-field bg-surface-card p-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-text-primary">Payment method</p>
                <button type="button" class="text-xs font-semibold text-text-secondary underline hover:text-text-primary" @click="checkout.goToStep('payment')">
                  Change
                </button>
              </div>
              <p class="mt-1 text-sm capitalize text-text-secondary">{{ checkout.paymentMethod.value?.replace('-', ' ') }}</p>
            </div>

            <p class="mt-4 text-xs text-text-muted">
              Placing this order will complete your purchase. The order summary and total are on the right.
            </p>
          </div>
        </div>

        <CheckoutOrderSummary :show-place-order="checkout.step.value === 'review'" @place-order="handlePlaceOrder" />
      </div>
    </template>
  </div>
</template>
