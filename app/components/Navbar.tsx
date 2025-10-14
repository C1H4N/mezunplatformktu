"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo ve Başlık */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KTÜ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Mezun Platformu</h1>
                <p className="text-xs text-muted">Karadeniz Teknik Üniversitesi</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:flex items-center gap-1">
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
            <Link
              href="/api/auth/signin"
              className="px-4 py-2 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
            >
              Giriş
            </Link>
            <Link
              href="/kayit"
              className="px-4 py-2 ml-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors font-medium shadow-sm"
            >
              Kayıt Ol
            </Link>
          </div>

          {/* Profil İkonu & Hamburger Menü */}
          <div className="flex items-center gap-2">
            {/* Profil İkonu (Desktop) */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-muted-bg hover:bg-primary-light transition-colors"
              aria-label="Profil"
            >
              <svg
                className="w-5 h-5 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Hamburger Menü (Mobile) */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted-bg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menü"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <Link
                href="/api/auth/signin"
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted-bg hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giriş
              </Link>
              <Link
                href="/kayit"
                className="px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors font-medium text-center shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

