/**
 * Real catalog Product entity contract — the shape server/api/products/*
 * (see its README) should implement against once a backend exists. This
 * is deliberately separate from app/types/product.ts's `ShowcaseProduct`,
 * which is a landing-page marketing-copy shape (static, no backend) and
 * not this feature.
 *
 * Filled out (id/slug/name only, before) against app/mocks/products.ts —
 * every field here is actually rendered somewhere in
 * components/product