"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, CheckCircle, XCircle, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "success">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setErrorMessage("Geçersiz sıfırlama bağlantısı.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/reset-password?token=${token}`);
        const data = await res.json();

        if (data.valid) {
          setStatus("valid");
          setEmail(data.email);
        } else {
          setStatus("invalid");
          setErrorMessage(data.message);
        }
      } catch {
        setStatus("invalid");
        setErrorMessage("Bir hata oluştu.");
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("Şifre gereksinimleri karşılanmıyor.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        toast.success("Şifreniz başarıyla güncellendi!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message || "Bir hata oluştu.");
      }
    } catch {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Doğrulanıyor...</h1>
            <p className="text-muted">Bağlantı doğrulanıyor, lütfen bekleyin.</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token
  if (status === "invalid") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-error" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-error">Geçersiz Bağlantı</h1>
            <p className="text-muted mb-6">{errorMessage}</p>
            <Link
              href="/forgot-password"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Yeni Bağlantı İste
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success
  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-success">Şifre Güncellendi!</h1>
            <p className="text-muted mb-6">Şifreniz başarıyla güncellendi. Giriş sayfasına yönlendiriliyorsunuz...</p>
          </div>
        </div>
      </div>
    );
  }

  // Valid token - show form
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Yeni Şifre Belirle</h1>
          <p className="text-muted mb-6">
            <strong>{email}</strong> hesabı için yeni şifrenizi belirleyin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Yeni Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border p-3 pr-12 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                  placeholder="En az 8 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`text-xs px-2 py-1 rounded ${/[A-Z]/.test(password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                  {/[A-Z]/.test(password) && <Check className="w-3 h-3 inline mr-1" />}
                  Büyük harf
                </span>
                <span className={`text-xs px-2 py-1 rounded ${/[a-z]/.test(password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                  {/[a-z]/.test(password) && <Check className="w-3 h-3 inline mr-1" />}
                  Küçük harf
                </span>
                <span className={`text-xs px-2 py-1 rounded ${/[0-9]/.test(password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                  {/[0-9]/.test(password) && <Check className="w-3 h-3 inline mr-1" />}
                  Rakam
                </span>
                <span className={`text-xs px-2 py-1 rounded ${password.length >= 8 ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                  {password.length >= 8 && <Check className="w-3 h-3 inline mr-1" />}
                  8+ karakter
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Şifre Tekrar</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-background border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition ${
                  confirmPassword && password !== confirmPassword ? "border-error" : "border-border"
                }`}
                placeholder="Şifrenizi tekrar girin"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-error mt-1">Şifreler eşleşmiyor.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || password !== confirmPassword}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

