"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { buttonVariants } from "../../components/ui/Button";
import { ArrowLeft, Building2, MapPin, Calendar, Briefcase, CheckCircle, Clock, Send, X, AlertCircle } from "lucide-react";
import { ReportModal } from "../../components/ui/ReportModal";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "JOB" | "INTERNSHIP";
  status: "OPEN" | "CLOSED";
  createdAt: string;
  publisher: {
    companyName: string;
    sector: string;
  };
}

interface Application {
  id: string;
  status: "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";
  applicationDate: string;
  coverLetter?: string;
}

const statusLabels = {
  PENDING: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  REVIEWED: { label: "İnceleniyor", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  ACCEPTED: { label: "Kabul Edildi", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  REJECTED: { label: "Reddedildi", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function JobDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobAndApplication = async () => {
      try {
        // Fetch job details
        const jobRes = await fetch(`/api/jobs/${params.id}`);
        if (!jobRes.ok) throw new Error("İlan bulunamadı");
        const jobData = await jobRes.json();
        setJob(jobData);

        // Check if already applied (for students)
        if (session?.user?.role === "STUDENT") {
          const appRes = await fetch(`/api/jobs/${params.id}/application`);
          if (appRes.ok) {
            const appData = await appRes.json();
            if (appData.application) {
              setApplication(appData.application);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("İlan yüklenirken bir hata oluştu.");
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJobAndApplication();
    }
  }, [params.id, router, session]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverLetter: coverLetter.trim() || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Başvuru başarısız.");
      }

      setApplication(data);
      setShowApplyModal(false);
      setCoverLetter("");
      toast.success("Başvurunuz başarıyla alındı!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(message);
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
  const isJobOpen = job.status === "OPEN";
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
          <ArrowLeft className="w-5 h-5 mr-2" />
          İlanlara Dön
        </Link>

        <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-lg animate-fade-in-up">
          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${job.type === "JOB"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                      }`}
                  >
                    {job.type === "JOB" ? "İş İlanı" : "Staj"}
                  </span>
                  {!isJobOpen && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-500/10 text-red-500 border-red-500/20">
                      Başvurular Kapalı
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-muted">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{job.publisher.companyName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.publisher.sector}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3">
                {session?.user && session.user.role !== "EMPLOYER" && (
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "border-rose-500/20 text-rose-500 hover:bg-rose-500/10",
                    })}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Şikayet Et
                  </button>
                )}

                {isStudent && isJobOpen && !application && (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "w-full md:w-auto",
                    })}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Hemen Başvur
                  </button>
                )}

                {application && (
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">Başvuru Yapıldı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${statusLabels[application.status].color
                          }`}
                      >
                        {statusLabels[application.status].label}
                      </span>
                      <span className="text-xs text-muted">
                        {new Date(application.applicationDate).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>
                )}

                {!session && isJobOpen && (
                  <Link
                    href="/login"
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "w-full md:w-auto",
                    })}
                  >
                    Başvuru İçin Giriş Yap
                  </Link>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">İlan Detayları</h3>
              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {job.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Başvuru Yap</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 hover:bg-muted-bg rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-muted-bg rounded-lg">
              <p className="text-sm font-medium">{job.title}</p>
              <p className="text-xs text-muted">{job.publisher.companyName}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Ön Yazı (Opsiyonel)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                maxLength={2000}
                placeholder="Kendinizi tanıtın ve neden bu pozisyon için uygun olduğunuzu açıklayın..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary outline-none"
              />
              <p className="text-xs text-muted mt-1">{coverLetter.length}/2000 karakter</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                İptal
              </button>
              <button
                onClick={handleApply}
                disabled={applying}
                className={buttonVariants({ variant: "default" })}
              >
                {applying ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Başvuruyu Gönder
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {session?.user && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          reportedId={job.id}
          type="JOB_POSTING"
          title={job.title}
        />
      )}
    </div>
  );
}
