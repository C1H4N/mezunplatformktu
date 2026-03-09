import Link from "next/link";
import { Users, LogIn, UserPlus } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col items-center justify-center bg-gray-50/50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-fade-in-up">
        {/* İkon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mb-6 shadow-sm">
          <Users className="w-10 h-10" />
        </div>

        {/* Metin İçeriği */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Bu İçerik Üyelerimize Özel!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          Mezun ağımızın sunduğu ayrıcalıklardan yararlanmak ve platformumuzun
          bu bölümünü keşfetmek için lütfen giriş yapın veya aramıza katılın.
        </p>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            <span>Giriş Yap</span>
          </Link>
          <Link
            href="/register"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary/5 font-semibold transition-all active:scale-[0.98]"
          >
            <UserPlus className="w-5 h-5" />
            <span>Kayıt Ol</span>
          </Link>
        </div>

        {/* Ekstra Bilgi */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Zaten giriş yaptıysanız, lütfen anasayfaya dönüp tekrar deneyin.
          </p>
          <div className="mt-3">
            <Link
              href="/"
              className="text-sm text-primary hover:underline font-medium"
            >
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
