import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPasswordResetToken, consumePasswordResetToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(1, "Token gerekli."),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı.")
    .regex(/[A-Z]/, "Şifre en az 1 büyük harf içermeli.")
    .regex(/[a-z]/, "Şifre en az 1 küçük harf içermeli.")
    .regex(/[0-9]/, "Şifre en az 1 rakam içermeli."),
});

// Token doğrulama (GET)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token eksik." },
        { status: 400 }
      );
    }

    const result = await verifyPasswordResetToken(token);

    if (!result.success) {
      return NextResponse.json(
        { valid: false, message: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: result.email,
    });
  } catch (error) {
    console.error("Token doğrulama hatası:", error);
    return NextResponse.json(
      { valid: false, message: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}

// Şifre sıfırlama (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => e.message);
      return NextResponse.json(
        { message: errors[0] },
        { status: 400 }
      );
    }

    const { token, password } = validation.data;

    // Token doğrula
    const result = await verifyPasswordResetToken(token);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: result.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    // Şifreyi hashle ve güncelle
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Tokeni sil (kullan)
    await consumePasswordResetToken(token);

    return NextResponse.json({
      message: "Şifreniz başarıyla güncellendi!",
    });
  } catch (error) {
    console.error("Şifre sıfırlama hatası:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

