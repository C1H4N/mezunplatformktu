"use client";

import { useState } from "react";
import { 
  Settings, 
  Bell,
  Mail,
  Shield,
  Database,
  Globe,
  Palette,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ElementType;
  settings: {
    key: string;
    label: string;
    description: string;
    type: "toggle" | "text" | "select";
    value: boolean | string;
    options?: string[];
  }[];
}

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<SettingSection[]>([
    {
      id: "notifications",
      title: "Bildirimler",
      icon: Bell,
      settings: [
        {
          key: "emailNotifications",
          label: "E-posta Bildirimleri",
          description: "Yeni kayıt ve önemli olaylar için e-posta gönder",
          type: "toggle",
          value: true,
        },
        {
          key: "weeklyReport",
          label: "Haftalık Rapor",
          description: "Her hafta platform özeti e-postası gönder",
          type: "toggle",
          value: true,
        },
      ],
    },
    {
      id: "email",
      title: "E-posta Ayarları",
      icon: Mail,
      settings: [
        {
          key: "senderName",
          label: "Gönderici Adı",
          description: "E-postalarda görünecek gönderici adı",
          type: "text",
          value: "KTU Mezun Platformu",
        },
        {
          key: "replyTo",
          label: "Yanıt Adresi",
          description: "Yanıtların gönderileceği e-posta adresi",
          type: "text",
          value: "noreply@ktu.edu.tr",
        },
      ],
    },
    {
      id: "security",
      title: "Güvenlik",
      icon: Shield,
      settings: [
        {
          key: "requireEmailVerification",
          label: "E-posta Doğrulama Zorunlu",
          description: "Yeni kullanıcıların e-postalarını doğrulaması zorunlu olsun",
          type: "toggle",
          value: true,
        },
        {
          key: "allowRegistration",
          label: "Kayıt İzni",
          description: "Yeni kullanıcı kayıtlarına izin ver",
          type: "toggle",
          value: true,
        },
        {
          key: "sessionTimeout",
          label: "Oturum Süresi",
          description: "Otomatik çıkış süresi",
          type: "select",
          value: "7 gün",
          options: ["1 gün", "7 gün", "30 gün", "Süresiz"],
        },
      ],
    },
    {
      id: "platform",
      title: "Platform",
      icon: Globe,
      settings: [
        {
          key: "maintenanceMode",
          label: "Bakım Modu",
          description: "Platformu bakım moduna al (sadece adminler erişebilir)",
          type: "toggle",
          value: false,
        },
        {
          key: "defaultLanguage",
          label: "Varsayılan Dil",
          description: "Platform varsayılan dili",
          type: "select",
          value: "Türkçe",
          options: ["Türkçe", "English"],
        },
      ],
    },
  ]);

  const handleToggle = (sectionId: string, settingKey: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.key === settingKey
                  ? { ...setting, value: !setting.value }
                  : setting
              ),
            }
          : section
      )
    );
  };

  const handleChange = (sectionId: string, settingKey: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.key === settingKey ? { ...setting, value } : setting
              ),
            }
          : section
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    // Simüle edilmiş kayıt - gerçek API entegrasyonu yapılacak
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success("Ayarlar kaydedildi");
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-muted">Platform ayarları ve yapılandırma</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted-bg/50">
                <Icon className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">{section.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {section.settings.map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted">{setting.description}</p>
                    </div>
                    <div>
                      {setting.type === "toggle" && (
                        <button
                          onClick={() => handleToggle(section.id, setting.key)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            setting.value ? "bg-primary" : "bg-muted-bg"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              setting.value ? "left-7" : "left-1"
                            }`}
                          />
                        </button>
                      )}
                      {setting.type === "text" && (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={(e) =>
                            handleChange(section.id, setting.key, e.target.value)
                          }
                          className="px-3 py-1.5 bg-muted-bg border border-border rounded-lg text-sm w-64"
                        />
                      )}
                      {setting.type === "select" && (
                        <select
                          value={setting.value as string}
                          onChange={(e) =>
                            handleChange(section.id, setting.key, e.target.value)
                          }
                          className="px-3 py-1.5 bg-muted-bg border border-border rounded-lg text-sm"
                        >
                          {setting.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Info */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Sistem Bilgisi</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-muted-bg rounded-lg p-3">
            <p className="text-muted">Versiyon</p>
            <p className="font-medium">1.0.0</p>
          </div>
          <div className="bg-muted-bg rounded-lg p-3">
            <p className="text-muted">Next.js</p>
            <p className="font-medium">15.5.4</p>
          </div>
          <div className="bg-muted-bg rounded-lg p-3">
            <p className="text-muted">Veritabanı</p>
            <p className="font-medium">PostgreSQL</p>
          </div>
          <div className="bg-muted-bg rounded-lg p-3">
            <p className="text-muted">ORM</p>
            <p className="font-medium">Prisma</p>
          </div>
        </div>
      </div>
    </div>
  );
}

