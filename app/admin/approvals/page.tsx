"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Clock,
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  UserCog,
  Filter,
  Phone,
  Building2,
  Calendar,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";

interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string | null;
  phoneNumber?: string | null;
  createdAt: string;
  alumni?: {
    department?: string | null;
    graduationYear?: number;
    referenceTeacher?: string | null;
    studentNo?: string | null;
    employmentStatus?: string | null;
    employmentSector?: string | null;
  } | null;
  student?: {
    department?: string;
    studentNo?: string;
    referenceTeacher?: string | null;
    schoolEmail?: string | null;
  } | null;
  academician?: {
    department?: string;
    title?: string;
  } | null;
  headOfDepartment?: {
    department?: string;
    title?: string;
  } | null;
}

const roleConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  ALUMNI: {
    label: "Mezun",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600",
  },
  STUDENT: {
    label: "Öğrenci",
    icon: GraduationCap,
    color: "bg-green-500/10 text-green-600",
  },
  ACADEMICIAN: {
    label: "Akademisyen",
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600",
  },
  HEAD_OF_DEPARTMENT: {
    label: "Bölüm Başkanı",
    icon: UserCog,
    color: "bg-amber-500/10 text-amber-600",
  },
};

const employmentLabels: Record<string, string> = {
  EMPLOYED_OWN_SECTOR: "Kendi Sektöründe Çalışıyor",
  EMPLOYED_OTHER_SECTOR: "Başka Sektörde Çalışıyor",
  UNEMPLOYED: "İşsiz",
  STUDENT: "Öğrenimine Devam Ediyor",
  SELF_EMPLOYED: "Serbest / Girişimci",
};

export default function AdminApprovalsPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [roleFilter, setRoleFilter] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: statusFilter });
      if (roleFilter) params.set("role", roleFilter);
      const res = await fetch(`/api/admin/approvals?${params}`);
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      toast.error("Veriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, action: "APPROVE" | "REJECT") => {
    setProcessingId(userId);
    try {
      const res = await fetch("/api/admin/approvals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (!res.ok) throw new Error();
      toast.success(
        action === "APPROVE" ? "Üye onaylandı ✓" : "Üye reddedildi",
      );
      setUsers((p) => p.filter((u) => u.id !== userId));
    } catch {
      toast.error("İşlem başarısız");
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const pending = users.filter(() => statusFilter === "PENDING").length;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Üye Onay Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Kayıt başvurularını inceleyin ve onaylayın
          </p>
        </div>
        {statusFilter === "PENDING" && users.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">
              {users.length} bekleyen başvuru
            </span>
          </div>
        )}
      </div>

      {/* Filtreler */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {/* Durum */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200">
            {[
              { value: "PENDING", label: "Bekleyenler" },
              { value: "APPROVED", label: "Onaylananlar" },
              { value: "REJECTED", label: "Reddedilenler" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-4 py-2 text-sm font-semibold transition-all ${
                  statusFilter === opt.value
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Rol */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Tüm Roller</option>
            {Object.entries(roleConfig).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste */}
      {users.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">
            Bekleyen başvuru yok
          </h3>
          <p className="text-sm text-slate-400">
            Şu an seçili kriterlere uyan başvuru bulunmuyor.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => {
            const role = roleConfig[user.role];
            const RoleIcon = role?.icon ?? User;
            const isProcessing = processingId === user.id;

            return (
              <div
                key={user.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.firstName}
                        width={52}
                        height={52}
                        className="rounded-xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-13 h-13 w-[52px] h-[52px] rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-lg">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                        {role && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${role.color}`}
                          >
                            <RoleIcon className="w-3.5 h-3.5" />
                            {role.label}
                          </span>
                        )}
                      </div>

                      {/* Detaylar */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                        {user.phoneNumber && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{user.phoneNumber}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Başvuru: {formatDate(user.createdAt)}</span>
                        </div>

                        {/* Alumni bilgileri */}
                        {user.alumni && (
                          <>
                            {user.alumni.department && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{user.alumni.department}</span>
                              </div>
                            )}
                            {user.alumni.graduationYear && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>
                                  Mezuniyet: {user.alumni.graduationYear}
                                </span>
                              </div>
                            )}
                            {user.alumni.studentNo && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <UserCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>No: {user.alumni.studentNo}</span>
                              </div>
                            )}
                            {user.alumni.referenceTeacher && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold col-span-2">
                                <User className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                                <span>
                                  Referans: {user.alumni.referenceTeacher}
                                </span>
                              </div>
                            )}
                            {user.alumni.employmentStatus && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 col-span-2">
                                <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>
                                  {employmentLabels[
                                    user.alumni.employmentStatus
                                  ] ?? user.alumni.employmentStatus}
                                  {user.alumni.employmentSector &&
                                    ` — ${user.alumni.employmentSector}`}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Student bilgileri */}
                        {user.student && (
                          <>
                            {user.student.department && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{user.student.department}</span>
                              </div>
                            )}
                            {user.student.studentNo && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <UserCheck className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>No: {user.student.studentNo}</span>
                              </div>
                            )}
                            {user.student.schoolEmail && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <User className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{user.student.schoolEmail}</span>
                              </div>
                            )}
                            {user.student.referenceTeacher && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold col-span-2">
                                <User className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                                <span>
                                  Referans: {user.student.referenceTeacher}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Academician bilgileri */}
                        {user.academician && (
                          <>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{user.academician.department}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{user.academician.title}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Onay Butonları */}
                      {statusFilter === "PENDING" && (
                        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                          <button
                            onClick={() => handleAction(user.id, "APPROVE")}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-green-500/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                          >
                            {isProcessing ? (
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            Onayla
                          </button>
                          <button
                            onClick={() => handleAction(user.id, "REJECT")}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Reddet
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
