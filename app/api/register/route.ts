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

export async function POST(req: Request) {
  try {
    const body: RegisterFormData = await req.json();

    // Rol bazlı validasyon
    const validation = validateRegisterByRole(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Lütfen tüm alanları doğru şekilde doldurun.",
          errors: getZodFieldErrors(validation.error),
        },
        { status: 400 }
      );
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password, 
      role,
      // Öğrenci
      studentNo,
      department,
      // Mezun
      graduationYear,
      currentPosition,
      // İşveren
      companyName,
      taxNumber,
      sector,
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
        { status: 400 }
      );
    }

    // Telefon benzersizlik kontrolü
    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          message: "Bu telefon numarası zaten kullanılıyor.",
          errors: { phoneNumber: "Bu telefon numarası zaten kullanılıyor." },
        },
        { status: 400 }
      );
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
          { status: 400 }
        );
      }
    }

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prisma role enum'una çevir
    const userRole = role as UserRole;

    // Transaction ile kullanıcı ve rol bazlı kayıt oluştur
    const user = await prisma.$transaction(async (tx) => {
      // Ana kullanıcı kaydı
      const newUser = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phoneNumber,
          password: hashedPassword,
          role: userRole,
          // emailVerified: null // Email doğrulama bekliyor - FAZA 1.2'de aktifleştirilecek
        },
      });

      // Rol bazlı ek kayıtlar
      if (role === "STUDENT" && studentNo && department) {
        await tx.student.create({
          data: {
            userId: newUser.id,
            studentNo,
            department,
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
            competencies: [],
            mentorshipTopics: [],
          },
        });
      }

      if (role === "EMPLOYER" && companyName && taxNumber && sector) {
        await tx.employer.create({
          data: {
            userId: newUser.id,
            companyName,
            taxNumber,
            sector,
          },
        });
      }

      return newUser;
    });

    // Email doğrulama tokeni oluştur ve email gönder
    // Not: RESEND_API_KEY yoksa email gönderilmez, kullanıcı yine de kayıt olabilir
    try {
      if (process.env.RESEND_API_KEY) {
        const verificationToken = await generateVerificationToken(user.email);
        await sendVerificationEmail(user.email, verificationToken.token);
        
        return NextResponse.json(
          {
            message: "Kayıt başarılı! E-posta adresinize doğrulama bağlantısı gönderildi.",
            userId: user.id,
            requiresVerification: true,
          },
          { status: 201 }
        );
      }
    } catch (emailError) {
      console.error("Email gönderim hatası:", emailError);
      // Email gönderilemese bile kayıt başarılı
    }

    return NextResponse.json(
      {
        message: "Kayıt başarılı! Giriş yapabilirsiniz.",
        userId: user.id,
        requiresVerification: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json(
      { message: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
