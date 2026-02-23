import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { JobType, UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as JobType | null;
    const search = searchParams.get("search");
    const status = searchParams.get("status"); // Belirli status için filtre
    const all = searchParams.get("all"); // Admin için tüm ilanları getir

    const where: Record<string, unknown> = {};

    // Admin modunda değilse sadece OPEN olanları göster
    if (!all) {
      where.status = status || "OPEN";
    } else if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { publisher: { firstName: { contains: search, mode: "insensitive" } } },
        { publisher: { lastName: { contains: search, mode: "insensitive" } } },
      ];
    }

    const jobs = await prisma.jobAdvertisement.findMany({
      where,
      include: {
        publisher: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "İlanlar getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user.role !== UserRole.ALUMNI && session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.MODERATOR)) {
      return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, location, type } = body;

    if (!title || !description || !location || !type) {
      return NextResponse.json(
        { error: "Lütfen tüm alanları doldurun." },
        { status: 400 }
      );
    }

    // For admin or alumni posting, publisher is just their user ID
    if (!session.user.id) {
      return NextResponse.json({ error: "Kullanıcı bilgisi bulunamadı." }, { status: 403 });
    }

    const job = await prisma.jobAdvertisement.create({
      data: {
        title,
        description,
        location,
        type,
        publisherId: session.user.id,
        status: "OPEN",
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "İlan oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
