import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const messageSchema = z.object({
  receiverId: z.string().min(1, "Alıcı gerekli"),
  content: z.string().min(1, "Mesaj boş olamaz").max(2000, "Mesaj çok uzun"),
});

// Kullanıcının konuşmalarını listele
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const userId = session.user.id;

    // Benzersiz konuşmaları bul
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
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
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: { timestamp: "desc" },
    });

    // Konuşmaları grupla
    const conversationsMap = new Map<string, {
      partnerId: string;
      partner: {
        id: string;
        firstName: string;
        lastName: string;
        image: string | null;
      };
      lastMessage: {
        id: string;
        content: string;
        timestamp: Date;
        isFromMe: boolean;
      };
      unreadCount: number;
    }>();

    for (const msg of messages) {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      const partner = msg.senderId === userId ? msg.receiver : msg.sender;

      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partnerId,
          partner,
          lastMessage: {
            id: msg.id,
            content: msg.content,
            timestamp: msg.timestamp,
            isFromMe: msg.senderId === userId,
          },
          unreadCount: 0, // Basit implementasyon - read status için ayrı model lazım
        });
      }
    }

    const conversations = Array.from(conversationsMap.values());

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Yeni mesaj gönder
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const body = await req.json();
    const validation = messageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { receiverId, content } = validation.data;

    // Alıcı mevcut mu kontrol et
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return NextResponse.json({ error: "Alıcı bulunamadı" }, { status: 404 });
    }

    // Kendine mesaj atamaz
    if (receiverId === session.user.id) {
      return NextResponse.json(
        { error: "Kendinize mesaj atamazsınız" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content,
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
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}

