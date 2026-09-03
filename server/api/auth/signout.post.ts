/**
 * Contract-first stub — see server/utils/apiError.ts. No body to validate;
 * throws 501 since there's no real session to invalidate yet.
 */
export default defineEventHandler(() => {
  throw notImplemented('Sign out')
})
