import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Raporları listele (gerçek DB)
export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const reports = await prisma.report.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(type && { type: type as any }),
      },
      include: {
        reporter: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Rapor durumunu güncelle
export async function PUT(req: Request) {
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

    const { id, status, actionTaken } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID ve durum zorunludur" },
        { status: 400 },
      );
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        status,
        ...(actionTaken && { actionTaken }),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
