import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Kullanıcının tüm başvurularını getir
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.STUDENT) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json({ error: "Öğrenci profili bulunamadı" }, { status: 404 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { studentId: student.id },
      include: {
        job: {
          include: {
            publisher: {
              select: {
                companyName: true,
                sector: true,
              },
            },
          },
        },
      },
      orderBy: { applicationDate: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

