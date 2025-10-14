"use client";

import { useState } from "react";
import SearchFilters, { type FilterState } from "./components/SearchFilters";
import AlumniCard from "./components/AlumniCard";

// Örnek mezun verileri - Gerçek uygulamada API'den gelecek
const mockAlumni = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    department: "Bilgisayar Mühendisliği",
    city: "İstanbul",
    jobTitle: "Kıdemli Yazılım Geliştirici",
    company: "Tech Corp",
    graduationYear: 2018,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    department: "Elektrik-Elektronik Mühendisliği",
    city: "Ankara",
    jobTitle: "Proje Yöneticisi",
    company: "Enerji A.Ş.",
    graduationYear: 2016,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "3",
    name: "Mehmet Demir",
    department: "İşletme",
    city: "İzmir",
    jobTitle: "Finansal Analist",
    company: "Finans Bank",
    graduationYear: 2019,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    department: "Bilgisayar Mühendisliği",
    city: "Trabzon",
    jobTitle: "Veri Bilimci",
    company: "Data Analytics Ltd.",
    graduationYear: 2020,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "5",
    name: "Can Öztürk",
    department: "Makine Mühendisliği",
    city: "Bursa",
    jobTitle: "Üretim Mühendisi",
    company: "Otomotiv A.Ş.",
    graduationYear: 2017,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "6",
    name: "Elif Çelik",
    department: "Mimarlık",
    city: "Antalya",
    jobTitle: "Mimar",
    company: "Tasarım Atölyesi",
    graduationYear: 2015,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "7",
    name: "Burak Arslan",
    department: "Hukuk",
    city: "İstanbul",
    jobTitle: "Avukat",
    company: "Hukuk Bürosu",
    graduationYear: 2014,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
  {
    id: "8",
    name: "Selin Yıldız",
    department: "İktisat",
    city: "Ankara",
    jobTitle: "Ekonomist",
    company: "Merkez Bankası",
    graduationYear: 2019,
    linkedinUrl: "https://linkedin.com",
    profileImage: "",
  },
];

export default function Home() {
  const [filteredAlumni, setFilteredAlumni] = useState(mockAlumni);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = mockAlumni;

    // Arama filtresi
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchLower) ||
          alumni.company?.toLowerCase().includes(searchLower) ||
          alumni.jobTitle?.toLowerCase().includes(searchLower)
      );
    }

    // Şehir filtresi
    if (filters.city !== "Tümü") {
      filtered = filtered.filter((alumni) => alumni.city === filters.city);
    }

    // Bölüm filtresi
    if (filters.department !== "Tümü") {
      filtered = filtered.filter((alumni) => alumni.department === filters.department);
    }

    // İş alanı filtresi (jobTitle içinde arama)
    if (filters.jobField !== "Tümü") {
      filtered = filtered.filter((alumni) =>
        alumni.jobTitle?.toLowerCase().includes(filters.jobField.toLowerCase())
      );
    }

    setFilteredAlumni(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-hover to-accent text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              KTÜ Mezun Platformu
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Binlerce mezunumuzla bağlantı kurun, kariyer fırsatlarını keşfedin ve güçlü bir
              network oluşturun.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-blue-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-semibold">{mockAlumni.length}+ Mezun</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-semibold">Kariyer Fırsatları</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ana İçerik */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Arama ve Filtreler */}
        <div className="mb-8">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Sonuç Sayısı */}
        <div className="mb-6">
          <p className="text-muted">
            <span className="font-semibold text-foreground">{filteredAlumni.length}</span> mezun
            bulundu
          </p>
        </div>

        {/* Mezun Kartları */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} {...alumni} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted-bg rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Sonuç bulunamadı</h3>
            <p className="text-muted">
              Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
