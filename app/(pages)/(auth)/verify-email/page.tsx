"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Geçersiz doğrulama bağlantısı.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      } catch {
        setStatus("error");
        setMessage("Doğrulama sırasında bir hata oluştu.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center animate-fade-in-up">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Doğrulanıyor...</h1>
              <p className="text-muted">E-posta adresiniz doğrulanıyor, lütfen bekleyin.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-success">Doğrulama Başarılı!</h1>
              <p className="text-muted mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Giriş Yap
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-error" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-error">Doğrulama Başarısız</h1>
              <p className="text-muted mb-6">{message}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/register"
                  className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Yeniden Kayıt Ol
                </Link>
                <Link
                  href="/login"
                  className="text-primary hover:underline text-sm"
                >
                  Giriş sayfasına dön
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

