import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Kullanıcının bu ilana başvurup başvurmadığını kontrol et
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.STUDENT) {
      return NextResponse.json({ application: null });
    }

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      return NextResponse.json({ application: null });
    }

    const application = await prisma.jobApplication.findFirst({
      where: {
        jobId: id,
        studentId: student.id,
      },
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error checking application:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

