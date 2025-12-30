import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Etkinliğe katıl
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Etkinlik bulunamadı" }, { status: 404 });
    }

    if (event.status !== "UPCOMING") {
      return NextResponse.json(
        { error: "Bu etkinliğe artık katılım yapılamaz" },
        { status: 400 }
      );
    }

    // Kapasite kontrolü
    if (event.capacity && event._count.participants >= event.capacity) {
      return NextResponse.json(
        { error: "Etkinlik kapasitesi doldu" },
        { status: 400 }
      );
    }

    // Zaten kayıtlı mı kontrol et
    const existingParticipant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    });

    if (existingParticipant) {
      return NextResponse.json(
        { error: "Bu etkinliğe zaten kayıtlısınız" },
        { status: 400 }
      );
    }

    const participant = await prisma.eventParticipant.create({
      data: {
        eventId: id,
        userId: session.user.id,
        status: "REGISTERED",
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    console.error("Error joining event:", error);
    return NextResponse.json({ error: "Katılım işlemi başarısız" }, { status: 500 });
  }
}

// Etkinlikten ayrıl
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
    }

    const participant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: "Bu etkinliğe kayıtlı değilsiniz" },
        { status: 400 }
      );
    }

    await prisma.eventParticipant.delete({
      where: { id: participant.id },
    });

    return NextResponse.json({ message: "Katılım iptal edildi" });
  } catch (error) {
    console.error("Error leaving event:", error);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }
}

// Kullanıcının katılım durumunu kontrol et
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ isParticipating: false });
    }

    const participant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    });

    return NextResponse.json({
      isParticipating: !!participant,
      status: participant?.status || null,
    });
  } catch (error) {
    console.error("Error checking participation:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

