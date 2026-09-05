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
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cheese_grater.jpg',
      alt: 'A stainless steel kitchen grater'
    }
  },
  {
    name: 'Blue Seal',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Vaseline_cream.jpg',
      alt: 'A jar of Blue Seal petroleum jelly'
    }
  },
  {
    name: 'Nescafe Classic',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Instant_Coffee_Grains_Inside_Jar.jpeg',
      alt: 'A jar of Nescafe Classic instant coffee'
    }
  },
  {
    name: 'Checkers Custard',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Bird%27s-Custard.jpg',
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
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Boss_Bottled.jpg',
      alt: 'A bottle of Cotton Club body spray'
    }
  },
  {
    name: 'Crochet Shorts',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crochet_clothes.jpg',
      alt: 'Hands crocheting an orange garment with yarn'
    }
  },
  {
    name: 'Korean Tote Bag',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Canvas_two-tone_tote_Navy_and_Natural7_%289038437258%29.jpg',
      alt: 'A checkered Korean-style tote bag'
    }
  },
  {
    name: 'Coca-Cola Pack',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/770ml_Coca-Cola_Glass_Bottles_in_Taiwan.jpg',
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