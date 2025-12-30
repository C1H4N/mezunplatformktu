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
        { publisher: { companyName: { contains: search, mode: "insensitive" } } },
      ];
    }

    const jobs = await prisma.jobAdvertisement.findMany({
      where,
      include: {
        publisher: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
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

    if (!session || !session.user || (session.user.role !== UserRole.EMPLOYER && session.user.role !== UserRole.ADMIN)) {
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

    // Find the employer record for the current user
    const employer = await prisma.employer.findUnique({
      where: { userId: session.user.id },
    });

    if (!employer && session.user.role !== UserRole.ADMIN) {
       return NextResponse.json({ error: "İşveren profili bulunamadı." }, { status: 404 });
    }
    
    // For admin, we might need a way to specify publisher, but for now let's assume only employers post for themselves
    // Or if admin, they must have an employer profile too? 
    // Let's stick to Employer posting for now.
    if (!employer) {
        return NextResponse.json({ error: "Sadece işverenler ilan açabilir." }, { status: 403 });
    }

    const job = await prisma.jobAdvertisement.create({
      data: {
        title,
        description,
        location,
        type,
        publisherId: employer.id,
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
