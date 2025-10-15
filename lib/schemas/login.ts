import z from 'zod'

export const loginSchema = z.object({
  email: z.email() || z.number().min(10).max(15),
  password: z.string().min(8).max(50),
})