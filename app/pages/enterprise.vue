<script setup lang="ts">
useSeoMeta({
  title: 'ReStockr - Enterprise',
  description: 'Bring the ReStockr Commerce Operating System to your enterprise supply chain.',
})
</script>

<template>
  <div>
    <section class="relative text-white">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-[#091d05] via-[#184c0e] to-[#143d0c]" aria-hidden="true" />
      <div class="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p class="font-display-alt text-lg text-gold-400 sm:text-xl">Enterprise</p>
        <h1 class="font-display-alt mt-2 text-4xl uppercase leading-[1.08] sm:text-5xl">Built for scale.</h1>
        <p class="mx-auto mt-4 max-w-xl text-white/85">
          Multi-warehouse inventory, dedicated account management, custom integrations and volume pricing — for
          businesses running commerce at enterprise scale.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Icon name="lucide:building-2" class="size-6" aria-hidden="true" />
      </span>
      <h2 class="mt-5 font-display text-2xl font-bold text-text-primary sm:text-3xl">Let's talk about your business</h2>
      <p class="mt-3 text-text-secondary">
        Our enterprise offering is being tailored with early partners. Reach out and our team will get back to you
        with next steps.
      </p>
      <BaseButton to="mailto:enterprise@restockr.co" variant="dark" size="lg" class="mt-6">
        Contact our team
        <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
      </BaseButton>
    </section>
  </div>
</template>
