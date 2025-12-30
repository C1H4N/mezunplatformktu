"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  Linkedin,
  Filter,
  Users,
  ChevronDown,
} from "lucide-react";

interface Alumni {
  id: string;
  name: string;
  department: string;
  city: string;
  jobTitle: string;
  company: string;
  graduationYear?: number;
  linkedinUrl?: string;
  profileImage?: string;
}

const departments = [
  "Tümü",
  "Bilgisayar Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Makine Mühendisliği",
  "İnşaat Mühendisliği",
  "Mimarlık",
  "Tıp Fakültesi",
  "Hukuk Fakültesi",
  "İktisat",
  "İşletme",
];

const cities = [
  "Tümü",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Trabzon",
  "Bursa",
  "Antalya",
  "Kocaeli",
  "Adana",
  "Konya",
];

const graduationYears = [
  "Tümü",
  ...Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i)),
];

export default function MezunlarPage() {
  const { data: session } = useSession();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Tümü");
  const [cityFilter, setCityFilter] = useState("Tümü");
  const [yearFilter, setYearFilter] = useState("Tümü");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (departmentFilter !== "Tümü") params.append("department", departmentFilter);
        if (cityFilter !== "Tümü") params.append("city", cityFilter);
        if (yearFilter !== "Tümü") params.append("year", yearFilter);

        const res = await fetch(`/api/alumni?${params.toString()}`);
        const data = await res.json();
        setAlumni(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch alumni:", error);
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchAlumni, 300);
    return () => clearTimeout(timeoutId);
  }, [search, departmentFilter, cityFilter, yearFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mezun Ağı
            </h1>
            <p className="text-lg text-muted">
              KTÜ mezunlarıyla bağlantı kur, mentorluk al, kariyer fırsatlarını keşfet.
              Binlerce başarılı mezunumuzla tanış.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{alumni.length}</span> Mezun
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-card border border-border rounded-xl p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="İsim, şirket veya pozisyon ara..."
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-muted-bg rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filtreler
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none min-w-[180px]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none min-w-[140px]"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none min-w-[120px]"
              >
                {graduationYears.map((year) => (
                  <option key={year} value={year}>{year === "Tümü" ? "Yıl" : year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              >
                {graduationYears.map((year) => (
                  <option key={year} value={year}>{year === "Tümü" ? "Mezuniyet Yılı" : year}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Alumni Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-72 bg-card border border-border rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : alumni.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-muted mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mezun Bulunamadı</h3>
            <p className="text-muted">
              Arama kriterlerinize uygun mezun bulunamadı. Filtreleri değiştirerek tekrar deneyin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alumni.map((person) => (
              <Link
                key={person.id}
                href={`/mezunlar/${person.id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
              >
                {/* Profile Header */}
                <div className="relative h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    {person.profileImage ? (
                      <Image
                        src={person.profileImage}
                        alt={person.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full border-4 border-card object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-card bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {person.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Content */}
                <div className="pt-12 pb-5 px-5 text-center">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {person.name}
                  </h3>
                  
                  {person.jobTitle && (
                    <p className="text-sm text-primary font-medium mt-1">
                      {person.jobTitle}
                    </p>
                  )}

                  {person.company && (
                    <div className="flex items-center justify-center gap-1 text-sm text-muted mt-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {person.company}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted">
                    {person.department && person.department !== "Bilinmiyor" && (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[100px]">{person.department}</span>
                      </div>
                    )}
                    {person.graduationYear && (
                      <div className="flex items-center gap-1">
                        <span>'{String(person.graduationYear).slice(-2)}</span>
                      </div>
                    )}
                  </div>

                  {person.city && person.city !== "Bilinmiyor" && (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {person.city}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
                    {person.linkedinUrl && (
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        LinkedIn
                      </span>
                    )}
                    <span className="text-xs text-primary font-medium">
                      Profili Gör →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More - Future Enhancement */}
        {alumni.length > 0 && alumni.length >= 20 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-muted-bg hover:bg-muted-bg/80 rounded-lg text-sm font-medium transition">
              Daha Fazla Yükle
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

