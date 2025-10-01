import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './db'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { JWT } from 'next-auth/jwt'
import { Session, User } from 'next-auth'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' as const },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const identifier = credentials?.email?.toLowerCase().trim()
        const password = credentials?.password

        if (!identifier || !password) {
          throw new Error('Email/telefon ve şifre gereklidir.')
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { phoneNumber: identifier }],
          },
        })

        if (!user || !user.password) {
          throw new Error('Kullanıcı bulunamadı.')
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          throw new Error('Geçersiz şifre.')
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.email = user.email.toLowerCase()
        token.phoneNumber = user.phoneNumber
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.email = token.email
        session.user.phoneNumber = token.phoneNumber as string
        session.user.role = token.role as 'admin' | 'user'
      }
      return session
    },
  },
}
