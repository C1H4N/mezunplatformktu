"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { buttonVariants } from "../../components/ui/Button";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "JOB" | "INTERNSHIP";
  createdAt: string;
  publisher: {
    companyName: string;
    sector: string;
    // Add other publisher fields if needed
  };
}

export default function JobDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) {
          throw new Error("İlan bulunamadı");
        }
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("İlan yüklenirken bir hata oluştu.");
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id, router]);

  const handleApply = async () => {
    if (!session) {
      toast.error("Başvuru yapmak için giriş yapmalısınız.");
      router.push("/login");
      return;
    }

    setApplying(true);
    try {
      const res = await fetch(`/api/jobs/${params.id}/apply`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Başvuru başarısız.");
      }

      toast.success("Başvurunuz başarıyla alındı!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) return null;

  const isStudent = session?.user?.role === "STUDENT";
  const formattedDate = new Date(job.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/jobs"
          className="inline-flex items-center text-muted hover:text-primary mb-6 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          İlanlara Dön
        </Link>

        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-lg animate-fade-in-up">
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      job.type === "JOB"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    }`}
                  >
                    {job.type === "JOB" ? "İş İlanı" : "Staj"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-muted">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-medium">{job.publisher.companyName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              {isStudent && (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className: "w-full md:w-auto",
                  })}
                >
                  {applying ? "Başvuruluyor..." : "Hemen Başvur"}
                </button>
              )}
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                İlan Detayları
              </h3>
              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {job.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
