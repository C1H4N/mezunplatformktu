"use client";

import { useState } from "react";
import SearchFilters, { type FilterState } from "./components/SearchFilters";
import AlumniCard from "./components/AlumniCard";
import TurkeyMap from "./components/TurkeyMap";

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
  const [selectedMapCity, setSelectedMapCity] = useState<string>("Tümü");
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    search: "",
    city: "Tümü",
    department: "Tümü",
    jobField: "Tümü",
  });

  const handleFilterChange = (
    filters: FilterState,
    mapCityOverride?: string
  ) => {
    setCurrentFilters(filters);
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

    // Şehir filtresi (dropdown + harita birleşik)
    const effectiveMapCity = mapCityOverride ?? selectedMapCity;
    const cityFilter =
      filters.city !== "Tümü" ? filters.city : effectiveMapCity;
    if (cityFilter !== "Tümü") {
      filtered = filtered.filter((alumni) => alumni.city === cityFilter);
    }

    // Bölüm filtresi
    if (filters.department !== "Tümü") {
      filtered = filtered.filter(
        (alumni) => alumni.department === filters.department
      );
    }

    // İş alanı filtresi (jobTitle içinde arama)
    if (filters.jobField !== "Tümü") {
      filtered = filtered.filter((alumni) =>
        alumni.jobTitle?.toLowerCase().includes(filters.jobField.toLowerCase())
      );
    }

    setFilteredAlumni(filtered);
  };

  const handleMapCitySelect = (city: string) => {
    setSelectedMapCity(city);
    const updated = { ...currentFilters, city } as FilterState;
    handleFilterChange(updated, city);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ana İçerik */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Türkiye Haritası ve Filtreler - Masaüstünde yan yana */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
          <div className="lg:col-span-7">
            <TurkeyMap
              selectedCity={selectedMapCity}
              onCitySelect={handleMapCitySelect}
            />
          </div>
          <div className="lg:col-span-5">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Sonuç Sayısı */}
        <div className="mb-6">
          <p className="text-muted">
            <span className="font-semibold text-foreground">
              {filteredAlumni.length}
            </span>{" "}
            mezun bulundu
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
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-muted">
              Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
