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

import { cities, departmentGroups, jobFields } from "../lib/constants";

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "Seçin",
    department: "Seçin",
    jobField: "Seçin",
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
      city: "Seçin",
      department: "Seçin",
      jobField: "Seçin",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = [
    filters.city !== "Seçin",
    filters.department !== "Seçin",
    filters.jobField !== "Seçin",
  ].filter(Boolean).length;

  return (
    <div className="w-full bg-[#ffffff] rounded-3xl p-3 sm:p-5">
      <div className="flex flex-col lg:flex-row gap-4 items-center w-full">
        {/* Arama Çubuğu (Genişleyecek kadar) */}
        <div className="relative w-full lg:flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-muted/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="İsim, şirket veya pozisyon ara..."
            value={filters.search}
            onChange={(e) => handleFilterUpdate("search", e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#f8fafc] border border-border/40 rounded-2xl focus:outline-none focus:bg-[#ffffff] focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all placeholder:text-muted/50 text-foreground font-medium shadow-sm"
          />
        </div>

        {/* Filtre Switcher Mobile */}
        <div className="flex w-full lg:hidden items-center justify-between px-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-foreground font-bold text-sm"
          >
            Filtrele
            {activeFilterCount > 0 && (
              <span className="bg-[#0ea5e9] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                {activeFilterCount}
              </span>
            )}
            <svg className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {activeFilterCount > 0 && (
            <button type="button" onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-600 font-bold transition-colors">
              Temizle
            </button>
          )}
        </div>

        {/* Filtre Seçenekleri */}
        <div className={`w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3 ${showFilters ? "grid" : "hidden lg:grid"}`}>
          {/* Şehir */}
          <div className="relative">
            <label htmlFor="city" className="absolute -top-2 left-3 bg-[#ffffff] px-1 text-[10px] font-bold text-muted uppercase tracking-wider z-10">Şehir</label>
            <select
              id="city"
              value={filters.city}
              onChange={(e) => handleFilterUpdate("city", e.target.value)}
              className="w-full px-4 py-3 bg-[#f8fafc] border border-border/40 rounded-2xl focus:outline-none focus:bg-[#ffffff] focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all appearance-none cursor-pointer text-sm font-medium shadow-sm relative z-0"
            >
              <option value="Seçin">Seçin</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Bölüm */}
          <div className="relative">
            <label htmlFor="department" className="absolute -top-2 left-3 bg-[#ffffff] px-1 text-[10px] font-bold text-muted uppercase tracking-wider z-10">Bölüm</label>
            <select
              id="department"
              value={filters.department}
              onChange={(e) => handleFilterUpdate("department", e.target.value)}
              className="w-full px-4 py-3 bg-[#f8fafc] border border-border/40 rounded-2xl focus:outline-none focus:bg-[#ffffff] focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all appearance-none cursor-pointer text-sm font-medium shadow-sm relative z-0"
            >
              <option value="Seçin">Seçin</option>
              {Object.entries(departmentGroups).map(([faculty, depts]) => (
                <optgroup key={faculty} label={faculty}>
                  {depts.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* İş Alanı */}
          <div className="relative">
            <label htmlFor="jobField" className="absolute -top-2 left-3 bg-[#ffffff] px-1 text-[10px] font-bold text-muted uppercase tracking-wider z-10">İş Alanı</label>
            <select
              id="jobField"
              value={filters.jobField}
              onChange={(e) => handleFilterUpdate("jobField", e.target.value)}
              className="w-full px-4 py-3 bg-[#f8fafc] border border-border/40 rounded-2xl focus:outline-none focus:bg-[#ffffff] focus:ring-2 focus:ring-[#0ea5e9]/50 focus:border-[#0ea5e9] transition-all appearance-none cursor-pointer text-sm font-medium shadow-sm relative z-0"
            >
              <option value="Seçin">Seçin</option>
              {jobFields.map((field) => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Masaüstü Temizle Butonu */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="hidden lg:flex items-center justify-center p-3 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-2xl transition-colors shadow-sm shrink-0"
            title="Sıfırla"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

