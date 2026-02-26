"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageSquare, Search, User, Plus, X, Send } from "lucide-react";

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

interface SearchUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  role: string;
}

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  MODERATOR: "Moderatör",
  ALUMNI: "Mezun",
  STUDENT: "Öğrenci",
  ACADEMICIAN: "Akademisyen",
  HEAD_OF_DEPARTMENT: "Bölüm Başkanı",
};

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Yeni mesaj modal state
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchConversations();
    }
  }, [status, router]);

  // Kullanıcı arama debounce
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (userSearch.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(userSearch)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error("User search failed:", error);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [userSearch]);

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

  const handleSelectUser = (user: SearchUser) => {
    setShowNewMessage(false);
    setUserSearch("");
    setSearchResults([]);
    router.push(`/messages/${user.id}`);
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
          <button
            onClick={() => setShowNewMessage(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Yeni Mesaj
          </button>
        </div>

        {/* Konuşmalarda Arama */}
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

        {/* Konuşmalar */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {filteredConversations.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-16 h-16 mx-auto text-muted mb-4" />
              <h3 className="text-lg font-semibold mb-2">Henüz mesaj yok</h3>
              <p className="text-muted mb-4">
                Mezunlar veya diğer kullanıcılarla iletişime geçin
              </p>
              <button
                onClick={() => setShowNewMessage(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all"
              >
                <Plus className="w-4 h-4" />
                Yeni Sohbet Başlat
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredConversations.map((conv) => (
                <Link
                  key={conv.partnerId}
                  href={`/messages/${conv.partnerId}`}
                  className="flex items-center gap-4 p-4 hover:bg-muted-bg/50 transition-colors"
                >
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

      {/* Yeni Mesaj Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowNewMessage(false);
              setUserSearch("");
              setSearchResults([]);
            }}
          />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Yeni Mesaj</h2>
                <p className="text-sm text-muted">Kişi arayarak sohbet başlatın</p>
              </div>
              <button
                onClick={() => {
                  setShowNewMessage(false);
                  setUserSearch("");
                  setSearchResults([]);
                }}
                className="p-2 hover:bg-muted-bg rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="İsim veya email ile ara..."
                  className="w-full pl-10 pr-4 py-3 bg-muted-bg border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* Sonuçlar */}
            <div className="flex-1 overflow-y-auto">
              {searchLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : userSearch.trim().length < 2 ? (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 mx-auto text-muted/50 mb-3" />
                  <p className="text-sm text-muted">
                    En az 2 karakter girerek kullanıcı arayın
                  </p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center">
                  <User className="w-12 h-12 mx-auto text-muted/50 mb-3" />
                  <p className="text-sm text-muted">
                    &quot;{userSearch}&quot; için sonuç bulunamadı
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="flex items-center gap-3 w-full p-4 hover:bg-muted-bg/50 transition-colors text-left"
                    >
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.firstName}
                          width={44}
                          height={44}
                          className="rounded-full object-cover w-11 h-11"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted-bg text-muted font-medium flex-shrink-0">
                        {roleLabels[user.role] || user.role}
                      </span>
                      <Send className="w-4 h-4 text-primary flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
