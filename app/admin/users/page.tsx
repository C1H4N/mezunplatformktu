"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Search,
  User,
  MoreVertical,
  Shield,
  Trash2,
  Check,
  X,
  GraduationCap,
  Briefcase,
  BookOpen,
  UserCog,
  Crown,
  Users,
  Plus,
  AlertCircle,
  Loader2,
  Edit3,
  Ban,
  ShieldCheck,
  ShieldX,
  KeyRound,
  MailCheck,
  CheckCircle2,
  Clock,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { departmentGroups, cities } from "@/app/lib/constants";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string | null;
  isActive: boolean;
  approvalStatus: string;
  emailVerified?: string | null;
  createdAt: string;
  lastLogin?: string | null;
}

const roleConfig: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  ADMIN: { label: "Admin", color: "bg-red-500/10 text-red-600", icon: Crown },
  MODERATOR: {
    label: "Moderatör",
    color: "bg-orange-500/10 text-orange-600",
    icon: Shield,
  },
  ALUMNI: {
    label: "Mezun",
    color: "bg-blue-500/10 text-blue-600",
    icon: Briefcase,
  },
  STUDENT: {
    label: "Öğrenci",
    color: "bg-green-500/10 text-green-600",
    icon: GraduationCap,
  },
  ACADEMICIAN: {
    label: "Akademisyen",
    color: "bg-violet-500/10 text-violet-600",
    icon: BookOpen,
  },
  HEAD_OF_DEPARTMENT: {
    label: "Bölüm Başkanı",
    color: "bg-amber-500/10 text-amber-600",
    icon: UserCog,
  },
  USER: {
    label: "Kullanıcı",
    color: "bg-gray-500/10 text-gray-600",
    icon: User,
  },
};

