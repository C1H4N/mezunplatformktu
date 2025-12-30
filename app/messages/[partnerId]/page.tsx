"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, Send, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
}

interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
  role: string;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [partner, setPartner] = useState<Partner | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && params.partnerId) {
      fetchMessages();
      // Poll for new messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [status, params.partnerId, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${params.partnerId}`);
      if (!res.ok) throw new Error("Mesajlar getirilemedi");
      const data = await res.json();
      setPartner(data.partner);
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      if (loading) {
        toast.error("Mesajlar yüklenemedi");
        router.push("/messages");
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: params.partnerId,
          content: newMessage.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Mesaj gönderilemedi");
      }

      setNewMessage("");
      fetchMessages(); // Refresh messages
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = "";
  
  for (const msg of messages) {
    const date = formatDate(msg.timestamp);
    if (date !== currentDate) {
      currentDate = date;
      groupedMessages.push({ date, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/messages"
            className="p-2 hover:bg-muted-bg rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          {partner && (
            <Link
              href={`/mezunlar/${partner.id}`}
              className="flex items-center gap-3 flex-1"
            >
              {partner.image ? (
                <Image
                  src={partner.image}
                  alt={partner.firstName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
              <div>
                <h2 className="font-semibold">
                  {partner.firstName} {partner.lastName}
                </h2>
                <p className="text-xs text-muted">{partner.role}</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {groupedMessages.map((group) => (
            <div key={group.date}>
              {/* Date Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-xs text-muted px-3 py-1 bg-muted-bg rounded-full">
                  {group.date}
                </span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* Messages */}
              <div className="space-y-3">
                {group.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isFromMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl ${
                        msg.isFromMe
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-card border border-border rounded-bl-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isFromMe ? "text-white/70" : "text-muted"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
            maxLength={2000}
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

