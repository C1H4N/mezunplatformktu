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
  "/duyurular",
];
// Public API route'ları — giriş gerektirmez
const publicApiPrefixes = [
  "/api/auth", // NextAuth
  "/api/register", // Kayıt endpoint
  "/api/admin/departments", // Register formunda bölüm listesi için (herkese açık GET)
  "/api/turkey-map", // Anasayfa harita SVG'si (herkese açık)
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/"),
  );
  const isPublicApi = publicApiPrefixes.some((prefix) =>
    nextUrl.pathname.startsWith(prefix),
  );
  const isApiRoute = nextUrl.pathname.startsWith("/api/");

  if (isPublicApi || isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    // API route'ları için JSON 401 döndür (HTML rewrite yapmak client-side fetch'i bozar)
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 },
      );
    }
    // Sayfa route'ları için unauthorized sayfasına yönlendir
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
