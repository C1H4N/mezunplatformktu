import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1, "Yetenek adı gerekli").max(50, "Yetenek adı en fazla 50 karakter olabilir"),
});

// Yetenekleri getir
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const skills = await prisma.skill.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Yetenekler getirilemedi:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yetenek ekle
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const body = await req.json();
    const validation = skillSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name } = validation.data;

    // Aynı yetenek var mı kontrol et
    const existingSkill = await prisma.skill.findUnique({
      where: {
        userId_name: {
          userId: session.user.id,
          name: name.trim(),
        },
      },
    });

    if (existingSkill) {
      return NextResponse.json(
        { error: "Bu yetenek zaten eklenmiş" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name: name.trim(),
        userId: session.user.id,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Yetenek eklenemedi:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yetenek sil
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    }

    // Yeteneğin bu kullanıcıya ait olduğunu doğrula
    const skill = await prisma.skill.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!skill) {
      return NextResponse.json({ error: "Yetenek bulunamadı" }, { status: 404 });
    }

    await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Yetenek silindi" });
  } catch (error) {
    console.error("Yetenek silinemedi:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

