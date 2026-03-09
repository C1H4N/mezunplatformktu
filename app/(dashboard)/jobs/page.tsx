"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Briefcase,
  GraduationCap,
  Search,
  Bookmark,
  Plus,
  X,
  Link2,
  MapPin,
  Clock,
  ChevronDown,
  Tag,
  Send,
  Trash2,
  Edit3,
  Building2,
  User2,
  ExternalLink,
  Filter,
  Loader2,
  Check,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

// ─── Tipler ────────────────────────────────────────────────────────────────
interface Publisher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string | null;
  moreinfo?: { company?: string; position?: string } | null;
}

interface JobPost {
  id: string;
  title: string;
  description: string;
  content?: string | null;
  location: string;
  type: string;
  status: string;
  externalLink?: string | null;
  tags: string[];
  publisher: Publisher;
  _count?: { applications: number };
  createdAt: string;
}

// ─── Config ─────────────────────────────────────────────────────────────────
const POST_TYPE_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    tag: string;
    tagText: string;
    who: string;
  }
> = {
  JOB: {
    label: "İş İlanı",
    icon: Briefcase,
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    tag: "bg-blue-100",
    tagText: "text-blue-700",
    who: "Mezun",
  },
  INTERNSHIP: {
    label: "Staj İlanı",
    icon: Building2,
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    tag: "bg-violet-100",
    tagText: "text-violet-700",
    who: "Mezun",
  },
  INTERNSHIP_REQUEST: {
    label: "Staj Arıyorum",
    icon: GraduationCap,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    tag: "bg-emerald-100",
    tagText: "text-emerald-700",
    who: "Öğrenci",
  },
  JOB_SEARCH: {
    label: "İş Arıyorum",
    icon: Search,
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    tag: "bg-amber-100",
    tagText: "text-amber-700",
    who: "Mezun / Öğrenci",
  },
};

// Hangi rol hangi türleri paylaşabilir
const ROLE_ALLOWED: Record<string, string[]> = {
  ALUMNI: ["JOB", "INTERNSHIP", "JOB_SEARCH"],
  STUDENT: ["INTERNSHIP_REQUEST", "JOB_SEARCH"],
  MODERATOR: ["JOB", "INTERNSHIP", "INTERNSHIP_REQUEST", "JOB_SEARCH"],
  ADMIN: ["JOB", "INTERNSHIP", "INTERNSHIP_REQUEST", "JOB_SEARCH"],
};

const ALL_TYPES = Object.keys(POST_TYPE_CONFIG);

// ─── Boş form ────────────────────────────────────────────────────────────────
const emptyForm = {
  title: "",
  description: "",
  content: "",
  location: "",
  type: "JOB",
  externalLink: "",
  tagInput: "",
  tags: [] as string[],
};

