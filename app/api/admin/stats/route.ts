import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    // Yetki kontrolü
    if (!session?.user || !["ADMIN", "MODERATOR"].includes(session.user.role || "")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    // Paralel sorgular
    const [
      totalUsers,
      totalAlumni,
      totalStudents,
      totalEmployers,
      totalJobs,
      activeJobs,
      totalEvents,
      upcomingEvents,
      totalMessages,
      newUsersToday,
      newUsersThisWeek,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.ALUMNI } }),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.EMPLOYER } }),
      prisma.jobAdvertisement.count(),
      prisma.jobAdvertisement.count({ where: { status: "OPEN" } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: "UPCOMING" } }),
      prisma.message.count(),
      prisma.user.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalAlumni,
      totalStudents,
      totalEmployers,
      totalJobs,
      activeJobs,
      totalEvents,
      upcomingEvents,
      totalMessages,
      newUsersToday,
      newUsersThisWeek,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

