"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Lütfen e-posta adresinizi girin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        toast.success("E-posta gönderildi!");
      } else {
        toast.error(data.message || "Bir hata oluştu.");
      }
    } catch {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in-up">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-2">E-posta Gönderildi!</h1>
            <p className="text-muted mb-6">
              Eğer <strong>{email}</strong> adresi sistemimizde kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.
              Lütfen gelen kutunuzu ve spam klasörünüzü kontrol edin.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="text-primary hover:underline text-sm"
              >
                Farklı bir e-posta dene
              </button>
              <Link
                href="/login"
                className="text-muted hover:text-foreground text-sm"
              >
                Giriş sayfasına dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Giriş sayfasına dön
        </Link>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Şifremi Unuttum</h1>
          <p className="text-muted mb-6">
            Kayıtlı e-posta adresinizi girin. Size şifre sıfırlama bağlantısı göndereceğiz.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">E-posta Adresi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

