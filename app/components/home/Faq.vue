<script setup lang="ts">
const items = [
  {
    question: 'What is ReStockr?',
    answer:
      'ReStockr Technologies is a Nigerian-owned commerce technology platform designed to simplify and power how businesses buy, sell, move, and manage goods across Africa. We connect merchants, customers, and riders through an intelligent platform that brings together inventory, procurement, distribution, logistics, payments, embedded finance, AI, and business intelligence, helping businesses operate more efficiently, make smarter decisions, and grow sustainably. Our mission is to build the Commerce Operating System for Africa, starting with localized solutions and expanding across the continent.',
  },
  {
    question: 'How does ReStockr work?',
    answer:
      'Merchants list their products, customers browse and order at wholesale prices, and ReStockr matches a verified rider to pick up and deliver — while quietly tracking usage patterns to predict your next restock before you run out.',
  },
  {
    question: 'Who can sell on ReStockr?',
    answer: 'Any verified merchant — from independent sellers to multi-branch retailers — can list products after a quick verification step.',
  },
  {
    question: 'How do I place an order?',
    answer: "Browse the marketplace, add items to your cart, and check out securely. You'll get updates from confirmation through to delivery.",
  },
  {
    question: 'How is my order delivered?',
    answer: 'By a verified ReStockr rider matched to your order, with live tracking from pickup to your door.',
  },
  {
    question: 'Will I pay for delivery?',
    answer: 'Delivery fees are calculated by distance and shown at checkout before you confirm your order.',
  },
  {
    question: 'How fast is the delivery?',
    answer: 'Most orders within the same city are delivered within 24–48 hours, depending on merchant availability and location.',
  },
  {
    question: 'Is there a minimum order requirement?',
    answer: 'No minimum order is required — order as little or as much as you need, whenever you need it.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept debit and credit cards (Visa & Mastercard), bank transfers, and other secure payment options at checkout.',
  },
  {
    question: 'Do you offer discounts for bulk orders?',
    answer: 'Yes — many merchants offer wholesale pricing on bulk orders, shown directly on the product page.',
  },
]
</script>

<template>
  <section id="about" class="px-4 py-14 sm:px-6 sm:py-20">
    <div class="mx-auto max-w-3xl rounded-card bg-surface-card p-4 shadow-xl sm:p-8">
      <h2 class="mb-6 text-center font-display text-2xl font-bold text-text-primary sm:text-3xl">
        Frequently Asked Questions
      </h2>
      <BaseAccordion :items="items" default-open="What is ReStockr?" />
    </div>
  </section>
</template>
