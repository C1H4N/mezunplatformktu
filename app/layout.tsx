import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Session } from "./generated/prisma/index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KTU Mezun Platformu",
  description:
    "Karadeniz Teknik Üniversitesi Mezun Platformu - Mezunlarımızı bir araya getiren, kariyer gelişimini destekleyen networking platformu",
  keywords: [
    "KTÜ",
    "Karadeniz Teknik Üniversitesi",
    "mezun",
    "alumni",
    "network",
    "kariyer",
  ],
};

import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#333",
                color: "#fff",
              },
              success: {
                style: {
                  background: "#4BB543",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#FF3333",
                  color: "#fff",
                },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
