"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { flatDepartments } from "@/app/lib/constants";
import {
  Eye, EyeOff, GraduationCap, Briefcase, BookOpen, UserCog,
  ArrowLeft, ArrowRight, Check, Users, MapPin,
  Mail, Phone, User, Lock, Building2, Calendar,
} from "lucide-react";
import {
  type RegisterFormData,
  type UserRoleType,
  validateRegisterByRole,
} from "@/lib/schemas/register";
import { getZodFieldErrors } from "@/lib/utils/getZodFieldErrors";

type Step = "role" | "details";

const roles: {
  value: UserRoleType;
  label: string;
  description: string;
  icon: React.ReactNode;
  hoverBorder: string;
  iconClass: string;
}[] = [
    {
      value: "STUDENT",
      label: "Öğrenci",
      description: "Aktif MYO öğrencisi",
      icon: <GraduationCap className="w-5 h-5" />,
      hoverBorder: "hover:border-blue-400",
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      value: "ALUMNI",
      label: "Mezun",
      description: "AACOMYO mezunu",
      icon: <Briefcase className="w-5 h-5" />,
      hoverBorder: "hover:border-emerald-400",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      value: "ACADEMICIAN",
      label: "Akademisyen",
      description: "MYO öğretim üyesi",
      icon: <BookOpen className="w-5 h-5" />,
      hoverBorder: "hover:border-violet-400",
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      value: "HEAD_OF_DEPARTMENT",
      label: "Bölüm Başkanı",
      description: "Bölüm yönetim yetkilisi",
      icon: <UserCog className="w-5 h-5" />,
      hoverBorder: "hover:border-amber-400",
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

// Bölümler merkezi olarak @/app/lib/constants.ts'ten geliyor
const departments = flatDepartments;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("role");
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "", lastName: "", email: "", phoneNumber: "",
    password: "", confirmPassword: "", role: "STUDENT",
    studentNo: "", department: "",
    graduationYear: new Date().getFullYear(),
    currentPosition: "", title: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData | "confirmPassword", string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const selectedRole = roles.find((r) => r.value === formData.role);

  const handleRoleSelect = (role: UserRoleType) => {
    setFormData((p) => ({ ...p, role }));
    setStep("details");
  };

  const handleChange = (field: keyof RegisterFormData, value: string | number) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
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
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: formData.email.toLowerCase(),
          phoneNumber: "+90" + formData.phoneNumber,
        }),
      });

      // Güvenli JSON parse — API HTML döndürse de çökmez
      let data: any = {};
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        console.error("API geçersiz yanıt döndürdü (HTML/empty):", res.status, res.url);
        toast.error("Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.");
        return;
      }

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        toast.error(data.message || "Kayıt sırasında bir hata oluştu.");
      } else {
        if (data.requiresApproval) {
          toast.success("Başvurunuz alındı! Bölüm başkanı onayladıktan sonra giriş yapabilirsiniz.", { duration: 6000 });
          setTimeout(() => router.push("/login"), 3000);
        } else {
          toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
          setTimeout(() => router.push("/login"), 1500);
        }
      }
    } catch (err) {
      console.error("Register fetch hatası:", err);
      toast.error("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof RegisterFormData | "confirmPassword") =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition-all ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-primary focus:ring-primary/10"
    }`;

  const selectClass = (field: keyof RegisterFormData) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-primary focus:ring-primary/10"
    }`;

  const L = "text-[11px] font-bold text-slate-500 uppercase tracking-widest";

  const pwChecks = [
    { label: "Büyük harf", ok: /[A-Z]/.test(formData.password) },
    { label: "Küçük harf", ok: /[a-z]/.test(formData.password) },
    { label: "Rakam", ok: /[0-9]/.test(formData.password) },
    { label: "8+ karakter", ok: formData.password.length >= 8 },
  ];

  return (
    <div
      className="relative flex items-start justify-center px-4 py-12"
      style={{ minHeight: "calc(100vh - 90px)" }}
    >
      {/* Arka Plan */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/aacomyobg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2f52]/90 via-[#0e4a7a]/80 to-[#1678c8]/70" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Dekoratif daireler */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* İçerik */}
      <div className="relative z-10 w-full max-w-lg">

        {/* Kart */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 ring-1 ring-white/50">

          {/* ════ ADIM 1: Rol Seçimi ════ */}
          {step === "role" && (
            <>
              <div className="mb-7">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Hesap Oluşturun</h2>
                <p className="text-slate-500 text-sm font-medium">Platforma katılmak için hesap türünüzü seçin.</p>
              </div>

              {/* Adım göstergesi */}
              <div className="flex items-center gap-2 mb-7">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(18,91,150,0.4)]">1</div>
                <div className="flex-1 h-px bg-slate-200" />
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center">2</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelect(role.value)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/80 transition-all duration-200 text-left hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${role.hoverBorder}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${role.iconClass}`}>
                      {role.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-tight">{role.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-snug">{role.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-5 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-600 font-medium">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/login" className="text-primary hover:text-primary-hover font-bold transition-colors hover:underline underline-offset-4">
                    Giriş Yapın
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* ════ ADIM 2: Detay Formu ════ */}
          {step === "details" && (
            <>
              {/* Başlık + Geri */}
              <div className="flex items-start gap-3 mb-7">
                <button
                  type="button"
                  onClick={() => setStep("role")}
                  className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex-shrink-0 mt-0.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {formData.role === "STUDENT" && "Öğrenci Kaydı"}
                    {formData.role === "ALUMNI" && "Mezun Kaydı"}
                    {formData.role === "ACADEMICIAN" && "Akademisyen Kaydı"}
                    {formData.role === "HEAD_OF_DEPARTMENT" && "Bölüm Başkanı Kaydı"}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium mt-0.5">Bilgilerinizi eksiksiz doldurun.</p>
                </div>
              </div>

              {/* Adım göstergesi */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 h-px bg-primary/30" />
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-[0_2px_8px_rgba(18,91,150,0.4)]">2</div>
              </div>

              {/* Seçilen Rol */}
              {selectedRole && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {selectedRole.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Hesap türü</p>
                    <p className="text-sm font-bold text-slate-800">{selectedRole.label}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Ad & Soyad */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={L}>Ad</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass("firstName")} placeholder="Adınız" />
                    </div>
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className={L}>Soyad</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClass("lastName")} placeholder="Soyadınız" />
                    </div>
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                {/* E-posta */}
                <div className="space-y-1.5">
                  <label className={L}>E-posta Adresi</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass("email")} placeholder="ornek@aacomyo.edu.tr" />
                  </div>
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Telefon */}
                <div className="space-y-1.5">
                  <label className={L}>Telefon</label>
                  <div className="flex">
                    <span className="px-3.5 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-600 text-sm font-bold flex-shrink-0 flex items-center">
                      +90
                    </span>
                    <div className="relative group flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange("phoneNumber", e.target.value.replace(/\D/g, ""))}
                        className={`${inputClass("phoneNumber")} rounded-l-none`}
                        placeholder="5XX XXX XXXX"
                      />
                    </div>
                  </div>
                  {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                </div>

                {/* STUDENT */}
                {formData.role === "STUDENT" && (
                  <>
                    <div className="space-y-1.5">
                      <label className={L}>Öğrenci Numarası</label>
                      <div className="relative group">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input type="text" value={formData.studentNo} onChange={(e) => handleChange("studentNo", e.target.value)} className={inputClass("studentNo")} placeholder="Öğrenci numaranız" />
                      </div>
                      {errors.studentNo && <p className="text-xs text-red-500">{errors.studentNo}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className={L}>Bölüm</label>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select value={formData.department} onChange={(e) => handleChange("department", e.target.value)} className={selectClass("department")}>
                          <option value="">Bölüm seçin</option>
                          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* ALUMNI */}
                {formData.role === "ALUMNI" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className={L}>Bölüm</label>
                        <div className="relative group">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                          <select value={formData.department} onChange={(e) => handleChange("department", e.target.value)} className={selectClass("department")}>
                            <option value="">Bölüm seçin</option>
                            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className={L}>Mezuniyet Yılı</label>
                        <div className="relative group">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                          <select value={formData.graduationYear} onChange={(e) => handleChange("graduationYear", parseInt(e.target.value))} className={selectClass("graduationYear")}>
                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                        {errors.graduationYear && <p className="text-xs text-red-500">{errors.graduationYear}</p>}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={L}>
                        Mevcut Pozisyon{" "}
                        <span className="text-slate-400 font-normal normal-case tracking-normal">(opsiyonel)</span>
                      </label>
                      <div className="relative group">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input type="text" value={formData.currentPosition} onChange={(e) => handleChange("currentPosition", e.target.value)} className={inputClass("currentPosition")} placeholder="Örn: Yazılım Mühendisi" />
                      </div>
                    </div>
                  </>
                )}

                {/* ACADEMICIAN */}
                {formData.role === "ACADEMICIAN" && (
                  <>
                    <div className="space-y-1.5">
                      <label className={L}>Unvan</label>
                      <div className="relative group">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input type="text" value={formData.title} onChange={(e) => handleChange("title" as any, e.target.value)} className={inputClass("title" as any)} placeholder="Örn: Prof. Dr., Doç. Dr., Öğr. Gör." />
                      </div>
                      {/* @ts-ignore */}
                      {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className={L}>Bölüm</label>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select value={formData.department} onChange={(e) => handleChange("department" as any, e.target.value)} className={selectClass("department" as any)}>
                          <option value="">Bölüm seçin</option>
                          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      {/* @ts-ignore */}
                      {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* HEAD_OF_DEPARTMENT */}
                {formData.role === "HEAD_OF_DEPARTMENT" && (
                  <>
                    <div className="space-y-1.5">
                      <label className={L}>Unvan</label>
                      <div className="relative group">
                        <UserCog className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input type="text" value={formData.title} onChange={(e) => handleChange("title" as any, e.target.value)} className={inputClass("title" as any)} placeholder="Örn: Prof. Dr., Doç. Dr." />
                      </div>
                      {/* @ts-ignore */}
                      {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className={L}>Bölüm</label>
                      <div className="relative group">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select value={formData.department} onChange={(e) => handleChange("department" as any, e.target.value)} className={selectClass("department" as any)}>
                          <option value="">Bölüm seçin</option>
                          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      {/* @ts-ignore */}
                      {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* Şifre */}
                <div className="space-y-1.5">
                  <label className={L}>Şifre</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`${inputClass("password")} pr-11`}
                      placeholder="En az 8 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  {formData.password.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {pwChecks.map(({ label, ok }) => (
                        <span key={label} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                          {ok && <Check className="w-3 h-3" />}
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Şifre Tekrar */}
                <div className="space-y-1.5">
                  <label className={L}>Şifre Tekrar</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className={inputClass("confirmPassword")}
                      placeholder="Şifrenizi tekrar girin"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>

                {/* Kayıt Butonu */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-[#0e7490] hover:from-primary-hover hover:to-primary text-white font-bold text-[15px] shadow-[0_6px_20px_rgba(18,91,150,0.35)] hover:shadow-[0_10px_28px_rgba(18,91,150,0.45)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-1"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Kayıt olunuyor…
                    </>
                  ) : (
                    <>
                      Kayıt Ol
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-5 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-600 font-medium">
                    Zaten hesabınız var mı?{" "}
                    <Link href="/login" className="text-primary hover:text-primary-hover font-bold transition-colors hover:underline underline-offset-4">
                      Giriş Yapın
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-white/50 mt-6 leading-relaxed px-4">
          Bu platform yalnızca KTÜ Araklı Ali Cevat Özyurt MYO mensuplarına ve mezunlarına özeldir.
        </p>
      </div>
    </div>
  );
}
