import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Onay bekleyen üyeler
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const role = session.user.role;
    const isAdminOrMod = role === "ADMIN" || role === "MODERATOR";
    const isHead = role === "HEAD_OF_DEPARTMENT";

    if (!isAdminOrMod && !isHead) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "PENDING";
    const roleFilter = searchParams.get("role"); // ALUMNI, STUDENT, vb.

    // Bölüm başkanı kendi bölümündekilerden sorumlu
    let departmentFilter: string | undefined;
    if (isHead && !isAdminOrMod) {
      const head = await prisma.headOfDepartment.findUnique({
        where: { userId: session.user.id },
      });
      departmentFilter = head?.department;
    }

    const users = await prisma.user.findMany({
      where: {
        approvalStatus: status as any,
        ...(roleFilter && { role: roleFilter as any }),
        ...(departmentFilter && {
          OR: [
            { alumni: { department: departmentFilter } },
            { student: { department: departmentFilter } },
          ],
        }),
      },
      include: {
        alumni: true,
        student: true,
        academician: true,
        headOfDepartment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Üye onayla / reddet
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const role = session.user.role;
    const isAdminOrMod = role === "ADMIN" || role === "MODERATOR";
    const isHead = role === "HEAD_OF_DEPARTMENT";

    if (!isAdminOrMod && !isHead) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { userId, action } = await req.json(); // action: "APPROVE" | "REJECT"

    if (!userId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
    }

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    await prisma.user.update({
      where: { id: userId },
      data: {
        approvalStatus: newStatus,
        ...(action === "APPROVE" && {
          approvedAt: new Date(),
          approvedById: session.user.id,
          isActive: true,
        }),
        ...(action === "REJECT" && { isActive: false }),
      },
    });

    // Kullanıcıya bildirim gönder
    await prisma.notification.create({
      data: {
        userId,
        type: "APPROVAL",
        title:
          action === "APPROVE"
            ? "Üyeliğiniz Onaylandı! 🎉"
            : "Üyelik Başvurunuz Reddedildi",
        message:
          action === "APPROVE"
            ? "Tebrikler! Üyelik başvurunuz onaylandı. Artık platforma tam erişiminiz var."
            : "Üyelik başvurunuz bu sefer değerlendirmeye alınmadı. Detaylar için yöneticiyle iletişime geçin.",
        link: action === "APPROVE" ? "/profile" : "/login",
      },
    });

    return NextResponse.json({
      message:
        action === "APPROVE" ? "Kullanıcı onaylandı" : "Kullanıcı reddedildi",
    });
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
