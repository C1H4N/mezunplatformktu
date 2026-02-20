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
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Hero Section - Multi-color Modern Corporate Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#125b96] via-[#0d4675] to-[#0f172a] pb-20 pt-28 shadow-2xl">
        {/* Subtle layer effects for modern mesh feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#ffffff] blur-[140px] opacity-20"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#0ea5e9] blur-[150px] opacity-20"></div>
          <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#3b82f6] blur-[120px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-[#ffffff] text-xs sm:text-sm font-bold tracking-widest mb-8 border border-white/20 backdrop-blur-md animate-fade-in shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            KTÜ MEZUN AĞI
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#ffffff] mb-6 leading-tight tracking-tight animate-fade-in-up drop-shadow-lg">
            Geleceği Birlikte <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#e2e8f0]">İnşa Edelim</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#f1f5f9] max-w-3xl mb-12 font-light animate-fade-in opacity-0 animation-delay-100 drop-shadow-md">
            Türkiye'nin dört bir yanındaki Karadeniz Teknik Üniversitesi mezunları ile bağlantı kurun, kariyer fırsatlarını yakalayın.
          </p>

        </div>
      </div>

      {/* Ana İçerik */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20 -mt-12">
        <div className="flex flex-col gap-8 items-stretch">

          {/* Üst Kısım - Yatay Filtreler */}
          <div className="animate-fade-in-up animation-delay-300 w-full z-10">
            <div className="bg-[#ffffff] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/60 p-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#125b96] to-[#0ea5e9]"></div>
              <SearchFilters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Harita ve Sonuçlar Alanı */}
          <div className="space-y-8 animate-fade-in-up animation-delay-400 w-full">

            {/* Harita */}
            <div className="bg-[#ffffff] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-border/60">
              <div className="px-8 pt-8 pb-2">
                <h3 className="text-2xl font-extrabold text-foreground">Mezun Dağılım Haritası</h3>
                <p className="text-sm font-medium text-muted mt-1">İllere göre mezun yoğunluğunu inceleyin, şehrinizi seçerek filtreleyin.</p>
              </div>
              <div className="p-4">
                <TurkeyMap
                  selectedCity={selectedMapCity}
                  onCitySelect={handleMapCitySelect}
                  alumniCounts={alumniCounts}
                />
              </div>
            </div>

            {/* Sonuçlar */}
            <div className="bg-[#ffffff] rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-border/60 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-border/60">
                <h2 className="text-2xl font-extrabold text-foreground">
                  Mezun Listesi
                </h2>
                <span className="mt-4 sm:mt-0 text-sm font-bold text-primary bg-primary-light/50 px-5 py-2 rounded-full border border-primary/20">
                  {filteredAlumni.length} mezun listeleniyor
                </span>
              </div>

              {filteredAlumni.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAlumni.map((alumni) => (
                    <AlumniCard key={alumni.id} {...alumni} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted-bg/50 rounded-full flex items-center justify-center shadow-inner">
                    <svg
                      className="w-12 h-12 text-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Sonuç bulunamadı
                  </h3>
                  <p className="text-muted text-base max-w-sm mx-auto">
                    Arama kriterlerinizi değiştirerek veya haritadan farklı bir şehir seçerek tekrar deneyebilirsiniz.
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
