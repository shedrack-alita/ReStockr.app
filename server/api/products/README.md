# server/api/products

Real product-catalog endpoints (`index.get.ts`, `[slug].get.ts`, etc.),
implemented by a backend developer against this project's contract-first
convention: define request/response types in `shared/types/product.ts`
and `shared/schemas/product.ts` first, then implement the route handler.
See `server/api/auth/*` for the pattern this should follow (stub with
`createNotImplementedError` from `server/utils/apiError.ts` until real
logic exists).
