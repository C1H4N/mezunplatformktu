"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap, Briefcase, Building2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  type RegisterFormData,
  type UserRoleType,
  validateRegisterByRole,
} from "@/lib/schemas/register";
import { getZodFieldErrors } from "@/lib/utils/getZodFieldErrors";

type Step = "role" | "details";

const roles: { value: UserRoleType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: "STUDENT",
    label: "Öğrenci",
    description: "Aktif üniversite öğrencisi",
    icon: <GraduationCap className="w-8 h-8" />,
  },
  {
    value: "ALUMNI",
    label: "Mezun",
    description: "Üniversite mezunu",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    value: "EMPLOYER",
    label: "İşveren",
    description: "Firma / Kurum temsilcisi",
    icon: <Building2 className="w-8 h-8" />,
  },
];

const departments = [
  "Bilgisayar Mühendisliği",
  "Elektrik-Elektronik Mühendisliği",
  "Makine Mühendisliği",
  "İnşaat Mühendisliği",
  "Mimarlık",
  "Tıp Fakültesi",
  "Hukuk Fakültesi",
  "İktisat",
  "İşletme",
  "Diğer",
];

const sectors = [
  "Teknoloji / Yazılım",
  "Finans / Bankacılık",
  "Sağlık",
  "Eğitim",
  "Üretim / Sanayi",
  "Perakende / Ticaret",
  "İnşaat",
  "Danışmanlık",
  "Medya / İletişim",
  "Diğer",
];

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("role");
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    // Öğrenci
    studentNo: "",
    department: "",
    // Mezun
    graduationYear: new Date().getFullYear(),
    currentPosition: "",
    // İşveren
    companyName: "",
    taxNumber: "",
    sector: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData | "confirmPassword", string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelect = (role: UserRoleType) => {
    setFormData((prev) => ({ ...prev, role }));
    setStep("details");
  };

  const handleChange = (field: keyof RegisterFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = validateRegisterByRole(formData);
    
    if (!result.success) {
      setErrors(getZodFieldErrors(result.error));
      toast.error("Lütfen formdaki hataları düzeltin.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      email: formData.email.toLowerCase(),
      phoneNumber: "+90" + formData.phoneNumber,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        toast.error(data.message || "Kayıt sırasında bir hata oluştu.");
      } else {
        toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof RegisterFormData | "confirmPassword") =>
    `w-full bg-white/10 border ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-700 focus:ring-primary"
    } p-3 rounded-lg focus:ring-2 outline-none transition`;

  const selectClass = (field: keyof RegisterFormData) =>
    `w-full bg-white/10 border ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-700 focus:ring-primary"
    } p-3 rounded-lg focus:ring-2 outline-none transition appearance-none cursor-pointer`;

  // Rol seçim adımı
  if (step === "role") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Kayıt Ol</h1>
            <p className="text-muted">Hesap türünüzü seçin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => handleRoleSelect(role.value)}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 text-left"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  {role.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{role.label}</h3>
                <p className="text-sm text-muted">{role.description}</p>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted mt-8">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Form adımı
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setStep("role")}
            className="p-2 hover:bg-muted-bg rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">
              {formData.role === "STUDENT" && "Öğrenci Kaydı"}
              {formData.role === "ALUMNI" && "Mezun Kaydı"}
              {formData.role === "EMPLOYER" && "İşveren Kaydı"}
            </h1>
            <p className="text-sm text-muted">Bilgilerinizi doldurun</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
          {/* Temel Bilgiler */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Ad</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={inputClass("firstName")}
                placeholder="Adınız"
              />
              {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Soyad</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={inputClass("lastName")}
                placeholder="Soyadınız"
              />
              {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">E-posta</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass("email")}
              placeholder="ornek@email.com"
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Telefon Numarası</label>
            <div className="flex">
              <span className="px-4 py-3 bg-muted-bg border border-r-0 border-zinc-700 rounded-l-lg text-muted text-sm flex items-center">
                +90
              </span>
              <input
                type="tel"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value.replace(/\D/g, ""))}
                className={`${inputClass("phoneNumber")} rounded-l-none`}
                placeholder="5XX XXX XXXX"
              />
            </div>
            {errors.phoneNumber && <p className="text-xs text-red-400 mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* ROL BAZLI ALANLAR */}
          {formData.role === "STUDENT" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Öğrenci Numarası</label>
                <input
                  type="text"
                  value={formData.studentNo}
                  onChange={(e) => handleChange("studentNo", e.target.value)}
                  className={inputClass("studentNo")}
                  placeholder="Öğrenci numaranız"
                />
                {errors.studentNo && <p className="text-xs text-red-400 mt-1">{errors.studentNo}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bölüm</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className={selectClass("department")}
                >
                  <option value="">Bölüm seçin</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
              </div>
            </>
          )}

          {formData.role === "ALUMNI" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Bölüm</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className={selectClass("department")}
                  >
                    <option value="">Bölüm seçin</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Mezuniyet Yılı</label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => handleChange("graduationYear", parseInt(e.target.value))}
                    className={selectClass("graduationYear")}
                  >
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.graduationYear && <p className="text-xs text-red-400 mt-1">{errors.graduationYear}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Mevcut Pozisyon (Opsiyonel)</label>
                <input
                  type="text"
                  value={formData.currentPosition}
                  onChange={(e) => handleChange("currentPosition", e.target.value)}
                  className={inputClass("currentPosition")}
                  placeholder="Örn: Yazılım Mühendisi"
                />
              </div>
            </>
          )}

          {formData.role === "EMPLOYER" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Firma Adı</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className={inputClass("companyName")}
                  placeholder="Firma adı"
                />
                {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Vergi Numarası</label>
                  <input
                    type="text"
                    maxLength={11}
                    value={formData.taxNumber}
                    onChange={(e) => handleChange("taxNumber", e.target.value.replace(/\D/g, ""))}
                    className={inputClass("taxNumber")}
                    placeholder="10 haneli"
                  />
                  {errors.taxNumber && <p className="text-xs text-red-400 mt-1">{errors.taxNumber}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Sektör</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => handleChange("sector", e.target.value)}
                    className={selectClass("sector")}
                  >
                    <option value="">Sektör seçin</option>
                    {sectors.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.sector && <p className="text-xs text-red-400 mt-1">{errors.sector}</p>}
                </div>
              </div>
            </>
          )}

          {/* Şifre Alanları */}
          <div>
            <label className="text-sm font-medium mb-1 block">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`${inputClass("password")} pr-12`}
                placeholder="En az 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`text-xs px-2 py-1 rounded ${/[A-Z]/.test(formData.password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                {/[A-Z]/.test(formData.password) && <Check className="w-3 h-3 inline mr-1" />}
                Büyük harf
              </span>
              <span className={`text-xs px-2 py-1 rounded ${/[a-z]/.test(formData.password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                {/[a-z]/.test(formData.password) && <Check className="w-3 h-3 inline mr-1" />}
                Küçük harf
              </span>
              <span className={`text-xs px-2 py-1 rounded ${/[0-9]/.test(formData.password) ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                {/[0-9]/.test(formData.password) && <Check className="w-3 h-3 inline mr-1" />}
                Rakam
              </span>
              <span className={`text-xs px-2 py-1 rounded ${formData.password.length >= 8 ? "bg-success/20 text-success" : "bg-muted-bg text-muted"}`}>
                {formData.password.length >= 8 && <Check className="w-3 h-3 inline mr-1" />}
                8+ karakter
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Şifre Tekrar</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={inputClass("confirmPassword")}
              placeholder="Şifrenizi tekrar girin"
            />
            {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              "Kayıt olunuyor..."
            ) : (
              <>
                Kayıt Ol
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-muted">
            Zaten hesabınız var mı?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Giriş yap
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
