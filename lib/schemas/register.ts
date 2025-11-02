import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Ad en az 2 karakter olmalı.")
      .max(50, "Ad en fazla 50 karakter olabilir."),
    lastName: z
      .string()
      .min(2, "Soyad en az 2 karakter olmalı.")
      .max(50, "Soyad en fazla 50 karakter olabilir."),
    email: z.email("Geçerli bir e-posta adresi giriniz."),
    phoneNumber: z
      .string()
      .min(10, "Telefon numarası en az 10 haneli olmalı.")
      .max(15, "Telefon numarası en fazla 15 haneli olabilir.")
      .regex(/^\d+$/, "Telefon numarası yalnızca rakamlardan oluşmalıdır."),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı.")
      .max(50, "Şifre en fazla 50 karakter olabilir."),
    confirmPassword: z
      .string()
      .min(8, "Şifre tekrarı en az 8 karakter olmalı.")
      .max(50, "Şifre tekrarı en fazla 50 karakter olabilir."),
  })
  // Şifrelerin eşleşip eşleşmediğini kontrol eder
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"], // Hata mesajı confirmPassword alanına yazılacak
  });
