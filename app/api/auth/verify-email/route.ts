import { NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/tokens";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Doğrulama tokeni eksik." },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "E-posta adresiniz başarıyla doğrulandı!",
      email: result.email,
    });
  } catch (error) {
    console.error("Email doğrulama hatası:", error);
    return NextResponse.json(
      { message: "Doğrulama sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}

