import { riderSignInSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, riderSignInSchema.parse)
  return { user: buildMockUser(body.phone, undefined, 'rider') }
})
