# app/assets/images

UI decoration only — never real page content. Quick test: **if the image
is a small design button, icon, or decoration, it goes here.** Anything a
human is actually browsing the page to look at (banners, product/blog/
team photos, the site logo, the OG share image) belongs in
`public/images/` instead — see that folder's README, and note it's also
the only place `<NuxtImg>`/`<NuxtPicture>` can read local files from
(`@nuxt/image`'s local provider resolves from `public/`, not here).

Files here get `import`ed into components (hashed/optimized by Vite) —
they're never referenced by absolute `/...` path the way `public/`
content is.

- `icons/` — one-off icons not covered by `@nuxt/icon`'s Iconify sets
  (small symbols: cart, search, profile, social glyphs not already
  handled by an Iconify collection). **Empty** — nothing has needed a
  custom one yet.
- `patterns/` — small repeating background patterns/textures referenced
  from CSS. **Empty** — no design currently uses one.
- `spinners/` — custom loading-spinner art (animated GIF/SVG), for
  anywhere a generic spinner isn't enough. **Empty** — nothing needs a
  custom one yet.
- `placeholders/` — "image unavailable" fallback art for a `public/
  images/{products,blog,team}/` photo that fails to load. **Empty** — no
  such fallback built yet.
