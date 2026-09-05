import { verifyOtpSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  await readValidatedBody(event, verifyOtpSchema.parse)
  return { success: true }
})
