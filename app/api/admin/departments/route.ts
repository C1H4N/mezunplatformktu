import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function isAdmin(role?: string | null) {
  return (
    role === "ADMIN" || role === "MODERATOR" || role === "HEAD_OF_DEPARTMENT"
  );
}

// Tüm bölümleri listele (herkese açık - register formları için)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get("all") === "true";
    const session = await auth();

    const where =
      includeInactive && isAdmin(session?.user?.role) ? {} : { isActive: true };

    const departments = await prisma.department.findMany({
      where,
      include: {
        programs: {
          where: includeInactive ? {} : { isActive: true },
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yeni bölüm oluştur
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { name, code, description } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Bölüm adı zorunludur" },
        { status: 400 },
      );
    }

    const existing = await prisma.department.findUnique({
      where: { name: name.trim() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu isimde bölüm zaten mevcut" },
        { status: 400 },
      );
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
        code: code?.trim() || null,
        description: description?.trim() || null,
      },
      include: { programs: true },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Bölüm güncelle
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { id, name, code, description, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    }

    const department = await prisma.department.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(code !== undefined && { code: code?.trim() || null }),
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
        ...(isActive !== undefined && { isActive }),
      },
      include: { programs: { orderBy: { name: "asc" } } },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Bölüm sil
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

    await prisma.department.delete({ where: { id } });

    return NextResponse.json({ message: "Bölüm silindi" });
  } catch (error) {
    console.error("Error deleting department:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
