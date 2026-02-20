import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Oturum açmadınız." }, { status: 401 });
        }

        const body = await req.json();
        const { action } = body as { action: "SUSPEND" | "ACTIVATE" };

        if (!["SUSPEND", "ACTIVATE"].includes(action)) {
            return NextResponse.json({ error: "Geçersiz işlem." }, { status: 400 });
        }

        // Kullanıcının mevcut durumunu al
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { isActive: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
        }

        // İşleme göre veritabanını güncelle
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                isActive: action === "ACTIVATE",
                deletedAt: action === "SUSPEND" ? new Date() : null, // Soft delete KVKK uyumu için
            },
        });

        // Bu kritik bir işlemdir, bu yüzden audit log kaydı da atıyoruz.
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: "ACCOUNT_SUSPEND",
                entityType: "USER",
                entityId: session.user.id,
                details: JSON.stringify({ previousState: user.isActive, newState: action === "ACTIVATE" }),
                ipAddress: req.headers.get("x-forwarded-for") || "unknown",
            },
        });

        return NextResponse.json(
            { message: action === "SUSPEND" ? "Hesabınız başarıyla donduruldu." : "Hesabınız yeniden aktif edildi." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Hesap durumu güncelleme hatası:", error);
        return NextResponse.json(
            { error: "İşlem sırasında bir hata oluştu." },
            { status: 500 }
        );
    }
}
