"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Shield,
  Save,
  Loader2,
  RefreshCw,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Lock,
} from "lucide-react";
import {
  permissionGroups,
  defaultPermissions,
  PermissionsConfig,
  PermissionKey,
} from "@/app/lib/permissions";

const ROLE_ORDER = [
  "ADMIN",
  "MODERATOR",
  "HEAD_OF_DEPARTMENT",
  "ALUMNI",
  "STUDENT",
  "ACADEMICIAN",
  "USER",
];

const roleStyles: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  ADMIN: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  MODERATOR: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  HEAD_OF_DEPARTMENT: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  ALUMNI: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  STUDENT: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  ACADEMICIAN: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    dot: "bg-violet-500",
  },
  USER: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

export default function RolesPage() {
  const [permissions, setPermissions] =
    useState<PermissionsConfig>(defaultPermissions);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(permissionGroups.map((g) => [g.label, true])),
  );
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetch("/api/admin/permissions")
      .then((r) => r.json())
      .then((data) => {
        setPermissions(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Yetkiler yüklenemedi");
        setLoading(false);
      });
  }, []);

  const togglePerm = (role: string, key: PermissionKey) => {
    if (role === "ADMIN") return; // Admin always full
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        permissions: {
          ...prev[role].permissions,
          [key]: !prev[role].permissions[key],
        },
      },
    }));
    setHasChanges(true);
  };

  const toggleGroupForRole = (
    role: string,
    groupKeys: PermissionKey[],
    value: boolean,
  ) => {
    if (role === "ADMIN") return;
    setPermissions((prev) => {
      const updated = { ...prev[role].permissions };
      groupKeys.forEach((k) => {
        updated[k] = value;
      });
      return { ...prev, [role]: { ...prev[role], permissions: updated } };
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/permissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permissions),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("Yetkiler başarıyla kaydedildi!");
      setHasChanges(false);
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm("Tüm yetkileri varsayılana sıfırlamak istiyor musunuz?"))
      return;
    setPermissions(defaultPermissions);
    setHasChanges(true);
  };

  const countGranted = (role: string) =>
    Object.values(permissions[role]?.permissions || {}).filter(Boolean).length;
  const totalPerms = permissionGroups.flatMap((g) => g.keys).length;

  const visibleRoles = activeRole ? [activeRole] : ROLE_ORDER;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Rol & Yetki Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Her rolün hangi işlemleri yapabileceğini burada yönetin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-semibold transition"
          >
            <RefreshCw className="w-4 h-4" /> Varsayılana Sıfırla
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-sm transition"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Kaydet
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bilgi notu */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-6">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <strong>Admin</strong> rolü her zaman tam yetkilidir ve
          değiştirilemez. Değişiklikler sunucu yeniden başlatılmadan aktif olur.
        </div>
      </div>

      {/* Rol Özet Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {ROLE_ORDER.map((role) => {
          const cfg = permissions[role];
          const style = roleStyles[role] || roleStyles.USER;
          const granted = countGranted(role);
          const isSelected = activeRole === role;
          return (
            <button
              key={role}
              onClick={() => setActiveRole(isSelected ? null : role)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? `${style.bg} ${style.border} shadow-md ring-2 ring-offset-1 ring-current`
                  : `bg-white border-slate-200 hover:${style.border} hover:${style.bg}`
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                <span className={`text-xs font-bold ${style.text} truncate`}>
                  {cfg?.label || role}
                </span>
              </div>
              <p className="text-lg font-extrabold text-slate-900">{granted}</p>
              <p className="text-[10px] text-slate-400">/ {totalPerms} yetki</p>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${style.dot} transition-all`}
                  style={{ width: `${(granted / totalPerms) * 100}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filtre bilgisi */}
      {activeRole && (
        <div
          className={`mb-4 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold ${roleStyles[activeRole]?.bg} ${roleStyles[activeRole]?.text}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${roleStyles[activeRole]?.dot}`}
          />
          Yalnızca <strong>{permissions[activeRole]?.label}</strong> rolü
          gösteriliyor
          <button
            onClick={() => setActiveRole(null)}
            className="ml-auto underline text-xs font-normal"
          >
            Tümünü Göster
          </button>
        </div>
      )}

      {/* Permission Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Tablo Başlık */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-56">
                  İzin
                </th>
                {visibleRoles.map((role) => {
                  const cfg = permissions[role];
                  const style = roleStyles[role] || roleStyles.USER;
                  return (
                    <th key={role} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`w-3 h-3 rounded-full ${style.dot}`} />
                        <span className="text-xs font-bold text-slate-700">
                          {cfg?.label || role}
                        </span>
                        {role === "ADMIN" && (
                          <Lock className="w-3 h-3 text-slate-400" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {permissionGroups.map((group) => {
                const isExpanded = expandedGroups[group.label] !== false;
                const groupKeys = group.keys.map((k) => k.key);
                return (
                  <React.Fragment key={group.label}>
                    {/* Grup başlığı */}
                    <tr
                      className="bg-slate-50 cursor-pointer hover:bg-slate-100 transition"
                      onClick={() =>
                        setExpandedGroups((prev) => ({
                          ...prev,
                          [group.label]: !isExpanded,
                        }))
                      }
                    >
                      <td className="px-6 py-2.5" colSpan={1}>
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            {group.label}
                          </span>
                        </div>
                      </td>
                      {/* Grup toplam toggle — her rol için */}
                      {visibleRoles.map((role) => {
                        const allGranted = groupKeys.every(
                          (k) => permissions[role]?.permissions[k],
                        );
                        const someGranted = groupKeys.some(
                          (k) => permissions[role]?.permissions[k],
                        );
                        const isAdmin = role === "ADMIN";
                        return (
                          <td key={role} className="px-4 py-2.5 text-center">
                            <button
                              disabled={isAdmin}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleGroupForRole(
                                  role,
                                  groupKeys,
                                  !allGranted,
                                );
                              }}
                              className={`w-7 h-7 mx-auto flex items-center justify-center rounded-lg border-2 transition text-xs font-bold ${
                                isAdmin
                                  ? "bg-slate-100 border-slate-200 text-slate-300 cursor-default"
                                  : allGranted
                                    ? "bg-primary/10 border-primary/40 text-primary hover:bg-primary/20"
                                    : someGranted
                                      ? "bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100"
                                      : "bg-white border-slate-200 text-slate-300 hover:border-slate-300"
                              }`}
                              title={
                                allGranted ? "Tümünü kaldır" : "Tümünü ver"
                              }
                            >
                              {allGranted ? "✓" : someGranted ? "~" : "·"}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                    {/* İzin satırları */}
                    {isExpanded &&
                      group.keys.map(({ key, label }) => (
                        <tr
                          key={key}
                          className="border-b border-slate-50 hover:bg-slate-50/50 transition"
                        >
                          <td className="px-6 py-3 pl-11">
                            <span className="text-sm text-slate-600">
                              {label}
                            </span>
                          </td>
                          {visibleRoles.map((role) => {
                            const granted =
                              permissions[role]?.permissions[key] ?? false;
                            const isAdmin = role === "ADMIN";
                            return (
                              <td key={role} className="px-4 py-3 text-center">
                                <button
                                  disabled={isAdmin}
                                  onClick={() => togglePerm(role, key)}
                                  className={`w-6 h-6 mx-auto flex items-center justify-center rounded-md transition ${
                                    granted
                                      ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-600"
                                      : isAdmin
                                        ? "bg-emerald-100 text-emerald-600 cursor-default"
                                        : "bg-slate-100 hover:bg-slate-200 text-slate-300"
                                  }`}
                                >
                                  {granted ? (
                                    <Check className="w-3.5 h-3.5" />
                                  ) : (
                                    <X className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rol Açıklamaları */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {ROLE_ORDER.map((role) => {
          const cfg = permissions[role];
          const style = roleStyles[role] || roleStyles.USER;
          return (
            <div
              key={role}
              className={`${style.bg} border ${style.border} rounded-xl p-4`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                <span className={`text-sm font-bold ${style.text}`}>
                  {cfg?.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {cfg?.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
