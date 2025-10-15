"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "@/lib/schemas/register";
import { getZodFieldErrors } from "@/lib/utils/getZodFieldErrors";
import { z } from "zod";

type Field = keyof z.infer<typeof registerSchema>;

// NOT: Zod şemasında `password` ve `confirmPassword` alanlarının
// eşleşme kontrolünü (refine) yaptığınız varsayılmıştır.

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    countryCode: "+90",
  });

  const [errors, setErrors] = useState<
    Partial<Record<Field | "confirmPassword", string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // "confirmPassword" de dahil tüm alanlar için Zod validasyonu yapılıyor.
  const handleChange = (field: Field | "confirmPassword", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Hata durumunu temizle
    setErrors((prev) => ({ ...prev, [field]: "" }));

    // Anlık validasyon, Zod şeması üzerinden yapılır.
    // confirmPassword için eşleşme kontrolü Zod'un refine metoduyla handleSubmit'e bırakılmalıdır.
    if (field !== "confirmPassword") {
      const fieldSchema = z.object({
        [field]: registerSchema.shape[field as Field],
      });
      const result = fieldSchema.safeParse({ [field]: value });

      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [field]: result.error.issues[0].message,
        }));
      }
    } else {
      // confirmPassword alanı için sadece value güncellemesi yapılır,
      // eşleşme hatası handleSubmit'te toplanır.
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Zod, refine metodu sayesinde `password === confirmPassword` kontrolünü de yapar.
    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(getZodFieldErrors(parsed.error));
      toast.error("Lütfen formdaki hataları düzeltin.");
      return;
    }

    // Validasyon başarılı: API çağrısı
    setLoading(true);

    // Payload'da telefon numarasını ülke koduyla birleştiriyoruz
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email.toLowerCase(),
      phoneNumber: formData.countryCode + formData.phoneNumber,
      password: formData.password,
      // confirmPassword, API'ye gönderilmez
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Kayıt başarılı! Girişe yönlendiriliyorsun.");
      router.push("/login");
    } else {
      const data = await res.json();
      toast.error(data.message || "Kayıt sırasında bir hata oluştu.");
    }
  };

  const inputClass = (field: Field | "confirmPassword") =>
    `w-full px-4 py-2 bg-gray-700 border ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-500 focus:ring-indigo-500" // Accent rengi
    } focus:outline-none focus:ring-1 placeholder:text-gray-400`;

  return (
    <div className="flex items-center mt-18 justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm p-8 border border-gray-600 bg-gray-800 text-white shadow-xl transition-all duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-400">
          Ktu Mezun Platformu
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {(["firstName", "lastName", "email"] as Field[]).map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "firstName"
                    ? "Ad"
                    : field === "lastName"
                    ? "Soyad"
                    : "Email"
                }
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={inputClass(field)}
              />
              {errors[field] && (
                <p className="text-xs text-red-400">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Telefon alanı */}
          <div className="flex w-full min-w-0">
            <span className="px-3 py-2 bg-gray-700 border border-r-0 border-gray-500 text-gray-400 text-sm select-none whitespace-nowrap">
              +90
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="5xx xxx xxxx (Başına 0 koymayın)"
              autoComplete="off"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className={`${inputClass("phoneNumber")} flex-1 min-w-0`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-red-400 -mt-4">{errors.phoneNumber}</p>
          )}

          {/* Şifre alanı */}
          <div className="relative flex flex-col gap-1">
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              placeholder="Şifre (Min 8 karakter)"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`${inputClass("password")} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Şifre (Artık koşulsuz gösteriliyor) */}
          <div className="flex flex-col gap-1">
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              placeholder="Şifre Tekrar"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={inputClass("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Tek sefer checkbox kaldırıldı */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-medium bg-indigo-600 text-white transition-opacity duration-300 hover:bg-indigo-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-gray-400 underline underline-offset-2 hover:text-indigo-400 transition-colors"
          >
            Zaten kendin misin? Giriş yap
          </Link>
        </form>
      </div>
    </div>
  );
}
