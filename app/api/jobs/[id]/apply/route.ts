import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user || session.user.role !== UserRole.STUDENT) {
      return NextResponse.json(
        { error: "Sadece öğrenciler başvuru yapabilir." },
        { status: 403 }
      );
    }

    // Find student record
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Öğrenci profili bulunamadı." },
        { status: 404 }
      );
    }

    // Check if already applied
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId: id,
        studentId: student.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "Bu ilana zaten başvurdunuz." },
        { status: 400 }
      );
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: id,
        studentId: student.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error applying to job:", error);
    return NextResponse.json(
      { error: "Başvuru yapılırken bir hata oluştu." },
      { status: 500 }
    );
  }
}
