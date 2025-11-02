"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">KTÜ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">
                Mezun Platformu
              </h1>
              <p className="text-xs text-muted">
                Karadeniz Teknik Üniversitesi
              </p>
            </div>
          </Link>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/mezunlar"
              className="px-4 py-2 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
            >
              Mezunlar
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                >
                  Giriş
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 ml-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors font-medium shadow-sm"
                >
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <>
                {/* Kullanıcı bilgisi */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted-bg text-sm">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="profil"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">
                      {user?.firstName || "Kullanıcı"}
                      {user?.lastName && ` ${user?.lastName}`}
                    </span>
                    <span className="text-xs text-muted">{user?.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 ml-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  Çıkış
                </button>
              </>
            )}
          </div>

          {/* Mobile Menü Butonu */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted-bg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menü */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/mezunlar"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mezunlar
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors font-medium text-center shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 bg-muted-bg rounded-lg">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="profil"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">
                        {user?.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{user?.name}</span>
                      <span className="text-xs text-muted">{user?.email}</span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium text-center shadow-sm"
                  >
                    Çıkış Yap
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
