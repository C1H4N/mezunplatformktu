"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  X,
  Save,
  Search,
  Tag,
  Power,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

interface Program {
  id: string;
  name: string;
  isActive: boolean;
  departmentId: string;
}

interface Department {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  isActive: boolean;
  programs: Program[];
}

type ModalType = "dept" | "program" | null;

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const [deptForm, setDeptForm] = useState({
    name: "",
    code: "",
    description: "",
  });
  const [progForm, setProgForm] = useState({ name: "", departmentId: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/admin/departments?all=true");
      if (!res.ok) throw new Error();
      setDepartments(await res.json());
    } catch {
      toast.error("Bölümler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const openNewDept = () => {
    setEditingId(null);
    setDeptForm({ name: "", code: "", description: "" });
    setModalType("dept");
  };

  const openEditDept = (d: Department) => {
    setEditingId(d.id);
    setDeptForm({
      name: d.name,
      code: d.code ?? "",
      description: d.description ?? "",
    });
    setModalType("dept");
  };

  const openNewProgram = (deptId: string) => {
    setSelectedDeptId(deptId);
    setEditingId(null);
    setProgForm({ name: "", departmentId: deptId });
    setModalType("program");
  };

  const saveDept = async () => {
    if (!deptForm.name.trim()) {
      toast.error("Bölüm adı zorunludur");
      return;
    }
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...deptForm } : deptForm;
      const res = await fetch("/api/admin/departments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }
      toast.success(editingId ? "Bölüm güncellendi" : "Bölüm oluşturuldu");
      setModalType(null);
      fetchDepartments();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const saveProgram = async () => {
    if (!progForm.name.trim()) {
      toast.error("Program adı zorunludur");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progForm),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }
      toast.success("Program eklendi");
      setModalType(null);
      fetchDepartments();
    } catch (e: any) {
      toast.error(e.message || "Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const toggleDeptActive = async (d: Department) => {
    try {
      const res = await fetch("/api/admin/departments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: d.id, isActive: !d.isActive }),
      });
      if (!res.ok) throw new Error();
      toast.success(d.isActive ? "Bölüm pasif yapıldı" : "Bölüm aktif yapıldı");
      fetchDepartments();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Bu programı silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Program silindi");
      fetchDepartments();
    } catch {
      toast.error("Silinemedi");
    }
  };

  const deleteDept = async (id: string) => {
    if (
      !confirm(
        "Bu bölümü ve tüm programlarını silmek istediğinizden emin misiniz?",
      )
    )
      return;
    try {
      const res = await fetch(`/api/admin/departments?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.error);
      }
      toast.success("Bölüm silindi");
      fetchDepartments();
    } catch (e: any) {
      toast.error(e.message || "Silinemedi");
    }
  };

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.code && d.code.toLowerCase().includes(search.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all";
  const labelCls = "text-xs font-bold text-slate-500 uppercase tracking-widest";

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Bölüm & Program Yönetimi
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {departments.length} bölüm ·{" "}
            {departments.reduce((a, d) => a + d.programs.length, 0)} program
          </p>
        </div>
        <button
          onClick={openNewDept}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Yeni Bölüm
        </button>
      </div>

      {/* Arama */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Bölüm ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-16 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Bölüm bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((dept) => {
            const isExpanded = expandedId === dept.id;
            return (
              <div
                key={dept.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${dept.isActive ? "border-slate-200" : "border-slate-200 opacity-60"}`}
              >
                {/* Bölüm satırı */}
                <div className="flex items-center gap-4 p-5">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : dept.id)}
                    className="text-slate-400 hover:text-slate-600 transition flex-shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">
                        {dept.name}
                      </h3>
                      {dept.code && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-mono font-semibold">
                          {dept.code}
                        </span>
                      )}
                      {!dept.isActive && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-xs font-semibold">
                          Pasif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {dept.programs.length} program
                      {dept.description && ` · ${dept.description}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openNewProgram(dept.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Program
                    </button>
                    <button
                      onClick={() => openEditDept(dept)}
                      className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleDeptActive(dept)}
                      className={`p-2 rounded-lg transition ${dept.isActive ? "text-green-500 hover:bg-green-50" : "text-slate-400 hover:bg-slate-100"}`}
                      title={dept.isActive ? "Pasif yap" : "Aktif yap"}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDept(dept.id)}
                      className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Programlar */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
                    {dept.programs.length === 0 ? (
                      <p className="text-sm text-slate-400 py-3 text-center">
                        Bu bölümde henüz program yok.
                      </p>
                    ) : (
                      <div className="space-y-2 py-1">
                        {dept.programs.map((prog) => (
                          <div
                            key={prog.id}
                            className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-slate-200"
                          >
                            <div className="flex items-center gap-2.5">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium text-slate-700">
                                {prog.name}
                              </span>
                              {!prog.isActive && (
                                <span className="text-xs text-red-400 font-semibold">
                                  (Pasif)
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => deleteProgram(prog.id)}
                              className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bölüm Modal */}
      {modalType === "dept" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalType(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Bölüm Düzenle" : "Yeni Bölüm"}
              </h2>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Bölüm Adı *</label>
                <input
                  type="text"
                  value={deptForm.name}
                  onChange={(e) =>
                    setDeptForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Örn: Lojistik Programı"
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>
                  Kısa Kod{" "}
                  <span className="text-slate-400 font-normal normal-case tracking-normal">
                    (opsiyonel)
                  </span>
                </label>
                <input
                  type="text"
                  value={deptForm.code}
                  onChange={(e) =>
                    setDeptForm((p) => ({ ...p, code: e.target.value }))
                  }
                  placeholder="Örn: BT"
                  className={inputCls}
                  maxLength={10}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>
                  Açıklama{" "}
                  <span className="text-slate-400 font-normal normal-case tracking-normal">
                    (opsiyonel)
                  </span>
                </label>
                <textarea
                  value={deptForm.description}
                  onChange={(e) =>
                    setDeptForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="Bölüm hakkında kısa açıklama..."
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
              >
                İptal
              </button>
              <button
                onClick={saveDept}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-60 shadow-md shadow-primary/20"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingId ? "Güncelle" : "Oluştur"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Modal */}
      {modalType === "program" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalType(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Program Ekle
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  {departments.find((d) => d.id === selectedDeptId)?.name}
                </p>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-1.5">
                <label className={labelCls}>Program Adı *</label>
                <input
                  type="text"
                  value={progForm.name}
                  onChange={(e) =>
                    setProgForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Örn: Yapay Zekâ Operatörlüğü Teknikleri"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
              >
                İptal
              </button>
              <button
                onClick={saveProgram}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-60 shadow-md shadow-primary/20"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
