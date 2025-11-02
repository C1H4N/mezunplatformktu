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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Giriş başarısız!");
      } else {
        toast.success("Giriş başarılı!");
        setTimeout(() => {
          window.location.href = "/account";
        }, 1000);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 bg-black/20 border border-zinc-700 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Giriş Yap</h1>

        <label className="flex flex-col text-sm">
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

        <label className="flex flex-col text-sm">
          <span className="mb-1 text-zinc-400">Şifre</span>
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
          className="bg-white text-black py-2 rounded-md font-medium hover:bg-zinc-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "Giriş Yapılıyor…" : "Giriş Yap"}
        </button>

        <p className="text-center text-sm text-zinc-500">
          Hesabınız Var mı?{" "}
          <a
            href="/register"
            className="text-white underline hover:no-underline"
          >
            Giriş Yapın
          </a>
        </p>
      </form>
    </div>
  );
}
