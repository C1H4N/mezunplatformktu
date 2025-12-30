"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

interface PendingItem {
  id: string;
  type: "user" | "job" | "message";
  title: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminModerationPage() {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Simüle edilmiş veri - gerçek API entegrasyonu yapılacak
    setLoading(false);
    setItems([]);
  }, []);

  const handleApprove = async (id: string) => {
    toast.success("Onaylandı");
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = async (id: string) => {
    toast.success("Reddedildi");
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "user":
        return User;
      case "job":
        return Briefcase;
      case "message":
        return MessageSquare;
      default:
        return AlertTriangle;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "user":
        return "Kullanıcı Kaydı";
      case "job":
        return "İş İlanı";
      case "message":
        return "Mesaj/Yorum";
      default:
        return "Diğer";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Moderasyon</h1>
          <p className="text-muted">Onay bekleyen içerikler</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">{items.length} bekleyen</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "user", "job", "message"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === type
                ? "bg-primary text-white"
                : "bg-muted-bg hover:bg-muted-bg/80"
            }`}
          >
            {type === "all" ? "Tümü" : getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Pending Items */}
      {items.length > 0 ? (
        <div className="space-y-4">
          {items
            .filter((item) => filter === "all" || item.type === filter)
            .map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500/10 text-yellow-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-muted bg-muted-bg px-2 py-1 rounded">
                            {getTypeLabel(item.type)}
                          </span>
                          <h3 className="font-medium mt-2">{item.title}</h3>
                          <p className="text-sm text-muted mt-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-lg transition"
                            title="Onayla"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-lg transition"
                            title="Reddet"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                        <span>Gönderen: {item.user.name}</span>
                        <span>{item.user.email}</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Tebrikler!</h3>
          <p className="text-muted">
            Şu an onay bekleyen içerik bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
}

