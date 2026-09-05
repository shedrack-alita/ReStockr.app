import { forgotPasswordSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  await readValidatedBody(event, forgotPasswordSchema.parse)
  return { success: true }
})
