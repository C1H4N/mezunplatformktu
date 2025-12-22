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
    image?: string | null
    coverImage?: string | null
    role: 'admin' | 'user' | 'STUDENT' | 'ALUMNI' | 'EMPLOYER' | 'MODERATOR' | 'ADMIN' | 'USER'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    firstName?: string
    lastName?: string
    email: string
    role: 'admin' | 'user' | 'STUDENT' | 'ALUMNI' | 'EMPLOYER' | 'MODERATOR' | 'ADMIN' | 'USER'
    phoneNumber: string
    image?: string | null
    coverImage?: string | null
  }
}
