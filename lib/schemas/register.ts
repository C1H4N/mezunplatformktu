import { z } from "zod";

// Kullanıcı rolleri (Belge 3.2)
export const UserRoleEnum = z.enum(["STUDENT", "ALUMNI", "EMPLOYER"]);
export type UserRoleType = z.infer<typeof UserRoleEnum>;

// Şifre validasyonu - Belge 4.1.1 Validasyon Kuralları
const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalı.")
  .max(50, "Şifre en fazla 50 karakter olabilir.")
  .regex(/[A-Z]/, "Şifre en az 1 büyük harf içermeli.")
  .regex(/[a-z]/, "Şifre en az 1 küçük harf içermeli.")
  .regex(/[0-9]/, "Şifre en az 1 rakam içermeli.");

// Temel kayıt alanları
const baseSchema = z.object({
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
    .transform((val) => val.replace(/\D/g, "")) // Rakam olmayan karakterleri temizle
    .pipe(
      z.string()
        .min(10, "Telefon numarası en az 10 haneli olmalı.")
        .max(15, "Telefon numarası en fazla 15 haneli olabilir.")
    ),
  password: passwordSchema,
  confirmPassword: z.string(),
  role: UserRoleEnum,
});

// Öğrenci ek alanları (Belge 3.3)
export const studentFieldsSchema = z.object({
  studentNo: z
    .string()
    .min(5, "Öğrenci numarası en az 5 karakter olmalı.")
    .max(20, "Öğrenci numarası en fazla 20 karakter olabilir."),
  department: z
    .string()
    .min(2, "Bölüm adı en az 2 karakter olmalı.")
    .max(100, "Bölüm adı en fazla 100 karakter olabilir."),
});

// Mezun ek alanları (Belge 3.4)
export const alumniFieldsSchema = z.object({
  graduationYear: z
    .number()
    .min(1950, "Geçerli bir mezuniyet yılı giriniz.")
    .max(new Date().getFullYear(), "Mezuniyet yılı gelecekte olamaz."),
  department: z
    .string()
    .min(2, "Bölüm adı en az 2 karakter olmalı.")
    .max(100, "Bölüm adı en fazla 100 karakter olabilir."),
  currentPosition: z
    .string()
    .min(2, "Pozisyon en az 2 karakter olmalı.")
    .max(100, "Pozisyon en fazla 100 karakter olabilir.")
    .optional(),
});

// İşveren ek alanları (Belge 3.5)
export const employerFieldsSchema = z.object({
  companyName: z
    .string()
    .min(2, "Firma adı en az 2 karakter olmalı.")
    .max(100, "Firma adı en fazla 100 karakter olabilir."),
  taxNumber: z
    .string()
    .min(10, "Vergi numarası 10 karakter olmalı.")
    .max(11, "Vergi numarası en fazla 11 karakter olabilir.")
    .regex(/^\d+$/, "Vergi numarası yalnızca rakamlardan oluşmalıdır."),
  sector: z
    .string()
    .min(2, "Sektör en az 2 karakter olmalı.")
    .max(100, "Sektör en fazla 100 karakter olabilir."),
});

// Ana kayıt şeması - Şifre eşleşme kontrolü ile
export const registerSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  }
);

// Öğrenci kayıt şeması
export const studentRegisterSchema = baseSchema
  .merge(studentFieldsSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

// Mezun kayıt şeması
export const alumniRegisterSchema = baseSchema
  .merge(alumniFieldsSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

// İşveren kayıt şeması
export const employerRegisterSchema = baseSchema
  .merge(employerFieldsSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

// Tüm kayıt tiplerini birleştir
export type RegisterFormData = z.infer<typeof baseSchema> & {
  // Öğrenci alanları
  studentNo?: string;
  // Mezun alanları
  graduationYear?: number;
  currentPosition?: string;
  // Ortak
  department?: string;
  // İşveren alanları
  companyName?: string;
  taxNumber?: string;
  sector?: string;
};

// Rol bazlı validasyon fonksiyonu
export function validateRegisterByRole(data: RegisterFormData) {
  switch (data.role) {
    case "STUDENT":
      return studentRegisterSchema.safeParse(data);
    case "ALUMNI":
      return alumniRegisterSchema.safeParse(data);
    case "EMPLOYER":
      return employerRegisterSchema.safeParse(data);
    default:
      return registerSchema.safeParse(data);
  }
}
