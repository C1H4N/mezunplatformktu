import { prisma } from "@/lib/db";
import crypto from "crypto";

// Token oluştur (crypto ile güvenli)
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Email doğrulama tokeni oluştur
export async function generateVerificationToken(email: string) {
  const token = generateToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat

  // Var olan tokenları sil
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Yeni token oluştur
  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
}

// Email doğrulama tokenini doğrula
export async function verifyEmailToken(token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { success: false, error: "Geçersiz doğrulama bağlantısı." };
  }

  if (new Date() > verificationToken.expires) {
    // Süresi dolmuş tokeni sil
    await prisma.verificationToken.delete({
      where: { token },
    });
    return { success: false, error: "Doğrulama bağlantısının süresi dolmuş." };
  }

  // Kullanıcıyı doğrula
  const user = await prisma.user.findFirst({
    where: { email: verificationToken.identifier },
  });

  if (!user) {
    return { success: false, error: "Kullanıcı bulunamadı." };
  }

  // Kullanıcıyı doğrulanmış olarak işaretle
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });

  // Tokeni sil
  await prisma.verificationToken.delete({
    where: { token },
  });

  return { success: true, email: verificationToken.identifier };
}

// Şifre sıfırlama tokeni oluştur
export async function generatePasswordResetToken(email: string) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 saat

  // Var olan tokenları sil
  await prisma.passwordResetToken.deleteMany({
    where: { email },
  });

  // Yeni token oluştur
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return passwordResetToken;
}

// Şifre sıfırlama tokenini doğrula
export async function verifyPasswordResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return { success: false, error: "Geçersiz sıfırlama bağlantısı." };
  }

  if (new Date() > resetToken.expiresAt) {
    // Süresi dolmuş tokeni sil
    await prisma.passwordResetToken.delete({
      where: { token },
    });
    return { success: false, error: "Sıfırlama bağlantısının süresi dolmuş." };
  }

  return { success: true, email: resetToken.email };
}

// Şifre sıfırlama tokenini kullan (sil)
export async function consumePasswordResetToken(token: string) {
  await prisma.passwordResetToken.delete({
    where: { token },
  });
}

