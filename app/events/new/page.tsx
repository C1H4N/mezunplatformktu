"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { buttonVariants } from "../../components/ui/Button";
import { ArrowLeft, Calendar, MapPin, Users, FileText, Image as ImageIcon } from "lucide-react";

const eventTypes = [
  { value: "CAREER_FAIR", label: "Kariyer Fuarı" },
  { value: "NETWORKING", label: "Networking" },
  { value: "WORKSHOP", label: "Atölye" },
  { value: "SEMINAR", label: "Seminer" },
  { value: "CONFERENCE", label: "Konferans" },
  { value: "MEETUP", label: "Buluşma" },
  { value: "OTHER", label: "Diğer" },
];

export default function NewEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    type: "OTHER",
    capacity: "",
    image: "",
  });

  // Auth check
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const canCreate =
    session?.user?.role === "ADMIN" ||
    session?.user?.role === "MODERATOR" ||
    session?.user?.role === "ALUMNI";

  if (!canCreate) {
    router.push("/events");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        endDate: formData.endDate || undefined,
        location: formData.location,
        type: formData.type,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        image: formData.image || undefined,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Etkinlik oluşturulamadı");
      }

      toast.success("Etkinlik başarıyla oluşturuldu!");
      router.push(`/events/${data.id}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center text-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Etkinliklere Dön
        </Link>

        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-6">Yeni Etkinlik Oluştur</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="text-sm font-medium mb-2 block">Etkinlik Başlığı *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
                placeholder="Örn: Yazılım Kariyer Fuarı 2025"
                required
                maxLength={200}
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Etkinlik Türü *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className={inputClass}
                required
              >
                {eventTypes.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Başlangıç Tarihi & Saati *
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Bitiş Tarihi & Saati
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                <MapPin className="w-4 h-4 inline mr-1" />
                Konum *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={inputClass}
                placeholder="Örn: KTÜ Kongre Merkezi, Trabzon"
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                <Users className="w-4 h-4 inline mr-1" />
                Kapasite (Opsiyonel)
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className={inputClass}
                placeholder="Maksimum katılımcı sayısı"
                min={1}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Görsel URL (Opsiyonel)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={inputClass}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                <FileText className="w-4 h-4 inline mr-1" />
                Açıklama *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className={inputClass + " resize-none"}
                placeholder="Etkinlik hakkında detaylı bilgi..."
                required
                maxLength={5000}
              />
              <p className="text-xs text-muted mt-1">{formData.description.length}/5000 karakter</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/events"
                className={buttonVariants({ variant: "ghost" })}
              >
                İptal
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={buttonVariants({ variant: "default" })}
              >
                {loading ? "Oluşturuluyor..." : "Etkinlik Oluştur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

