"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageSquare, Search, User } from "lucide-react";

interface Conversation {
  partnerId: string;
  partner: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
  lastMessage: {
    id: string;
    content: string;
    timestamp: string;
    isFromMe: boolean;
  };
  unreadCount: number;
}

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchConversations();
    }
  }, [status, router]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Konuşmalar getirilemedi");
      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const name = `${conv.partner.firstName} ${conv.partner.lastName}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "Dün";
    } else if (days < 7) {
      return date.toLocaleDateString("tr-TR", { weekday: "short" });
    } else {
      return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted-bg/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Mesajlar</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Konuşmalarda ara..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Conversations */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {filteredConversations.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-muted mb-4" />
              <h3 className="text-lg font-semibold mb-2">Henüz mesaj yok</h3>
              <p className="text-muted">
                Mezunlar veya diğer kullanıcılarla iletişime geçin
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredConversations.map((conv) => (
                <Link
                  key={conv.partnerId}
                  href={`/messages/${conv.partnerId}`}
                  className="flex items-center gap-4 p-4 hover:bg-muted-bg/50 transition-colors"
                >
                  {/* Avatar */}
                  {conv.partner.image ? (
                    <Image
                      src={conv.partner.image}
                      alt={conv.partner.firstName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">
                        {conv.partner.firstName} {conv.partner.lastName}
                      </h3>
                      <span className="text-xs text-muted">
                        {formatTime(conv.lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted truncate">
                      {conv.lastMessage.isFromMe && (
                        <span className="text-primary">Siz: </span>
                      )}
                      {conv.lastMessage.content}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {conv.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {conv.unreadCount}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

