"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Search, User, MoreVertical, Shield, Trash2,
  Check, X, GraduationCap, Briefcase, BookOpen,
  UserCog, Crown, Users, ChevronDown,
} from "lucide-react";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string | null;
  isActive: boolean;
  emailVerified?: string | null;
  createdAt: string;
  lastLogin?: string | null;
}

const roleConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ADMIN: { label: "Admin", color: "bg-red-500/10 text-red-600", icon: Crown },
  MODERATOR: { label: "Moderatör", color: "bg-orange-500/10 text-orange-600", icon: Shield },
  ALUMNI: { label: "Mezun", color: "bg-blue-500/10 text-blue-600", icon: Briefcase },
  STUDENT: { label: "Öğrenci", color: "bg-green-500/10 text-green-600", icon: GraduationCap },
  ACADEMICIAN: { label: "Akademisyen", color: "bg-violet-500/10 text-violet-600", icon: BookOpen },
  HEAD_OF_DEPARTMENT: { label: "Bölüm Başkanı", color: "bg-amber-500/10 text-amber-600", icon: UserCog },
  USER: { label: "Kullanıcı", color: "bg-gray-500/10 text-gray-600", icon: User },
};

const allRoles = Object.entries(roleConfig).map(([value, cfg]) => ({ value, ...cfg }));

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchUsers(); }, [roleFilter]);

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

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      toast.success("Kullanıcı rolü güncellendi");
      setOpenMenuId(null);
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Bu kullanıcıyı kalıcı olarak silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
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
    return (
      `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)
    );
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric", month: "short", year: "numeric",
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
          <h1 className="text-2xl font-bold text-slate-900">Kullanıcı Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-0.5">{users.length} kullanıcı</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-slate-700">{filteredUsers.length} sonuç</span>
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
              <option key={r.value} value={r.value}>{r.label}</option>
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
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">Kullanıcı</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">Rol</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Doğrulama</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Kayıt</th>
                <th className="text-left px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest hidden xl:table-cell">Son Giriş</th>
                <th className="text-right px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">İşlem</th>
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
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Kullanıcı */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <Image
                              src={user.image} alt={user.firstName}
                              width={40} height={40}
                              className="rounded-full object-cover w-10 h-10 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary font-bold text-sm">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm text-slate-900">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Rol */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${role.color}`}>
                          <RoleIcon className="w-3 h-3" />
                          {role.label}
                        </span>
                      </td>

                      {/* Doğrulama */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        {user.emailVerified ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                            <Check className="w-3.5 h-3.5" /> Doğrulandı
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                            <X className="w-3.5 h-3.5" /> Bekliyor
                          </span>
                        )}
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
                        <div className="flex justify-end relative" ref={openMenuId === user.id ? menuRef : null}>
                          <button
                            onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-500 hover:text-slate-700"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openMenuId === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
                              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rol Değiştir</p>
                              {allRoles
                                .filter((r) => r.value !== "ADMIN" && r.value !== user.role)
                                .map((r) => {
                                  const Icon = r.icon;
                                  return (
                                    <button
                                      key={r.value}
                                      onClick={() => handleRoleChange(user.id, r.value)}
                                      className="flex items-center gap-2.5 w-full px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 transition"
                                    >
                                      <Icon className="w-4 h-4 text-slate-400" />
                                      {r.label} Yap
                                    </button>
                                  );
                                })}
                              <div className="h-px bg-slate-100 my-1.5 mx-3" />
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                                Kullanıcıyı Sil
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
    </div>
  );
}
