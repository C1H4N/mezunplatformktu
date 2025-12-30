import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Kullanıcıları listele
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || !["ADMIN", "MODERATOR"].includes(session.user.role || "")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") as UserRole | null;

    const where: Record<string, unknown> = {};
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        lastLogin: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Kullanıcı rolünü güncelle
export async function PUT(req: Request) {
  try {
    const session = await auth();

    // Sadece admin rol değiştirebilir
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: "Eksik parametreler" }, { status: 400 });
    }

    // Geçerli rol mu kontrol et
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json({ error: "Geçersiz rol" }, { status: 400 });
    }

    // Kendini güncelleyemez
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Kendi rolünüzü değiştiremezsiniz" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ message: "Rol güncellendi" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Kullanıcı sil
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    // Sadece admin silebilir
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "Kullanıcı ID gerekli" }, { status: 400 });
    }

    // Kendini silemez
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Kendinizi silemezsiniz" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "Kullanıcı silindi" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

