"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import JobCard from "../components/JobCard";
import { buttonVariants } from "../components/ui/Button";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "JOB" | "INTERNSHIP";
  createdAt: string;
  publisher: {
    companyName: string;
  };
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "JOB" | "INTERNSHIP">("ALL");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (typeFilter !== "ALL") params.append("type", typeFilter);

        const res = await fetch(`/api/jobs?${params.toString()}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchJobs();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [search, typeFilter]);

  const isEmployerOrAdmin =
    session?.user?.role === "EMPLOYER" || session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted-bg/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary/5 border-b border-border/50">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
                Kariyer Fırsatları
              </h1>
              <p className="text-lg text-muted max-w-2xl animate-fade-in opacity-0 animation-delay-100">
                Hayalindeki işi veya stajı bul, kariyerine yön ver.
              </p>
            </div>
            {isEmployerOrAdmin && (
              <Link
                href="/jobs/new"
                className={`${buttonVariants({
                  variant: "default",
                })} animate-fade-in opacity-0 animation-delay-200`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                İlan Oluştur
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-card/30 backdrop-blur-md border border-border/50 p-4 rounded-xl animate-fade-in-up animation-delay-300">
          <div className="relative w-full md:w-96">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted"
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
            <input
              type="text"
              placeholder="İlan ara (Pozisyon, Şirket, Açıklama)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setTypeFilter("ALL")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                typeFilter === "ALL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted hover:bg-card hover:text-foreground"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setTypeFilter("JOB")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                typeFilter === "JOB"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted hover:bg-card hover:text-foreground"
              }`}
            >
              İş İlanları
            </button>
            <button
              onClick={() => setTypeFilter("INTERNSHIP")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                typeFilter === "INTERNSHIP"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted hover:bg-card hover:text-foreground"
              }`}
            >
              Staj İlanları
            </button>
          </div>
        </div>

        {/* Job List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-card/30 rounded-xl animate-pulse border border-border/50"
              />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-400">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                companyName={job.publisher.companyName}
                location={job.location}
                type={job.type}
                createdAt={job.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/30 backdrop-blur-md border border-border/50 rounded-xl animate-fade-in-up animation-delay-400">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              İlan bulunamadı
            </h3>
            <p className="text-muted text-sm">
              Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
