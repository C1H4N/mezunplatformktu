"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "@/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setLoading(true);

    try {
      // v5: signIn server action
      const res = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      setLoading(false);

      if (!res) {
        toast.error("Sunucuya ulaşılamadı.");
      } else if (res.ok) {
        toast.success("Giriş başarılı! Yönlendiriliyorsun...");
        setTimeout(() => router.push("/"), 800);
      } else {
        let errorMessage = "Giriş başarısız.";
        if (res.error?.includes("CredentialsSignin")) {
          errorMessage = "E-posta/Telefon veya şifreniz yanlış.";
        } else if (res.error) {
          errorMessage = "Giriş başarısız: " + res.error;
        }
        toast.error(errorMessage);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("Beklenmeyen bir hata oluştu: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-sm p-8 border border-zinc-700 bg-zinc-900 text-white shadow-2xl rounded-xl transition-all duration-300">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Ktü Mezun Platformu
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="email"
            type="text"
            placeholder="Email veya Telefon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-400 transition-colors"
          />
          <input
            name="password"
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-400 transition-colors"
          />

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-3 font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg ${
              loading || !isFormValid
                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/50"
            }`}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          <Link
            href="/register"
            className="text-center text-sm font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            Hesabın yok mu? Aramıza Katıl!
          </Link>

          <Link
            href="/reset-password-email"
            className="text-center text-sm text-zinc-400 hover:text-zinc-300 underline underline-offset-2 transition-colors"
          >
            Şifremi unuttum :(
          </Link>
        </form>
      </div>
    </div>
  );
}
