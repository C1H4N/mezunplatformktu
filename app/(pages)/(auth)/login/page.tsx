"use client";

import { signIn } from "next-auth/react"; // Gerçek NextAuth importu
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Gerçek Next.js Navigation importları
import toast from "react-hot-toast"; // Gerçek react-hot-toast importu
import Link from "next/link"; // Gerçek Next.js Link importu

/**
 * Giriş (Login) Bileşeni
 * Kullanıcının e-posta/telefon ve şifre ile giriş yapmasını sağlar.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  // Butonun etkinliğini kontrol etmek için basit doğrulama
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  // Giriş işlemini yönetir
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form geçerli değilse işlemi durdur
    if (!isFormValid) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setLoading(true);

    // Gerçek NextAuth signIn çağrısı
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
      // Hata mesajını daha kullanıcı dostu yap
      let errorMessage = "Giriş başarısız.";
      if (res.error?.includes("CredentialsSignin")) {
        errorMessage = "E-posta/Telefon veya şifreniz yanlış.";
      } else if (res.error) {
        errorMessage = "Giriş başarısız: " + res.error;
      }
      toast.error(errorMessage);
    }
  };

  // Yetkilendirme hataları için bildirimleri gösterir
  useEffect(() => {
    const unauthorized = searchParams.get("unauthorized");
    if (!hasShownToast.current && unauthorized) {
      hasShownToast.current = true;
      if (unauthorized === "1") {
        toast.error("Giriş yapmamışsın! Merak etme sepetin güvende :)");
      } else if (unauthorized === "2") {
        toast.error("Oturum açmalısın!");
      }
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="w-full max-w-sm p-8 border border-zinc-700 bg-zinc-900 text-white shadow-2xl rounded-xl transition-all duration-300">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Ktü Mezun Platformu
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Email veya Telefon"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400 transition-colors`}
            />
          </div>

          {/* PRIMARY BUTTON: Giriş Yap */}
          <button
            type="submit"
            // Form geçerli değilse veya yükleniyorsa butonu devre dışı bırak
            disabled={loading || !isFormValid}
            className={`
              w-full py-3 font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg
              ${
                loading || !isFormValid
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-blue-500/50"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Giriş yapılıyor...
              </span>
            ) : (
              "Giriş Yap"
            )}
          </button>

          {/* SECONDARY LINK: Kayıt Ol */}
          <Link
            href="/register"
            className="text-center text-sm font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            Hesabın yok mu? Aramıza Katıl!
          </Link>

          {/* SECONDARY LINK: Şifremi Unuttum */}
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
