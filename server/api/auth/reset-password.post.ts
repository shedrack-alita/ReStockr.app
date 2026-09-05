import { resetPasswordSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  await readValidatedBody(event, resetPasswordSchema.parse)
  return { success: true }
})
