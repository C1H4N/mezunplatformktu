"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  Users,
  Briefcase,
  MapPin,
  ArrowRight,
} from "lucide-react";

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
          if (result.error === "CredentialsSignin") {
            toast.error("E-posta veya şifre hatalı!");
          } else {
            toast.error(result.error || "Giriş başarısız! Lütfen tekrar deneyin.");
          }
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
    /* Navbar yüksekliği (90px) çıkarılarak tam ekran dolduruluyor */
    <div className="flex h-[calc(100vh-90px)]">

      {/* ──────────── SOL PANEL: Marka ──────────── */}
      <div
        className="hidden lg:flex w-[48%] flex-col justify-between relative overflow-hidden flex-shrink-0"
        style={{
          background: "linear-gradient(145deg, #0a2f52 0%, #125b96 55%, #1678c8 100%)",
        }}
      >
        {/* Arkaplan foto */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20"
          style={{ backgroundImage: 'url("/aacomyobg.jpg")' }}
        />
        {/* Işık efektleri */}
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur border border-white/20 shadow-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/aacomyoLogo.png"
                alt="AACOMYO"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">AACOMYO</p>
              <p className="text-white/60 text-xs">Mezun Platformu</p>
            </div>
          </div>

          {/* Merkez metin */}
          <div>
            <span className="inline-block mb-5 py-1 px-4 rounded-full bg-white/10 border border-white/20 text-white/75 text-xs font-semibold tracking-widest uppercase">
              KTÜ Araklı Ali Cevat Özyurt MYO
            </span>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-snug mb-4">
              Mezunlar Ağına<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-blue-200">
                Hoş Geldiniz
              </span>
            </h1>
            <p className="text-white/65 text-base leading-relaxed max-w-sm">
              Türkiye'nin dört bir yanındaki AACOMYO mezunlarıyla bağlantı kurun,
              kariyer fırsatlarını yakalayın.
            </p>

            {/* Özellik listesi */}
            <div className="mt-8 space-y-3">
              {[
                { icon: Users, text: "Geniş Mezun Ağı", sub: "Binlerce mezunla bağlantı kur" },
                { icon: Briefcase, text: "Kariyer Fırsatları", sub: "Sana özel iş ilanları" },
                { icon: MapPin, text: "İnteraktif Harita", sub: "Mezun dağılımını keşfet" },
              ].map(({ icon: Icon, text, sub }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/12 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{text}</p>
                    <p className="text-white/55 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} AACOMYO Mezun Platformu — KTÜ
          </p>
        </div>
      </div>

      {/* ──────────── SAĞ PANEL: Form ──────────── */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-[#f1f5f9] px-4 sm:px-8 py-10">

        {/* Mobilde logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
            <Image src="/aacomyoLogo.png" alt="AACOMYO" width={32} height={32} className="object-contain" />
          </div>
          <span className="font-bold text-foreground text-sm">AACOMYO Mezun Platformu</span>
        </div>

        {/* Kart */}
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-10">

            <div className="mb-7">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Hoş Geldiniz</h2>
              <p className="text-gray-500 text-sm">Hesabınıza giriş yapın</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* E-posta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@aacomyo.edu.tr"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                </div>
              </div>

              {/* Şifre */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Şifre</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors"
                  >
                    Şifremi unuttum <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Beni hatırla */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-500 cursor-pointer select-none">
                  Beni hatırla
                </label>
              </div>

              {/* Giriş butonu */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Giriş yapılıyor…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Giriş Yap
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 pt-1">
                Hesabınız yok mu?{" "}
                <Link href="/register" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                  Hesap Oluşturun
                </Link>
              </p>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed px-2">
            Bu platform yalnızca KTÜ Araklı Ali Cevat Özyurt MYO mensuplarına özeldir.
            Hesap oluşturmak için mezun, öğrenci veya akademisyen kaydı gerekmektedir.
          </p>
        </div>
      </div>
    </div>
  );
}
