import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole, EventStatus, EventType } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Tek etkinlik detayı
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
            email: true,
          },
        },
        participants: {
          include: {
            // Sadece katılımcı sayısı ve bilgilerini al
          },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Etkinlik güncelle (Organizör veya Admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    }

    // Sadece organizör veya admin güncelleyebilir
    if (event.organizerId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Bu işlem için yetkiniz yok" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, date, endDate, location, type, capacity, image, status } = body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(location && { location }),
        ...(type && { type: type as EventType }),
        ...(capacity !== undefined && { capacity }),
        ...(image && { image }),
        ...(status && { status: status as EventStatus }),
      },
      include: {
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Etkinlik güncellenemedi" }, { status: 500 });
  }
}

// Etkinlik sil (Organizör veya Admin)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    }

    // Sadece organizör veya admin silebilir
    if (event.organizerId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Bu işlem için yetkiniz yok" }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Etkinlik silindi" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Etkinlik silinemedi" }, { status: 500 });
  }
}

