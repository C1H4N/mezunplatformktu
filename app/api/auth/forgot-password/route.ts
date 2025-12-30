import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  email: z.email("Geçerli bir e-posta adresi giriniz."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Geçerli bir e-posta adresi giriniz." },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Kullanıcı var mı kontrol et
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Güvenlik: Kullanıcı olmasa bile aynı mesajı göster
    if (!user) {
      return NextResponse.json({
        message: "Eğer bu e-posta adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.",
      });
    }

    // Token oluştur
    const resetToken = await generatePasswordResetToken(email.toLowerCase());

    // Email gönder
    const emailResult = await sendPasswordResetEmail(email, resetToken.token);

    if (!emailResult.success) {
      console.error("Email gönderim hatası:", emailResult.error);
      return NextResponse.json(
        { message: "E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Eğer bu e-posta adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderildi.",
    });
  } catch (error) {
    console.error("Şifre sıfırlama talebi hatası:", error);
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}

