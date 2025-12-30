"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  Search, 
  Trash2, 
  Eye,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string | null;
  location: string;
  type: string;
  status: string;
  capacity: number | null;
  organizer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  _count: {
    participants: number;
  };
}

const statusLabels: Record<string, { label: string; color: string }> = {
  UPCOMING: { label: "Yaklaşan", color: "bg-blue-500/10 text-blue-600" },
  ONGOING: { label: "Devam Eden", color: "bg-green-500/10 text-green-600" },
  COMPLETED: { label: "Tamamlandı", color: "bg-gray-500/10 text-gray-600" },
  CANCELLED: { label: "İptal Edildi", color: "bg-red-500/10 text-red-600" },
};

const typeLabels: Record<string, string> = {
  CAREER_FAIR: "Kariyer Fuarı",
  NETWORKING: "Networking",
  WORKSHOP: "Atölye",
  SEMINAR: "Seminer",
  CONFERENCE: "Konferans",
  MEETUP: "Buluşma",
  OTHER: "Diğer",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Etkinlikler getirilemedi");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Etkinlikler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Durum güncellenemedi");

      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, status: newStatus } : event
        )
      );
      toast.success("Etkinlik durumu güncellendi");
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Durum güncellenirken hata oluştu");
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm("Bu etkinliği silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Etkinlik silinemedi");

      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast.success("Etkinlik silindi");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Etkinlik silinirken hata oluştu");
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
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

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Etkinlik Yönetimi</h1>
          <p className="text-muted">Toplam {events.length} etkinlik</p>
        </div>
        <Link
          href="/events/new"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition"
        >
          Yeni Etkinlik
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Etkinlik veya konum ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted-bg border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-muted-bg border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">Tüm Durumlar</option>
            <option value="UPCOMING">Yaklaşan</option>
            <option value="ONGOING">Devam Eden</option>
            <option value="COMPLETED">Tamamlandı</option>
            <option value="CANCELLED">İptal Edildi</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => {
          const status = statusLabels[event.status] || statusLabels.UPCOMING;

          return (
            <div
              key={event.id}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <span className="text-sm text-muted">
                    {typeLabels[event.type] || event.type}
                  </span>
                </div>
                <select
                  value={event.status}
                  onChange={(e) => handleStatusChange(event.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${status.color} border-0 cursor-pointer`}
                >
                  <option value="UPCOMING">Yaklaşan</option>
                  <option value="ONGOING">Devam Eden</option>
                  <option value="COMPLETED">Tamamlandı</option>
                  <option value="CANCELLED">İptal Edildi</option>
                </select>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="w-4 h-4" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Users className="w-4 h-4" />
                  {event._count?.participants || 0}
                  {event.capacity && ` / ${event.capacity}`} katılımcı
                </div>
              </div>

              <p className="text-sm text-muted line-clamp-2 mb-4">
                {event.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted">
                  Düzenleyen: {event.organizer.firstName} {event.organizer.lastName}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="p-2 hover:bg-muted-bg rounded-lg transition text-muted hover:text-foreground"
                    title="Görüntüle"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition text-muted hover:text-red-500"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-muted bg-card border border-border rounded-xl">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Henüz etkinlik bulunmuyor</p>
        </div>
      )}
    </div>
  );
}

