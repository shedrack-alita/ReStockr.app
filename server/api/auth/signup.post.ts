import { signUpSchema } from '#shared/schemas/auth'

/**
 * Contract-first stub — see server/utils/apiError.ts. Validates the
 * request body (so malformed requests already get a proper 400) then
 * throws 501, since there's no user database to actually create an
 * account in yet.
 */
export default defineEventHandler(async (event) => {
  await readValidatedBody(event, signUpSchema.parse)
  throw notImplemented('Sign up')
})
