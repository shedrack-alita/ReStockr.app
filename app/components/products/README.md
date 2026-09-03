# components/products

Product-domain components: `ProductGallery.vue`, `ProductPrice.vue`,
`ProductReviews.vue`, `ProductFilters.vue`, etc. — everything specific to
browsing/viewing a product that isn't generic enough to live in
`components/shared`.

Not built yet — waiting on the product catalog feature (real backend API,
per the project's data-source decision). `ShowcaseProduct`
(`app/types/product.ts`) and `SharedProductCard`/`SharedProductGrid` are
landing-page-only stand-ins and are NOT this feature.
