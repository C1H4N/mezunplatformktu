"use client";

import { useState } from "react";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  city: string;
  department: string;
  jobField: string;
}

// Örnek veri - Gerçek uygulamada API'den gelecek
const cities = [
  "Tümü",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Trabzon",
  "Bursa",
  "Antalya",
  "Adana",
  "Gaziantep",
  "Konya",
  "Kayseri",
];

const departments = [
  "Tümü",
  "Bilgisayar Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Makine Mühendisliği",
  "İnşaat Mühendisliği",
  "Endüstri Mühendisliği",
  "İşletme",
  "İktisat",
  "Hukuk",
  "Tıp",
  "Mimarlık",
];

const jobFields = [
  "Tümü",
  "Yazılım Geliştirme",
  "Veri Bilimi",
  "Proje Yönetimi",
  "Finansal Analiz",
  "İnsan Kaynakları",
  "Pazarlama",
  "Satış",
  "Eğitim",
  "Sağlık",
  "Hukuk",
  "Mühendislik",
  "Danışmanlık",
];

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "Tümü",
    department: "Tümü",
    jobField: "Tümü",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterUpdate = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      search: "",
      city: "Tümü",
      department: "Tümü",
      jobField: "Tümü",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = [
    filters.city !== "Tümü",
    filters.department !== "Tümü",
    filters.jobField !== "Tümü",
  ].filter(Boolean).length;

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
      {/* Arama Çubuğu */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-muted"
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
        <input
          type="text"
          placeholder="İsim, şirket veya pozisyon ara..."
          value={filters.search}
          onChange={(e) => handleFilterUpdate("search", e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Filtre Başlık & Toggle (Mobile) */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-foreground font-medium lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtreler
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
          <svg
            className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>

      {/* Filtre Seçenekleri */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${showFilters ? "block" : "hidden lg:grid"}`}>
        {/* Şehir */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
            Şehir
          </label>
          <select
            id="city"
            value={filters.city}
            onChange={(e) => handleFilterUpdate("city", e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Bölüm */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-foreground mb-2">
            Bölüm
          </label>
          <select
            id="department"
            value={filters.department}
            onChange={(e) => handleFilterUpdate("department", e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* İş Alanı */}
        <div>
          <label htmlFor="jobField" className="block text-sm font-medium text-foreground mb-2">
            İş Alanı
          </label>
          <select
            id="jobField"
            value={filters.jobField}
            onChange={(e) => handleFilterUpdate("jobField", e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {jobFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

