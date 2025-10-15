import Link from "next/link";

// Örnek veri - Gerçek uygulamada API'den gelecek
const mockAlumniDetails = {
  id: "1",
  name: "Ahmet Yılmaz",
  department: "Bilgisayar Mühendisliği",
  faculty: "Mühendislik Fakültesi",
  city: "İstanbul",
  jobTitle: "Kıdemli Yazılım Geliştirici",
  company: "Tech Corp",
  graduationYear: 2018,
  email: "ahmet.yilmaz@example.com",
  phone: "+90 555 123 4567",
  linkedinUrl: "https://linkedin.com/in/ahmetyilmaz",
  websiteUrl: "https://ahmetyilmaz.com",
  profileImage: "",
  bio: `Bilgisayar Mühendisliği mezunu olarak 5+ yıldır yazılım geliştirme alanında çalışmaktayım. 
  Modern web teknolojileri ve bulut altyapıları konusunda deneyimliyim. Açık kaynak projelere katkıda 
  bulunmayı ve yeni teknolojileri öğrenmeyi seviyorum. KTÜ'deki eğitimim sayesinde güçlü bir teknik 
  altyapı ve problem çözme becerileri kazandım.`,
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
  ],
  languages: [
    { name: "Türkçe", level: "Ana Dil" },
    { name: "İngilizce", level: "İleri" },
    { name: "Almanca", level: "Orta" },
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Kıdemli Yazılım Geliştirici",
      period: "2021 - Günümüz",
      description:
        "Full-stack web uygulamaları geliştirme, mikroservis mimarisi tasarımı",
    },
    {
      company: "Startup XYZ",
      position: "Yazılım Geliştirici",
      period: "2018 - 2021",
      description: "React ve Node.js kullanarak SaaS ürün geliştirme",
    },
  ],
};

export default function AlumniProfile({ params }: { params: { id: string } }) {
  const alumni = mockAlumniDetails;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-hover to-accent text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Mezunlara Dön
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Profil Fotoğrafı */}
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30 flex-shrink-0">
              {alumni.profileImage ? (
                <img
                  src={alumni.profileImage}
                  alt={alumni.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-white">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>

            {/* Temel Bilgiler */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {alumni.name}
              </h1>
              <p className="text-xl text-blue-100 mb-2">
                {alumni.jobTitle} • {alumni.company}
              </p>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {alumni.faculty}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {alumni.city}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Mezuniyet: {alumni.graduationYear}
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="flex gap-3 mt-6">
                {alumni.linkedinUrl && (
                  <a
                    href={alumni.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {alumni.websiteUrl && (
                  <a
                    href={alumni.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Website
                  </a>
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
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Hakkında
              </h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {alumni.bio}
              </p>
            </div>

            {/* Deneyim */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Deneyim
              </h2>
              <div className="space-y-6">
                {alumni.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.position}
                    </h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted mb-2">{exp.period}</p>
                    <p className="text-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Yan Bilgiler */}
          <div className="space-y-6">
            {/* İletişim */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                İletişim
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${alumni.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm break-all">{alumni.email}</span>
                </a>
                <a
                  href={`tel:${alumni.phone}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">{alumni.phone}</span>
                </a>
              </div>
            </div>

            {/* Yetenekler */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Yetenekler
              </h3>
              <div className="flex flex-wrap gap-2">
                {alumni.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-primary-light text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Diller */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Diller
              </h3>
              <div className="space-y-3">
                {alumni.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-foreground font-medium">
                      {lang.name}
                    </span>
                    <span className="text-sm text-muted">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eğitim */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Eğitim
              </h3>
              <div>
                <h4 className="font-semibold text-foreground">
                  {alumni.department}
                </h4>
                <p className="text-muted text-sm">{alumni.faculty}</p>
                <p className="text-muted text-sm">
                  Mezuniyet: {alumni.graduationYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
