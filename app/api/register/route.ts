import { NextResponse } from "next/server";
import {
  validateRegisterByRole,
  type RegisterFormData,
} from "@/lib/schemas/register";
import { prisma } from "@/lib/db";
import { getZodFieldErrors } from "@/lib/utils/getZodFieldErrors";
import bcrypt from "bcryptjs";
import { UserRole } from "@/app/generated/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

// Çalışma durumu geçerli değerleri (schema enum ile eşleşmeli)
const VALID_EMPLOYMENT_STATUS = [
  "EMPLOYED_OWN_SECTOR",
  "EMPLOYED_OTHER_SECTOR",
  "UNEMPLOYED",
  "STUDENT",
  "SELF_EMPLOYED",
] as const;
type EmploymentStatusType = (typeof VALID_EMPLOYMENT_STATUS)[number];

type ExtendedRegisterBody = RegisterFormData & {
  referenceTeacher?: string;
  employmentStatus?: string;
  employmentSector?: string;
  schoolEmail?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ExtendedRegisterBody;

    // Rol bazlı validasyon
    const validation = validateRegisterByRole(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Lütfen tüm alanları doğru şekilde doldurun.",
          errors: getZodFieldErrors(validation.error),
        },
        { status: 400 },
      );
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      studentNo,
      department,
      graduationYear,
      currentPosition,
      title,
      referenceTeacher,
      employmentStatus,
      employmentSector,
      schoolEmail,
    } = body;

    // Email benzersizlik kontrolü
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          message: "Bu e-posta adresi zaten kullanılıyor.",
          errors: { email: "Bu e-posta adresi zaten kullanılıyor." },
        },
        { status: 400 },
      );
    }

    // Telefon benzersizlik kontrolü
    if (phoneNumber) {
      const existingPhone = await prisma.user.findUnique({
        where: { phoneNumber },
      });
      if (existingPhone) {
        return NextResponse.json(
          {
            message: "Bu telefon numarası zaten kullanılıyor.",
            errors: { phoneNumber: "Bu telefon numarası zaten kullanılıyor." },
          },
          { status: 400 },
        );
      }
    }

    // Öğrenci numarası benzersizlik kontrolü
    if (role === "STUDENT" && studentNo) {
      const existingStudentNo = await prisma.student.findUnique({
        where: { studentNo },
      });
      if (existingStudentNo) {
        return NextResponse.json(
          {
            message: "Bu öğrenci numarası zaten kullanılıyor.",
            errors: { studentNo: "Bu öğrenci numarası zaten kullanılıyor." },
          },
          { status: 400 },
        );
      }
    }

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 12);

    // Admin ve Moderator dışındaki tüm roller onay bekler
    const requiresApproval = !["ADMIN", "MODERATOR"].includes(role);
    const approvalStatus = requiresApproval ? "PENDING" : "APPROVED";

    // Çalışma durumu enum kontrolü
    const parsedEmploymentStatus =
      employmentStatus &&
      (VALID_EMPLOYMENT_STATUS as readonly string[]).includes(employmentStatus)
        ? (employmentStatus as EmploymentStatusType)
        : null;

    // Transaction ile kullanıcı ve rol bazlı kayıt oluştur
    const user = await prisma.$transaction(async (tx) => {
      // Ana kullanıcı kaydı
      const newUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phoneNumber: phoneNumber || null,
          password: hashedPassword,
          role: role as UserRole,
          approvalStatus,
          isActive: !requiresApproval,
        },
      });

      // Rol bazlı ek kayıtlar
      if (role === "STUDENT" && studentNo && department) {
        await tx.student.create({
          data: {
            userId: newUser.id,
            studentNo,
            department,
            schoolEmail: schoolEmail || null,
            referenceTeacher: referenceTeacher || null,
            interests: [],
          },
        });
      }

      if (role === "ALUMNI" && department) {
        await tx.alumni.create({
          data: {
            userId: newUser.id,
            graduationYear: graduationYear || new Date().getFullYear(),
            department,
            currentPosition: currentPosition || "",
            referenceTeacher: referenceTeacher || null,
            employmentStatus: parsedEmploymentStatus,
            employmentSector: employmentSector || null,
            competencies: [],
            mentorshipTopics: [],
          },
        });
      }

      if (role === "ACADEMICIAN" && department && title) {
        await tx.academician.create({
          data: {
            userId: newUser.id,
            department,
            title,
          },
        });
      }

      if (role === "HEAD_OF_DEPARTMENT" && department && title) {
        await tx.headOfDepartment.create({
          data: {
            userId: newUser.id,
            department,
            title,
          },
        });
      }

      // Bölüm başkanına / admin'e bildirim gönder
      if (requiresApproval) {
        const admins = await tx.user.findMany({
          where: {
            role: {
              in: [
                UserRole.ADMIN,
                UserRole.MODERATOR,
                UserRole.HEAD_OF_DEPARTMENT,
              ],
            },
          },
          select: { id: true },
        });

        if (admins.length > 0) {
          await tx.notification.createMany({
            data: admins.map((admin) => ({
              userId: admin.id,
              type: "APPROVAL",
              title: "Yeni Üyelik Başvurusu",
              message: `${firstName} ${lastName} adlı kullanıcı üyelik başvurusunda bulundu.`,
              link: "/admin/approvals",
            })),
          });
        }

        // Kullanıcıya bilgi bildirimi
        await tx.notification.create({
          data: {
            userId: newUser.id,
            type: "SYSTEM",
            title: "Başvurunuz Alındı",
            message:
              "Üyelik başvurunuz alındı. Bölüm başkanının onayından sonra hesabınız aktif hale gelecek.",
            link: "/",
          },
        });
      }

      return newUser;
    });

    // Email doğrulama tokeni oluştur ve email gönder
    try {
      if (process.env.RESEND_API_KEY) {
        const verificationToken = await generateVerificationToken(user.email);
        await sendVerificationEmail(user.email, verificationToken.token);

        return NextResponse.json(
          {
            message: requiresApproval
              ? "Kayıt başarılı! Başvurunuz bölüm başkanına iletildi. Onaydan sonra giriş yapabilirsiniz."
              : "Kayıt başarılı! E-posta adresinize doğrulama bağlantısı gönderildi.",
            userId: user.id,
            requiresVerification: true,
            requiresApproval,
          },
          { status: 201 },
        );
      }
    } catch (emailError) {
      console.error("Email gönderim hatası:", emailError);
    }

    return NextResponse.json(
      {
        message: requiresApproval
          ? "Kayıt başarılı! Başvurunuz bölüm başkanına iletildi. Onaydan sonra giriş yapabilirsiniz."
          : "Kayıt başarılı! Giriş yapabilirsiniz.",
        userId: user.id,
        requiresVerification: false,
        requiresApproval,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json(
      { message: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
