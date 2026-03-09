import Link from "next/link";
import {
  Users,
  Briefcase,
  MapPin,
  MessageSquare,
  Megaphone,
  ArrowRight,
  Calendar,
  ImageIcon,
} from "lucide-react";
import prisma from "@/lib/db";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Image from "next/image";
import HomeAlumniMap from "./components/HomeAlumniMap";

export default async function Home() {
  const latestAnnouncements = await prisma.announcement.findMany({
    take: 3,
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  // İl bazlı mezun sayılarını detaylı çek
  const alumniUsers = await prisma.user.findMany({
    where: {
      role: "ALUMNI",
      moreinfo: { location: { not: "" } },
    },
    select: {
      moreinfo: { select: { location: true } },
      alumni: { select: { employmentStatus: true } },
    },
  });

  interface CityStats {
    total: number;
    employed: number;
    unemployed: number;
    student: number;
    selfEmployed: number;
    unknown: number;
  }
  const cityData: Record<string, CityStats> = {};
  let abroadCount = 0;

  alumniUsers.forEach((u) => {
    const loc = u.moreinfo?.location;
    if (!loc || loc === "Bilinmiyor") return;

    const status = u.alumni?.employmentStatus ?? null;

    if (
      loc.toLowerCase().includes("yurt dışı") ||
      loc.toLowerCase().includes("yurtdışı") ||
      loc.toLowerCase().startsWith("abroad")
    ) {
      abroadCount++;
      return;
    }

    if (!cityData[loc]) {
      cityData[loc] = {
        total: 0,
        employed: 0,
        unemployed: 0,
        student: 0,
        selfEmployed: 0,
        unknown: 0,
      };
    }
    cityData[loc].total++;
    if (status === "EMPLOYED_OWN_SECTOR" || status === "EMPLOYED_OTHER_SECTOR")
      cityData[loc].employed++;
    else if (status === "UNEMPLOYED") cityData[loc].unemployed++;
    else if (status === "STUDENT") cityData[loc].student++;
    else if (status === "SELF_EMPLOYED") cityData[loc].selfEmployed++;
    else cityData[loc].unknown++;
  });

  // Geriye dönük uyumluluk için basit counts da tut
  const alumniCounts: Record<string, number> = {};
  Object.entries(cityData).forEach(([city, d]) => {
    alumniCounts[city] = d.total;
  });

  const mockAnnouncements = [
    {
      id: "mock1",
      title: "2026 Yılı Mezunlar Buluşması Etkinliği",
      content:
        "Değerli mezunlarımız, geleneksel hale getirdiğimiz etkinlikte buluşalım.",
      imageUrl:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
      isPinned: true,
      createdAt: new Date(),
    },
    {
      id: "mock2",
      title: "Kariyer Platformu Rozet Sistemi Yayında!",
      content:
        "Profilinize daha yetkinliklerinizi ve elde ettiğiniz başarıları ekleyebilirsiniz.",
      imageUrl: null,
      isPinned: false,
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "mock3",
      title: "Yazılımcılar İçin Özel Hackathon",
      content:
        "Kodlama yarışmasına başvurular başladı. Büyük ödüller sizi bekliyor!",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      isPinned: false,
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  ];

  const announcements =
    latestAnnouncements.length > 0 ? latestAnnouncements : mockAnnouncements;

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
            Yollar Ayrılsa da <br className="hidden sm:block" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#e2e8f0]">
              Bağımız Hep Güçlü
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-[#f1f5f9] max-w-3xl mb-12 font-light animate-fade-in opacity-0 animation-delay-100 drop-shadow-md">
            Mezun olduk ama bitmedi. Türkiye&apos;nin dört bir yanındaki
            AACOMYO&apos;lularla yeniden buluşun, deneyimlerinizi paylaşın,
            birlikte büyüyün.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platformda Neler Var?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AACOMYO Mezun Platformu, kariyerinize yön vermeniz ve gelişiminizi
              desteklemeniz için tasarlandı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/mezunlar" className="block group">
              <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Geniş Mezun Ağı & Harita
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Farklı sektörlerdeki ve şehirlerdeki mezunlarımızla iletişim
                  kurun, interaktif harita üzerinden mezun dağılımını inceleyin.
                </p>
              </div>
            </Link>

            <Link href="/jobs" className="block group">
              <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Kariyer Fırsatları
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sadece mezunlarımıza özel iş ve staj ilanlarına ulaşın,
                  kariyerinizde bir adım öne çıkın.
                </p>
              </div>
            </Link>

            <div className="h-full bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Anlık İletişim
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yeni nesil mesajlaşma altyapımızla diğer mezunlarla bağlantı
                kurun ve anında fikir alışverişinde bulunun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Map Section */}
      <HomeAlumniMap
        alumniCounts={alumniCounts}
        abroadCount={abroadCount}
        cityData={cityData}
      />

      {/* Announcements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Güncel Duyurular
              </h2>
              <p className="text-gray-500">
                Platform ve okulumuzla ilgili en yeni gelişmeler
              </p>
            </div>
            <Link
              href="/duyurular"
              className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-sky-600 hover:text-sky-700 hover:border-sky-200 hover:shadow-sm transition-all font-semibold"
            >
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100/80 hover:shadow-xl hover:-translate-y-1 hover:border-sky-100 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Image / Header Graphic */}
                <div className="relative w-full h-48 bg-slate-50 overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50/50">
                      <ImageIcon
                        className="w-12 h-12 text-sky-200/60"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}

                  {/* Pinned Badge Over Image */}
                  {item.isPinned && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/95 backdrop-blur-sm text-sky-600 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold text-xs shadow-sm shadow-black/5 ring-1 ring-black/5">
                        <Megaphone className="w-3.5 h-3.5 fill-sky-100" /> Öne
                        Çıkan
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3.5 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(item.createdAt), "d MMM yyyy", {
                          locale: tr,
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[0.95rem] line-clamp-3 leading-relaxed mb-8">
                      {item.content}
                    </p>
                  </div>

                  <Link
                    href="/duyurular"
                    className="w-full text-center py-3 bg-slate-50 text-slate-700 group-hover:bg-primary group-hover:text-white font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
                  >
                    Detayları Görüntüle{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
