import Link from "next/link";
import { buttonVariants } from "./ui/Button";

interface JobCardProps {
  id: string;
  title: string;
  companyName: string;
  location: string;
  type: "JOB" | "INTERNSHIP";
  createdAt: string;
}

export default function JobCard({
  id,
  title,
  companyName,
  location,
  type,
  createdAt,
}: JobCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:shadow-lg hover:bg-card/50 transition-all duration-300 hover:border-primary/50 group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted font-medium">{companyName}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            type === "JOB"
              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
              : "bg-purple-500/10 text-purple-500 border-purple-500/20"
          }`}
        >
          {type === "JOB" ? "İş İlanı" : "Staj"}
        </span>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg
            className="w-4 h-4 flex-shrink-0"
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
          {location}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formattedDate}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border/50">
        <Link
          href={`/jobs/${id}`}
          className={buttonVariants({ variant: "outline", className: "w-full" })}
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}
