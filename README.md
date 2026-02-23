# 🎓 AACOMYO Mezun Platformu

KTÜ Araklı Ali Cevat Özyurt Meslek Yüksekokulu mezunlarını bir araya getiren, kariyer gelişimini destekleyen ve networking fırsatları sunan modern web platformu.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=flat-square&logo=prisma)

---

## ✨ Özellikler

- **🔍 Gelişmiş Arama:** Real-time arama ve çoklu filtre seçenekleri (şehir, bölüm, iş alanı)
- **👤 Detaylı Profiller:** Deneyim, yetenekler, sosyal medya linkleri ile kapsamlı mezun profilleri
- **🎨 Modern Tasarım:** Kurumsal mavi tonları, açık/koyu tema desteği, mobil öncelikli responsive tasarım
- **⚡ Hızlı & Akıcı:** Next.js 15 App Router, smooth animasyonlar, optimized performans

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 20+
- Docker
- npm

### Kurulum

.env dosyası için [@ashetian](https://github.com/ashetian) ile iletişime geçin.

**Docker ile Çalıştırma (Önerilen)**
Tüm projeyi (Frontend + Veritabanı) tek komutla ayağa kaldırmak için:

```bash
docker-compose -f docker-compose-dev.yml up -d
```
Ardından tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidebilirsiniz. Kodunuzu her kaydettiğinizde sayfa otomatik olarak yenilenecektir.

**Veritabanını Hazırlama (İlk Kurulumda):**
```bash
npx prisma db push
npx prisma db seed
```

**Yeniden build almak gerekirse:**
```bash
docker-compose -f docker-compose-dev.yml build --no-cache
```

### Lokal Geliştirme (Docker Hariç Sadece Frontend)
Uygulamayı Docker dışında, yerel olarak çalıştırmak isterseniz:
```bash
npm install          # Bağımlılıkları yükle
npm run dev          # Geliştirme sunucusu
```

### Diğer Komutlar
```bash
npm run build        # Production build
npm run lint         # Kod kontrolü
npm run format       # Kod formatlama
npx prisma studio    # Veritabanı GUI
```

---

## 👥 Test Kullanıcıları

Uygulamayı lokal ortamda test edebilmeniz için aşağıdaki hesaplar `npx prisma db seed` komutu çalıştırıldığında otomatik olarak oluşturulur. **Tüm hesapların şifresi:** `Test123!`

| Rol | E-posta | İsim |
| :--- | :--- | :--- |
| **👑 Admin** | `admin@ktu.edu.tr` | Admin AACOMYO |
| **🛡️ Moderatör** | `moderator@ktu.edu.tr` | Moderatör AACOMYO |
| **🏢 İşveren 1** | `hr@techcorp.com` | Ayşe Yılmaz (Tech Corp) |
| **🏢 İşveren 2** | `kariyer@finansbank.com` | Mehmet Kaya (Finans Bank) |
| **🎓 Öğrenci 1** | `ogrenci1@ktu.edu.tr` | Ali Demir |
| **🎓 Öğrenci 2** | `ogrenci2@ktu.edu.tr` | Zeynep Şahin |
| **👨‍🎓 Mezun 1** | `ahmet.yilmaz@gmail.com` | Ahmet Yılmaz (Google) |
| **👨‍🎓 Mezun 2** | `elif.ozturk@outlook.com` | Elif Öztürk (Microsoft) |
| **👨‍🎓 Mezun 3** | `can.arslan@yahoo.com` | Can Arslan (Ford Otosan) |
| **👨‍🎓 Mezun 4** | `selin.kaya@gmail.com` | Selin Kaya (Garanti BBVA) |

*Not: İlanlar, etkinlikler ve bildirimler de mock veri olarak bu hesaplara entegre şekilde yüklenmektedir.*

---

## 📂 Proje Yapısı

```
app/
├── components/              # UI bileşenleri
│   ├── Navbar.tsx          # Navigasyon (sticky, hamburger menü)
│   ├── Footer.tsx          # Alt bilgi
│   ├── SearchFilters.tsx   # Arama ve filtreleme
│   └── AlumniCard.tsx      # Mezun kartı
├── mezunlar/[id]/          # Dinamik profil sayfaları
├── api/                    # API routes
├── globals.css             # Tema ve global stiller
├── layout.tsx              # Root layout (Navbar + Footer)
└── page.tsx                # Ana sayfa

lib/
├── authOptions.ts          # NextAuth config
├── db.ts                   # Prisma client
└── schemas/                # Zod validation

prisma/
└── schema.prisma           # Database modeli
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti

**Açık Tema**
```css
Primary:    #2563eb  /* Mavi */
Accent:     #0ea5e9  /* Sky Blue */
Background: #f8fafc  /* Açık gri */
Foreground: #1e293b  /* Koyu gri */
```

**Koyu Tema:** Sistem tercihi ile otomatik aktif

### Responsive Stratejisi

**Breakpoint'ler:**
- Mobile: `< 640px` → Tek kolon, hamburger menü, filtreler gizli
- Tablet: `640-1024px` → İki kolon, yatay menü, filtreler açık
- Desktop: `> 1024px` → Üç kolon, tam genişlik layout

**Grid Düzenleri:**
```tsx
// Ana sayfa mezun kartları
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Profil sayfası
grid-cols-1 lg:grid-cols-3  // Sol: 2 birim, Sağ: 1 birim
```

### Bileşen Davranışları

**Navbar**
- Mobile: Logo sadeleşir, hamburger menü, profil ikonu gizli
- Desktop: Tam logo, yatay menü, profil ikonu görünür
- Sticky pozisyon (her zaman üstte)

**SearchFilters**
- Mobile: Toggle butonu ile açılır/kapanır, aktif filtre badge'i
- Desktop: Her zaman açık, 3 kolonlu grid

**AlumniCard**
- Profil fotoğrafı yoksa baş harfler gösterilir
- LinkedIn badge ve profil bağlantısı
- Hover efektleri: border rengi, shadow artışı

**Footer**
- Mobile: 1 kolon, dikey hizalama
- Desktop: 4 kolon, yatay düzen

---

## 🛠️ Teknoloji Stack

**Frontend:** Next.js 15.5 (App Router), React 19, TypeScript, Tailwind CSS 4  
**Backend:** Next.js API Routes, Prisma ORM, PostgreSQL  
**Auth:** NextAuth  
**Tools:** Biome (lint/format), Docker

---

## 📱 Sayfa ve Bileşenler

### Ana Sayfa (`/`)
**Özellikler:**
- Hero section (gradient arka plan, istatistikler)
- Arama çubuğu (real-time, isim/şirket/pozisyon)
- Filtreler (şehir, bölüm, iş alanı)
- Grid düzeninde mezun kartları
- "Sonuç bulunamadı" boş durumu

**Kullanım:**
1. Arama çubuğuna yazın veya filtre seçin
2. Kartlar anında güncellenir
3. "Profili Görüntüle" ile detay sayfasına gidin

### Mezun Profili (`/mezunlar/[id]`)
**Bölümler:**
- Header: Gradient arka plan, profil fotoğrafı, sosyal medya
- Sol kolon: Hakkında, deneyim geçmişi
- Sağ kolon: İletişim, yetenekler, diller, eğitim
- "Mezunlara Dön" breadcrumb

**URL Formatı:** `/mezunlar/1`, `/mezunlar/2`, ...

---

## 🎯 UX Prensipleri

### Sezgisel Arama
- Görünür arama çubuğu, açıklayıcı placeholder
- Aktif filtre sayısı göstergesi
- "Filtreleri Temizle" hızlı eylem

### Hızlı Navigasyon
- Sticky navbar (her zaman erişilebilir)
- Breadcrumb (profil → mezunlar)
- Hover efektleri ve görsel feedback

### Görsel Hiyerarşi
- Başlıklar belirgin (`text-3xl sm:text-4xl lg:text-5xl`)
- İkincil bilgiler muted renklerde
- Yeterli boşluk (`gap-6`, `py-8`)

### Erişilebilirlik
- ARIA labels (`aria-label="Profil"`)
- Semantic HTML (`<nav>`, `<main>`, `<footer>`)
- Klavye navigasyonu desteği
- WCAG AA kontrast oranları

---

## 🔧 Özelleştirme

### Mock Data Düzenleme
**Konum:** `app/page.tsx`
```tsx
const mockAlumni = [
  {
    id: "9",
    name: "Yeni Mezun",
    department: "Bilgisayar Mühendisliği",
    city: "Trabzon",
    jobTitle: "Yazılım Geliştirici",
    company: "Tech Şirket",
    graduationYear: 2023,
    linkedinUrl: "https://linkedin.com/in/...",
  },
  // ...
];
```

### Filtre Seçenekleri Ekleme
**Konum:** `app/components/SearchFilters.tsx`
```tsx
const cities = ["Tümü", "İstanbul", "Ankara", "Yeni Şehir"];
const departments = ["Tümü", "Bilgisayar Mühendisliği", "Yeni Bölüm"];
```

### Renk Değiştirme
**Konum:** `app/globals.css`
```css
:root {
  --primary: #YOUR_COLOR;
  --accent: #YOUR_ACCENT;
}
```

---

## 💡 Geliştirme İpuçları

### Client vs Server Components
```tsx
// Client (state, event handlers)
"use client";
import { useState } from "react";

// Server (default, SEO friendly)
export default function Page() { ... }
```

### TypeScript Türleri
```tsx
interface AlumniCardProps {
  id: string;
  name: string;
  department: string;
  // ...
}

interface FilterState {
  search: string;
  city: string;
  department: string;
  jobField: string;
}
```

### Responsive Pattern
```tsx
className="
  text-sm md:text-base lg:text-lg    // Font boyutu
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // Grid
  hidden md:flex    // Visibility
"
```

---

## 🌐 API Entegrasyonu (Planlı)

### Mezun Listesi
```tsx
async function getAlumni(filters: FilterState) {
  const res = await fetch('/api/alumni', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
  return res.json();
}
```

### Profil Detayı
```tsx
async function getProfile(id: string) {
  const res = await fetch(`/api/alumni/${id}`);
  return res.json();
}
```

---

## 🐛 Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Filtreleme çalışmıyor | `onFilterChange` prop'u doğru iletilmiş mi kontrol edin |
| Mobil menü açılmıyor | `Navbar.tsx` başında `"use client"` var mı? |
| Renkler yanlış | `globals.css` import edilmiş mi? (`layout.tsx`) |
| Docker hatası | `.env` dosyası var mı? Portlar dolu mu? |

---

## 📝 Roadmap

### ✅ Tamamlanan
- Modern UI/UX tasarımı
- Responsive tasarım (mobile-first)
- Arama ve filtreleme sistemi
- Mezun profil sayfaları

### 🚧 Devam Eden
- Gerçek veritabanı entegrasyonu
- API endpoint'leri
- Authentication akışı

### 📋 Planlanan
- Profil fotoğrafı upload
- Etkinlik takvimi
- Kariyer fırsatları
- Admin paneli
- Email bildirimleri

---

**Not:** Şu an mock data kullanılıyor. API entegrasyonu için altyapı hazır.