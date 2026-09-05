import { signUpSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signUpSchema.parse)
  return { user: buildMockUser(body.email, body.name, 'customer') }
})
