import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole, EventType, EventStatus } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı").max(200),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalı").max(5000),
  date: z.string(),
  endDate: z.string().optional(),
  location: z.string().min(3, "Konum en az 3 karakter olmalı"),
  type: z.enum(["CAREER_FAIR", "NETWORKING", "WORKSHOP", "SEMINAR", "CONFERENCE", "MEETUP", "OTHER"]),
  capacity: z.number().min(1).optional(),
  image: z.string().optional(),
});

// Etkinlikleri listele
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as EventType | null;
    const status = searchParams.get("status") as EventStatus | null;
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (type) where.type = type;
    if (status) where.status = status;
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
          },
        },
        _count: {
          select: { participants: true },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Etkinlikler getirilemedi" }, { status: 500 });
  }
}

// Yeni etkinlik oluştur (Admin/Moderator/Alumni)
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    // Sadece Admin, Moderator veya Alumni etkinlik oluşturabilir
    const allowedRoles: UserRole[] = [UserRole.ADMIN, UserRole.MODERATOR, UserRole.ALUMNI];
    if (!allowedRoles.includes(session.user.role as UserRole)) {
      return NextResponse.json(
        { error: "Etkinlik oluşturma yetkiniz yok" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, description, date, endDate, location, type, capacity, image } = validation.data;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location,
        type: type as EventType,
        capacity,
        image,
        organizerId: session.user.id,
        status: "UPCOMING",
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
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Etkinlik oluşturulamadı" }, { status: 500 });
  }
}

