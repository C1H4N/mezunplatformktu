// auth.ts
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
        console.log("Authorize called with:", { email: credentials?.email });
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.toLowerCase().trim()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          console.log("Missing credentials");
          throw new CredentialsSignin("Email/telefon ve şifre gerekli.");
        }

        const user = await prisma.user.findFirst({
          where: { OR: [{ email }, { phoneNumber: email }] },
        });

        if (!user) {
          console.log("User not found for:", email);
          throw new CredentialsSignin("Kullanıcı bulunamadı.");
        }

        if (!user.password) {
          console.log("User has no password set");
          throw new CredentialsSignin("Kullanıcı bulunamadı.");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log("Invalid password for:", email);
          throw new CredentialsSignin("Geçersiz şifre.");
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        console.log("Login successful for:", email);

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || "", // Handle null
          image: user.image || "",
          role: user.role,
        };
      },
    }),
  ],
});
