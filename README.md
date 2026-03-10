# 🎓 AACOMYO Mezun Platformu

KTÜ Araklı Ali Cevat Özyurt Meslek Yüksekokulu mezunlarını bir araya getiren, kariyer gelişimini destekleyen ve networking fırsatları sunan modern web platformu.

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=flat-square&logo=prisma)

---

## ✨ Özellikler

### Genel
- **🔍 Gelişmiş Arama:** Real-time arama, şehir, bölüm ve iş alanı filtreleri ile mezun listeleme
- **🗺️ Türkiye Haritası:** İl bazında mezun dağılımı görselleştirmesi (anadolu harita SVG)
- **📊 Canlı İstatistikler:** Platform istatistikleri (mezun, öğrenci, ilan, etkinlik sayıları)
- **🎨 Modern Tasarım:** Kurumsal mavi tonları, responsive layout, mobil öncelikli
- **⚡ Hızlı & Akıcı:** Next.js 16 App Router, Server Components, optimize edilmiş performans

### Kimlik Doğrulama
- **🔐 Credentials Auth:** E-posta/telefon + şifre ile giriş (NextAuth v5)
- **📧 E-posta Doğrulama:** Kayıt sonrası e-posta aktivasyonu (Resend)
- **🔑 Şifre Sıfırlama:** Unutulan şifre için e-posta ile token akışı
- **✅ Üyelik Onay Akışı:** Bölüm başkanı/admin onayı ile üyelik (PENDING → APPROVED/REJECTED)

### Rol ve Yetkilendirme
- **👑 Admin:** Tam yetki, tüm admin panel erişimi
- **🛡️ Moderatör / Bölüm Başkanı:** Moderasyon, rapor inceleme, onay işlemleri
- **👨‍🎓 Mezun (Alumni):** Profil, deneyim, yetenek, iş ilanı paylaşımı
- **🎓 Öğrenci:** Profil, ilan başvurusu, mentorluk talepleri

### Modüller
- **👤 Mezun Profilleri:** Detaylı profil sayfaları (deneyim, eğitim, yetenekler, sosyal linkler)
- **💼 İş İlanları:** İlan oluşturma, başvuru yönetimi, durum takibi
- **📅 Etkinlikler:** Etkinlik oluşturma, katılım kaydı
- **💬 Mesajlaşma:** Kullanıcılar arası özel mesajlaşma
- **🔔 Bildirimler:** Bildirim çanı ile sistem/mesaj/ilan/etkinlik bildirimleri
- **📢 Duyurular:** Sabitlenmiş ve standart duyurular
- **🚩 Raporlama:** Kullanıcı/ilan/etkinlik/mesaj şikâyeti, moderatör incelemesi

### Admin Paneli
- Kullanıcı yönetimi, rol atama
- Üyelik onayları (approvals)
- Duyuru yönetimi
- Etkinlik yönetimi
- İş ilanları moderasyonu
- Rapor inceleme ve detaylı raporlar
- Bölüm/Program (CRUD) yönetimi
- Sistem ayarları
- Denetim izleri (audit logs)

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 20+
- Docker (PostgreSQL için)
- npm

### Ortam Değişkenleri

