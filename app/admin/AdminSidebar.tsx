"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Calendar,
    FileText,
    Shield,
    Settings,
    ChevronLeft,
    Megaphone,
    AlertTriangle,
    Menu,
    X,
    LogOut,
    Building2,
    ClipboardCheck,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/users", label: "Kullanıcılar", icon: Users },
    { href: "/admin/approvals", label: "Üye Onayları", icon: ClipboardCheck },
    { href: "/admin/departments", label: "Bölüm & Program", icon: Building2 },
    { href: "/admin/announcements", label: "Duyurular", icon: Megaphone },
    { href: "/admin/jobs", label: "İlanlar", icon: Briefcase },
    { href: "/admin/events", label: "Etkinlikler", icon: Calendar },
    { href: "/admin/moderation", label: "Moderasyon", icon: Shield },
    { href: "/admin/reports", label: "Şikayetler", icon: AlertTriangle },
    { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (item: typeof navItems[0]) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    const SidebarContent = () => (
        <>
            {/* Header */}
            <div className="p-5 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">Admin Paneli</h2>
                        <p className="text-xs text-slate-400">{session?.user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active
                                ? "bg-primary text-white shadow-md shadow-primary/30"
                                : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                                }`}
                        >
                            <Icon className={`w-4.5 h-4.5 ${active ? "text-white" : "text-slate-400"}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700/50 space-y-1">
                <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Siteye Dön
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-60 bg-slate-900 flex-col flex-shrink-0 h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="relative w-64 bg-slate-900 flex flex-col h-full shadow-2xl">
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}
        </>
    );
}
