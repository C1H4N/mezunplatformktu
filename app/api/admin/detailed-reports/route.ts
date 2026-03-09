import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "MODERATOR", "HEAD_OF_DEPARTMENT"].includes(
        session.user.role || "",
      )
    ) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Genel sayılar
    const [
      totalUsers,
      totalAlumni,
      totalStudents,
      totalAcademicians,
      totalHeadOfDepts,
      pendingApprovals,
      totalJobs,
      activeJobs,
      totalEvents,
      upcomingEvents,
      totalMessages,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ALUMNI } }),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.ACADEMICIAN } }),
      prisma.user.count({ where: { role: UserRole.HEAD_OF_DEPARTMENT } }),
      prisma.user.count({ where: { approvalStatus: "PENDING" } }),
      prisma.jobAdvertisement.count(),
      prisma.jobAdvertisement.count({ where: { status: "OPEN" } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: "UPCOMING" } }),
      prisma.message.count(),
      prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
    ]);

    // 2. Bölüm bazlı dağılım (Alumni)
    const alumniByDepartment = await prisma.alumni.groupBy({
      by: ["department"],
      _count: { id: true },
      where: { department: { not: null } },
      orderBy: { _count: { id: "desc" } },
    });

    // 3. Bölüm bazlı dağılım (Student)
    const studentsByDepartment = await prisma.student.groupBy({
      by: ["department"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    // 4. Çalışma durumu dağılımı
    const employmentDistribution = await prisma.alumni.groupBy({
      by: ["employmentStatus"],
      _count: { id: true },
      where: { employmentStatus: { not: null } },
      orderBy: { _count: { id: "desc" } },
    });

    // 5. Mezuniyet yılı dağılımı (son 10 yıl)
    const currentYear = now.getFullYear();
    const graduationDistribution = await prisma.alumni.groupBy({
      by: ["graduationYear"],
      _count: { id: true },
      where: {
        graduationYear: { gte: currentYear - 10 },
      },
      orderBy: { graduationYear: "asc" },
    });

    // 6. Son 12 ay kayıt trendi
    const registrationTrend = [];
    for (let i = 11; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = await prisma.user.count({
        where: {
          createdAt: { gte: start, lt: end },
        },
      });
      registrationTrend.push({
        month: start.toLocaleDateString("tr-TR", {
          month: "short",
          year: "2-digit",
        }),
        count,
      });
    }

    // 7. Sektör dağılımı
    const sectorDistribution = await prisma.alumni.groupBy({
      by: ["employmentSector"],
      _count: { id: true },
      where: {
        employmentSector: { not: null },
        NOT: { employmentSector: "" },
      },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });

    // 8. Detaylı Kırılım (Bölüm -> İl -> Çalışma Durumu)
    const allAlumniDetailed = await prisma.alumni.findMany({
      select: {
        department: true,
        employmentStatus: true,
        user: {
          select: {
            moreinfo: {
              select: { location: true },
            },
          },
        },
      },
    });

    const groupedMap: Record<
      string,
      Record<string, Record<string, number>>
    > = {};

    for (const a of allAlumniDetailed) {
      const dept = a.department || "Belirtilmemiş";
      const city = a.user?.moreinfo?.location || "Belirtilmemiş";
      const status = a.employmentStatus || "UNREPORTED";

      if (!groupedMap[dept]) groupedMap[dept] = {};
      if (!groupedMap[dept][city]) groupedMap[dept][city] = {};
      if (!groupedMap[dept][city][status]) groupedMap[dept][city][status] = 0;

      groupedMap[dept][city][status]++;
    }

    const departmentDetails = [];
    for (const dept of Object.keys(groupedMap).sort()) {
      const cities = Object.keys(groupedMap[dept])
        .sort()
        .map((city) => {
          const statuses = Object.keys(groupedMap[dept][city])
            .sort()
            .map((status) => ({
              status,
              count: groupedMap[dept][city][status],
            }));
          const count = statuses.reduce((acc, curr) => acc + curr.count, 0);
          return { city, statuses, count };
        });
      const count = cities.reduce((acc, curr) => acc + curr.count, 0);
      departmentDetails.push({ department: dept, cities, count });
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        totalAlumni,
        totalStudents,
        totalAcademicians,
        totalHeadOfDepts,
        pendingApprovals,
        totalJobs,
        activeJobs,
        totalEvents,
        upcomingEvents,
        totalMessages,
        newUsersToday,
        newUsersThisWeek,
        newUsersThisMonth,
      },
      alumniByDepartment: alumniByDepartment.map((d) => ({
        department: d.department || "Belirtilmemiş",
        count: d._count.id,
      })),
      studentsByDepartment: studentsByDepartment.map((d) => ({
        department: d.department,
        count: d._count.id,
      })),
      employmentDistribution: employmentDistribution.map((d) => ({
        status: d.employmentStatus,
        count: d._count.id,
      })),
      graduationDistribution: graduationDistribution.map((d) => ({
        year: d.graduationYear,
        count: d._count.id,
      })),
      registrationTrend,
      sectorDistribution: sectorDistribution.map((d) => ({
        sector: d.employmentSector,
        count: d._count.id,
      })),
      departmentDetails,
    });
  } catch (error) {
    console.error("Raporlama hatası:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
