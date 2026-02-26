"use client";

import { useState, useEffect } from "react";
import {
    Megaphone, Plus, Trash2, Edit2, Pin, PinOff,
    X, Save, Search, Calendar, User,
} from "lucide-react";
import toast from "react-hot-toast";

interface Announcement {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
    author: { firstName: string; lastName: string; email: string };
}

interface FormState {
    title: string;
    content: string;
    imageUrl: string;
    isPinned: boolean;
}

const emptyForm: FormState = { title: "", content: "", imageUrl: "", isPinned: false };

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchAnnouncements(); }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch("/api/admin/announcements");
            if (!res.ok) throw new Error();
            setAnnouncements(await res.json());
        } catch {
            toast.error("Duyurular yüklenemedi");
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (a: Announcement) => {
        setEditingId(a.id);
        setForm({ title: a.title, content: a.content, imageUrl: a.imageUrl ?? "", isPinned: a.isPinned });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            toast.error("Başlık ve içerik zorunludur");
            return;
        }
        setSaving(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = editingId
                ? { id: editingId, ...form }
                : form;
            const res = await fetch("/api/admin/announcements", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error();
            toast.success(editingId ? "Duyuru güncellendi" : "Duyuru oluşturuldu");
            setShowModal(false);
            fetchAnnouncements();
        } catch {
            toast.error("Bir hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    const handleTogglePin = async (a: Announcement) => {
        try {
            const res = await fetch("/api/admin/announcements", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: a.id, isPinned: !a.isPinned }),
            });
            if (!res.ok) throw new Error();
            toast.success(a.isPinned ? "Sabitleme kaldırıldı" : "Duyuru sabitlendi");
            fetchAnnouncements();
        } catch {
            toast.error("İşlem başarısız");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu duyuruyu silmek istediğinizden emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/announcements?id=${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            toast.success("Duyuru silindi");
            setAnnouncements((p) => p.filter((a) => a.id !== id));
        } catch {
            toast.error("Silme işlemi başarısız");
        }
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    const filtered = announcements.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.content.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Duyuru Yönetimi</h1>
                    <p className="text-slate-500 text-sm mt-0.5">{announcements.length} duyuru</p>
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" />
                    Yeni Duyuru
                </button>
            </div>

            {/* Arama */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Duyuru ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>

            {/* Liste */}
            {filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
                    <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-600 mb-1">Henüz duyuru yok</h3>
                    <p className="text-sm text-slate-400">İlk duyuruyu oluşturmak için yukarıdaki butona tıklayın.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((a) => (
                        <div
                            key={a.id}
                            className={`bg-white border rounded-xl p-6 transition-all hover:shadow-md ${a.isPinned ? "border-primary/30 bg-primary/[0.02]" : "border-slate-200"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${a.isPinned ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
                                    }`}>
                                    <Megaphone className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold text-slate-900">{a.title}</h3>
                                            {a.isPinned && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                                    <Pin className="w-3 h-3" /> Sabitlenmiş
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <button
                                                onClick={() => handleTogglePin(a)}
                                                className={`p-2 rounded-lg transition ${a.isPinned
                                                        ? "text-primary hover:bg-primary/10"
                                                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                                    }`}
                                                title={a.isPinned ? "Sabitlemeyi kaldır" : "Sabitle"}
                                            >
                                                {a.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => openEdit(a)}
                                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                                                title="Düzenle"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                                                title="Sil"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{a.content}</p>

                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" />
                                            {a.author.firstName} {a.author.lastName}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(a.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editingId ? "Duyuru Düzenle" : "Yeni Duyuru"}
                                </h2>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    {editingId ? "Mevcut duyuruyu güncelleyin" : "Platforma yeni duyuru ekleyin"}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Başlık */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Başlık *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                    placeholder="Duyuru başlığını girin"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            {/* İçerik */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">İçerik *</label>
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                                    placeholder="Duyuru içeriğini yazın..."
                                    rows={6}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Görsel URL */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Görsel URL <span className="text-slate-400 font-normal normal-case tracking-normal">(opsiyonel)</span>
                                </label>
                                <input
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
                                    placeholder="https://..."
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            {/* Sabitle */}
                            <label className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl cursor-pointer hover:bg-primary/10 transition-colors">
                                <div className="relative flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={form.isPinned}
                                        onChange={(e) => setForm((p) => ({ ...p, isPinned: e.target.checked }))}
                                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
                                    />
                                    <svg
                                        className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Duyuruyu Sabitle</p>
                                    <p className="text-xs text-slate-500">Sabitlenmiş duyurular listenin başında gösterilir</p>
                                </div>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-60 shadow-md shadow-primary/20 hover:-translate-y-0.5"
                            >
                                {saving ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Kaydediliyor…
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        {editingId ? "Güncelle" : "Oluştur"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
