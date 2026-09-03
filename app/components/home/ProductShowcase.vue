<script setup lang="ts">
import type { ShowcaseProduct } from '~/types/product'

const categories = [
  'Recommended',
  'Home Decor',
  'Kitchen',
  'Electronics',
  'Beauty',
  'Others'
]

const newArrivals: ShowcaseProduct[] = [
  {
    name: 'Grater',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      seed: 'restockr-grater',
      alt: 'A stainless steel kitchen grater'
    }
  },
  {
    name: 'Blue Seal',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      seed: 'restockr-blue-seal',
      alt: 'A jar of Blue Seal petroleum jelly'
    }
  },
  {
    name: 'Nescafe Classic',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      seed: 'restockr-nescafe',
      alt: 'A pack of Nescafe Classic coffee sachets'
    }
  },
  {
    name: 'Checkers Custard',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      seed: 'restockr-custard',
      alt: 'A tub of Checkers custard powder'
    }
  },
]

const featuredByMerchants: ShowcaseProduct[] = [
  {
    name: 'Cotton Club Body Spray',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      seed: 'restockr-body-spray',
      alt: 'A bottle of Cotton Club body spray'
    }
  },
  {
    name: 'Crochet Shorts',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      seed: 'restockr-crochet-shorts',
      alt: 'A pair of orange crochet shorts'
    }
  },
  {
    name: 'Korean Tote Bag',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      seed: 'restockr-tote-bag',
      alt: 'A checkered Korean-style tote bag'
    }
  },
  {
    name: 'Coca-Cola Pack',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      seed: 'restockr-coke-pack',
      alt: 'A shrink-wrapped pack of Coca-Cola bottles'
    }
  },
]
</script>

<template>
  <section
    id="showcase"
    class="relative z-10 -mt-4 px-4 pb-2 sm:-mt-8 sm:px-6"
  >
    <div
      class="mx-auto max-w-5xl rounded-card bg-surface-card p-4 shadow-xl sm:p-6"
    >
      <SharedProductGrid
        title="New Arrivals"
        :categories="categories"
        :products="newArrivals"
      />

      <div class="mt-8">
        <SharedProductGrid
          title="Featured Products by Merchants"
          :categories="categories"
          :products="featuredByMerchants"
        />
      </div>
    </div>
  </section>
</template>