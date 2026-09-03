import { createError } from 'h3'

/**
 * Every mutation route that doesn't have a real backend behind it yet
 * (see server/api/auth/*.ts) throws this instead of faking success. It's
 * deliberately loud — a raw 501 in the network tab and console — rather
 * than a mock that quietly "works" and hides how much backend integration
 * is left to do.
 */
export function notImplemented(what: string) {
  return createError({
    statusCode: 501,
    statusMessage: 'Not Implemented',
    message: `${what} — no backend is wired up yet. This endpoint's request/response contract is final (see shared/types), only the implementation is pending.`,
  })
}
