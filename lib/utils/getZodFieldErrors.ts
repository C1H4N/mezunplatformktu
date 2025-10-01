import { ZodError } from 'zod'

export function getZodFieldErrors<T>(error: ZodError<T>) {
  return error.issues.reduce((acc: Record<string, string[]>, curr) => {
    const key = curr.path[0] as string
    if (!acc[key]) acc[key] = []
    acc[key].push(curr.message)
    return acc
  }, {})
}
