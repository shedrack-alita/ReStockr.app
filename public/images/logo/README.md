# public/images/logo

Brand lockups and logomarks, sourced from `logo/SVG/` at the repo root and
renamed to kebab-case. `AppLogo.vue` is the only current consumer,
referencing these by absolute path (`/images/logo/...`):

- `logo-full-black.svg` / `logo-full-white.svg` — full lockup (icon +
  wordmark), used via `tone="light"`/`tone="dark"`.
- `logomark-green.svg` — icon only, used via `markOnly`. Also the source
  for the favicon (see `public/images/README.md`).

The rest (`logomark-gold*.svg`, `logomark-green-alt.svg`,
`logomark-main-gold.svg`, `logomark-white*.svg`) are other brand-kit color
variants kept for whenever a future surface needs one — not currently
referenced anywhere.
