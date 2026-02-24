"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  BookOpen,
  UserCog,
  ArrowLeft,
  ArrowRight,
  Check,
  Users,
  MapPin,
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
  iconBg: string;
}[] = [
    {
      value: "STUDENT",
      label: "Öğrenci",
      description: "Aktif MYO öğrencisi",
      icon: <GraduationCap className="w-5 h-5" />,
      iconBg: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    },
    {
      value: "ALUMNI",
      label: "Mezun",
      description: "AACOMYO mezunu",
      icon: <Briefcase className="w-5 h-5" />,
      iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    },
    {
      value: "ACADEMICIAN",
      label: "Akademisyen",
      description: "MYO öğretim elemanı",
      icon: <BookOpen className="w-5 h-5" />,
      iconBg: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
    },
    {
      value: "HEAD_OF_DEPARTMENT",
      label: "Bölüm Başkanı",
      description: "Bölüm yönetim yetkilisi",
      icon: <UserCog className="w-5 h-5" />,
      iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    },
  ];

const departments = [
  "Bilgisayar Programcılığı",
  "Bilgisayar Teknolojileri",
  "Elektrik",
  "Elektronik Teknolojisi",
  "Makine",
  "Mekatronik",
  "Muhasebe ve Vergi Uygulamaları",
  "İşletme Yönetimi",
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
    studentNo: "",
    department: "",
    graduationYear: new Date().getFullYear(),
    currentPosition: "",
    title: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData | "confirmPassword", string>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const selectedRole = roles.find((r) => r.value === formData.role);

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
        if (data.errors) setErrors(data.errors);
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
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 bg-white placeholder:text-gray-400 ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-gray-200 focus:border-primary focus:ring-primary/15"
    }`;

  const selectClass = (field: keyof RegisterFormData) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 bg-white appearance-none cursor-pointer ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-gray-200 focus:border-primary focus:ring-primary/15"
    }`;

  const pwChecks = [
    { label: "Büyük harf", ok: /[A-Z]/.test(formData.password) },
    { label: "Küçük harf", ok: /[a-z]/.test(formData.password) },
    { label: "Rakam", ok: /[0-9]/.test(formData.password) },
    { label: "8+ karakter", ok: formData.password.length >= 8 },
  ];

  return (
    /* Navbar yüksekliği (90px) çıkarılarak tam ekran dolduruluyor */
    <div className="flex h-[calc(100vh-90px)]">

      {/* ──────────── SOL PANEL: Marka ──────────── */}
      <div
        className="hidden lg:flex w-[42%] flex-col justify-between relative overflow-hidden flex-shrink-0"
        style={{
          background: "linear-gradient(145deg, #0a2f52 0%, #125b96 55%, #1678c8 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20"
          style={{ backgroundImage: 'url("/aacomyobg.jpg")' }}
        />
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-12 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur border border-white/20 shadow-lg overflow-hidden flex items-center justify-center">
              <Image src="/aacomyoLogo.png" alt="AACOMYO" width={44} height={44} className="object-contain" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">AACOMYO</p>
              <p className="text-white/60 text-xs">Mezun Platformu</p>
            </div>
          </div>

          {/* Metin */}
          <div>
            <span className="inline-block mb-5 py-1 px-4 rounded-full bg-white/10 border border-white/20 text-white/75 text-xs font-semibold tracking-widest uppercase">
              KTÜ Araklı Ali Cevat Özyurt MYO
            </span>
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-snug mb-4">
              Mezun Ağına<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-blue-200">
                Katılın
              </span>
            </h1>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs">
              Kayıt olarak binlerce AACOMYO mezunuyla bağlantı kurun, kariyer fırsatlarına erişin.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: Users, text: "Geniş Mezun Ağı", sub: "Binlerce mezunla bağlantı kur" },
                { icon: Briefcase, text: "Kariyer Fırsatları", sub: "Sana özel iş ilanları" },
                { icon: MapPin, text: "İnteraktif Harita", sub: "Mezun dağılımını keşfet" },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-3.5 p-3 rounded-xl bg-white/8 border border-white/10 hover:bg-white/12 transition-all">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{text}</p>
                    <p className="text-white/55 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} AACOMYO Mezun Platformu — KTÜ
          </p>
        </div>
      </div>

      {/* ──────────── SAĞ PANEL: Form ──────────── */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto bg-[#f1f5f9] px-4 sm:px-8 py-8">

        {/* Mobilde logo */}
        <div className="lg:hidden flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
            <Image src="/aacomyoLogo.png" alt="AACOMYO" width={32} height={32} className="object-contain" />
          </div>
          <span className="font-bold text-foreground text-sm">AACOMYO Mezun Platformu</span>
        </div>

        <div className="w-full max-w-lg animate-fade-in-up">

          {/* ════ ADIM 1: Rol Seçimi ════ */}
          {step === "role" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-9">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Hesap Oluşturun</h2>
                <p className="text-gray-500 text-sm">Platforma katılmak için hesap türünüzü seçin</p>
              </div>

              {/* Adım göstergesi */}
              <div className="flex items-center gap-2 mb-7">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
                <div className="flex-1 h-0.5 bg-gray-200 rounded-full" />
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-7">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelect(role.value)}
                    className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${role.iconBg}`}>
                      {role.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm leading-tight">{role.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-snug">{role.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-gray-500">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                  Giriş yapın
                </Link>
              </p>
            </div>
          )}

          {/* ════ ADIM 2: Detay Formu ════ */}
          {step === "details" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-9">
              {/* Başlık + geri */}
              <div className="flex items-start gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setStep("role")}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all flex-shrink-0 mt-0.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {formData.role === "STUDENT" && "Öğrenci Kaydı"}
                    {formData.role === "ALUMNI" && "Mezun Kaydı"}
                    {formData.role === "ACADEMICIAN" && "Akademisyen Kaydı"}
                    {formData.role === "HEAD_OF_DEPARTMENT" && "Bölüm Başkanı Kaydı"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">Bilgilerinizi eksiksiz doldurun</p>
                </div>
              </div>

              {/* Adım göstergesi */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 rounded-full" />
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
              </div>

              {/* Seçilen rol rozeti */}
              {selectedRole && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {selectedRole.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seçilen hesap türü</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedRole.label}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ad / Soyad */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad</label>
                    <input type="text" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className={inputClass("firstName")} placeholder="Adınız" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Soyad</label>
                    <input type="text" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className={inputClass("lastName")} placeholder="Soyadınız" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* E-posta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta Adresi</label>
                  <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass("email")} placeholder="ornek@aacomyo.edu.tr" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
                  <div className="flex">
                    <span className="px-3.5 py-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm flex items-center font-medium">+90</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value.replace(/\D/g, ""))}
                      className={`${inputClass("phoneNumber")} rounded-l-none`}
                      placeholder="5XX XXX XXXX"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* STUDENT */}
                {formData.role === "STUDENT" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Öğrenci Numarası</label>
                      <input type="text" value={formData.studentNo} onChange={(e) => handleChange("studentNo", e.target.value)} className={inputClass("studentNo")} placeholder="Öğrenci numaranız" />
                      {errors.studentNo && <p className="text-xs text-red-500 mt-1">{errors.studentNo}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Bölüm</label>
                      <select value={formData.department} onChange={(e) => handleChange("department", e.target.value)} className={selectClass("department")}>
                        <option value="">Bölüm seçin</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* ALUMNI */}
                {formData.role === "ALUMNI" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bölüm</label>
                        <select value={formData.department} onChange={(e) => handleChange("department", e.target.value)} className={selectClass("department")}>
                          <option value="">Bölüm seçin</option>
                          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mezuniyet Yılı</label>
                        <select value={formData.graduationYear} onChange={(e) => handleChange("graduationYear", parseInt(e.target.value))} className={selectClass("graduationYear")}>
                          {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                        {errors.graduationYear && <p className="text-xs text-red-500 mt-1">{errors.graduationYear}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mevcut Pozisyon <span className="text-gray-400 font-normal">(opsiyonel)</span>
                      </label>
                      <input type="text" value={formData.currentPosition} onChange={(e) => handleChange("currentPosition", e.target.value)} className={inputClass("currentPosition")} placeholder="Örn: Yazılım Mühendisi" />
                    </div>
                  </>
                )}

                {/* ACADEMICIAN */}
                {formData.role === "ACADEMICIAN" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Unvan</label>
                      <input type="text" value={formData.title} onChange={(e) => handleChange("title" as any, e.target.value)} className={inputClass("title" as any)} placeholder="Örn: Prof. Dr., Doç. Dr., Öğr. Gör." />
                      {/* @ts-ignore */}
                      {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Bölüm</label>
                      <select value={formData.department} onChange={(e) => handleChange("department" as any, e.target.value)} className={selectClass("department" as any)}>
                        <option value="">Bölüm seçin</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {/* @ts-ignore */}
                      {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* HEAD_OF_DEPARTMENT */}
                {formData.role === "HEAD_OF_DEPARTMENT" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Unvan</label>
                      <input type="text" value={formData.title} onChange={(e) => handleChange("title" as any, e.target.value)} className={inputClass("title" as any)} placeholder="Örn: Prof. Dr., Doç. Dr." />
                      {/* @ts-ignore */}
                      {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Bölüm</label>
                      <select value={formData.department} onChange={(e) => handleChange("department" as any, e.target.value)} className={selectClass("department" as any)}>
                        <option value="">Bölüm seçin</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {/* @ts-ignore */}
                      {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                    </div>
                  </>
                )}

                {/* Şifre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`${inputClass("password")} pr-12`}
                      placeholder="En az 8 karakter"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  {formData.password.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {pwChecks.map(({ label, ok }) => (
                        <span key={label} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-all ${ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>
                          {ok && <Check className="w-3 h-3" />}
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Şifre Tekrar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre Tekrar</label>
                  <input type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} className={inputClass("confirmPassword")} placeholder="Şifrenizi tekrar girin" />
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Kayıt Butonu */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
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

                <p className="text-center text-sm text-gray-500 pt-1">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                    Giriş yapın
                  </Link>
                </p>
              </form>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed px-2">
            Bu platform yalnızca KTÜ Araklı Ali Cevat Özyurt MYO mensuplarına özeldir.
          </p>
        </div>
      </div>
    </div>
  );
}
