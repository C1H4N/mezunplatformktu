"use client";

import { useState, useEffect } from "react";
import { 
  Briefcase, 
  Search, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: string;
  createdAt: string;
  publisher: {
    companyName: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  _count: {
    applications: number;
  };
}

const statusLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  OPEN: { label: "Açık", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  CLOSED: { label: "Kapalı", color: "bg-red-500/10 text-red-600", icon: XCircle },
  PENDING: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
};

const typeLabels: Record<string, string> = {
  JOB: "İş İlanı",
  INTERNSHIP: "Staj",
  PROJECT: "Proje",
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs?all=true");
      if (!res.ok) throw new Error("İlanlar getirilemedi");
      const data = await res.json();
      setJobs(data.jobs || data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("İlanlar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Durum güncellenemedi");

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
      toast.success("İlan durumu güncellendi");
    } catch (error) {
      console.error("Failed to update job:", error);
      toast.error("Durum güncellenirken hata oluştu");
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("İlan silinemedi");

      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      toast.success("İlan silindi");
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("İlan silinirken hata oluştu");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.publisher.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-2xl font-bold">İlan Yönetimi</h1>
          <p className="text-muted">Toplam {jobs.length} ilan</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="İlan veya firma ara..."
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
            <option value="OPEN">Açık</option>
            <option value="CLOSED">Kapalı</option>
            <option value="PENDING">Beklemede</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted-bg border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted">İlan</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted">Firma</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted">Tür</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted">Durum</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted">Başvuru</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-muted">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJobs.map((job) => {
                const status = statusLabels[job.status] || statusLabels.PENDING;
                const StatusIcon = status.icon;

                return (
                  <tr key={job.id} className="hover:bg-muted-bg/50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted" />
                        <span>{job.publisher.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{typeLabels[job.type] || job.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${status.color} border-0 cursor-pointer`}
                      >
                        <option value="OPEN">Açık</option>
                        <option value="CLOSED">Kapalı</option>
                        <option value="PENDING">Beklemede</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">
                        {job._count?.applications || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="p-2 hover:bg-muted-bg rounded-lg transition text-muted hover:text-foreground"
                          title="Görüntüle"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition text-muted hover:text-red-500"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-muted">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Henüz ilan bulunmuyor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

