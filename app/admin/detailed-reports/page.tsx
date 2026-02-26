"use client";

import { useState, useEffect } from "react";
import {
    Users, GraduationCap, Briefcase, BookOpen, UserCog,
    TrendingUp, Building2, PieChart, BarChart3, Clock,
    Download, RefreshCcw, ChevronDown, Award,
} from "lucide-react";
import toast from "react-hot-toast";

interface ReportData {
    overview: {
        totalUsers: number;
        totalAlumni: number;
        totalStudents: number;
        totalAcademicians: number;
        totalHeadOfDepts: number;
        pendingApprovals: number;
        totalJobs: number;
        activeJobs: number;
        totalEvents: number;
        upcomingEvents: number;
        totalMessages: number;
        newUsersToday: number;
        newUsersThisWeek: number;
        newUsersThisMonth: number;
    };
    alumniByDepartment: { department: string; count: number }[];
    studentsByDepartment: { department: string; count: number }[];
    employmentDistribution: { status: string; count: number }[];
    graduationDistribution: { year: number; count: number }[];
    registrationTrend: { month: string; count: number }[];
    sectorDistribution: { sector: string; count: number }[];
}

const employmentLabels: Record<string, string> = {
    EMPLOYED_OWN_SECTOR: "Kendi Sektöründe",
    EMPLOYED_OTHER_SECTOR: "Başka Sektörde",
    UNEMPLOYED: "Çalışmıyor",
    STUDENT: "Öğrenime Devam",
    SELF_EMPLOYED: "Serbest / Girişimci",
};

const employmentColors: Record<string, string> = {
    EMPLOYED_OWN_SECTOR: "bg-emerald-500",
    EMPLOYED_OTHER_SECTOR: "bg-blue-500",
    UNEMPLOYED: "bg-red-400",
    STUDENT: "bg-amber-400",
    SELF_EMPLOYED: "bg-violet-500",
};

