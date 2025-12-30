import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Kullanıcının bildirimlerini getir
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unread") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {
      userId: session.user.id,
    };

    if (unreadOnly) {
      where.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    // Okunmamış sayısını da döndür
    const unreadCount = await prisma.notification.count({
      where: {
        userId: session.user.id,
        isRead: false,
      },
    });

    return NextResponse.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Bildirimi okundu olarak işaretle
export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const body = await req.json();
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      // Tüm bildirimleri okundu yap
      await prisma.notification.updateMany({
        where: {
          userId: session.user.id,
          isRead: false,
        },
        data: { isRead: true },
      });

      return NextResponse.json({ message: "Tüm bildirimler okundu işaretlendi" });
    }

    if (!notificationId) {
      return NextResponse.json({ error: "Bildirim ID gerekli" }, { status: 400 });
    }

    // Tek bildirimi okundu yap
    const notification = await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId: session.user.id, // Güvenlik: sadece kendi bildirimleri
      },
      data: { isRead: true },
    });

    if (notification.count === 0) {
      return NextResponse.json({ error: "Bildirim bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bildirim okundu işaretlendi" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Bildirimi sil
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const notificationId = searchParams.get("id");

    if (!notificationId) {
      return NextResponse.json({ error: "Bildirim ID gerekli" }, { status: 400 });
    }

    const result = await prisma.notification.deleteMany({
      where: {
        id: notificationId,
        userId: session.user.id, // Güvenlik: sadece kendi bildirimleri
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Bildirim bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bildirim silindi" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

