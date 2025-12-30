"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { buttonVariants } from "../../components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Share2,
  Edit,
  Trash2,
  Briefcase,
  Users2,
  Wrench,
  GraduationCap,
  Presentation,
  Coffee,
  MoreHorizontal,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  type: string;
  status: string;
  capacity?: number;
  image?: string;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
    image?: string;
    email: string;
  };
  _count: {
    participants: number;
  };
}

const eventTypeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  CAREER_FAIR: { label: "Kariyer Fuarı", icon: <Briefcase className="w-5 h-5" />, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  NETWORKING: { label: "Networking", icon: <Users2 className="w-5 h-5" />, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  WORKSHOP: { label: "Atölye", icon: <Wrench className="w-5 h-5" />, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  SEMINAR: { label: "Seminer", icon: <GraduationCap className="w-5 h-5" />, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  CONFERENCE: { label: "Konferans", icon: <Presentation className="w-5 h-5" />, color: "bg-red-500/10 text-red-600 border-red-500/20" },
  MEETUP: { label: "Buluşma", icon: <Coffee className="w-5 h-5" />, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  OTHER: { label: "Diğer", icon: <MoreHorizontal className="w-5 h-5" />, color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
};

export default function EventDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const isOrganizer = session?.user?.id === event?.organizer.id;
  const isAdmin = session?.user?.role === "ADMIN";
  const canEdit = isOrganizer || isAdmin;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) throw new Error("Etkinlik bulunamadı");
        const data = await res.json();
        setEvent(data);

        // Check participation status
        if (session?.user) {
          const partRes = await fetch(`/api/events/${params.id}/participate`);
          const partData = await partRes.json();
          setIsParticipating(partData.isParticipating);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("Etkinlik yüklenirken hata oluştu");
        router.push("/events");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id, router, session]);

  const handleParticipate = async () => {
    if (!session) {
      toast.error("Katılmak için giriş yapmalısınız");
      router.push("/login");
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/events/${params.id}/participate`, {
        method: isParticipating ? "DELETE" : "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "İşlem başarısız");
      }

      setIsParticipating(!isParticipating);
      // Refresh event data
      const eventRes = await fetch(`/api/events/${params.id}`);
      const eventData = await eventRes.json();
      setEvent(eventData);

      toast.success(isParticipating ? "Katılım iptal edildi" : "Etkinliğe katıldınız!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Silinemedi");

      toast.success("Etkinlik silindi");
      router.push("/events");
    } catch (error) {
      toast.error("Etkinlik silinemedi");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) return null;

  const typeInfo = eventTypeConfig[event.type] || eventTypeConfig.OTHER;
  const isFull = event.capacity && event._count.participants >= event.capacity;
  const isUpcoming = event.status === "UPCOMING";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center text-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Etkinliklere Dön
        </Link>

        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-lg animate-fade-in-up">
          {/* Image Header */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 to-primary/5">
            {event.image ? (
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar className="w-24 h-24 text-primary/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${typeInfo.color}`}>
                {typeInfo.icon}
                {typeInfo.label}
              </span>
            </div>

            {/* Edit/Delete for organizer */}
            {canEdit && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link
                  href={`/events/${event.id}/edit`}
                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition"
                >
                  <Edit className="w-5 h-5 text-white" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            )}

            {/* Title at bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-muted-bg/50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Tarih & Saat</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                  {event.endDate && (
                    <p className="text-sm text-muted">
                      Bitiş: {formatDate(event.endDate)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted-bg/50 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Konum</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted-bg/50 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Katılımcılar</p>
                  <p className="font-medium">
                    {event._count.participants} kişi
                    {event.capacity && ` / ${event.capacity} kapasite`}
                  </p>
                  {isFull && <p className="text-xs text-red-500">Kapasite doldu</p>}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted-bg/50 rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Organizatör</p>
                  <p className="font-medium">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {isUpcoming && !isOrganizer && (
              <div className="mb-8">
                {isParticipating ? (
                  <button
                    onClick={handleParticipate}
                    disabled={actionLoading}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {actionLoading ? (
                      <Clock className="w-5 h-5 animate-spin" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    Katılımı İptal Et
                  </button>
                ) : (
                  <button
                    onClick={handleParticipate}
                    disabled={actionLoading || !!isFull}
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "w-full md:w-auto",
                    })}
                  >
                    {actionLoading ? (
                      <Clock className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    )}
                    {isFull ? "Kapasite Doldu" : "Etkinliğe Katıl"}
                  </button>
                )}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Etkinlik Hakkında
              </h3>
              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {event.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

