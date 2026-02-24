import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    session: { strategy: "jwt" },
    providers: [], // The real providers are added in auth.ts
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.role = user.role;
                token.image = user.image;
                token.coverImage = user.coverImage;
            }

            if (trigger === "update" && session?.user) {
                token.firstName = session.user.firstName;
                token.lastName = session.user.lastName;
                token.phoneNumber = session.user.phoneNumber;
                token.email = session.user.email;
                token.image = session.user.image;
                token.coverImage = session.user.coverImage;
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
                session.user.role = token.role as any;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