const allRoles = Object.entries(roleConfig).map(([value, cfg]) => ({
  value,
  ...cfg,
}));

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ekleme modalı state'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT">("ADD");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "ALUMNI",
    department: "Dijital Dönüşüm Elektroniği Programı",
    graduationYear: new Date().getFullYear().toString(),
    company: "",
    position: "",
    city: "",
    sector: "",
    status: "",
    about: "",
    studentNo: "",
  };
  const [modalForm, setModalForm] = useState(initialForm);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isEdit = modalMode === "EDIT";
      const url = isEdit
        ? `/api/admin/users/${editingUserId}`
        : "/api/admin/users";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalForm),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(
          err.error ||
            `Kullanıcı ${isEdit ? "güncellenemedi" : "oluşturulamadı"}`,
        );
      }
      toast.success(
        `Kullanıcı başarıyla ${isEdit ? "güncellendi" : "oluşturuldu"}`,
      );
      setIsModalOpen(false);
      setModalForm(initialForm);
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAppModal = async (userId?: string) => {
    if (!userId) {
      setModalMode("ADD");
      setEditingUserId(null);
      setModalForm(initialForm);
      setIsModalOpen(true);
      return;
    }

    setOpenMenuId(null);
    setModalMode("EDIT");
    setEditingUserId(userId);
    setIsModalOpen(true); // show modal immediately to feel responsive
    // Fetch full details
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) throw new Error();
      const userFull = await res.json();
      setModalForm({
        firstName: userFull.firstName || "",
        lastName: userFull.lastName || "",
        email: userFull.email || "",
        phoneNumber:
          userFull.phoneNumber || userFull.moreinfo?.phoneNumber || "",
        role: userFull.role,
        department:
          userFull.alumni?.department ||
          userFull.student?.department ||
          "Dijital Dönüşüm Elektroniği Programı",
        graduationYear:
          userFull.alumni?.graduationYear?.toString() ||
          new Date().getFullYear().toString(),
        company: userFull.moreinfo?.company || "",
        position:
          userFull.moreinfo?.position || userFull.alumni?.currentPosition || "",
        city: userFull.moreinfo?.location || "",
        sector: userFull.alumni?.employmentSector || "",
        status: userFull.alumni?.employmentStatus || "",
        about: userFull.moreinfo?.about || "",
        studentNo: userFull.student?.studentNo || "",
      });
    } catch (e) {
      toast.error("Kullanıcı detayları alınamadı");
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "ALL") params.append("role", roleFilter);
      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      toast.error("Kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (
    userId: string,
    action: string,
    extra?: Record<string, unknown>,
  ) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, ...extra }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      const data = await res.json();
      toast.success(data.message || "Güncellendi");
      setOpenMenuId(null);
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    }
  };

  const handleRoleChange = (userId: string, newRole: string) =>
    handleUserAction(userId, "CHANGE_ROLE", { role: newRole });

  const handleDelete = async (userId: string) => {
    if (
      !confirm(
        "Bu kullanıcıyı kalıcı olarak silmek istediğinizden emin misiniz?",
      )
    )
      return;
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      toast.success("Kullanıcı silindi");
      setUsers((p) => p.filter((u) => u.id !== userId));
      setOpenMenuId(null);
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q);
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

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
            Kullanıcı Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {users.length} kullanıcı
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-slate-700">
              {filteredUsers.length} sonuç
            </span>
          </div>
          <button
            onClick={() => openAppModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Kullanıcı Ekle
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İsim veya e-posta ara..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer pr-8"
          >
            <option value="ALL">Tüm Roller</option>
            {allRoles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Kullanıcı
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Rol
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">
                  Doğrulama
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">
                  Kayıt
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden xl:table-cell">
                  Son Giriş
                </th>
                <th className="text-right px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Kullanıcı bulunamadı</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const role = roleConfig[user.role] || roleConfig.USER;
                  const RoleIcon = role.icon;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Kullanıcı */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.firstName}
                              width={40}
                              height={40}
                              className="rounded-full object-cover w-10 h-10 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary font-bold text-sm">
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm text-slate-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rol */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${role.color}`}
                        >
                          <RoleIcon className="w-3 h-3" />
                          {role.label}
                        </span>
                      </td>

                      {/* Durum badge'leri */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          {/* Onay Durumu */}
                          {user.approvalStatus === "APPROVED" ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Onaylı
                            </span>
                          ) : user.approvalStatus === "REJECTED" ? (
                            <span className="inline-flex items-center gap-1 text-xs text-red-500 font-semibold">
                              <XCircle className="w-3.5 h-3.5" /> Reddedildi
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-semibold">
                              <Clock className="w-3.5 h-3.5" /> Bekliyor
                            </span>
                          )}
                          {/* Banlı mı? */}
                          {!user.isActive && (
                            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-100 rounded-full px-2 py-0.5">
                              <Ban className="w-3 h-3" /> Engelli
                            </span>
                          )}
                          {/* E-posta doğrulama */}
                          {user.emailVerified ? (
                            <span className="inline-flex items-center gap-1 text-[10px] text-green-500">
                              <Check className="w-3 h-3" /> E-posta OK
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400">
                              <X className="w-3 h-3" /> E-posta Bekliyor
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Kayıt */}
                      <td className="px-6 py-4 text-xs text-slate-500 hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Son Giriş */}
                      <td className="px-6 py-4 text-xs text-slate-500 hidden xl:table-cell">
                        {user.lastLogin ? formatDate(user.lastLogin) : "—"}
                      </td>

                      {/* İşlem Menüsü */}
                      <td className="px-6 py-4">
                        <div
                          className="flex justify-end relative"
                          ref={openMenuId === user.id ? menuRef : null}
                        >
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === user.id ? null : user.id,
                              )
                            }
                            className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-500 hover:text-slate-700"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenuId === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
                              {/* --- Profil & Düzenle --- */}
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Profil
                              </p>
                              <button
                                onClick={() => openAppModal(user.id)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                              >
                                <Edit3 className="w-4 h-4 text-slate-400" />{" "}
                                Profili Düzenle
                              </button>

                              {/* --- Rol Değiştir --- */}
                              <div className="h-px bg-slate-100 my-1 mx-3" />
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Rol Değiştir
                              </p>
                              {allRoles
                                .filter(
                                  (r) =>
                                    r.value !== "ADMIN" &&
                                    r.value !== user.role,
                                )
                                .map((r) => {
                                  const Icon = r.icon;
                                  return (
                                    <button
                                      key={r.value}
                                      onClick={() =>
                                        handleRoleChange(user.id, r.value)
                                      }
                                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 transition"
                                    >
                                      <Icon className="w-4 h-4 text-slate-400" />
                                      {r.label} Yap
                                    </button>
                                  );
                                })}

                              {/* --- Onay Yönetimi --- */}
                              <div className="h-px bg-slate-100 my-1 mx-3" />
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Hesap Onayı
                              </p>
                              {user.approvalStatus !== "APPROVED" && (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "APPROVE")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition"
                                >
                                  <ShieldCheck className="w-4 h-4" /> Hesabı
                                  Onayla
                                </button>
                              )}
                              {user.approvalStatus !== "REJECTED" && (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "REJECT")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-orange-500 hover:bg-orange-50 transition"
                                >
                                  <ShieldX className="w-4 h-4" /> Hesabı Reddet
                                </button>
                              )}
                              {user.approvalStatus !== "PENDING" && (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "PENDING")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 transition"
                                >
                                  <Clock className="w-4 h-4" /> Beklemeye Al
                                </button>
                              )}

                              {/* --- Hesap Durumu (Ban) --- */}
                              <div className="h-px bg-slate-100 my-1 mx-3" />
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Hesap Durumu
                              </p>
                              {user.isActive ? (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "BAN")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                                >
                                  <Ban className="w-4 h-4" /> Hesabı Engelle
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "UNBAN")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition"
                                >
                                  <ToggleRight className="w-4 h-4" /> Engeli
                                  Kaldır
                                </button>
                              )}

                              {/* --- E-posta & Şifre --- */}
                              <div className="h-px bg-slate-100 my-1 mx-3" />
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Hesap İşlemleri
                              </p>
                              {!user.emailVerified ? (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "VERIFY_EMAIL")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                >
                                  <MailCheck className="w-4 h-4 text-slate-400" />{" "}
                                  E-postayı Doğrula
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleUserAction(user.id, "UNVERIFY_EMAIL")
                                  }
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                >
                                  <MailCheck className="w-4 h-4 text-slate-400" />{" "}
                                  Doğrulamasını Kaldır
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  if (
                                    confirm(
                                      `${user.firstName} ${user.lastName} adlı kullanıcının şifresi varsayılana (Ktumezun2024!) sıfırlanacak. Emin misiniz?`,
                                    )
                                  ) {
                                    handleUserAction(user.id, "RESET_PASSWORD");
                                  }
                                }}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                              >
                                <KeyRound className="w-4 h-4 text-slate-400" />{" "}
                                Şifre Sıfırla
                              </button>

                              {/* --- Sil --- */}
                              <div className="h-px bg-slate-100 my-1 mx-3" />
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                              >
                                <Trash2 className="w-4 h-4" /> Kullanıcıyı Sil
                              </button>
                            </div>
                          )}
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

      {/* KULLANICI EKLE / DÜZENLE MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                {modalMode === "ADD" ? (
                  <>
                    <Plus className="w-5 h-5 text-primary" /> Yeni Kullanıcı
                    Ekle
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5 text-primary" /> Kullanıcıyı
                    Düzenle
                  </>
                )}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <form
                id="userModalForm"
                onSubmit={handleModalSubmit}
                className="space-y-4"
              >
                {/* Ad / Soyad */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Ad
                    </label>
                    <input
                      required
                      type="text"
                      value={modalForm.firstName}
                      onChange={(e) =>
                        setModalForm({
                          ...modalForm,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ahmet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Soyad
                    </label>
                    <input
                      required
                      type="text"
                      value={modalForm.lastName}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Yılmaz"
                    />
                  </div>
                </div>

                {/* Email / Telefon */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      E-posta
                    </label>
                    <input
                      required
                      type="email"
                      value={modalForm.email}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="ornek@ktu.edu.tr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Telefon{" "}
                      <span className="text-slate-400 font-normal">
                        (İsteğe Bağlı)
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={modalForm.phoneNumber}
                      onChange={(e) =>
                        setModalForm({
                          ...modalForm,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="+905551234567"
                    />
                  </div>
                </div>

                {/* Rol / İl */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Rol
                    </label>
                    <select
                      value={modalForm.role}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, role: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                    >
                      {allRoles.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Lokasyon (İl)
                    </label>
                    <select
                      value={modalForm.city}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, city: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                    >
                      <option value="">İl Seçin</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mezun'a özel alanlar */}
                {modalForm.role === "ALUMNI" && (
                  <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 space-y-3">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Mezun Bilgileri
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Bölüm / Program
                        </label>
                        <select
                          required
                          value={modalForm.department}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              department: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                        >
                          {departmentGroups[
                            "ARAKLI ALİ CEVAT ÖZYURT MESLEK YÜKSEKOKULU"
                          ]?.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Mezuniyet Yılı
                        </label>
                        <input
                          required
                          type="number"
                          min="1990"
                          max="2030"
                          value={modalForm.graduationYear}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              graduationYear: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Çalışma Durumu
                        </label>
                        <select
                          value={modalForm.status}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              status: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
                        >
                          <option value="">Belirtilmemiş</option>
                          <option value="EMPLOYED_OWN_SECTOR">
                            Kendi Sektöründe Çalışıyor
                          </option>
                          <option value="EMPLOYED_OTHER_SECTOR">
                            Farklı Sektörde Çalışıyor
                          </option>
                          <option value="UNEMPLOYED">İşsiz / İş Arıyor</option>
                          <option value="STUDENT">Öğrenime Devam Ediyor</option>
                          <option value="SELF_EMPLOYED">
                            Serbest Çalışan (Girişimci)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Sektör
                        </label>
                        <input
                          type="text"
                          value={modalForm.sector}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              sector: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          placeholder="Örn: Bilişim"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Şirket
                        </label>
                        <input
                          type="text"
                          value={modalForm.company}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          placeholder="Şirket Adı"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-800 mb-1">
                          Pozisyon
                        </label>
                        <input
                          type="text"
                          value={modalForm.position}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              position: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          placeholder="Ünvan / Pozisyon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Öğrenci'ye özel alanlar */}
                {modalForm.role === "STUDENT" && (
                  <div className="bg-green-50/60 p-4 rounded-xl border border-green-100 space-y-3">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">
                      Öğrenci Bilgileri
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-green-800 mb-1">
                          Öğrenci Numarası
                        </label>
                        <input
                          type="text"
                          value={modalForm.studentNo}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              studentNo: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                          placeholder="2024..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-green-800 mb-1">
                          Bölüm / Program
                        </label>
                        <select
                          required
                          value={modalForm.department}
                          onChange={(e) =>
                            setModalForm({
                              ...modalForm,
                              department: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all cursor-pointer"
                        >
                          {departmentGroups[
                            "ARAKLI ALİ CEVAT ÖZYURT MESLEK YÜKSEKOKULU"
                          ]?.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hakkında */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Hakkında (Biyografi)
                  </label>
                  <textarea
                    rows={3}
                    value={modalForm.about}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, about: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="Kendinizden bahsedin..."
                  />
                </div>

                {/* Varsayılan şifre uyarısı (sadece ekleme modunda) */}
                {modalMode === "ADD" && (
                  <div className="bg-amber-50 rounded-lg p-3 flex gap-3 border border-amber-100">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      Eklenen hesap otomatik onaylanır. Varsayılan şifre:{" "}
                      <strong>Ktumezun2024!</strong>
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition"
              >
                İptal
              </button>
              <button
                type="submit"
                form="userModalForm"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-lg text-sm font-semibold shadow-sm transition"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />{" "}
                    {modalMode === "ADD"
                      ? "Kullanıcı Ekle"
                      : "Değişiklikleri Kaydet"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
