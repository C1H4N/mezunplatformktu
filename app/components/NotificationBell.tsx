"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Check, Trash2, MessageSquare, Briefcase, Calendar, Users, Settings, X } from "lucide-react";

interface Notification {
  id: string;
  type: "MESSAGE" | "JOB_APPLICATION" | "EVENT" | "MENTORSHIP" | "SYSTEM";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

const typeIcons = {
  MESSAGE: MessageSquare,
  JOB_APPLICATION: Briefcase,
  EVENT: Calendar,
  MENTORSHIP: Users,
  SYSTEM: Settings,
};

const typeColors = {
  MESSAGE: "text-blue-500 bg-blue-500/10",
  JOB_APPLICATION: "text-green-500 bg-green-500/10",
  EVENT: "text-purple-500 bg-purple-500/10",
  MENTORSHIP: "text-orange-500 bg-orange-500/10",
  SYSTEM: "text-gray-500 bg-gray-500/10",
};

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?limit=10");
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`/api/notifications?id=${id}`, { method: "DELETE" });
      fetchNotifications();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Şimdi";
    if (minutes < 60) return `${minutes} dk`;
    if (hours < 24) return `${hours} sa`;
    if (days < 7) return `${days} gün`;
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted-bg transition-colors"
        aria-label="Bildirimler"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-card border border-border rounded-xl shadow-2xl z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-semibold">Bildirimler</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={loading}
                  className="text-xs text-primary hover:underline disabled:opacity-50"
                >
                  Tümünü okundu yap
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted-bg rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted mb-2" />
                <p className="text-sm text-muted">Bildirim yok</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notif) => {
                  const Icon = typeIcons[notif.type];
                  const colorClass = typeColors[notif.type];

                  return (
                    <div
                      key={notif.id}
                      className={`relative group ${!notif.isRead ? "bg-primary/5" : ""}`}
                    >
                      {notif.link ? (
                        <Link
                          href={notif.link}
                          onClick={() => {
                            markAsRead(notif.id);
                            setIsOpen(false);
                          }}
                          className="flex gap-3 p-4 hover:bg-muted-bg/50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notif.title}</p>
                            <p className="text-xs text-muted line-clamp-2">{notif.message}</p>
                            <p className="text-xs text-muted mt-1">{formatTime(notif.createdAt)}</p>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex gap-3 p-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notif.title}</p>
                            <p className="text-xs text-muted line-clamp-2">{notif.message}</p>
                            <p className="text-xs text-muted mt-1">{formatTime(notif.createdAt)}</p>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        {!notif.isRead && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              markAsRead(notif.id);
                            }}
                            className="p-1.5 bg-card hover:bg-muted-bg border border-border rounded-lg"
                            title="Okundu işaretle"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteNotification(notif.id);
                          }}
                          className="p-1.5 bg-card hover:bg-red-500/10 border border-border rounded-lg text-red-500"
                          title="Sil"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border p-2">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-primary hover:underline py-2"
              >
                Tüm bildirimleri gör
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

