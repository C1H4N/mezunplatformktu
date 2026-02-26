import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/unauthorized",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/duyurular"
];
// Public API route'ları — giriş gerektirmez
const publicApiPrefixes = [
    "/api/auth",       // NextAuth
    "/api/register",   // Kayıt endpoint
    "/api/admin/departments", // Register formunda bölüm listesi için (herkese açık GET)
];

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isPublicRoute = publicRoutes.some(
        (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
    );
    const isPublicApi = publicApiPrefixes.some((prefix) =>
        nextUrl.pathname.startsWith(prefix)
    );

    if (isPublicApi || isPublicRoute) {
        return NextResponse.next();
    }

    if (!isLoggedIn) {
        // Giriş gerektiren route — unauthorized sayfasına yönlendir
        return NextResponse.rewrite(new URL("/unauthorized", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
