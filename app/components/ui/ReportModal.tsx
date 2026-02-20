"use client";

import { useState } from "react";
import { AlertCircle, X, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { toast } from "react-hot-toast";

type ReportType = "USER_PROFILE" | "JOB_POSTING" | "MESSAGE" | "EVENT" | "OTHER";

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportedId: string;
    type: ReportType;
    title?: string;
}

export function ReportModal({ isOpen, onClose, reportedId, type, title }: ReportModalProps) {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (reason.length < 10) {
            toast.error("Şikayet nedeni en az 10 karakter olmalıdır.");
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch("/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    reportedId,
                    type,
                    reason,
                    description,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Bir hata oluştu");
            }

            toast.success(data.message || "Şikayetiniz modatörlere iletildi.");
            setReason("");
            setDescription("");
            onClose();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500">
                        <AlertCircle className="w-5 h-5" />
                        <h2 className="font-semibold text-lg">Şikayet Et</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {title && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                            Şikayet edilecek içerik: <span className="font-medium text-slate-900 dark:text-white">{title}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Şikayet Nedeni *
                        </label>
                        <input
                            id="reason"
                            type="text"
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Örn: Uygunsuz dil / Spam içerik"
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Detaylı Açıklama (Opsiyonel)
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Şikayetinizi detaylandırın..."
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            İptal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || reason.length < 10}
                            className="bg-rose-600 hover:bg-rose-700 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                "Raporu Gönder"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