// ─── Bileşen ─────────────────────────────────────────────────────────────────
export default function IlanlarPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "";
  const userId = session?.user?.id || "";

  const [posts, setPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allowedTypes = ROLE_ALLOWED[userRole] || [];
  const canPost = allowedTypes.length > 0;

  useEffect(() => {
    fetchPosts();
  }, [typeFilter, search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set("type", typeFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setPosts(data.jobs || []);
    } catch {
      toast.error("İlanlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditId(null);
    setForm({ ...emptyForm, type: allowedTypes[0] || "JOB" });
    setShowModal(true);
  };

  const openEdit = (post: JobPost) => {
    setEditId(post.id);
    setForm({
      title: post.title,
      description: post.description,
      content: post.content || "",
      location: post.location,
      type: post.type,
      externalLink: post.externalLink || "",
      tagInput: "",
      tags: [...post.tags],
    });
    setShowModal(true);
  };

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t) && form.tags.length < 8) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, t], tagInput: "" }));
    }
  };

  const removeTag = (tag: string) =>
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        content: form.content || null,
        location: form.location,
        type: form.type,
        externalLink: form.externalLink || null,
        tags: form.tags,
      };
      const res = await fetch(editId ? `/api/jobs/${editId}` : "/api/jobs", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      toast.success(editId ? "İlan güncellendi!" : "İlan paylaşıldı!");
      setShowModal(false);
      fetchPosts();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("İlan silindi");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      toast.error(e.message || "Silinemedi");
    }
  };

  const handleClose = async (id: string) => {
    try {
      await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CLOSED" }),
      });
      toast.success("İlan kapatıldı");
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "CLOSED" } : p)),
      );
    } catch {
      toast.error("Güncellenemedi");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                İlanlar
              </h1>
              <p className="text-xs text-slate-400">
                {posts.length} paylaşım · İş, staj ve kariyer fırsatları
              </p>
            </div>
          </div>
          {canPost && (
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-sm transition shrink-0"
            >
              <Plus className="w-4 h-4" /> Paylaş
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Filtreler */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setTypeFilter("")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${!typeFilter ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Tümü
            </button>
            {ALL_TYPES.map((t) => {
              const cfg = POST_TYPE_CONFIG[t];
              const Icon = cfg.icon;
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(typeFilter === t ? "" : t)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    typeFilter === t
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} border`
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* İlan Listesi */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-200" />
            <p className="text-slate-500 font-medium">Henüz ilan yok</p>
            {canPost && (
              <button
                onClick={openCreate}
                className="mt-4 text-primary text-sm font-semibold hover:underline"
              >
                İlk ilanı siz paylaşın →
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const cfg = POST_TYPE_CONFIG[post.type] || POST_TYPE_CONFIG.JOB;
              const Icon = cfg.icon;
              const isOwner = post.publisher.id === userId;
              const isAdminUser = ["ADMIN", "MODERATOR"].includes(userRole);
              const canEdit = isOwner || isAdminUser;
              const isExpanded = expandedId === post.id;
              const isClosed = post.status === "CLOSED";

              return (
                <div
                  key={post.id}
                  className={`bg-white rounded-2xl border transition-all ${isClosed ? "opacity-60 border-slate-100" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
                >
                  {/* Kart üstü */}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="shrink-0">
                        {post.publisher.image ? (
                          <Image
                            src={post.publisher.image}
                            alt={post.publisher.firstName}
                            width={44}
                            height={44}
                            className="rounded-full object-cover w-11 h-11"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {post.publisher.firstName[0]}
                            {post.publisher.lastName[0]}
                          </div>
                        )}
                      </div>

                      {/* İçerik */}
                      <div className="flex-1 min-w-0">
                        {/* Üst satır: yayıncı + tür badge + tarih */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-slate-900">
                            {post.publisher.firstName} {post.publisher.lastName}
                          </span>
                          {post.publisher.moreinfo?.company && (
                            <span className="text-xs text-slate-400">
                              · {post.publisher.moreinfo.company}
                            </span>
                          )}
                          <span
                            className={`ml-auto flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
                          >
                            <Icon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                          {isClosed && (
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-semibold">
                              Kapatıldı
                            </span>
                          )}
                        </div>

                        {/* Başlık */}
                        <h2 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                          {post.title}
                        </h2>

                        {/* Açıklama */}
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {post.description}
                        </p>

                        {/* Meta bilgiler */}
                        <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-400">
                          {post.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {post.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDistanceToNow(new Date(post.createdAt), {
                              addSuffix: true,
                              locale: tr,
                            })}
                          </span>
                          {(post._count?.applications ?? 0) > 0 && (
                            <span className="flex items-center gap-1">
                              <User2 className="w-3 h-3" />{" "}
                              {post._count?.applications} başvuru
                            </span>
                          )}
                        </div>

                        {/* Etiketler */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.tag} ${cfg.tagText}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detaylı içerik toggle */}
                    {(post.content || post.externalLink) && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : post.id)
                        }
                        className="mt-3 ml-15 flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                        {isExpanded ? "Daha az göster" : "Detayları gör"}
                      </button>
                    )}
                  </div>

                  {/* Genişletilmiş içerik */}
                  {isExpanded && (post.content || post.externalLink) && (
                    <div className="px-5 pb-4 border-t border-slate-100 pt-4 ml-15">
                      {post.content && (
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mb-3">
                          {post.content}
                        </p>
                      )}
                      {post.externalLink && (
                        <a
                          href={post.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-sm font-semibold transition"
                        >
                          <Link2 className="w-4 h-4" />
                          Bağlantıya Git
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Alt aksiyon bar */}
                  <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/jobs/${post.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> İlan Sayfasını
                      İncele
                    </Link>

                    {canEdit && (
                      <>
                        <button
                          onClick={() => openEdit(post)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition ml-auto"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Düzenle
                        </button>
                        {!isClosed && (
                          <button
                            onClick={() => handleClose(post.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <Check className="w-3.5 h-3.5" /> Kapat
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition ${canEdit ? "" : "ml-auto"}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Sil
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── PAYLAŞ / DÜZENLE MODALI ─────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="font-bold text-slate-900">
                {editId ? "İlanı Düzenle" : "Yeni Paylaşım"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                {/* Tür seçimi */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Paylaşım Türü
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(editId ? ALL_TYPES : allowedTypes).map((t) => {
                      const cfg = POST_TYPE_CONFIG[t];
                      const Icon = cfg.icon;
                      const active = form.type === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, type: t }))
                          }
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition ${
                            active
                              ? `${cfg.bg} ${cfg.border} ${cfg.text}`
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {cfg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Başlık */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Başlık *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder={
                      form.type === "JOB"
                        ? "Örn: Kıdemli Python Geliştirici Aranıyor"
                        : form.type === "INTERNSHIP"
                          ? "Örn: Yaz Stajyeri Aranıyor — Yazılım"
                          : form.type === "INTERNSHIP_REQUEST"
                            ? "Örn: Bilgisayar Bölümü Öğrencisi Staj Arıyor"
                            : "Örn: Yazılım Mühendisi İş Arıyor"
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                  />
                </div>

                {/* Kısa açıklama */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Kısa Açıklama *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Kısaca ne arıyorsunuz / sunuyorsunuz?"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                  />
                </div>

                {/* Detaylı içerik */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Detaylı İçerik{" "}
                    <span className="text-slate-400 font-normal">
                      (İsteğe bağlı)
                    </span>
                  </label>
                  <textarea
                    rows={4}
                    value={form.content}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Gereksinimler, beklentiler, iletişim bilgileri vb."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none"
                  />
                </div>

                {/* Lokasyon + Link */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      Konum
                    </label>
                    <input
                      value={form.location}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Uzaktan / İstanbul..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      <Link2 className="w-3 h-3 inline mr-1" />
                      Bağlantı
                    </label>
                    <input
                      type="url"
                      value={form.externalLink}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          externalLink: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                {/* Etiketler */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    <Tag className="w-3 h-3 inline mr-1" />
                    Etiketler
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={form.tagInput}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          tagInput: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Etiket ekle (Enter)..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 text-sm transition"
                    >
                      +
                    </button>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition"
              >
                İptal
              </button>
              <button
                form="jobForm"
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-sm transition"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />{" "}
                    {editId ? "Güncelle" : "Paylaş"}
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
