import { merchantSignInSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, merchantSignInSchema.parse)
  return { user: buildMockUser(body.email, undefined, 'merchant') }
})
