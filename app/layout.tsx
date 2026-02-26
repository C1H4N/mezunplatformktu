import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-primary",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AACOMYO Mezun Platformu",
  description:
    "KTÜ Araklı Ali Cevat Özyurt Meslek Yüksekokulu Mezun Platformu - Mezunlarımızı bir araya getiren, kariyer gelişimini destekleyen networking platformu",
  keywords: [
    "AACOMYO",
    "KTÜ Araklı Ali Cevat Özyurt Meslek Yüksekokulu",
    "mezun",
    "alumni",
    "network",
    "kariyer",
    "Karadeniz Teknik Üniversitesi",
    "KTÜ",
    "Trabzon",
    "Araklı",
    "Meslek Yüksekokulu"
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
        className={`${fontSans.variable} font-sans antialiased flex flex-col min-h-screen text-slate-800`}
      >
        <SessionProvider session={session}>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
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
