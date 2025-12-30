import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Belirli bir kullanıcı ile olan mesajları getir
export async function GET(
  request: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  try {
    const { partnerId } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const userId = session.user.id;

    // Partner bilgisini al
    const partner = await prisma.user.findUnique({
      where: { id: partnerId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        image: true,
        role: true,
      },
    });

    if (!partner) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    // İki kullanıcı arasındaki mesajları getir
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: { timestamp: "asc" },
    });

    return NextResponse.json({
      partner,
      messages: messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        timestamp: msg.timestamp,
        isFromMe: msg.senderId === userId,
        sender: msg.sender,
      })),
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

