"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { buttonVariants } from "../components/ui/Button";
import { X, Plus, Eye, EyeOff, Users, Building2, Lock, FileText, Upload } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
}

type ProfileVisibility = "PUBLIC" | "REGISTERED" | "EMPLOYERS" | "PRIVATE";

const visibilityOptions: { value: ProfileVisibility; label: string; description: string; icon: React.ReactNode }[] = [
  { value: "PUBLIC", label: "Herkese Açık", description: "Herkes profilinizi görebilir", icon: <Eye className="w-4 h-4" /> },
  { value: "REGISTERED", label: "Kayıtlı Kullanıcılar", description: "Sadece giriş yapmış kullanıcılar", icon: <Users className="w-4 h-4" /> },
  { value: "EMPLOYERS", label: "Sadece İşverenler", description: "Sadece işverenler görebilir", icon: <Building2 className="w-4 h-4" /> },
  { value: "PRIVATE", label: "Gizli", description: "Sadece siz görebilirsiniz", icon: <Lock className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  // State for sections
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  
  // Profile fields
  const [bio, setBio] = useState("");
  const [profileVisibility, setProfileVisibility] = useState<ProfileVisibility>("PUBLIC");
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  
  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const [isEditBioOpen, setIsEditBioOpen] = useState(false);
  const [isEditVisibilityOpen, setIsEditVisibilityOpen] = useState(false);
  
  // Profile Form Data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  // Experience Form Data
  const [experienceData, setExperienceData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Education Form Data
  const [educationData, setEducationData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        phoneNumber: session.user.phoneNumber || "",
        email: session.user.email || "",
      });
      fetchExperiences();
      fetchEducations();
      fetchSkills();
      fetchProfileDetails();
    }
  }, [session]);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/profile/experience");
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences", error);
    }
  };

  const fetchEducations = async () => {
    try {
      const res = await fetch("/api/profile/education");
      const data = await res.json();
      setEducations(data);
    } catch (error) {
      console.error("Failed to fetch educations", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/profile/skills");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSkills(data);
      }
    } catch (error) {
      console.error("Failed to fetch skills", error);
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const res = await fetch("/api/user/update");
      const data = await res.json();
      if (data.bio) setBio(data.bio);
      if (data.profileVisibility) setProfileVisibility(data.profileVisibility);
      if (data.cvUrl) setCvUrl(data.cvUrl);
    } catch (error) {
      console.error("Failed to fetch profile details", error);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    
    try {
      const res = await fetch("/api/profile/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newSkill.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Yetenek eklenemedi");
        return;
      }

      toast.success("Yetenek eklendi!");
      setNewSkill("");
      fetchSkills();
    } catch (error) {
      toast.error("Bir hata oluştu");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await fetch(`/api/profile/skills?id=${id}`, { method: "DELETE" });
      toast.success("Yetenek silindi");
      fetchSkills();
    } catch (error) {
      toast.error("Bir hata oluştu");
    }
  };

  const handleUpdateBio = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio }),
      });

      if (!res.ok) throw new Error("Güncelleme başarısız");
      
      toast.success("Biyografi güncellendi!");
      setIsEditBioOpen(false);
    } catch (error) {
      toast.error("Bir hata oluştu");
    }
  };

  const handleUpdateVisibility = async (newVisibility: ProfileVisibility) => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileVisibility: newVisibility }),
      });

      if (!res.ok) throw new Error("Güncelleme başarısız");
      
      setProfileVisibility(newVisibility);
      toast.success("Görünürlük ayarı güncellendi!");
      setIsEditVisibilityOpen(false);
    } catch (error) {
      toast.error("Bir hata oluştu");
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Sadece PDF dosyası yükleyebilirsiniz");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("Dosya boyutu 5MB'dan küçük olmalı");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Yükleme başarısız");
      
      const { url } = await uploadRes.json();

      const updateRes = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvUrl: url }),
      });

      if (!updateRes.ok) throw new Error("Güncelleme başarısız");

      setCvUrl(url);
      toast.success("CV yüklendi!");
    } catch (error) {
      toast.error("CV yüklenirken hata oluştu");
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Güncelleme başarısız");

      await update({
        ...session,
        user: { ...session?.user, ...data },
      });

      toast.success("Profil güncellendi!");
      setIsEditProfileOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Hata oluştu.");
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
      });

      if (!res.ok) throw new Error("Ekleme başarısız");

      toast.success("Deneyim eklendi!");
      setIsAddExperienceOpen(false);
      setExperienceData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      fetchExperiences();
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educationData),
      });

      if (!res.ok) throw new Error("Ekleme başarısız");

      toast.success("Eğitim eklendi!");
      setIsAddEducationOpen(false);
      setEducationData({
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      fetchEducations();
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Bu deneyimi silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`/api/profile/experience?id=${id}`, { method: "DELETE" });
      toast.success("Deneyim silindi.");
      fetchExperiences();
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!confirm("Bu eğitimi silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`/api/profile/education?id=${id}`, { method: "DELETE" });
      toast.success("Eğitim silindi.");
      fetchEducations();
    } catch (error) {
      toast.error("Hata oluştu.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "coverImage") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      const { url } = await uploadRes.json();

      // Update user profile immediately
      const updateRes = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [type]: url }),
      });

      if (!updateRes.ok) throw new Error("Update failed");

      const updatedUser = await updateRes.json();
      await update({
        ...session,
        user: { ...session?.user, ...updatedUser },
      });

      toast.success("Resim güncellendi!");
    } catch (error) {
      console.error(error);
      toast.error("Resim yüklenirken hata oluştu.");
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-muted-bg/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group relative">
          {/* Cover Image */}
          <div className="h-48 relative bg-gradient-to-r from-primary/20 to-primary/5">
            {session.user.coverImage && (
              <Image
                src={session.user.coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            )}
            <label className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "coverImage")}
              />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-4">
              <div className="relative group/avatar">
                <div className="w-32 h-32 rounded-full border-4 border-card bg-muted flex items-center justify-center overflow-hidden relative">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.firstName || ""}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-muted-foreground">
                      {session.user.firstName?.[0]}
                      {session.user.lastName?.[0]}
                    </span>
                  )}
                  
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "image")}
                    />
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Profili Düzenle
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {session.user.firstName} {session.user.lastName}
              </h1>
              {experiences.find(exp => exp.current || !exp.endDate) && (
                <p className="text-lg font-medium text-primary mt-1">
                  {experiences.find(exp => exp.current || !exp.endDate)?.title} @ {experiences.find(exp => exp.current || !exp.endDate)?.company}
                </p>
              )}
              <p className="text-muted-foreground mt-1">{session.user.email}</p>
              <p className="text-muted-foreground text-sm mt-1">{session.user.phoneNumber}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {session.user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Deneyim</h2>
            <button
              onClick={() => setIsAddExperienceOpen(true)}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {experiences.length === 0 ? (
              <p className="text-muted-foreground text-sm">Henüz deneyim eklenmemiş.</p>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="flex gap-4 group">
                  <div className="mt-1">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-sm text-foreground/80">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(exp.startDate).toLocaleDateString("tr-TR", { month: "short", year: "numeric" })} - 
                          {exp.current ? " Devam Ediyor" : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString("tr-TR", { month: "short", year: "numeric" })}` : ""}
                        </p>
                        {exp.location && <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    {exp.description && <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Eğitim</h2>
            <button
              onClick={() => setIsAddEducationOpen(true)}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {educations.length === 0 ? (
              <p className="text-muted-foreground text-sm">Henüz eğitim bilgisi eklenmemiş.</p>
            ) : (
              educations.map((edu) => (
                <div key={edu.id} className="flex gap-4 group">
                  <div className="mt-1">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.school}</h3>
                        <p className="text-sm text-foreground/80">{edu.degree}, {edu.fieldOfStudy}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(edu.startDate).toLocaleDateString("tr-TR", { year: "numeric" })} - 
                          {edu.current ? " Devam Ediyor" : edu.endDate ? ` ${new Date(edu.endDate).toLocaleDateString("tr-TR", { year: "numeric" })}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    {edu.description && <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Yetenekler</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills.length === 0 ? (
              <p className="text-muted-foreground text-sm">Henüz yetenek eklenmemiş.</p>
            ) : (
              skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium group"
                >
                  {skill.name}
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              placeholder="Yeni yetenek ekle..."
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
              maxLength={50}
            />
            <button
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Ekle
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Hakkımda</h2>
            <button
              onClick={() => setIsEditBioOpen(true)}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          
          {bio ? (
            <p className="text-foreground/80 whitespace-pre-wrap">{bio}</p>
          ) : (
            <p className="text-muted-foreground text-sm">Henüz biyografi eklenmemiş. Kendinizi tanıtan bir metin ekleyin.</p>
          )}
        </div>

        {/* CV & Visibility Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CV */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Özgeçmiş (CV)</h3>
                <p className="text-xs text-muted">PDF formatında</p>
              </div>
            </div>
            
            {cvUrl ? (
              <div className="flex items-center justify-between p-3 bg-muted-bg rounded-lg">
                <span className="text-sm truncate">CV yüklendi</span>
                <div className="flex gap-2">
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Görüntüle
                  </a>
                  <label className={buttonVariants({ variant: "outline", size: "sm" }) + " cursor-pointer"}>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleCvUpload}
                    />
                    Değiştir
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleCvUpload}
                />
                <Upload className="w-8 h-8 text-muted mb-2" />
                <span className="text-sm text-muted">CV yüklemek için tıklayın</span>
                <span className="text-xs text-muted mt-1">Maksimum 5MB, PDF</span>
              </label>
            )}
          </div>

          {/* Visibility */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {visibilityOptions.find(v => v.value === profileVisibility)?.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Profil Görünürlüğü</h3>
                  <p className="text-xs text-muted">
                    {visibilityOptions.find(v => v.value === profileVisibility)?.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditVisibilityOpen(true)}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Değiştir
              </button>
            </div>
            
            <div className="p-3 bg-muted-bg rounded-lg">
              <span className="text-sm font-medium">
                {visibilityOptions.find(v => v.value === profileVisibility)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Bio Modal */}
      {isEditBioOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Hakkımda</h2>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={6}
              maxLength={1000}
              placeholder="Kendinizi tanıtın..."
              className="w-full px-3 py-2 bg-background border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary outline-none"
            />
            <p className="text-xs text-muted mt-1">{bio.length}/1000 karakter</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsEditBioOpen(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                İptal
              </button>
              <button
                onClick={handleUpdateBio}
                className={buttonVariants({ variant: "default" })}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Visibility Modal */}
      {isEditVisibilityOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Profil Görünürlüğü</h2>
            <div className="space-y-2">
              {visibilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleUpdateVisibility(option.value)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    profileVisibility === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      profileVisibility === option.value ? "bg-primary text-white" : "bg-muted-bg text-muted"
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-xs text-muted">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditVisibilityOpen(false)}
                className={buttonVariants({ variant: "ghost" })}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-bold mb-4">Profili Düzenle</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Ad</label>
                  <input
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Soyad</label>
                  <input
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Telefon Numarası</label>
                <input
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">E-posta</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  İptal
                </button>
                <button type="submit" className={buttonVariants({ variant: "default" })}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {isAddExperienceOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Deneyim Ekle</h2>
            <form onSubmit={handleAddExperience} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Ünvan *</label>
                <input
                  required
                  value={experienceData.title}
                  onChange={(e) => setExperienceData({...experienceData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: Yazılım Mühendisi"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Şirket *</label>
                <input
                  required
                  value={experienceData.company}
                  onChange={(e) => setExperienceData({...experienceData, company: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: Google"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Konum</label>
                <input
                  value={experienceData.location}
                  onChange={(e) => setExperienceData({...experienceData, location: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: İstanbul"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Başlangıç *</label>
                  <input
                    type="date"
                    required
                    value={experienceData.startDate}
                    onChange={(e) => setExperienceData({...experienceData, startDate: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bitiş</label>
                  <input
                    type="date"
                    disabled={experienceData.current}
                    value={experienceData.endDate}
                    onChange={(e) => setExperienceData({...experienceData, endDate: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentExp"
                  checked={experienceData.current}
                  onChange={(e) => setExperienceData({...experienceData, current: e.target.checked})}
                  className="rounded border-border"
                />
                <label htmlFor="currentExp" className="text-sm">Hala burada çalışıyorum</label>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Açıklama</label>
                <textarea
                  rows={3}
                  value={experienceData.description}
                  onChange={(e) => setExperienceData({...experienceData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddExperienceOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  İptal
                </button>
                <button type="submit" className={buttonVariants({ variant: "default" })}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Education Modal */}
      {isAddEducationOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-lg shadow-2xl animate-fade-in-up overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Eğitim Ekle</h2>
            <form onSubmit={handleAddEducation} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Okul *</label>
                <input
                  required
                  value={educationData.school}
                  onChange={(e) => setEducationData({...educationData, school: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: Karadeniz Teknik Üniversitesi"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Derece *</label>
                <input
                  required
                  value={educationData.degree}
                  onChange={(e) => setEducationData({...educationData, degree: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: Lisans"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bölüm *</label>
                <input
                  required
                  value={educationData.fieldOfStudy}
                  onChange={(e) => setEducationData({...educationData, fieldOfStudy: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  placeholder="Örn: Bilgisayar Mühendisliği"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Başlangıç *</label>
                  <input
                    type="date"
                    required
                    value={educationData.startDate}
                    onChange={(e) => setEducationData({...educationData, startDate: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bitiş</label>
                  <input
                    type="date"
                    disabled={educationData.current}
                    value={educationData.endDate}
                    onChange={(e) => setEducationData({...educationData, endDate: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentEdu"
                  checked={educationData.current}
                  onChange={(e) => setEducationData({...educationData, current: e.target.checked})}
                  className="rounded border-border"
                />
                <label htmlFor="currentEdu" className="text-sm">Hala devam ediyorum</label>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Açıklama</label>
                <textarea
                  rows={3}
                  value={educationData.description}
                  onChange={(e) => setEducationData({...educationData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddEducationOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  İptal
                </button>
                <button type="submit" className={buttonVariants({ variant: "default" })}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
