"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/Button";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const user = session?.user;

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const toggleMenu = () => {
    if (mobileMenuOpen) {
      handleCloseMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-none rounded-lg flex items-center justify-center">
              <img
                src="/favicon.ico?v=2"
                alt="KTÜ Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-contain"
              />
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
              className={buttonVariants({ variant: "ghost" })}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/mezunlar"
              className={buttonVariants({ variant: "ghost" })}
            >
              Mezunlar
            </Link>
            <Link
              href="/jobs"
              className={buttonVariants({ variant: "ghost" })}
            >
              İlanlar
            </Link>
            <Link
              href="/events"
              className={buttonVariants({ variant: "ghost" })}
            >
              Etkinlikler
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Giriş
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({ variant: "default" })}
                >
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <>
                {user?.role === "STUDENT" && (
                  <Link
                    href="/applications"
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Başvurularım
                  </Link>
                )}
                <Link
                  href="/messages"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Mesajlar
                </Link>
                <NotificationBell />
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted-bg text-sm hover:bg-muted-bg/80 transition-colors"
                >
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
                      {user?.firstName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  )}
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">
                      {user?.firstName || "Kullanıcı"}
                      {user?.lastName && ` ${user?.lastName}`}
                    </span>
                    <span className="text-xs text-muted">{user?.email}</span>
                  </div>
                </Link>

                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="destructive"
                  className="ml-2"
                >
                  Çıkış
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menü Butonu */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted-bg transition-colors"
            onClick={toggleMenu}
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
        {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
          <div className={`fixed inset-0 z-[999] md:hidden bg-background flex flex-col ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Menü</h2>
              <button
                onClick={handleCloseMenu}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              <Link
                href="/"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium flex items-center gap-3 text-lg"
                onClick={handleCloseMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Ana Sayfa
              </Link>
              <Link
                href="/mezunlar"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium flex items-center gap-3 text-lg"
                onClick={handleCloseMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Mezunlar
              </Link>
              <Link
                href="/jobs"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium flex items-center gap-3 text-lg"
                onClick={handleCloseMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                İlanlar
              </Link>
              <Link
                href="/events"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium flex items-center gap-3 text-lg"
                onClick={handleCloseMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Etkinlikler
              </Link>

              <div className="h-px bg-border my-2"></div>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "ghost", className: "w-full justify-start text-lg" })}
                    onClick={handleCloseMenu}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className={buttonVariants({ variant: "default", className: "w-full justify-center text-lg py-6" })}
                    onClick={handleCloseMenu}
                  >
                    Kayıt Ol
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 px-4 py-4 bg-muted-bg rounded-lg">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="profil"
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-12 h-12"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-lg font-bold text-white">
                        {user?.firstName?.[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-lg truncate">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-sm text-muted truncate">{user?.email}</span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className={buttonVariants({ variant: "ghost", className: "w-full justify-start text-lg" })}
                    onClick={handleCloseMenu}
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profilim
                  </Link>
                  {user?.role === "STUDENT" && (
                    <Link
                      href="/applications"
                      className={buttonVariants({ variant: "ghost", className: "w-full justify-start text-lg" })}
                      onClick={handleCloseMenu}
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Başvurularım
                    </Link>
                  )}
                  <Button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      handleCloseMenu();
                    }}
                    variant="destructive"
                    className="w-full py-6 text-lg"
                  >
                    Çıkış Yap
                  </Button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
    </nav>
  );
}
