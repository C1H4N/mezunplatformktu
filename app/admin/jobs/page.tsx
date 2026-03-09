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
  GraduationCap,
  Filter,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: string;
  tags: string[];
  createdAt: string;
  publisher: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  _count: { applications: number };
}

const POST_TYPE_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  JOB: {
    label: "İş İlanı",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-700",
  },
  INTERNSHIP: {
    label: "Staj İlanı",
    icon: Building2,
    color: "bg-violet-100 text-violet-700",
  },
  INTERNSHIP_REQUEST: {
    label: "Staj Arıyorum",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-700",
  },
  JOB_SEARCH: {
    label: "İş Arıyorum",
    icon: Search,
    color: "bg-amber-100 text-amber-700",
  },
};

const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  OPEN: {
    label: "Açık",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  CLOSED: {
    label: "Kapalı",
    color: "bg-slate-100 text-slate-600",
    icon: XCircle,
  },
  PENDING: {
    label: "Beklemede",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs?all=true");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      toast.error("İlanlar yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
      toast.success("Durum güncellendi");
    } catch {
      toast.error("Güncellenemedi");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success("İlan silindi");
    } catch (e: any) {
      toast.error(e.message || "Silinemedi");
    }
  };

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(q) ||
      j.publisher.firstName.toLowerCase().includes(q) ||
      j.publisher.lastName.toLowerCase().includes(q);
    const matchType = !typeFilter || j.type === typeFilter;
    const matchStatus = !statusFilter || j.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">İlan Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">
            Toplam {jobs.length} paylaşım
          </p>
        </div>
        <Link
          href="/ilanlar"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-semibold transition"
        >
          <Eye className="w-4 h-4" /> Kullanıcı Görünümü
        </Link>
      </div>

      {/* Filtreler */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Başlık veya kişi ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
        >
          <option value="">Tüm Türler</option>
          {Object.entries(POST_TYPE_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
        >
          <option value="">Tüm Durumlar</option>
          <option value="OPEN">Açık</option>
          <option value="CLOSED">Kapalı</option>
          <option value="PENDING">Beklemede</option>
        </select>
      </div>

      {/* Tablo */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  İlan
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Paylaşan
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tür
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Başvuru
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="text-right px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400">
                    <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">İlan bulunamadı</p>
                  </td>
                </tr>
              ) : (
                filtered.map((job) => {
                  const typeCfg =
                    POST_TYPE_CONFIG[job.type] || POST_TYPE_CONFIG.JOB;
                  const statusCfg =
                    statusConfig[job.status] || statusConfig.PENDING;
                  const TypeIcon = typeCfg.icon;
                  const StatusIcon = statusCfg.icon;
                  return (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/60 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-sm text-slate-900 max-w-xs truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {job.description}
                        </p>
                        {job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {job.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">
                          {job.publisher.firstName} {job.publisher.lastName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {job.publisher.role}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${typeCfg.color}`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {typeCfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(job.id, e.target.value)
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer border-0 outline-none ${statusCfg.color}`}
                        >
                          <option value="OPEN">Açık</option>
                          <option value="CLOSED">Kapalı</option>
                          <option value="PENDING">Beklemede</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {job._count?.applications || 0}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {formatDistanceToNow(new Date(job.createdAt), {
                          addSuffix: true,
                          locale: tr,
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition text-slate-400 hover:text-red-500"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
