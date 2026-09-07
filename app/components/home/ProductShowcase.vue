<script setup lang="ts">
import type { ShowcaseProduct } from '~/types/product'

const categories = [
  'Recommended',
  'Electronics',
  'Personal Care',
  'Footwear',
  'Eyewear',
  'Others'
]

const newArrivals: ShowcaseProduct[] = [
  {
    name: 'Wireless Earbuds',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: '/images/showcase/airpods-style-earbuds.jpg',
      alt: 'A pair of white wireless earbuds with a chrome charging case'
    }
  },
  {
    name: 'Skate Sneakers',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: '/images/showcase/vans-skate-sneakers.jpg',
      alt: 'A maroon and white skate sneaker'
    }
  },
  {
    name: 'Eternal Blue Perfume & Watch Set',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: '/images/showcase/perfume-watch-set.jpg',
      alt: 'A perfume bottle labelled Eternal Blue next to a purple wristwatch'
    }
  },
  {
    name: 'Noise Isolating Earbuds',
    price: 3500,
    comparePrice: 4000,
    status: 'In Stock',
    image: {
      url: '/images/showcase/earbuds-blueberries.jpg',
      alt: 'An open case of white wireless earbuds resting on fresh blueberries'
    }
  },
]

const featuredByMerchants: ShowcaseProduct[] = [
  {
    name: 'Studio Headphones',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: '/images/showcase/rg-over-ear-headphones.jpg',
      alt: 'Black over-ear studio headphones with a coiled cable'
    }
  },
  {
    name: 'Bass Boost Headphones',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: '/images/showcase/urbanista-headphones.jpg',
      alt: 'Red over-ear wireless headphones'
    }
  },
  {
    name: 'Midnight Oud Perfume',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: '/images/showcase/midnight-oud-perfume.jpg',
      alt: 'A dark square perfume bottle resting on a wooden branch'
    }
  },
  {
    name: 'Signature Perfume',
    price: 3500,
    comparePrice: 4000,
    status: 'Few Units Left',
    image: {
      url: '/images/showcase/signature-perfume.jpg',
      alt: 'A black perfume bottle with a faceted crystal cap'
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