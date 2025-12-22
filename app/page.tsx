"use client";

import { useState, useEffect } from "react";
import SearchFilters, { type FilterState } from "./components/SearchFilters";
import AlumniCard from "./components/AlumniCard";
import TurkeyMap from "./components/TurkeyMap";

// Interface for Alumni data from API
interface Alumni {
  id: string;
  name: string;
  department: string;
  city: string;
  jobTitle?: string;
  company?: string;
  graduationYear?: number;
  linkedinUrl?: string;
  profileImage?: string;
}

export default function Home() {
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [stats, setStats] = useState({ totalAlumni: 0, totalCities: 0 });
  const [loading, setLoading] = useState(true);
  
  const [selectedMapCity, setSelectedMapCity] = useState<string>("Seçin");
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    search: "",
    city: "Seçin",
    department: "Seçin",
    jobField: "Seçin",
  });

  // Fetch Stats
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats", err));
  }, []);

  // Fetch Alumni based on filters
  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentFilters.search) params.append("search", currentFilters.search);
      
      const effectiveCity = selectedMapCity !== "Seçin" ? selectedMapCity : currentFilters.city;
      if (effectiveCity !== "Seçin" && effectiveCity !== "Tümü") params.append("city", effectiveCity);
      
      if (currentFilters.department !== "Seçin" && currentFilters.department !== "Tümü") {
        params.append("department", currentFilters.department);
      }
      
      if (currentFilters.jobField !== "Seçin" && currentFilters.jobField !== "Tümü") {
        params.append("jobField", currentFilters.jobField);
      }

      try {
        const res = await fetch(`/api/alumni?${params.toString()}`);
        const data = await res.json();
        setFilteredAlumni(data);
      } catch (error) {
        console.error("Failed to fetch alumni", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [currentFilters, selectedMapCity]);

  const handleFilterChange = (
    filters: FilterState,
    mapCityOverride?: string
  ) => {
    setCurrentFilters(filters);
    // The useEffect will trigger fetch
  };

  const handleMapCitySelect = (city: string) => {
    setSelectedMapCity(city);
    const updated = { ...currentFilters, city } as FilterState;
    handleFilterChange(updated, city);
  };

  const alumniCounts = filteredAlumni.reduce((acc, alumni) => {
    acc[alumni.city] = (acc[alumni.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted-bg/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary/5 border-b border-border/50">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Mezun Platformuna Hoş Geldiniz
          </h1>
          <p className="text-lg text-muted max-w-2xl animate-fade-in opacity-0 animation-delay-100">
            KTÜ mezunları ile bağlantı kurun, kariyer fırsatlarını keşfedin ve
            networkünüzü genişletin.
          </p>
          <div className="mt-8 flex gap-4 animate-fade-in opacity-0 animation-delay-200">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 flex-1 max-w-xs">
              <p className="text-sm text-muted">Toplam Mezun</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalAlumni}+
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 flex-1 max-w-xs">
              <p className="text-sm text-muted">Şehir</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalCities}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Filtreler */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6 animate-fade-in-up animation-delay-300">
            <SearchFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8 animate-fade-in-up animation-delay-400">
            {/* Harita */}
            <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-sm">
              <TurkeyMap
                selectedCity={selectedMapCity}
                onCitySelect={handleMapCitySelect}
                alumniCounts={alumniCounts}
              />
            </div>

            {/* Sonuçlar */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Mezun Listesi
                </h2>
                <span className="text-sm text-muted bg-muted-bg/50 px-3 py-1 rounded-full border border-border/50">
                  {filteredAlumni.length} mezun bulundu
                </span>
              </div>

              {filteredAlumni.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAlumni.map((alumni) => (
                    <AlumniCard key={alumni.id} {...alumni} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card/30 backdrop-blur-md border border-border/50 rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted-bg/50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted"
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Sonuç bulunamadı
                  </h3>
                  <p className="text-muted text-sm">
                    Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
