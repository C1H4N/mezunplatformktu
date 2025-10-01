import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User
  }

  interface User {
    id: string
    firstName?: string
    lastName?: string
    email: string
    phoneNumber: string
    role: 'admin' | 'user'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    firstName?: string
    lastName?: string
    email: string
    role: 'admin' | 'user'
    phoneNumber: string
  }
}
