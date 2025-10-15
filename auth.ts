// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.toLowerCase().trim()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password)
          throw new Error("Email/telefon ve şifre gerekli.");

        const user = await prisma.user.findFirst({
          where: { OR: [{ email }, { phoneNumber: email }] },
        });

        if (!user || !user.password) throw new Error("Kullanıcı bulunamadı.");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Geçersiz şifre.");

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          image: user.image || "",
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.image = token.image as string;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
