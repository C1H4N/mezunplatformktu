"use client";

import Link from "next/link";
import { Users, Briefcase, Map, MapPin, Building2, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden pb-32 pt-32 shadow-2xl flex-1 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/aacomyobg.jpg")' }}
      >
        {/* Dark overlay to make white text readable */}
        <div className="absolute inset-0 bg-[#0f172a]/70 backdrop-blur-[2px]"></div>

        {/* Subtle layer effects for modern mesh feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none mix-blend-overlay">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#ffffff] blur-[140px] opacity-20"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#0ea5e9] blur-[150px] opacity-20"></div>
          <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#3b82f6] blur-[120px] opacity-20"></div>
        </div>

        <div className="w-full px-4 sm:px-[4%] relative z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-[#ffffff] text-xs sm:text-sm font-bold tracking-widest mb-8 border border-white/20 backdrop-blur-md animate-fade-in shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            AACOMYO MEZUN AĞI
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#ffffff] mb-6 leading-tight tracking-tight animate-fade-in-up drop-shadow-lg">
            Geleceği Birlikte <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#e2e8f0]">İnşa Edelim</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#f1f5f9] max-w-3xl mb-12 font-light animate-fade-in opacity-0 animation-delay-100 drop-shadow-md">
            Türkiye'nin dört bir yanındaki KTÜ Araklı Ali Cevat Özyurt Meslek Yüksekokulu mezunları ile bağlantı kurun, kariyer fırsatlarını yakalayın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 animate-fade-in-up animation-delay-300">
            <Link
              href="/mezunlar"
              className="px-8 py-4 bg-white text-[#0f172a] hover:bg-gray-100 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Mezunları Keşfet
            </Link>
            <Link
              href="/jobs"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg backdrop-blur-md transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Briefcase className="w-5 h-5" />
              İlanlara Göz At
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platformda Neler Var?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">AACOMYO Mezun Platformu, kariyerinize yön vermeniz ve gelişiminizi desteklemeniz için tasarlandı.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/mezunlar" className="block group">
              <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Geniş Mezun Ağı & Harita</h3>
                <p className="text-gray-600 leading-relaxed">Farklı sektörlerdeki ve şehirlerdeki mezunlarımızla iletişim kurun, interaktif harita üzerinden mezun dağılımını inceleyin.</p>
              </div>
            </Link>

            <Link href="/jobs" className="block group">
              <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Kariyer Fırsatları</h3>
                <p className="text-gray-600 leading-relaxed">Sadece mezunlarımıza özel iş ve staj ilanlarına ulaşın, kariyerinizde bir adım öne çıkın.</p>
              </div>
            </Link>

            <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Anlık İletişim</h3>
              <p className="text-gray-600 leading-relaxed">Yeni nesil mesajlaşma altyapımızla diğer mezunlarla bağlantı kurun ve anında fikir alışverişinde bulunun.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
