"use client";

import { 
  FileText, 
  Download,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function AdminReportsPage() {
  const reports = [
    {
      title: "Kullanıcı İstatistikleri",
      description: "Kayıtlı kullanıcı sayıları, roller ve aktivite raporları",
      icon: Users,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "İş İlanları Raporu",
      description: "İlan sayıları, başvuru oranları ve sektörel dağılım",
      icon: Briefcase,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Etkinlik Analizi",
      description: "Etkinlik katılım oranları ve geri bildirimler",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Platform Kullanımı",
      description: "Sayfa görüntüleme, oturum süreleri ve kullanıcı davranışları",
      icon: BarChart3,
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "Mezun Dağılımı",
      description: "Mezunların şehir, sektör ve pozisyon dağılımları",
      icon: PieChart,
      color: "bg-cyan-500/10 text-cyan-600",
    },
    {
      title: "Büyüme Raporu",
      description: "Aylık ve yıllık büyüme metrikleri",
      icon: TrendingUp,
      color: "bg-pink-500/10 text-pink-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Raporlar</h1>
        <p className="text-muted">Platform analiz ve raporları</p>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-primary">Raporlama Modülü</p>
            <p className="text-sm text-muted mt-1">
              Detaylı raporlama özellikleri geliştirme aşamasındadır. Yakında kullanıma sunulacaktır.
            </p>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${report.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-muted mb-4">{report.description}</p>
              <button
                disabled
                className="flex items-center gap-2 text-sm text-muted cursor-not-allowed opacity-50"
              >
                <Download className="w-4 h-4" />
                Yakında
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

