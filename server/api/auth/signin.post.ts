import { signInSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signInSchema.parse)
  return { user: buildMockUser(body.email, undefined, 'customer') }
})
