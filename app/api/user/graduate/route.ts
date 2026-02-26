import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Öğrenci → Mezun geçiş API'si
// Aktif öğrenci "Mezun Oldum" butonuna tıkladığında çağrılır
export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Oturum bulunamadı" }, { status: 401 });
        }

        // Kullanıcının STUDENT olup olmadığını kontrol et
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { student: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        if (user.role !== "STUDENT") {
            return NextResponse.json(
                { error: "Bu işlem yalnızca aktif öğrenciler için geçerlidir." },
                { status: 400 }
            );
        }

        const body = await req.json();
        const {
            graduationYear,
            department,
            referenceTeacher,
            employmentStatus,
            employmentSector,
            currentPosition,
            studentNo,
        } = body;

        if (!graduationYear || !department) {
            return NextResponse.json(
                { error: "Mezuniyet yılı ve bölüm bilgisi zorunludur." },
                { status: 400 }
            );
        }

        // Geçerli çalışma durumu kontrol
        const VALID_EMPLOYMENT_STATUS = [
            "EMPLOYED_OWN_SECTOR",
            "EMPLOYED_OTHER_SECTOR",
            "UNEMPLOYED",
            "STUDENT",
            "SELF_EMPLOYED",
        ];

        const parsedEmploymentStatus =
            employmentStatus && VALID_EMPLOYMENT_STATUS.includes(employmentStatus)
                ? employmentStatus
                : null;

        // Transaction ile kullanıcıyı öğrenciden mezuna dönüştür
        await prisma.$transaction(async (tx) => {
            // 1. Kullanıcı rolünü ALUMNI yap ve onay durumunu PENDING'e çek
            await tx.user.update({
                where: { id: user.id },
                data: {
                    role: UserRole.ALUMNI,
                    approvalStatus: "PENDING",
                    isActive: false, // Onay beklerken pasif
                },
            });

            // 2. Alumni kaydı oluştur
            await tx.alumni.create({
                data: {
                    userId: user.id,
                    graduationYear: parseInt(graduationYear),
                    department,
                    referenceTeacher: referenceTeacher || null,
                    employmentStatus: parsedEmploymentStatus as any,
                    employmentSector: employmentSector || null,
                    currentPosition: currentPosition || "",
                    studentNo: studentNo || user.student?.studentNo || null,
                    competencies: [],
                    mentorshipTopics: [],
                },
            });

            // 3. Student kaydını sil (opsiyonel: saklamak isterseniz kaldırın)
            if (user.student) {
                await tx.student.delete({
                    where: { id: user.student.id },
                });
            }

            // 4. Admin ve bölüm başkanlarına bildirim gönder
            const approvers = await tx.user.findMany({
                where: {
                    role: {
                        in: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.HEAD_OF_DEPARTMENT],
                    },
                },
                select: { id: true },
            });

            if (approvers.length > 0) {
                await tx.notification.createMany({
                    data: approvers.map((approver) => ({
                        userId: approver.id,
                        type: "APPROVAL" as const,
                        title: "Mezuniyet Başvurusu",
                        message: `${user.firstName} ${user.lastName} adlı öğrenci mezun olduğunu bildirdi ve mezun olarak onay bekliyor.`,
                        link: "/admin/approvals",
                    })),
                });
            }

            // 5. Kullanıcıya bilgi bildirimi
            await tx.notification.create({
                data: {
                    userId: user.id,
                    type: "SYSTEM",
                    title: "Mezuniyet Başvurunuz Alındı",
                    message:
                        "Mezuniyet başvurunuz alındı. Bölüm başkanının onayından sonra mezun hesabınız aktif hale gelecektir.",
                    link: "/",
                },
            });
        });

        return NextResponse.json({
            message:
                "Mezuniyet başvurunuz alındı! Bölüm başkanı onayladıktan sonra mezun hesabınız aktif olacaktır.",
            success: true,
        });
    } catch (error) {
        console.error("Mezuniyet geçiş hatası:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }
}
