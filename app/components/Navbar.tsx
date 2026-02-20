"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
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
    }, 300);
  };

  const toggleMenu = () => {
    if (mobileMenuOpen) {
      handleCloseMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  return (
    <nav className="navbar-deneyap">
      <div className="navbar-deneyap-inner">
        {/* Logo */}
        <Link href="/" className="navbar-deneyap-logo">
          <div className="navbar-deneyap-logo-icon">
            <img
              src="/favicon.ico?v=2"
              alt="KTÜ Logo"
              width={52}
              height={52}
              className="navbar-deneyap-logo-img"
            />
          </div>
          <div className="navbar-deneyap-logo-text">
            <h1 className="navbar-deneyap-logo-title">Mezun Platformu</h1>
            <p className="navbar-deneyap-logo-subtitle">
              Karadeniz Teknik Üniversitesi
            </p>
          </div>
        </Link>

        {/* Desktop Menü */}
        <div className="navbar-deneyap-menu">
          <div className="navbar-deneyap-links">
            <Link href="/" className="navbar-deneyap-link">
              Ana Sayfa
            </Link>
            <Link href="/mezunlar" className="navbar-deneyap-link">
              Mezunlar
            </Link>
            <Link href="/jobs" className="navbar-deneyap-link">
              İlanlar
            </Link>
            <Link href="/events" className="navbar-deneyap-link">
              Etkinlikler
            </Link>
          </div>

          {!isAuthenticated ? (
            <div className="navbar-deneyap-actions">
              <Link href="/login" className="navbar-deneyap-link">
                Giriş
              </Link>
              <Link href="/register" className="navbar-deneyap-btn-register">
                Kayıt Ol
              </Link>
              <Link href="/login" className="navbar-deneyap-btn-login">
                Giriş Yap
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="navbar-deneyap-actions">
              {user?.role === "STUDENT" && (
                <Link href="/applications" className="navbar-deneyap-link">
                  Başvurularım
                </Link>
              )}
              <Link href="/messages" className="navbar-deneyap-link">
                Mesajlar
              </Link>
              <NotificationBell />
              <Link href="/profile" className="navbar-deneyap-profile-link">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="profil"
                    width={40}
                    height={40}
                    className="navbar-deneyap-profile-avatar"
                  />
                ) : (
                  <div className="navbar-deneyap-profile-avatar-placeholder">
                    {user?.firstName?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div className="navbar-deneyap-profile-info">
                  <span className="navbar-deneyap-profile-name">
                    {user?.firstName || "Kullanıcı"}
                    {user?.lastName && ` ${user?.lastName}`}
                  </span>
                  <span className="navbar-deneyap-profile-email">
                    {user?.email}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="navbar-deneyap-btn-logout"
              >
                Çıkış
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menü Butonu */}
        <button
          type="button"
          className="navbar-deneyap-mobile-toggle"
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
      {mobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-0 z-[999] md:hidden bg-white flex flex-col ${isClosing ? "animate-fade-out" : "animate-fade-in"
              }`}
          >
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Menü</h2>
              <button
                onClick={handleCloseMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
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
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              <Link
                href="/"
                className="navbar-mobile-link"
                onClick={handleCloseMenu}
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Ana Sayfa
              </Link>
              <Link
                href="/mezunlar"
                className="navbar-mobile-link"
                onClick={handleCloseMenu}
              >
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Mezunlar
              </Link>
              <Link
                href="/jobs"
                className="navbar-mobile-link"
                onClick={handleCloseMenu}
              >
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                İlanlar
              </Link>
              <Link
                href="/events"
                className="navbar-mobile-link"
                onClick={handleCloseMenu}
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Etkinlikler
              </Link>

              <div className="h-px bg-gray-200 my-2"></div>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-3 mt-2">
                  <Link
                    href="/login"
                    className="navbar-mobile-link"
                    onClick={handleCloseMenu}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="navbar-mobile-btn-register"
                    onClick={handleCloseMenu}
                  >
                    Kayıt Ol
                  </Link>
                  <Link
                    href="/login"
                    className="navbar-mobile-btn-login"
                    onClick={handleCloseMenu}
                  >
                    Giriş Yap
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-lg">
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
                      <span className="font-bold text-lg truncate text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="navbar-mobile-link"
                    onClick={handleCloseMenu}
                  >
                    <svg
                      className="w-6 h-6 mr-2"
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
                    Profilim
                  </Link>
                  {user?.role === "STUDENT" && (
                    <Link
                      href="/applications"
                      className="navbar-mobile-link"
                      onClick={handleCloseMenu}
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      Başvurularım
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      handleCloseMenu();
                    }}
                    className="navbar-mobile-btn-logout"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </nav>
  );
}
