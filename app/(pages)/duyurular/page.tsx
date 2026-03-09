import prisma from "@/lib/db";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Megaphone, Pin, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AnnouncementsPage() {
  const rawAnnouncements = await prisma.announcement.findMany({
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          image: true,
        },
      },
    },
  });

  // Fallback map if DB is empty
  const mockAnnouncements = [
    {
      id: "mock1",
      title: "2026 Yılı Mezunlar Buluşması Etkinliği",
      content:
        "Değerli mezunlarımız, geleneksel hale getirdiğimiz mezunlar buluşması etkinliğimiz bu yıl büyük bir katılımla gerçekleşecek. Yenilenen kampüsümüzde eski anıları tazelemek ve yeni mezun ağımızı güçlendirmek için hepinizi bekliyoruz.",
      imageUrl:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
      isPinned: true,
      author: { firstName: "Mehmet", lastName: "Yılmaz", image: null },
      createdAt: new Date(),
    },
    {
      id: "mock2",
      title: "Yeni Kariyer Platformu Rozet Sistemi Yayında!",
      content:
        "Mezun platformumuza entegre ettiğimiz yeni rozet sistemi sayesinde artık profilinize daha yetkinliklerinizi ve elde ettiğiniz başarıları ekleyebilirsiniz. Platform üzerinde aktif kalarak özel rozetler kazanabilirsiniz.",
      imageUrl: null,
      isPinned: false,
      author: { firstName: "Ayşe", lastName: "Kaya", image: null },
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "mock3",
      title: "Yazılımcılar İçin Özel Hackathon",
      content:
        "Üniversitemiz dijital dönüşüm elektroniği bölümü mezunları ve öğrencileri için düzenlenecek olan kodlama yarışmasına (Hackathon) başvurular başladı. Büyük ödüller sizi bekliyor!",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      isPinned: false,
      author: { firstName: "Can", lastName: "Demir", image: null },
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  ];

  const announcements =
    rawAnnouncements.length > 0 ? rawAnnouncements : mockAnnouncements;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-sm">
            <Megaphone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Duyurular & Haberler
            </h1>
            <p className="text-gray-500 mt-1">
              Platformumuz ve üniversitemizle ilgili en güncel gelişmeleri takip
              edin.
            </p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-white rounded-2xl border ${announcement.isPinned ? "border-sky-200 shadow-md ring-1 ring-sky-100" : "border-gray-100 shadow-sm"} overflow-hidden hover:shadow-lg transition-all flex flex-col sm:flex-row group`}
            >
              {/* Image Section */}
              {announcement.imageUrl && (
                <div className="sm:w-1/3 h-48 sm:h-auto relative overflow-hidden bg-gray-100">
                  <Image
                    src={announcement.imageUrl}
                    alt={announcement.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 text-xs font-medium">
                    {announcement.isPinned && (
                      <span className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-sky-100 text-sky-700">
                        <Pin className="w-3.5 h-3.5" /> Sabitlenmiş
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(announcement.createdAt), "d MMMM yyyy", {
                        locale: tr,
                      })}
                    </span>
                  </div>

                  <h2
                    className={`text-xl font-bold mb-3 ${announcement.isPinned ? "text-gray-900" : "text-gray-800"}`}
                  >
                    {announcement.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                    {announcement.content}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500">
                      {announcement.author.image ? (
                        <Image
                          src={announcement.author.image}
                          alt="User"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {announcement.author.firstName}{" "}
                      {announcement.author.lastName}
                    </span>
                  </div>

                  {/* Devamını Oku (Visual placeholder for now if no detailed page exists) */}
                  <button className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors">
                    Devamını Oku{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 border-dashed">
              <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Henüz Bir Duyuru Yok
              </h3>
              <p className="text-gray-500 mt-1">
                Sistemde şu an için aktif bir duyuru bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
