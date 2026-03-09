import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const job = await prisma.jobAdvertisement.findUnique({
      where: { id },
      include: {
        publisher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            image: true,
            moreinfo: {
              select: { company: true, position: true, location: true },
            },
          },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job)
      return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "İlan getirilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const job = await prisma.jobAdvertisement.findUnique({ where: { id } });
    if (!job)
      return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });

    const isOwner = job.publisherId === session.user.id;
    const isAdmin = ["ADMIN", "MODERATOR"].includes(session.user.role || "");
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Bu ilanı düzenleme yetkiniz yok." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      content,
      location,
      status,
      externalLink,
      tags,
    } = body;

    const updated = await prisma.jobAdvertisement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(location !== undefined && { location }),
        ...(status !== undefined && { status }),
        ...(externalLink !== undefined && { externalLink }),
        ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [] }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "İlan güncellenirken bir hata oluştu." },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const job = await prisma.jobAdvertisement.findUnique({ where: { id } });
    if (!job)
      return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });

    const isOwner = job.publisherId === session.user.id;
    const isAdmin = ["ADMIN", "MODERATOR"].includes(session.user.role || "");
    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Bu ilanı silme yetkiniz yok." },
        { status: 403 },
      );
    }

    await prisma.jobAdvertisement.delete({ where: { id } });
    return NextResponse.json({ message: "İlan silindi." });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "İlan silinirken bir hata oluştu." },
      { status: 500 },
    );
  }
}
