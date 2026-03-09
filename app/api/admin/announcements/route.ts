import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function isAdmin(role?: string | null) {
  return (
    role === "ADMIN" || role === "MODERATOR" || role === "HEAD_OF_DEPARTMENT"
  );
}

// Tüm duyuruları listele
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const announcements = await prisma.announcement.findMany({
      include: {
        author: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yeni duyuru oluştur
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { title, content, imageUrl, isPinned } = await req.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Başlık ve içerik zorunludur" },
        { status: 400 },
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl || null,
        isPinned: isPinned ?? false,
        authorId: session.user.id!,
      },
      include: {
        author: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Duyuru güncelle
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { id, title, content, imageUrl, isPinned } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(content !== undefined && { content: content.trim() }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isPinned !== undefined && { isPinned }),
      },
      include: {
        author: { select: { firstName: true, lastName: true, email: true } },
      },
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Duyuru sil
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    }

    await prisma.announcement.delete({ where: { id } });

    return NextResponse.json({ message: "Duyuru silindi" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
