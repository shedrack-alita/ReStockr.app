import { createError } from 'h3'

export function notImplemented(what: string) {
  return createError({
    statusCode: 501,
    statusMessage: 'Not Implemented',
    message: `${what} — no backend is wired up yet. This endpoint's request/response contract is final (see shared/types), only the implementation is pending.`,
  })
}
