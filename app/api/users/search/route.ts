import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Kullanıcı arama (mesaj göndermek için)
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Giriş yapmalısınız" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: session.user.id } },
          { approvalStatus: "APPROVED" },
          { isActive: true },
          {
            OR: [
              { firstName: { contains: query, mode: "insensitive" } },
              { lastName: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        role: true,
      },
      take: 10,
      orderBy: { firstName: "asc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
