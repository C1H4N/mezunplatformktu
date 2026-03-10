"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  User,
  Briefcase,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

interface Report {
  id: string;
  type: string;
  reason: string;
  description?: string;
  status: string;
  actionTaken?: string;
  reportedId: string;
  reportedEntityInfo?: string;
  reportedEntityLink?: string | null;
  createdAt: string;
  reporter: { id: string; firstName: string; lastName: string; email: string };
}

const typeConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  USER_PROFILE: {
    label: "Kullanıcı Profili",
    icon: User,
    color: "bg-blue-500/10 text-blue-600",
  },
  JOB_POSTING: {
    label: "İş İlanı",
    icon: Briefcase,
    color: "bg-green-500/10 text-green-600",
  },
  MESSAGE: {
    label: "Mesaj",
    icon: MessageSquare,
    color: "bg-yellow-500/10 text-yellow-600",
  },
  EVENT: {
    label: "Etkinlik",
    icon: Clock,
    color: "bg-purple-500/10 text-purple-600",
  },
  OTHER: {
    label: "Diğer",
    icon: AlertTriangle,
    color: "bg-gray-500/10 text-gray-600",
  },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-700" },
  REVIEWED: { label: "İncelendi", color: "bg-blue-500/10 text-blue-700" },
  RESOLVED: { label: "Çözümlendi", color: "bg-green-500/10 text-green-700" },
  DISMISSED: { label: "Reddedildi", color: "bg-gray-500/10 text-gray-600" },
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionNote, setActionNote] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchReports();
  }, [statusFilter, typeFilter]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (typeFilter) params.set("type", typeFilter);
      const res = await fetch(`/api/admin/reports?${params}`);
      if (!res.ok) throw new Error();
      setReports(await res.json());
    } catch {
      toast.error("Şikayetler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/reports", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status,
          actionTaken: actionNote[id] || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Durum güncellendi");
      setExpandedId(null);
      fetchReports();
    } catch {
      toast.error("Güncelleme başarısız");
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const pending = reports.filter((r) => r.status === "PENDING").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Şikayet Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {reports.length} şikayet
          </p>
        </div>
        {pending > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">
              {pending} beklemede
            </span>
          </div>
        )}
      </div>

      {/* Filtreler */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Tüm Durumlar</option>
            {Object.entries(statusConfig).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Tüm Türler</option>
            {Object.entries(typeConfig).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste */}
      {reports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">
            Şikayet bulunmuyor
          </h3>
          <p className="text-sm text-slate-400">
            Seçili filtrelere uygun şikayet yok.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const type = typeConfig[report.type] || typeConfig.OTHER;
            const status = statusConfig[report.status] || statusConfig.PENDING;
            const Icon = type.icon;
            const isExpanded = expandedId === report.id;

            return (
              <div
                key={report.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                {/* Satır */}
                <div className="flex items-center gap-4 p-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${type.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${type.color}`}
                      >
                        {type.label}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-slate-900 truncate">
                      {report.reason}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {report.reporter.firstName} {report.reporter.lastName} ·{" "}
                      {formatDate(report.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : report.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Detay Panel */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50 space-y-4">
                    {report.description && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Açıklama
                        </p>
                        <p className="text-sm text-slate-700">
                          {report.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Şikayet Eden
                        </p>
                        <p className="font-medium text-slate-800">
                          {report.reporter.firstName} {report.reporter.lastName}
                        </p>
                        <p className="text-slate-500">
                          {report.reporter.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Hedef İçerik
                        </p>
                        {report.reportedEntityLink ? (
                          <a
                            href={report.reportedEntityLink}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-primary hover:underline"
                          >
                            {report.reportedEntityInfo}
                          </a>
                        ) : (
                          <p className="font-medium text-slate-800">
                            {report.reportedEntityInfo || "Bilinmeyen İçerik"}
                          </p>
                        )}
                        <code className="text-[10px] text-slate-400 mt-1 block font-mono">
                          ID: {report.reportedId}
                        </code>
                      </div>
                    </div>

                    {report.actionTaken && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                          Alınan Aksiyon
                        </p>
                        <p className="text-sm text-blue-800">
                          {report.actionTaken}
                        </p>
                      </div>
                    )}

                    {/* Aksiyon Notu */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                        Aksiyon Notu
                      </p>
                      <textarea
                        value={
                          actionNote[report.id] ?? report.actionTaken ?? ""
                        }
                        onChange={(e) =>
                          setActionNote((p) => ({
                            ...p,
                            [report.id]: e.target.value,
                          }))
                        }
                        placeholder="Bu şikayet için alınan aksiyonu açıklayın..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                      />
                    </div>

                    {/* Durum Butonları */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          status: "REVIEWED",
                          label: "İncelendi",
                          className:
                            "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
                        },
                        {
                          status: "RESOLVED",
                          label: "Çözümlendi",
                          className:
                            "bg-green-50 text-green-700 hover:bg-green-100 border-green-200",
                        },
                        {
                          status: "DISMISSED",
                          label: "Reddet",
                          className:
                            "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200",
                        },
                      ].map((btn) => (
                        <button
                          key={btn.status}
                          onClick={() =>
                            handleUpdateStatus(report.id, btn.status)
                          }
                          disabled={report.status === btn.status}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition disabled:opacity-40 disabled:cursor-not-allowed ${btn.className}`}
                        >
                          {btn.status === "RESOLVED" && (
                            <CheckCircle className="w-3.5 h-3.5" />
                          )}
                          {btn.status === "DISMISSED" && (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
