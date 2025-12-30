import { PrismaClient } from '@/app/generated/prisma'

const globalForPrisma = global as unknown as { prismaFixed: PrismaClient }

export const prisma =
  globalForPrisma.prismaFixed ||
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.NODE_ENV === 'production' && process.env.INTERNAL_DATABASE_URL
            ? process.env.INTERNAL_DATABASE_URL
            : process.env.DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaFixed = prisma

export default prisma
