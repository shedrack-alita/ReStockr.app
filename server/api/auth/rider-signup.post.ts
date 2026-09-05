import { riderSignUpSchema } from '#shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, riderSignUpSchema.parse)
  return { user: buildMockUser(body.phone, body.name, 'rider') }
})
