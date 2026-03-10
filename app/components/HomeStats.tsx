import prisma from "@/lib/db";
import { Users, GraduationCap, Building2, Library, Briefcase, FileText } from "lucide-react";

export default async function HomeStats() {
    // Veritabanından çeşitli istatistikleri çekiyoruz
    const [
        studentCount,
        alumniCount,
        academicianCount,
        activeProgramsCount,
        activeJobsCount,
    ] = await Promise.all([
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.user.count({ where: { role: "ALUMNI" } }),
        prisma.user.count({
            where: { role: { in: ["ACADEMICIAN", "HEAD_OF_DEPARTMENT"] } }
        }),
        prisma.department.count({ where: { isActive: true } }),
        prisma.jobAdvertisement.count({ where: { status: "OPEN" } }),
    ]);

    const stats = [
        { label: "Öğrenci", value: studentCount || 0, icon: Library },
        { label: "Mezun", value: alumniCount || 0, icon: GraduationCap },
        { label: "Akademik Personel", value: academicianCount || 0, icon: Users },
        { label: "Aktif Program", value: activeProgramsCount || 0, icon: Building2 },
        { label: "Aktif İlanlar", value: activeJobsCount || 0, icon: Briefcase },
    ];

    return (
        <section className="py-16 bg-white border-b border-gray-100 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Başlık Alanı (Görseldeki gibi sol çizgili) */}
                <div className="mb-12 flex items-center border-l-4 border-slate-900 pl-4 w-fit">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        Sayılarla AACOMYO
                    </h2>
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6 text-center">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="flex flex-col items-center justify-center group">
                                <Icon
                                    className="w-12 h-12 text-slate-800 mb-4 transition-transform group-hover:-translate-y-1 group-hover:text-blue-600"
                                    strokeWidth={1.5}
                                />
                                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 font-mono">
                                    {stat.value}
                                </span>
                                <span className="text-sm md:text-base text-slate-500 font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
