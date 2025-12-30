"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../components/ui/Button";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  FileText,
  ArrowLeft
} from "lucide-react";

interface Application {
  id: string;
  status: "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";
  applicationDate: string;
  coverLetter?: string;
  job: {
    id: string;
    title: string;
    location: string;
    type: "JOB" | "INTERNSHIP";
    status: "OPEN" | "CLOSED";
    publisher: {
      companyName: string;
      sector: string;
    };
  };
}

const statusConfig = {
  PENDING: { 
    label: "Beklemede", 
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    icon: Clock 
  },
  REVIEWED: { 
    label: "İnceleniyor", 
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: Eye 
  },
  ACCEPTED: { 
    label: "Kabul Edildi", 
    color: "bg-green-500/10 text-green-600 border-green-500/20",
    icon: CheckCircle 
  },
  REJECTED: { 
    label: "Reddedildi", 
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: XCircle 
  },
};

export default function ApplicationsPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED">("ALL");

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (session?.user?.role !== "STUDENT") {
      router.push("/");
      return;
    }

    fetchApplications();
  }, [session, sessionStatus, router]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      if (!res.ok) throw new Error("Başvurular getirilemedi");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === "ALL" 
    ? applications 
    : applications.filter(app => app.status === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "PENDING").length,
    reviewed: applications.filter(a => a.status === "REVIEWED").length,
    accepted: applications.filter(a => a.status === "ACCEPTED").length,
    rejected: applications.filter(a => a.status === "REJECTED").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-muted hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            İlanlara Dön
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Başvurularım</h1>
          <p className="text-muted mt-1">İş ve staj başvurularınızı takip edin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setFilter("ALL")}
            className={`p-4 rounded-xl border transition-all ${
              filter === "ALL" 
                ? "bg-primary/10 border-primary" 
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted">Toplam</p>
          </button>
          <button
            onClick={() => setFilter("PENDING")}
            className={`p-4 rounded-xl border transition-all ${
              filter === "PENDING" 
                ? "bg-yellow-500/10 border-yellow-500" 
                : "bg-card border-border hover:border-yellow-500/50"
            }`}
          >
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-muted">Beklemede</p>
          </button>
          <button
            onClick={() => setFilter("REVIEWED")}
            className={`p-4 rounded-xl border transition-all ${
              filter === "REVIEWED" 
                ? "bg-blue-500/10 border-blue-500" 
                : "bg-card border-border hover:border-blue-500/50"
            }`}
          >
            <p className="text-2xl font-bold text-blue-600">{stats.reviewed}</p>
            <p className="text-xs text-muted">İnceleniyor</p>
          </button>
          <button
            onClick={() => setFilter("ACCEPTED")}
            className={`p-4 rounded-xl border transition-all ${
              filter === "ACCEPTED" 
                ? "bg-green-500/10 border-green-500" 
                : "bg-card border-border hover:border-green-500/50"
            }`}
          >
            <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            <p className="text-xs text-muted">Kabul</p>
          </button>
          <button
            onClick={() => setFilter("REJECTED")}
            className={`p-4 rounded-xl border transition-all ${
              filter === "REJECTED" 
                ? "bg-red-500/10 border-red-500" 
                : "bg-card border-border hover:border-red-500/50"
            }`}
          >
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-xs text-muted">Reddedilen</p>
          </button>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto text-muted mb-4" />
            <h3 className="text-lg font-semibold mb-2">Henüz başvuru yok</h3>
            <p className="text-muted mb-6">İş ilanlarına göz atın ve başvurun</p>
            <Link href="/jobs" className={buttonVariants({ variant: "default" })}>
              İlanları Gör
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const StatusIcon = statusConfig[app.status].icon;
              return (
                <div
                  key={app.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link 
                          href={`/jobs/${app.job.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {app.job.title}
                        </Link>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                            app.job.type === "JOB"
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                          }`}
                        >
                          {app.job.type === "JOB" ? "İş" : "Staj"}
                        </span>
                        {app.job.status === "CLOSED" && (
                          <span className="px-2 py-0.5 rounded text-xs bg-muted-bg text-muted">
                            Kapandı
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4" />
                          <span>{app.job.publisher.companyName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{app.job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(app.applicationDate).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {app.coverLetter && (
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            <span>Ön yazı eklendi</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${
                          statusConfig[app.status].color
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[app.status].label}
                      </span>
                      <Link
                        href={`/jobs/${app.job.id}`}
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        Detay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

