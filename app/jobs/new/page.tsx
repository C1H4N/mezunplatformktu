"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { buttonVariants } from "../../components/ui/Button";

export default function NewJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "JOB",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (
    !session ||
    (session.user.role !== "EMPLOYER" && session.user.role !== "ADMIN")
  ) {
    router.push("/jobs");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "İlan oluşturulamadı.");
      }

      toast.success("İlan başarıyla oluşturuldu!");
      router.push("/jobs");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg animate-fade-in-up">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Yeni İlan Oluştur
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                İlan Başlığı
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Örn: Yazılım Mühendisi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                İlan Tipi
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              >
                <option value="JOB">İş İlanı</option>
                <option value="INTERNSHIP">Staj İlanı</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Konum
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Örn: İstanbul (Hibrit)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Açıklama
              </label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                placeholder="İş tanımı ve aranan nitelikler..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className={buttonVariants({ variant: "ghost" })}
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className={buttonVariants({ variant: "default" })}
              >
                {loading ? "Oluşturuluyor..." : "İlanı Yayınla"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
