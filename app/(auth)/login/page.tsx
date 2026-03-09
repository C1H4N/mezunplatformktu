"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          toast.error(
            result.error === "CredentialsSignin"
              ? "E-posta veya şifre hatalı!"
              : result.error || "Giriş başarısız! Lütfen tekrar deneyin.",
          );
        } else {
          toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
          window.location.href = "/profile";
        }
      } catch {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  };

  return (
    <div
      className="relative flex items-center justify-center px-4 py-12"
      style={{ minHeight: "calc(100vh - 90px)" }}
    >
      {/* Arka Plan */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/aacomyobg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Koyu gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2f52]/90 via-[#0e4a7a]/80 to-[#1678c8]/70" />
        {/* Ekstra derinlik */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Dekoratif daireler */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Kartı */}
      <div className="relative z-10 w-full max-w-md">
        {/* Kart */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 ring-1 ring-white/50">
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Tekrar Hoş Geldiniz
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Hesabınıza erişmek için bilgilerinizi girin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* E-posta */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                E-posta Adresi
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@aacomyo.edu.tr"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            {/* Şifre */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Şifre
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors"
                >
                  Şifremi unuttum
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Beni Hatırla */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer bg-white"
                />
                <svg
                  className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <label
                htmlFor="rememberMe"
                className="text-sm text-slate-600 font-semibold cursor-pointer select-none"
              >
                Beni hatırla
              </label>
            </div>

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#0e7490] hover:from-primary-hover hover:to-primary text-white font-bold text-[15px] shadow-[0_6px_20px_rgba(18,91,150,0.35)] hover:shadow-[0_10px_28px_rgba(18,91,150,0.45)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor…
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600 font-medium">
              Hesabınız yok mu?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary-hover font-bold transition-colors hover:underline underline-offset-4"
              >
                Hemen Oluşturun
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-6 leading-relaxed px-4">
          Bu platform yalnızca KTÜ Araklı Ali Cevat Özyurt MYO mensuplarına ve
          mezunlarına özeldir.
        </p>
      </div>
    </div>
  );
}
