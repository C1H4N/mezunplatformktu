"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "../components/ui/Button";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
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
  };
  _count: {
    participants: number;
  };
}

const eventTypeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  CAREER_FAIR: { label: "Kariyer Fuarı", icon: <Briefcase className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  NETWORKING: { label: "Networking", icon: <Users2 className="w-4 h-4" />, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  WORKSHOP: { label: "Atölye", icon: <Wrench className="w-4 h-4" />, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  SEMINAR: { label: "Seminer", icon: <GraduationCap className="w-4 h-4" />, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  CONFERENCE: { label: "Konferans", icon: <Presentation className="w-4 h-4" />, color: "bg-red-500/10 text-red-600 border-red-500/20" },
  MEETUP: { label: "Buluşma", icon: <Coffee className="w-4 h-4" />, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  OTHER: { label: "Diğer", icon: <MoreHorizontal className="w-4 h-4" />, color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  UPCOMING: { label: "Yaklaşan", color: "bg-green-500/10 text-green-600" },
  ONGOING: { label: "Devam Eden", color: "bg-blue-500/10 text-blue-600" },
  COMPLETED: { label: "Tamamlandı", color: "bg-gray-500/10 text-gray-600" },
  CANCELLED: { label: "İptal", color: "bg-red-500/10 text-red-600" },
};

export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("UPCOMING");

  const canCreateEvent =
    session?.user?.role === "ADMIN" ||
    session?.user?.role === "MODERATOR" ||
    session?.user?.role === "ALUMNI";

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (typeFilter !== "ALL") params.append("type", typeFilter);
        if (statusFilter !== "ALL") params.append("status", statusFilter);

        const res = await fetch(`/api/events?${params.toString()}`);
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, typeFilter, statusFilter]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted-bg/20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Etkinlikler</h1>
              <p className="text-muted max-w-2xl">
                Kariyer fuarları, networking etkinlikleri, workshoplar ve daha fazlası.
                Mezunlar ve öğrencilerle bir araya gelin.
              </p>
            </div>
            {canCreateEvent && (
              <Link
                href="/events/new"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                <Plus className="w-5 h-5 mr-2" />
                Etkinlik Oluştur
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Etkinlik ara..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="ALL">Tüm Türler</option>
              {Object.entries(eventTypeConfig).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="ALL">Tüm Durumlar</option>
              {Object.entries(statusConfig).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto text-muted mb-4" />
            <h3 className="text-lg font-semibold mb-2">Etkinlik bulunamadı</h3>
            <p className="text-muted">Arama kriterlerinize uygun etkinlik yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const typeInfo = eventTypeConfig[event.type] || eventTypeConfig.OTHER;
              const statusInfo = statusConfig[event.status] || statusConfig.UPCOMING;
              const isFull = event.capacity && event._count.participants >= event.capacity;

              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${typeInfo.color}`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2 mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {event._count.participants} katılımcı
                          {event.capacity && ` / ${event.capacity}`}
                          {isFull && <span className="text-red-500 ml-1">(Dolu)</span>}
                        </span>
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      {event.organizer.image ? (
                        <Image
                          src={event.organizer.image}
                          alt={event.organizer.firstName}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {event.organizer.firstName[0]}
                        </div>
                      )}
                      <span className="text-sm text-muted">
                        {event.organizer.firstName} {event.organizer.lastName}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

