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

export default function RegisterPage() {
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

  const handleChange = (field: Field | "confirmPassword", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
      setErrors(getZodFieldErrors(parsed.error));
      toast.error("Lütfen formdaki hataları düzeltin.");
      return;
    }

    setLoading(true);
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.toLowerCase(),
      phoneNumber: formData.countryCode + formData.phoneNumber,
      password: formData.password,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Kayıt sırasında bir hata oluştu.");
      } else {
        toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsun...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: Field | "confirmPassword") =>
    `w-full px-4 py-2 rounded-md bg-zinc-800 border ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-600 focus:ring-indigo-500"
    } focus:ring-2 outline-none placeholder:text-zinc-500 transition`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-sm p-8 border border-zinc-700 bg-zinc-900 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          KTÜ Mezun Platformu
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
            <span className="px-3 py-2 bg-zinc-800 border border-r-0 rounded-l-md border-zinc-600 text-zinc-400 text-sm select-none">
              +90
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="5xx xxx xxxx (Başına 0 koymayın)"
              autoComplete="off"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className={`${inputClass("phoneNumber")} flex-1 rounded-l-none`}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-red-400 -mt-3">{errors.phoneNumber}</p>
          )}

          {/* Şifre */}
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
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-indigo-400 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Şifre Tekrar */}
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

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full py-2 font-medium bg-indigo-600 hover:bg-indigo-700 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-zinc-400 underline underline-offset-2 hover:text-indigo-400 transition"
          >
            Zaten hesabın var mı? Giriş yap
          </Link>
        </form>
      </div>
    </div>
  );
}