`.env` dosyası için [@ashetian](https://github.com/ashetian) ile iletişime geçin.

**Zorunlu değişkenler:**
```env
# Veritabanı
DATABASE_URL="postgresql://ktu:ktu@localhost:5432/ktu"
INTERNAL_DATABASE_URL="postgresql://ktu:ktu@db:5432/ktu"

# NextAuth
NEXTAUTH_SECRET="güçlü-gizli-anahtar"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="güçlü-gizli-anahtar"
AUTH_URL="http://localhost:3000/api/auth"

# E-posta (Resend - opsiyonel, doğrulama/şifre sıfırlama için)
RESEND_API_KEY="re_xxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Kurulum

**Docker ile Çalıştırma (Önerilen)**

Frontend + PostgreSQL’i tek komutla ayağa kaldırmak için:

```bash
docker-compose -f docker-compose-dev.yml up -d
```

Ardından tarayıcıda [http://localhost:3000](http://localhost:3000) adresine gidin. Değişiklikleri kaydettikçe sayfa otomatik yenilenecektir.

**Veritabanını Hazırlama (İlk Kurulum):**
```bash
npx prisma db push
npx prisma db seed
```

**Yeniden build almak gerektiğinde:**
```bash
docker-compose -f docker-compose-dev.yml build --no-cache
```

### Lokal Geliştirme (Docker Olmadan)

PostgreSQL’in ayakta olduğundan emin olun; ardından:

```bash
npm install
npm run dev
```

### Diğer Komutlar
```bash
npm run build        # Production build
npm run start        # Production sunucu
npm run lint         # Biome ile kod kontrolü
npm run format       # Biome ile formatlama
npx prisma studio    # Veritabanı GUI
npx prisma migrate dev   # Migration oluştur/uygula
```

---

## 👥 Test Kullanıcıları

`npx prisma db seed` çalıştırıldığında aşağıdaki test verileri oluşturulur. **Tüm hesapların şifresi:** `Test123!`

| Rol | E-posta | Not |
| :--- | :--- | :--- |
| **👑 Admin** | `admin@ktu.edu.tr` | Tam yetkili yönetici |
| **👨‍🎓 Mezunlar** | `mezun1_ahmet.yilmaz@example.com` … `mezun60_...` | 60 adet örnek mezun |
| **🎓 Öğrenciler** | `ogrenci1_ahmet.yilmaz@ktu.edu.tr` … `ogrenci30_...` | 30 adet örnek öğrenci |

Seed ayrıca 6 bölüm (Department) ve ilişkili programları oluşturur (DDE, ISG, LOJ, YZO, BDTA, IKY).

---

## 📂 Proje Yapısı

```
mezunplatformktu/
├── app/
│   ├── (auth)/                 # Kimlik doğrulama route grubu
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (dashboard)/           # Korumalı dashboard
│   │   └── jobs/               # İş ilanları listesi ve detay
│   ├── (pages)/                # Ortak sayfa layout'u
│   │   ├── mezunlar/           # Mezun listesi ve [id] profil
│   │   └── duyurular/
│   ├── (protected)/            # Auth gerekli layout
│   ├── admin/                  # Admin paneli
│   │   ├── approvals/          # Üyelik onayları
│   │   ├── announcements/      # Duyuru yönetimi
│   │   ├── departments/        # Bölüm/Program CRUD
│   │   ├── events/             # Etkinlik yönetimi
│   │   ├── jobs/               # İlan moderasyonu
│   │   ├── moderation/         # Moderasyon
│   │   ├── reports/            # Rapor listesi
│   │   ├── detailed-reports/  # Detaylı raporlar
│   │   ├── roles/              # Rol yönetimi
│   │   ├── settings/           # Sistem ayarları
│   │   └── users/              # Kullanıcı yönetimi
│   ├── api/                    # API routes
│   │   ├── admin/              # Admin endpoint'leri
│   │   ├── alumni/             # Mezun CRUD
│   │   ├── auth/               # E-posta doğrulama, şifre sıfırlama
│   │   ├── events/             # Etkinlik CRUD
│   │   ├── jobs/               # İlan CRUD, başvuru
│   │   ├── messages/           # Mesajlaşma
│   │   ├── notifications/      # Bildirimler
│   │   ├── profile/            # Deneyim, eğitim, yetenek
│   │   ├── reports/            # Şikâyet oluşturma
│   │   ├── register/           # Kayıt
│   │   ├── stats/              # İstatistikler
│   │   ├── turkey-map/         # Harita SVG
│   │   ├── upload/             # Dosya yükleme
│   │   ├── user/               # Profil güncelleme, mezuniyet
│   │   └── users/              # Kullanıcı arama
│   ├── applications/          # Başvurularım
│   ├── events/                 # Etkinlik listesi, detay, yeni
│   ├── messages/               # Mesajlaşma sayfaları
│   ├── profile/                # Profil sayfası
│   ├── components/             # UI bileşenleri
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── AlumniCard.tsx
│   │   ├── JobCard.tsx
│   │   ├── NotificationBell.tsx
│   │   ├── HomeStats.tsx
│   │   ├── HomeAlumniMap.tsx
│   │   ├── TurkeyMap.tsx
│   │   ├── ReportModal.tsx
│   │   └── ui/                 # Button vb.
│   ├── lib/constants.ts        # Şehir, bölüm, iş alanı listeleri
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Ana sayfa
├── lib/
│   ├── authOptions.ts
│   ├── db.ts                   # Prisma client
│   ├── email.ts                # Resend e-posta gönderimi
│   ├── notifications.ts
│   ├── permissions.ts
│   ├── tokens.ts               # Doğrulama/şifre sıfırlama token'ları
│   └── schemas/                # Zod validasyon (login, register)
├── prisma/
│   ├── schema.prisma           # Veritabanı modeli
│   ├── seed.ts
│   └── migrations/
├── auth.ts                     # NextAuth config
├── auth.config.ts
├── middleware.ts               # Route koruma
└── next.Dockerfile
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti
**Açık Tema**
```css
Primary:    #2563eb  /* Mavi */
Accent:    #0ea5e9  /* Sky Blue */
Background: #f8fafc
Foreground: #1e293b
```

### Responsive Stratejisi
- **Mobile:** `< 640px` → Tek kolon, hamburger menü
- **Tablet:** `640–1024px` → İki kolon, yatay menü
- **Desktop:** `> 1024px` → Üç kolon, tam genişlik layout

**Grid Düzenleri:**
```tsx
grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* Ana sayfa / mezun kartları */
grid-cols-1 lg:grid-cols-3                  /* Profil sayfası */
```

---

## 🛠️ Teknoloji Stack

| Katman | Teknoloji |
|--------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **Backend** | Next.js API Routes, Prisma ORM, PostgreSQL |
| **Auth** | NextAuth v5 (Credentials, JWT) |
| **E-posta** | Resend |
| **Araçlar** | Biome (lint/format), Docker |

---

## 📱 Sayfalar ve Rotalar

### Herkese Açık
| Rota | Açıklama |
|------|----------|
| `/` | Ana sayfa (duyurular, harita, istatistikler) |
| `/login` | Giriş |
| `/register` | Kayıt |
| `/forgot-password` | Şifre sıfırlama talebi |
| `/reset-password` | Token ile şifre güncelleme |
| `/verify-email` | E-posta doğrulama |
| `/duyurular` | Duyuru listesi |

### Giriş Gerektiren
| Rota | Açıklama |
|------|----------|
| `/mezunlar` | Mezun listesi (arama/filtre) |
| `/mezunlar/[id]` | Mezun profil detayı |
| `/profile` | Profil sayfası |
| `/jobs` | İş ilanları |
| `/jobs/[id]` | İlan detayı ve başvuru |
| `/events` | Etkinlik listesi |
| `/events/[id]` | Etkinlik detayı |
| `/events/new` | Yeni etkinlik oluşturma |
| `/messages` | Mesaj listesi |
| `/messages/[partnerId]` | Sohbet |
| `/applications` | Başvurularım |

### Admin (ADMIN / MODERATOR / HEAD_OF_DEPARTMENT)
| Rota | Açıklama |
|------|----------|
| `/admin` | Genel bakış |
| `/admin/approvals` | Üyelik onayları |
| `/admin/users` | Kullanıcı yönetimi |
| `/admin/announcements` | Duyuru yönetimi |
| `/admin/events` | Etkinlik yönetimi |
| `/admin/jobs` | İlan moderasyonu |
| `/admin/reports` | Rapor listesi |
| `/admin/detailed-reports` | Detaylı raporlar |
| `/admin/departments` | Bölüm/Program CRUD |
| `/admin/roles` | Rol yönetimi |
| `/admin/settings` | Sistem ayarları |
| `/admin/moderation` | Moderasyon |

---

## 🌐 API Özeti

| Endpoint | Metot | Açıklama |
|----------|-------|----------|
| `/api/alumni` | GET, POST | Mezun listesi, filtreleme |
| `/api/alumni/[id]` | GET | Mezun detayı |
| `/api/jobs` | GET, POST | İlan listesi, oluşturma |
| `/api/jobs/[id]` | GET, PATCH, DELETE | İlan detayı, güncelleme |
| `/api/jobs/[id]/apply` | POST | Başvuru gönderme |
| `/api/events` | GET, POST | Etkinlik listesi, oluşturma |
| `/api/events/[id]` | GET, PATCH, DELETE | Etkinlik detayı |
| `/api/events/[id]/participate` | POST | Etkinlik katılımı |
| `/api/messages` | GET, POST | Mesaj listesi, gönderim |
| `/api/messages/[partnerId]` | GET | Sohbet mesajları |
| `/api/notifications` | GET, PATCH | Bildirim listesi, okundu işareti |
| `/api/profile/experience` | POST, DELETE | Deneyim ekleme/silme |
| `/api/profile/education` | POST, DELETE | Eğitim ekleme/silme |
| `/api/profile/skills` | POST, DELETE | Yetenek ekleme/silme |
| `/api/register` | POST | Kullanıcı kaydı |
| `/api/stats` | GET | Platform istatistikleri |
| `/api/turkey-map` | GET | Harita SVG verisi |
| `/api/upload` | POST | Dosya yükleme |
| `/api/user/update` | PATCH | Profil güncelleme |
| `/api/user/graduate` | POST | Mezuniyet bilgisi |
| `/api/reports` | POST | Şikâyet oluşturma |
| `/api/auth/forgot-password` | POST | Şifre sıfırlama talebi |
| `/api/auth/reset-password` | POST | Token ile şifre güncelleme |
| `/api/auth/verify-email` | POST | E-posta doğrulama |

Admin endpoint'leri (`/api/admin/*`) yetkiye göre erişilebilir.

---

## 🎯 UX ve Erişilebilirlik

### Arama
- Görünür arama çubuğu, açıklayıcı placeholder
- Aktif filtre sayısı göstergesi
- "Filtreleri Temizle" butonu

### Navigasyon
- Sticky navbar
- Breadcrumb (profil → mezunlar)
- Hover ve görsel geri bildirim

### Erişilebilirlik
- ARIA etiketleri
- Anlamlı HTML (`<nav>`, `<main>`, `<footer>`)
- Klavye navigasyonu
- WCAG AA kontrast hedefleri

---

## 🔧 Özelleştirme

### Filtre Seçenekleri
**Konum:** `app/lib/constants.ts`
```ts
export const cities = ["Adana", "Ankara", ...];
export const flatDepartments = [...];
export const jobFields = [...];
```

### Renk Paleti
**Konum:** `app/globals.css`
```css
:root {
  --primary: #YOUR_COLOR;
  --accent: #YOUR_ACCENT;
}
```

---

## 🐛 Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Filtreleme çalışmıyor | `onFilterChange` prop'unun doğru iletildiğini kontrol edin |
| Mobil menü açılmıyor | `Navbar.tsx` başında `"use client"` olduğundan emin olun |
| Docker hatası | `.env` ve `INTERNAL_DATABASE_URL` tanımlı mı? Portlar boş mu? |
| Prisma client bulunamıyor | `npx prisma generate` çalıştırın |
| E-posta gelmiyor | `RESEND_API_KEY` ayarlı mı? `lib/email.ts` loglarına bakın |
| 401 Unauthorized | Giriş yapılmış mı? `NEXTAUTH_SECRET` doğru mu? |

---

## 📝 Roadmap

### ✅ Tamamlanan
- Modern UI/UX tasarımı
- Responsive, mobil öncelikli tasarım
- Arama ve filtreleme
- Mezun profil sayfaları
- PostgreSQL + Prisma entegrasyonu
- NextAuth kimlik doğrulama
- E-posta doğrulama ve şifre sıfırlama
- Üyelik onay akışı
- İş ilanları ve başvuru sistemi
- Etkinlikler ve katılım
- Mesajlaşma
- Bildirimler
- Duyurular
- Raporlama ve moderasyon
- Admin paneli
- Türkiye haritası ve istatistikler
- Profil fotoğrafı ve kapak görseli yükleme
