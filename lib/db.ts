import { PrismaClient } from '@/app/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.INTERNAL_DATABASE_URL
            ? process.env.INTERNAL_DATABASE_URL
            : process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