export default function DetailedReportsPage() {
    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/detailed-reports");
            if (!res.ok) throw new Error();
            setData(await res.json());
        } catch {
            toast.error("Rapor verileri yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    if (!data) return null;

    const { overview } = data;
    const maxTrend = Math.max(...data.registrationTrend.map((t) => t.count), 1);
    const maxGrad = Math.max(...data.graduationDistribution.map((d) => d.count), 1);
    const totalEmployment = data.employmentDistribution.reduce((a, d) => a + d.count, 0) || 1;
    const totalAlumniDept = data.alumniByDepartment.reduce((a, d) => a + d.count, 0) || 1;
    const totalStudentDept = data.studentsByDepartment.reduce((a, d) => a + d.count, 0) || 1;

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Detaylı Raporlama</h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Platform istatistikleri ve analiz verileri
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm transition-all"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Yenile
                </button>
            </div>

            {/* Genel Bakış Kartları */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {[
                    { label: "Toplam Kullanıcı", value: overview.totalUsers, icon: Users, color: "bg-blue-500/10 text-blue-600" },
                    { label: "Mezun", value: overview.totalAlumni, icon: GraduationCap, color: "bg-emerald-500/10 text-emerald-600" },
                    { label: "Öğrenci", value: overview.totalStudents, icon: BookOpen, color: "bg-green-500/10 text-green-600" },
                    { label: "Akademisyen", value: overview.totalAcademicians, icon: Award, color: "bg-violet-500/10 text-violet-600" },
                    { label: "Bölüm Başkanı", value: overview.totalHeadOfDepts, icon: UserCog, color: "bg-amber-500/10 text-amber-600" },
                    { label: "Onay Bekleyen", value: overview.pendingApprovals, icon: Clock, color: "bg-red-500/10 text-red-600" },
                ].map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{card.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Yeni Kayıt İstatistikleri */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Bugün", value: overview.newUsersToday, sub: "yeni kayıt" },
                    { label: "Bu Hafta", value: overview.newUsersThisWeek, sub: "yeni kayıt" },
                    { label: "Bu Ay", value: overview.newUsersThisMonth, sub: "yeni kayıt" },
                ].map((item) => (
                    <div key={item.label} className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">{item.label}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{item.value}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-primary/20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Kayıt Trendi (Son 12 Ay) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">Kayıt Trendi</h2>
                        <p className="text-xs text-slate-500">Son 12 ay</p>
                    </div>
                </div>
                <div className="flex items-end gap-2 h-40">
                    {data.registrationTrend.map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[10px] font-bold text-slate-600">
                                {item.count > 0 ? item.count : ""}
                            </span>
                            <div
                                className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all hover:from-primary-hover hover:to-primary/80 min-h-[4px]"
                                style={{ height: `${(item.count / maxTrend) * 100}%` }}
                            />
                            <span className="text-[9px] text-slate-400 font-medium truncate w-full text-center">
                                {item.month}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* İki Sütun: Bölüm Dağılımları */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Mezun Bölüm Dağılımı */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <GraduationCap className="w-4.5 h-4.5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">Mezun Dağılımı</h2>
                            <p className="text-xs text-slate-500">Bölüm bazlı</p>
                        </div>
                    </div>
                    {data.alumniByDepartment.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">Henüz veri yok</p>
                    ) : (
                        <div className="space-y-3">
                            {data.alumniByDepartment.map((item) => (
                                <div key={item.department}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-slate-700 font-medium truncate pr-4">{item.department}</span>
                                        <span className="text-sm font-bold text-slate-900 flex-shrink-0">{item.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                                            style={{ width: `${(item.count / totalAlumniDept) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Öğrenci Bölüm Dağılımı */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <BookOpen className="w-4.5 h-4.5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">Öğrenci Dağılımı</h2>
                            <p className="text-xs text-slate-500">Bölüm bazlı</p>
                        </div>
                    </div>
                    {data.studentsByDepartment.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">Henüz veri yok</p>
                    ) : (
                        <div className="space-y-3">
                            {data.studentsByDepartment.map((item) => (
                                <div key={item.department}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-slate-700 font-medium truncate pr-4">{item.department}</span>
                                        <span className="text-sm font-bold text-slate-900 flex-shrink-0">{item.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
                                            style={{ width: `${(item.count / totalStudentDept) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* İki Sütun: Çalışma Durumu & Mezuniyet Yılı */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Çalışma Durumu Dağılımı */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                            <PieChart className="w-4.5 h-4.5 text-violet-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">Çalışma Durumu</h2>
                            <p className="text-xs text-slate-500">Mezun istihdam dağılımı</p>
                        </div>
                    </div>
                    {data.employmentDistribution.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">Henüz veri yok</p>
                    ) : (
                        <>
                            {/* Basit pasta görseli */}
                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                {data.employmentDistribution.map((item) => {
                                    const pct = Math.round((item.count / totalEmployment) * 100);
                                    const color = employmentColors[item.status] || "bg-slate-400";
                                    return (
                                        <div key={item.status} className="flex items-center gap-1.5">
                                            <div className={`w-3 h-3 rounded-full ${color}`} />
                                            <span className="text-xs text-slate-600 font-medium">
                                                {employmentLabels[item.status] || item.status}
                                            </span>
                                            <span className="text-xs text-slate-400 font-bold">%{pct}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Bar */}
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                                {data.employmentDistribution.map((item) => {
                                    const pct = (item.count / totalEmployment) * 100;
                                    const color = employmentColors[item.status] || "bg-slate-400";
                                    return (
                                        <div
                                            key={item.status}
                                            className={`h-full ${color} transition-all`}
                                            style={{ width: `${pct}%` }}
                                            title={`${employmentLabels[item.status] || item.status}: ${item.count}`}
                                        />
                                    );
                                })}
                            </div>
                            {/* Liste */}
                            <div className="space-y-2 mt-4">
                                {data.employmentDistribution.map((item) => (
                                    <div key={item.status} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">{employmentLabels[item.status] || item.status}</span>
                                        <span className="font-bold text-slate-900">{item.count} kişi</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Mezuniyet Yılı Dağılımı */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <GraduationCap className="w-4.5 h-4.5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">Mezuniyet Yılı</h2>
                            <p className="text-xs text-slate-500">Son 10 yıl dağılımı</p>
                        </div>
                    </div>
                    {data.graduationDistribution.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">Henüz veri yok</p>
                    ) : (
                        <div className="flex items-end gap-3 h-36">
                            {data.graduationDistribution.map((item) => (
                                <div key={item.year} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-bold text-slate-600">
                                        {item.count > 0 ? item.count : ""}
                                    </span>
                                    <div
                                        className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-md transition-all hover:from-amber-500 hover:to-amber-400 min-h-[4px]"
                                        style={{ height: `${(item.count / maxGrad) * 100}%` }}
                                    />
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {item.year.toString().slice(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sektör Dağılımı */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Building2 className="w-4.5 h-4.5 text-cyan-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">Sektör Dağılımı</h2>
                        <p className="text-xs text-slate-500">Mezunların çalıştığı sektörler (en çok 10)</p>
                    </div>
                </div>
                {data.sectorDistribution.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">Henüz veri yok</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.sectorDistribution.map((item, i) => {
                            const maxSector = data.sectorDistribution[0]?.count || 1;
                            return (
                                <div key={item.sector} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-sm text-slate-700 font-medium truncate">{item.sector}</span>
                                            <span className="text-xs font-bold text-slate-500 flex-shrink-0 ml-2">{item.count}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
                                                style={{ width: `${(item.count / maxSector) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Diğer İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "İş İlanı", value: overview.totalJobs, sub: `${overview.activeJobs} aktif`, icon: Briefcase, color: "bg-green-500/10 text-green-600" },
                    { label: "Etkinlik", value: overview.totalEvents, sub: `${overview.upcomingEvents} yaklaşan`, icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
                    { label: "Mesaj", value: overview.totalMessages, sub: "toplam", icon: Users, color: "bg-orange-500/10 text-orange-600" },
                    { label: "Onay Bekleyen", value: overview.pendingApprovals, sub: "başvuru", icon: Clock, color: "bg-red-500/10 text-red-600" },
                ].map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white border border-slate-200 rounded-xl p-5">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color} mb-3`}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <p className="text-xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{card.sub}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
