/**
 * Rol Yetki Sistemi
 * Her role ait izinler burada tanımlanır.
 * Admin panelindeki "Rol Yönetimi" sayfasından düzenlenebilir.
 */

export type PermissionKey =
  // Kullanıcı Yönetimi
  | "users.view"
  | "users.edit"
  | "users.delete"
  | "users.ban"
  | "users.approve"
  | "users.changeRole"
  | "users.resetPassword"
  // İlan / İş Yönetimi
  | "jobs.view"
  | "jobs.create"
  | "jobs.edit"
  | "jobs.delete"
  | "jobs.approve"
  // Etkinlik Yönetimi
  | "events.view"
  | "events.create"
  | "events.edit"
  | "events.delete"
  | "events.approve"
  // Duyuru Yönetimi
  | "announcements.view"
  | "announcements.create"
  | "announcements.edit"
  | "announcements.delete"
  // Bölüm & Program Yönetimi
  | "departments.view"
  | "departments.edit"
  // Raporlama
  | "reports.view"
  | "reports.detailed"
  | "reports.export"
  // Şikayetler / Moderasyon
  | "moderation.view"
  | "moderation.resolve"
  // Mesajlaşma
  | "messages.send"
  | "messages.view_all"
  // Profil
  | "profile.view_private"
  | "profile.edit_others"
  // Admin Paneli
  | "admin.dashboard"
  | "admin.roles"
  | "admin.settings";

export interface RolePermissions {
  label: string;
  color: string;
  description: string;
  permissions: Record<PermissionKey, boolean>;
}

export type PermissionsConfig = Record<string, RolePermissions>;

export const permissionGroups: {
  label: string;
  keys: { key: PermissionKey; label: string }[];
}[] = [
  {
    label: "Kullanıcı Yönetimi",
    keys: [
      { key: "users.view", label: "Kullanıcıları Görüntüle" },
      { key: "users.edit", label: "Kullanıcı Profili Düzenle" },
      { key: "users.delete", label: "Kullanıcı Sil" },
      { key: "users.ban", label: "Hesap Engelle / Unban" },
      { key: "users.approve", label: "Hesap Onayla / Reddet" },
      { key: "users.changeRole", label: "Rol Değiştir" },
      { key: "users.resetPassword", label: "Şifre Sıfırla" },
    ],
  },
  {
    label: "İlan Yönetimi",
    keys: [
      { key: "jobs.view", label: "İlanları Görüntüle" },
      { key: "jobs.create", label: "İlan Oluştur" },
      { key: "jobs.edit", label: "İlan Düzenle" },
      { key: "jobs.delete", label: "İlan Sil" },
      { key: "jobs.approve", label: "İlan Onayla" },
    ],
  },
  {
    label: "Etkinlik Yönetimi",
    keys: [
      { key: "events.view", label: "Etkinlikleri Görüntüle" },
      { key: "events.create", label: "Etkinlik Oluştur" },
      { key: "events.edit", label: "Etkinlik Düzenle" },
      { key: "events.delete", label: "Etkinlik Sil" },
      { key: "events.approve", label: "Etkinlik Onayla" },
    ],
  },
  {
    label: "Duyuru Yönetimi",
    keys: [
      { key: "announcements.view", label: "Duyuruları Görüntüle" },
      { key: "announcements.create", label: "Duyuru Oluştur" },
      { key: "announcements.edit", label: "Duyuru Düzenle" },
      { key: "announcements.delete", label: "Duyuru Sil" },
    ],
  },
  {
    label: "Bölüm & Program",
    keys: [
      { key: "departments.view", label: "Bölümleri Görüntüle" },
      { key: "departments.edit", label: "Bölüm Düzenle" },
    ],
  },
  {
    label: "Raporlama",
    keys: [
      { key: "reports.view", label: "Raporları Görüntüle" },
      { key: "reports.detailed", label: "Detaylı Rapor" },
      { key: "reports.export", label: "Rapor Dışa Aktar" },
    ],
  },
  {
    label: "Moderasyon",
    keys: [
      { key: "moderation.view", label: "Şikayetleri Görüntüle" },
      { key: "moderation.resolve", label: "Şikayet Çözümle" },
    ],
  },
  {
    label: "Mesajlaşma",
    keys: [
      { key: "messages.send", label: "Mesaj Gönder" },
      { key: "messages.view_all", label: "Tüm Mesajları Gör" },
    ],
  },
  {
    label: "Profil",
    keys: [
      { key: "profile.view_private", label: "Gizli Profilleri Gör" },
      { key: "profile.edit_others", label: "Başkasının Profilini Düzenle" },
    ],
  },
  {
    label: "Admin Paneli",
    keys: [
      { key: "admin.dashboard", label: "Dashboard Erişimi" },
      { key: "admin.roles", label: "Rol Yönetimi" },
      { key: "admin.settings", label: "Ayarlar" },
    ],
  },
];

