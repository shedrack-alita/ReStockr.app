import { forgotPasswordSchema } from '#shared/schemas/auth'

/** Contract-first stub — see server/utils/apiError.ts. */
export default defineEventHandler(async (event) => {
  await readValidatedBody(event, forgotPasswordSchema.parse)
  throw notImplemented('Password reset request')
})
