import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function isAdmin(role?: string | null) {
  return (
    role === "ADMIN" || role === "MODERATOR" || role === "HEAD_OF_DEPARTMENT"
  );
}

// Bölüme ait programları listele
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");

    const programs = await prisma.program.findMany({
      where: {
        isActive: true,
        ...(departmentId && { departmentId }),
      },
      include: { department: { select: { name: true } } },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yeni program oluştur
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { name, departmentId } = await req.json();

    if (!name?.trim() || !departmentId) {
      return NextResponse.json(
        { error: "Program adı ve bölüm zorunludur" },
        { status: 400 },
      );
    }

    const program = await prisma.program.create({
      data: { name: name.trim(), departmentId },
      include: { department: { select: { name: true } } },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bu bölümde aynı isimde program zaten var" },
        { status: 400 },
      );
    }
    console.error("Error creating program:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Program güncelle / sil
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { id, name, isActive } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID zorunludur" }, { status: 400 });
    }

    const program = await prisma.program.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

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

    await prisma.program.delete({ where: { id } });

    return NextResponse.json({ message: "Program silindi" });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
