import { merchantSignUpSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, merchantSignUpSchema.parse)
  return { user: buildMockUser(body.email, body.fullName, 'merchant') }
})
