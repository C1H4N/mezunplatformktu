"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  UserCheck,
  Clock,
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalAlumni: number;
  totalStudents: number;
  totalEmployers: number;
  totalJobs: number;
  activeJobs: number;
  totalEvents: number;
  upcomingEvents: number;
  totalMessages: number;
  newUsersToday: number;
  newUsersThisWeek: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("İstatistikler getirilemedi");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Toplam Kullanıcı",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500/10 text-blue-600",
      subStats: [
        { label: "Mezun", value: stats?.totalAlumni || 0 },
        { label: "Öğrenci", value: stats?.totalStudents || 0 },
        { label: "İşveren", value: stats?.totalEmployers || 0 },
      ],
    },
    {
      title: "İş İlanları",
      value: stats?.totalJobs || 0,
      icon: Briefcase,
      color: "bg-green-500/10 text-green-600",
      subStats: [
        { label: "Aktif", value: stats?.activeJobs || 0 },
      ],
    },
    {
      title: "Etkinlikler",
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600",
      subStats: [
        { label: "Yaklaşan", value: stats?.upcomingEvents || 0 },
      ],
    },
    {
      title: "Mesajlar",
      value: stats?.totalMessages || 0,
      icon: MessageSquare,
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "Yeni Kayıtlar (Bugün)",
      value: stats?.newUsersToday || 0,
      icon: UserCheck,
      color: "bg-cyan-500/10 text-cyan-600",
    },
    {
      title: "Yeni Kayıtlar (Bu Hafta)",
      value: stats?.newUsersThisWeek || 0,
      icon: TrendingUp,
      color: "bg-pink-500/10 text-pink-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted">Platform genel bakış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted">{card.title}</p>
                  <p className="text-3xl font-bold">{card.value.toLocaleString()}</p>
                </div>
              </div>
              {card.subStats && (
                <div className="flex gap-4 pt-4 border-t border-border">
                  {card.subStats.map((sub) => (
                    <div key={sub.label}>
                      <p className="text-xs text-muted">{sub.label}</p>
                      <p className="text-sm font-semibold">{sub.value.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/users"
            className="p-4 bg-muted-bg rounded-lg hover:bg-muted-bg/80 transition text-center"
          >
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Kullanıcı Yönetimi</p>
          </a>
          <a
            href="/admin/jobs"
            className="p-4 bg-muted-bg rounded-lg hover:bg-muted-bg/80 transition text-center"
          >
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">İlan Yönetimi</p>
          </a>
          <a
            href="/admin/events"
            className="p-4 bg-muted-bg rounded-lg hover:bg-muted-bg/80 transition text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Etkinlik Yönetimi</p>
          </a>
          <a
            href="/admin/moderation"
            className="p-4 bg-muted-bg rounded-lg hover:bg-muted-bg/80 transition text-center"
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Bekleyen Onaylar</p>
          </a>
        </div>
      </div>
    </div>
  );
}

