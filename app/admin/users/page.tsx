"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { 
  Search, 
  User, 
  MoreVertical,
  Shield,
  Ban,
  Trash2,
  Mail,
  Check,
  X,
} from "lucide-react";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string;
  emailVerified?: string;
  createdAt: string;
  lastLogin?: string;
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-500/10 text-red-600",
  MODERATOR: "bg-orange-500/10 text-orange-600",
  ALUMNI: "bg-blue-500/10 text-blue-600",
  STUDENT: "bg-green-500/10 text-green-600",
  EMPLOYER: "bg-purple-500/10 text-purple-600",
  USER: "bg-gray-500/10 text-gray-600",
};

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  MODERATOR: "Moderatör",
  ALUMNI: "Mezun",
  STUDENT: "Öğrenci",
  EMPLOYER: "İşveren",
  USER: "Kullanıcı",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (roleFilter !== "ALL") params.append("role", roleFilter);
      
      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error("Kullanıcılar getirilemedi");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
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

      if (!res.ok) throw new Error("Rol güncellenemedi");
      
      toast.success("Kullanıcı rolü güncellendi");
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      toast.error("Rol güncellenirken hata oluştu");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Kullanıcı silinemedi");
      
      toast.success("Kullanıcı silindi");
      fetchUsers();
    } catch (error) {
      toast.error("Kullanıcı silinirken hata oluştu");
    }
  };

  const filteredUsers = users.filter((user) => {
    const name = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
        <p className="text-muted">{users.length} kullanıcı</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İsim veya email ara..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="ALL">Tüm Roller</option>
            {Object.entries(roleLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted-bg">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium">Kullanıcı</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Rol</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Doğrulama</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Kayıt Tarihi</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Son Giriş</th>
                <th className="text-right px-6 py-4 text-sm font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted-bg/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.firstName}
                          width={40}
                          height={40}
                          className="rounded-full object-cover w-10 h-10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.emailVerified ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <Check className="w-4 h-4" />
                        Doğrulandı
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm">
                        <X className="w-4 h-4" />
                        Bekliyor
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {user.lastLogin ? formatDate(user.lastLogin) : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 relative">
                      <button
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        className="p-2 hover:bg-muted-bg rounded-lg transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {selectedUser === user.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={() => handleRoleChange(user.id, "MODERATOR")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted-bg"
                          >
                            <Shield className="w-4 h-4" />
                            Moderatör Yap
                          </button>
                          <button
                            onClick={() => handleRoleChange(user.id, "USER")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-muted-bg"
                          >
                            <Ban className="w-4 h-4" />
                            Rolü Kaldır
                          </button>
                          <hr className="my-1 border-border" />
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                            Kullanıcıyı Sil
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

