import { signInSchema } from '#shared/schemas/auth'

/** Contract-first stub — see server/utils/apiError.ts. */
export default defineEventHandler(async (event) => {
  await readValidatedBody(event, signInSchema.parse)
  throw notImplemented('Sign in')
})
