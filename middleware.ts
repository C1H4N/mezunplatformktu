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
    "/verify-email"
];
const apiRoutes = ["/api/upload"]; // Add any public api routes here

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicApiRoute = apiRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute && !isPublicApiRoute) {
        // Rewrite to unauthorized page so the URL remains the same
        return NextResponse.rewrite(new URL("/unauthorized", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
