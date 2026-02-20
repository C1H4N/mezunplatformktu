"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  Linkedin,
  Github,
  Globe,
  MessageSquare,
  Users,
  Award,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { ReportModal } from "@/app/components/ui/ReportModal";

interface AlumniProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  faculty: string;
  city: string;
  jobTitle: string;
  company: string;
  graduationYear?: number;
  linkedinUrl?: string;
  websiteUrl?: string;
  profileImage?: string;
  bio: string;
  skills: string[];
  competencies: string[];
  mentorshipTopics: string[];
  experience: {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
    period: string;
  }[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export default function AlumniProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [alumni, setAlumni] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`/api/alumni/${id}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Mezun bulunamadı");
        }
        const data = await res.json();
        setAlumni(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !alumni) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto text-muted mb-4" />
          <h2 className="text-xl font-semibold mb-2">Mezun Bulunamadı</h2>
          <p className="text-muted mb-4">{error}</p>
          <Link
            href="/mezunlar"
            className="text-primary hover:underline"
          >
            ← Mezunlara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-hover text-[#ffffff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/mezunlar"
            style={{ color: "#ffffff" }}
            className="inline-flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Mezunlara Dön
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Profil Fotoğrafı */}
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30 flex-shrink-0">
              {alumni.profileImage ? (
                <Image
                  src={alumni.profileImage}
                  alt={alumni.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-white">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              )}
            </div>

            {/* Temel Bilgiler */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {alumni.name}
              </h1>
              {(alumni.jobTitle || alumni.company) && (
                <p style={{ color: "#e6f0f9" }} className="text-xl mb-2">
                  {alumni.jobTitle}
                  {alumni.company && ` • ${alumni.company}`}
                </p>
              )}
              <div style={{ color: "#e6f0f9" }} className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {alumni.department}
                </div>
                {alumni.city && alumni.city !== "Bilinmiyor" && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {alumni.city}
                  </div>
                )}
                {alumni.graduationYear && (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Mezuniyet: {alumni.graduationYear}
                  </div>
                )}
              </div>

              {/* Sosyal Medya */}
              <div className="flex gap-3 mt-6">
                {alumni.socialLinks.linkedin && (
                  <a
                    href={alumni.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
                {alumni.socialLinks.github && (
                  <a
                    href={alumni.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
                {alumni.socialLinks.website && (
                  <a
                    href={alumni.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    Website
                  </a>
                )}
                {session?.user && session.user.id !== alumni.id && (
                  <>
                    <Link
                      href={`/messages/${alumni.id}`}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Mesaj Gönder
                    </Link>
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5" />
                      Şikayet Et
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Ana Bilgiler */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hakkında */}
            {alumni.bio && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Hakkında
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {alumni.bio}
                </p>
              </div>
            )}

            {/* Deneyim */}
            {alumni.experience.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Deneyim
                </h2>
                <div className="space-y-6">
                  {alumni.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {exp.position}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted mb-2">{exp.period}</p>
                      {exp.description && (
                        <p className="text-foreground">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eğitim */}
            {alumni.education.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Eğitim
                </h2>
                <div className="space-y-4">
                  {alumni.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold text-foreground">
                        {edu.school}
                      </h3>
                      <p className="text-primary">{edu.degree} - {edu.field}</p>
                      <p className="text-sm text-muted">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mentorluk Alanları */}
            {alumni.mentorshipTopics.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Mentorluk Alanları
                </h2>
                <div className="flex flex-wrap gap-2">
                  {alumni.mentorshipTopics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 bg-green-500/10 text-green-600 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon - Yan Bilgiler */}
          <div className="space-y-6">
            {/* İletişim */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                İletişim
              </h3>
              <div className="space-y-3">
                {alumni.email && (
                  <a
                    href={`mailto:${alumni.email}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm break-all">{alumni.email}</span>
                  </a>
                )}
                {alumni.phone && (
                  <a
                    href={`tel:${alumni.phone}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{alumni.phone}</span>
                  </a>
                )}
                {alumni.city && alumni.city !== "Bilinmiyor" && (
                  <div className="flex items-center gap-3 text-muted">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{alumni.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Yetenekler */}
            {alumni.skills.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Yetenekler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Yetkinlikler */}
            {alumni.competencies.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Yetkinlikler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {alumni.competencies.map((comp) => (
                    <span
                      key={comp}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Firma Bilgisi */}
            {alumni.company && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Mevcut Pozisyon
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{alumni.jobTitle}</p>
                    <p className="text-sm text-muted">{alumni.company}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {session?.user && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          reportedId={alumni.id}
          type="USER_PROFILE"
          title={alumni.name}
        />
      )}
    </div>
  );
}
