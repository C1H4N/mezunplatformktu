import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User as NextAuthUser } from "next-auth";
import prisma from "./lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" as const },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, unknown> | undefined) {
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
        } as NextAuthUser;
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: NextAuthUser | undefined;
    }) {
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
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & {
        id?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        role?: string;
      };
    }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.firstName = token.firstName!;
        session.user.lastName = token.lastName!;
        session.user.email = token.email!;
        session.user.phoneNumber = token.phoneNumber!;
        session.user.image = token.image as string;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
