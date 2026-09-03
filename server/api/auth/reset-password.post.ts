import { resetPasswordSchema } from '#shared/schemas/auth'

/** Contract-first stub — see server/utils/apiError.ts. */
export default defineEventHandler(async (event) => {
  await readValidatedBody(event, resetPasswordSchema.parse)
  throw notImplemented('Password reset')
})
