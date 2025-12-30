"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          console.error("Login error:", result.error);
          if (result.error === "CredentialsSignin") {
            toast.error("Email veya şifre hatalı!");
          } else {
            toast.error(result.error || "Giriş başarısız! Lütfen tekrar deneyin.");
          }
        } else {
          toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
          // Force a hard navigation to ensure session is picked up
          window.location.href = "/profile";
        }
      } catch (error) {
        console.error("Login exception:", error);
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 bg-black/20 border border-zinc-700 rounded-xl shadow-xl w-full max-w-sm animate-fade-in-up"
      >
        <h1 className="text-2xl font-bold text-center mb-2 animate-fade-in opacity-0 animation-delay-100">Giriş Yap</h1>

        <label className="flex flex-col text-sm animate-fade-in opacity-0 animation-delay-200">
          <span className="mb-1 text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border border-zinc-700 p-2 rounded-md focus:ring-2 focus:ring-zinc-500 outline-none transition"
          />
        </label>

        <label className="flex flex-col text-sm animate-fade-in opacity-0 animation-delay-300">
          <div className="flex justify-between items-center mb-1">
            <span className="text-zinc-400">Şifre</span>
            <a
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Şifremi unuttum
            </a>
          </div>
          <input
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 border border-zinc-700 p-2 rounded-md focus:ring-2 focus:ring-zinc-500 outline-none transition"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="bg-white text-black py-2 rounded-md font-medium hover:bg-zinc-200 transition disabled:opacity-70 disabled:cursor-not-allowed animate-fade-in opacity-0 animation-delay-300"
        >
          {isPending ? "Giriş Yapılıyor…" : "Giriş Yap"}
        </button>

        <p className="text-center text-sm text-zinc-500 animate-fade-in opacity-0 animation-delay-300">
          Hesabınız yok mu?{" "}
          <a
            href="/register"
            className="text-white underline hover:no-underline"
          >
            Kayıt Olun
          </a>
        </p>
      </form>
    </div>
  );
}
