import z from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.email(),
  phoneNumber: z.string().min(10).max(15),
  password: z.string().min(8).max(50),
})