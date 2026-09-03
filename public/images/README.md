# public/images

Real page content — anything a visitor is actually looking at, not a UI
decoration. If you're unsure which folder an image belongs in: **if a
human is browsing the page to look at the photo, it goes here.** (Small
design buttons/icons/decoration go in `app/assets/images/` instead — see
that folder's README.)

Served as-is (no Vite processing), referenced by absolute path, e.g.
`<NuxtImg src="/images/home/hero-cart.png" />`. This is also the *only*
place `<NuxtImg>`/`<NuxtPicture>` can read local files from —
`@nuxt/image`'s local provider (`ipx`) resolves `src` from `public/` (or
a remote domain), never from `app/assets/`.

- `home/` — homepage banner/hero imagery. **Populated:** `hero-cart.png`,
  the cart illustration used in `HomeHero` and the auth split-screen
  layout (`app/layouts/auth.vue`) — cut directly from the design mock
  (`ReStockr UI/Landing page - Desktop Grid.png`), not a placeholder
  stock photo. See the note at the bottom of this file before assuming
  its current crop/edges are pristine.
- `logo/` — the primary site logo, used in the header nav (`AppLogo.vue`
  reads these by absolute path) and the favicon (see below).
  **Populated:** `logo-full-black.svg` / `logo-full-white.svg` (full
  lockup) and `logomark-green.svg` (icon only), plus unused color
  variants kept from the brand kit for future use.
- `products/` — product catalog photos. **Empty** — no product catalog
  feature yet (`server/api/products/` is still a placeholder).
- `blog/` — blog post photos/illustrations. **Empty** — no blog feature
  exists.
- `team/` — About Us / team headshots or office photos. **Empty** — no
  About page exists.
- `og/` — the OpenGraph/social-sharing preview image. **Empty** —
  `ogImage` is disabled in `nuxt.config.ts` until a real one exists here.

## Favicon

`public/favicon.ico` and `public/apple-touch-icon.png` are rasterized
from `logo/logomark-green.svg` via `node scripts/generate-favicon.cjs` —
re-run that if the logomark ever changes. Those two files stay directly
in `public/` (not `public/images/`) since browsers fetch them from a
fixed URL, not from a page.

## hero-cart.png provenance

The version originally produced in an earlier session (812×939,
chroma-keyed out of the design mock's flat green background, cropped
tightly to exclude the decorative smiley emoji and partial carts peeking
in from the hero's edges) was later replaced outside that session with a
different file. Check its actual dimensions/content before assuming a
past description of it (in git history or elsewhere) still matches
what's on disk. To redo a clean version: crop tightly around the
cart/bags/gift-boxes group at native resolution, chroma-key out the
mock's flat `rgb(27, 98, 16)` background (color-distance threshold with a
short feathered ramp for anti-aliased edges, then auto-trim to the opaque
bounding box), save as a transparent PNG. Reproducible with `sharp`
(already a project dependency via `@nuxt/image`).