// Varsayılan izinler — her rol için
export const defaultPermissions: PermissionsConfig = {
  ADMIN: {
    label: "Admin",
    color: "#ef4444",
    description: "Sistemin tam kontrolüne sahip süper yönetici",
    permissions: Object.fromEntries(
      permissionGroups.flatMap((g) => g.keys.map((k) => [k.key, true])),
    ) as Record<PermissionKey, boolean>,
  },
  MODERATOR: {
    label: "Moderatör",
    color: "#f97316",
    description: "İçerik moderasyonu ve kullanıcı onayları yapabilir",
    permissions: {
      "users.view": true,
      "users.edit": false,
      "users.delete": false,
      "users.ban": true,
      "users.approve": true,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": false,
      "jobs.edit": true,
      "jobs.delete": true,
      "jobs.approve": true,
      "events.view": true,
      "events.create": false,
      "events.edit": true,
      "events.delete": true,
      "events.approve": true,
      "announcements.view": true,
      "announcements.create": true,
      "announcements.edit": true,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": true,
      "reports.detailed": false,
      "reports.export": false,
      "moderation.view": true,
      "moderation.resolve": true,
      "messages.send": true,
      "messages.view_all": true,
      "profile.view_private": true,
      "profile.edit_others": false,
      "admin.dashboard": true,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
  HEAD_OF_DEPARTMENT: {
    label: "Bölüm Başkanı",
    color: "#f59e0b",
    description: "Kendi bölümüne ait mezunları yönetir ve raporları inceler",
    permissions: {
      "users.view": true,
      "users.edit": false,
      "users.delete": false,
      "users.ban": false,
      "users.approve": true,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": false,
      "jobs.edit": false,
      "jobs.delete": false,
      "jobs.approve": false,
      "events.view": true,
      "events.create": true,
      "events.edit": true,
      "events.delete": false,
      "events.approve": false,
      "announcements.view": true,
      "announcements.create": false,
      "announcements.edit": false,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": true,
      "reports.detailed": true,
      "reports.export": true,
      "moderation.view": true,
      "moderation.resolve": false,
      "messages.send": true,
      "messages.view_all": false,
      "profile.view_private": true,
      "profile.edit_others": false,
      "admin.dashboard": true,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
  ALUMNI: {
    label: "Mezun",
    color: "#3b82f6",
    description:
      "Platform üyesi, iş ilanı oluşturabilir ve diğer mezunlarla bağlantı kurabilir",
    permissions: {
      "users.view": false,
      "users.edit": false,
      "users.delete": false,
      "users.ban": false,
      "users.approve": false,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": true,
      "jobs.edit": false,
      "jobs.delete": false,
      "jobs.approve": false,
      "events.view": true,
      "events.create": false,
      "events.edit": false,
      "events.delete": false,
      "events.approve": false,
      "announcements.view": true,
      "announcements.create": false,
      "announcements.edit": false,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": false,
      "reports.detailed": false,
      "reports.export": false,
      "moderation.view": false,
      "moderation.resolve": false,
      "messages.send": true,
      "messages.view_all": false,
      "profile.view_private": false,
      "profile.edit_others": false,
      "admin.dashboard": false,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
  STUDENT: {
    label: "Öğrenci",
    color: "#22c55e",
    description: "Aktif öğrenci, platformu takip edebilir",
    permissions: {
      "users.view": false,
      "users.edit": false,
      "users.delete": false,
      "users.ban": false,
      "users.approve": false,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": false,
      "jobs.edit": false,
      "jobs.delete": false,
      "jobs.approve": false,
      "events.view": true,
      "events.create": false,
      "events.edit": false,
      "events.delete": false,
      "events.approve": false,
      "announcements.view": true,
      "announcements.create": false,
      "announcements.edit": false,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": false,
      "reports.detailed": false,
      "reports.export": false,
      "moderation.view": false,
      "moderation.resolve": false,
      "messages.send": true,
      "messages.view_all": false,
      "profile.view_private": false,
      "profile.edit_others": false,
      "admin.dashboard": false,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
  ACADEMICIAN: {
    label: "Akademisyen",
    color: "#8b5cf6",
    description: "Akademik personel, etkinlik ve duyuru oluşturabilir",
    permissions: {
      "users.view": false,
      "users.edit": false,
      "users.delete": false,
      "users.ban": false,
      "users.approve": false,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": false,
      "jobs.edit": false,
      "jobs.delete": false,
      "jobs.approve": false,
      "events.view": true,
      "events.create": true,
      "events.edit": true,
      "events.delete": false,
      "events.approve": false,
      "announcements.view": true,
      "announcements.create": true,
      "announcements.edit": true,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": false,
      "reports.detailed": false,
      "reports.export": false,
      "moderation.view": false,
      "moderation.resolve": false,
      "messages.send": true,
      "messages.view_all": false,
      "profile.view_private": false,
      "profile.edit_others": false,
      "admin.dashboard": false,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
  USER: {
    label: "Kullanıcı",
    color: "#6b7280",
    description: "Temel üye, yalnızca platformu görüntüleyebilir",
    permissions: {
      "users.view": false,
      "users.edit": false,
      "users.delete": false,
      "users.ban": false,
      "users.approve": false,
      "users.changeRole": false,
      "users.resetPassword": false,
      "jobs.view": true,
      "jobs.create": false,
      "jobs.edit": false,
      "jobs.delete": false,
      "jobs.approve": false,
      "events.view": true,
      "events.create": false,
      "events.edit": false,
      "events.delete": false,
      "events.approve": false,
      "announcements.view": true,
      "announcements.create": false,
      "announcements.edit": false,
      "announcements.delete": false,
      "departments.view": true,
      "departments.edit": false,
      "reports.view": false,
      "reports.detailed": false,
      "reports.export": false,
      "moderation.view": false,
      "moderation.resolve": false,
      "messages.send": false,
      "messages.view_all": false,
      "profile.view_private": false,
      "profile.edit_others": false,
      "admin.dashboard": false,
      "admin.roles": false,
      "admin.settings": false,
    },
  },
};
