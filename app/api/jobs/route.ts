import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Hangi roller ne tür ilan paylaşabilir
const ROLE_POST_TYPES: Record<string, string[]> = {
  ALUMNI: ["JOB", "INTERNSHIP", "JOB_SEARCH"],
  STUDENT: ["INTERNSHIP_REQUEST", "JOB_SEARCH"],
  MODERATOR: ["JOB", "INTERNSHIP", "INTERNSHIP_REQUEST", "JOB_SEARCH"],
  ADMIN: ["JOB", "INTERNSHIP", "INTERNSHIP_REQUEST", "JOB_SEARCH"],
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const all = searchParams.get("all"); // admin: tüm ilanlar
    const userId = searchParams.get("userId"); // belirli kullanıcı

    const where: Record<string, unknown> = {};

    if (!all) {
      where.status = status || "OPEN";
    } else if (status) {
      where.status = status;
    }

    if (type) where.type = type;
    if (userId) where.publisherId = userId;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
        { publisher: { firstName: { contains: search, mode: "insensitive" } } },
        { publisher: { lastName: { contains: search, mode: "insensitive" } } },
      ];
    }

    const jobs = await prisma.jobAdvertisement.findMany({
      where,
      include: {
        publisher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            image: true,
            moreinfo: { select: { company: true, position: true } },
          },
        },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "İlanlar getirilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor." },
        { status: 401 },
      );
    }

    const role = session.user.role || "USER";
    const allowedTypes = ROLE_POST_TYPES[role] || [];

    if (allowedTypes.length === 0) {
      return NextResponse.json(
        { error: "Bu içerik türünü oluşturma yetkiniz yok." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { title, description, content, location, type, externalLink, tags } =
      body;

    if (!title || !description || !type) {
      return NextResponse.json(
        { error: "Başlık, açıklama ve tür zorunludur." },
        { status: 400 },
      );
    }

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { error: `${role} rolü bu tür ilan paylaşamaz.` },
        { status: 403 },
      );
    }

    const job = await prisma.jobAdvertisement.create({
      data: {
        title,
        description,
        content: content || null,
        location: location || "",
        type,
        externalLink: externalLink || null,
        tags: Array.isArray(tags) ? tags : [],
        publisherId: session.user.id,
        status: "OPEN",
      },
      include: {
        publisher: {
          select: { firstName: true, lastName: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "İlan oluşturulurken bir hata oluştu." },
      { status: 500 },
    );
  }
}
