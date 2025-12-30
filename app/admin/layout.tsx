import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  FileText,
  Shield,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
  { href: "/admin/jobs", label: "İlanlar", icon: Briefcase },
  { href: "/admin/events", label: "Etkinlikler", icon: Calendar },
  { href: "/admin/reports", label: "Raporlar", icon: FileText },
  { href: "/admin/moderation", label: "Moderasyon", icon: Shield },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Sadece Admin ve Moderator erişebilir
  if (!session?.user || !["ADMIN", "MODERATOR"].includes(session.user.role || "")) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold">Admin Paneli</h2>
          <p className="text-xs text-muted">{session.user.role}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted-bg transition-colors"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Siteye Dön
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

