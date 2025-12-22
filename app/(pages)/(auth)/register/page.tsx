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
    `w-full bg-white/10 border ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-700 focus:ring-zinc-500"
    } p-2 rounded-md focus:ring-2 outline-none transition`;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 bg-black/20 border border-zinc-700 rounded-xl shadow-xl w-full max-w-sm animate-fade-in-up"
      >
        <h1 className="text-2xl font-bold text-center mb-2 animate-fade-in opacity-0 animation-delay-100">Kayıt Ol</h1>

        <div className="flex flex-col gap-4 animate-fade-in opacity-0 animation-delay-200">
          {(["firstName", "lastName", "email"] as Field[]).map((field) => (
            <label key={field} className="flex flex-col text-sm">
              <span className="mb-1 text-zinc-400">
                {field === "firstName"
                  ? "Ad"
                  : field === "lastName"
                  ? "Soyad"
                  : "Email"}
              </span>
              <input
                type={field === "email" ? "email" : "text"}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={inputClass(field)}
              />
              {errors[field] && (
                <p className="text-xs text-red-400 mt-1">{errors[field]}</p>
              )}
            </label>
          ))}

          {/* Telefon alanı */}
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-zinc-400">Telefon Numarası</span>
            <div className="flex w-full min-w-0">
              <span className="px-3 py-2 bg-white/10 border border-r-0 rounded-l-md border-zinc-700 text-zinc-400 text-sm select-none flex items-center">
                +90
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="5xx xxx xxxx"
                autoComplete="off"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className={`${inputClass("phoneNumber")} rounded-l-none`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1">{errors.phoneNumber}</p>
            )}
          </label>

          {/* Şifre */}
          <label className="flex flex-col text-sm relative">
            <span className="mb-1 text-zinc-400">Şifre</span>
            <div className="relative">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`${inputClass("password")} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password}</p>
            )}
          </label>

          {/* Şifre Tekrar */}
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-zinc-400">Şifre Tekrar</span>
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={inputClass("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black py-2 rounded-md font-medium hover:bg-zinc-200 transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 animate-fade-in opacity-0 animation-delay-300"
        >
          {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </button>

        <p className="text-center text-sm text-zinc-500 animate-fade-in opacity-0 animation-delay-300">
          Zaten hesabın var mı?{" "}
          <Link
            href="/login"
            className="text-white underline hover:no-underline"
          >
            Giriş yap
          </Link>
        </p>
      </form>
    </div>
  );
}
