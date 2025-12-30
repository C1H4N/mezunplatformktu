import { prisma } from "@/lib/db";
import { NotificationType } from "@/app/generated/prisma";

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

// Bildirim oluştur
export async function createNotification({
  userId,
  type,
  title,
  message,
  link,
}: CreateNotificationParams) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
      },
    });

    // TODO: Realtime bildirim için WebSocket/Pusher entegrasyonu
    // TODO: Email bildirimi gönder (kullanıcı tercihine göre)

    return notification;
  } catch (error) {
    console.error("Bildirim oluşturma hatası:", error);
    throw error;
  }
}

// Mesaj bildirimi
export async function notifyNewMessage(
  receiverId: string,
  senderName: string,
  senderId: string
) {
  return createNotification({
    userId: receiverId,
    type: "MESSAGE",
    title: "Yeni Mesaj",
    message: `${senderName} size bir mesaj gönderdi.`,
    link: `/messages/${senderId}`,
  });
}

// İş başvurusu durumu bildirimi
export async function notifyApplicationStatus(
  userId: string,
  jobTitle: string,
  status: string,
  jobId: string
) {
  const statusMessages: Record<string, string> = {
    REVIEWED: "inceleniyor",
    ACCEPTED: "kabul edildi",
    REJECTED: "reddedildi",
  };

  return createNotification({
    userId,
    type: "JOB_APPLICATION",
    title: "Başvuru Güncellendi",
    message: `"${jobTitle}" başvurunuz ${statusMessages[status] || "güncellendi"}.`,
    link: `/jobs/${jobId}`,
  });
}

// Etkinlik hatırlatması
export async function notifyEventReminder(
  userId: string,
  eventTitle: string,
  eventId: string,
  timeUntil: string
) {
  return createNotification({
    userId,
    type: "EVENT",
    title: "Etkinlik Hatırlatması",
    message: `"${eventTitle}" etkinliği ${timeUntil} sonra başlayacak.`,
    link: `/events/${eventId}`,
  });
}

// Mentorluk talebi bildirimi
export async function notifyMentorshipRequest(
  mentorId: string,
  studentName: string,
  requestId: string
) {
  return createNotification({
    userId: mentorId,
    type: "MENTORSHIP",
    title: "Yeni Mentorluk Talebi",
    message: `${studentName} sizden mentorluk talep etti.`,
    link: `/mentorship/${requestId}`,
  });
}

// Sistem bildirimi
export async function notifySystem(
  userId: string,
  title: string,
  message: string,
  link?: string
) {
  return createNotification({
    userId,
    type: "SYSTEM",
    title,
    message,
    link,
  });
}

