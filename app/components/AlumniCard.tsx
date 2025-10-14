import Link from "next/link";

interface AlumniCardProps {
  id: string;
  name: string;
  department: string;
  city: string;
  jobTitle?: string;
  company?: string;
  graduationYear?: number;
  linkedinUrl?: string;
  profileImage?: string;
}

export default function AlumniCard({
  id,
  name,
  department,
  city,
  jobTitle,
  company,
  graduationYear,
  linkedinUrl,
  profileImage,
}: AlumniCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:border-primary group">
      <div className="flex flex-col h-full">
        {/* Profil Fotoğrafı ve Temel Bilgi */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
              {profileImage ? (
                <img src={profileImage} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              )}
            </div>
            {linkedinUrl && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0077B5] rounded-full flex items-center justify-center border-2 border-card">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted mb-1 truncate">{department}</p>
            {graduationYear && (
              <p className="text-xs text-muted">Mezuniyet: {graduationYear}</p>
            )}
          </div>
        </div>

        {/* İş Bilgileri */}
        <div className="flex-1 space-y-2 mb-4">
          {jobTitle && (
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-muted mt-0.5 flex-shrink-0"
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{jobTitle}</p>
                {company && <p className="text-xs text-muted truncate">{company}</p>}
              </div>
            </div>
          )}

          {/* Şehir */}
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-muted flex-shrink-0"
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
            <p className="text-sm text-muted truncate">{city}</p>
          </div>
        </div>

        {/* Alt Butonlar */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Link
            href={`/mezunlar/${id}`}
            className="flex-1 px-4 py-2 text-sm font-medium text-primary bg-primary-light hover:bg-primary hover:text-white rounded-lg transition-colors text-center"
          >
            Profili Görüntüle
          </Link>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-muted hover:text-primary bg-muted-bg hover:bg-primary-light rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

