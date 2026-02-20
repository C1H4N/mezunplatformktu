import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { ReportType } from "@/app/generated/prisma";
import z from "zod";

const reportSchema = z.object({
    reportedId: z.string().min(1, "Rapor edilecek içerik/kullanıcı ID'si gereklidir."),
    type: z.nativeEnum(ReportType),
    reason: z.string().min(10, "Lütfen şikayet nedeninizi daha detaylı açıklayın (En az 10 karakter).").max(500),
    description: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { message: "Şikayet oluşturmak için giriş yapmalısınız." },
                { status: 401 }
            );
        }

        const body = await req.json();
        const validation = reportSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Geçersiz veri",
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { reportedId, type, reason, description } = validation.data;

        // Şikayet edilen içeriğin/kullanıcının kendi raporu olmaması kontrolü
        if (reportedId === session.user.id && type === "USER_PROFILE") {
            return NextResponse.json(
                { message: "Kendi profilinizi şikayet edemezsiniz." },
                { status: 400 }
            );
        }

        // Rapor oluştur ve veritabanına kaydet
        const report = await prisma.report.create({
            data: {
                reporterId: session.user.id,
                reportedId,
                type,
                reason,
                description,
                status: "PENDING",
            },
        });

        // Sistem yöneticileri / Moderatörler için bir Audit Log (sistem izi) düşebiliriz
        await prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: "CREATE",
                entityType: "REPORT",
                entityId: report.id,
                details: JSON.stringify({ reportedId, type, reason }),
                ipAddress: req.headers.get("x-forwarded-for") || "unknown",
            },
        });

        return NextResponse.json(
            {
                message: "Şikayetiniz başarıyla iletildi. Moderatörlerimiz inceleyecektir.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Şikayet oluşturma hatası:", error);
        return NextResponse.json(
            { message: "İşlem sırasında bir hata oluştu." },
            { status: 500 }
        );
    }
}
