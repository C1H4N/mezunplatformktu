import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UserRole } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

// Kullanıcıları listele
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "MODERATOR", "HEAD_OF_DEPARTMENT"].includes(
        session.user.role || "",
      )
    ) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") as UserRole | null;

    const where: Record<string, unknown> = {};
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        lastLogin: true,
        isActive: true,
        approvalStatus: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Kullanıcı aksiyonları (rol, ban, onay, şifre sıfırla, vs.)
export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, action, role } = body;

    if (!userId)
      return NextResponse.json(
        { error: "Kullanıcı ID gerekli" },
        { status: 400 },
      );
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Kendi hesabınız üzerinde bu işlemi yapamazsınız" },
        { status: 400 },
      );
    }

    // action yoksa eski uyumluluk: sadece rol değiştirme
    const resolvedAction = action ?? "CHANGE_ROLE";

    let updateData: Record<string, unknown> = {};
    let message = "";

    switch (resolvedAction) {
      case "CHANGE_ROLE":
        if (!role || !Object.values(UserRole).includes(role)) {
          return NextResponse.json({ error: "Geçersiz rol" }, { status: 400 });
        }
        updateData = { role };
        message = "Rol güncellendi";
        break;

      case "BAN":
        updateData = { isActive: false };
        message = "Kullanıcı engellendi";
        break;

      case "UNBAN":
        updateData = { isActive: true };
        message = "Kullanıcı engeli kaldırıldı";
        break;

      case "APPROVE":
        updateData = {
          approvalStatus: "APPROVED",
          approvedAt: new Date(),
          approvedById: session.user.id,
        };
        message = "Kullanıcı onaylandı";
        break;

      case "REJECT":
        updateData = { approvalStatus: "REJECTED" };
        message = "Kullanıcı reddedildi";
        break;

      case "PENDING":
        updateData = { approvalStatus: "PENDING" };
        message = "Kullanıcı durumu 'beklemede' yapıldı";
        break;

      case "VERIFY_EMAIL":
        updateData = { emailVerified: new Date() };
        message = "E-posta doğrulandı";
        break;

      case "UNVERIFY_EMAIL":
        updateData = { emailVerified: null };
        message = "E-posta doğrulaması kaldırıldı";
        break;

      case "RESET_PASSWORD": {
        const { hash } = await import("bcryptjs");
        const newPassword = await hash("Ktumezun2024!", 10);
        updateData = { password: newPassword };
        message = "Şifre varsayılana sıfırlandı (Ktumezun2024!)";
        break;
      }

      default:
        return NextResponse.json(
          { error: "Bilinmeyen aksiyon" },
          { status: 400 },
        );
    }

    await prisma.user.update({ where: { id: userId }, data: updateData });
    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Kullanıcı sil
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    // Sadece admin silebilir
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı ID gerekli" },
        { status: 400 },
      );
    }

    // Kendini silemez
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Kendinizi silemezsiniz" },
        { status: 400 },
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "Kullanıcı silindi" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

// Kullanıcı ekle (Admin tarafından)
export async function POST(req: Request) {
  try {
    const session = await auth();

    // Sadece admin ekleyebilir
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      department,
      graduationYear,
      studentNo,
      city,
      position,
      company,
      sector,
      status,
      about,
    } = body;

    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json(
        { error: "Eksik parametreler" },
        { status: 400 },
      );
    }

    if (role === UserRole.ALUMNI && (!department || !graduationYear)) {
      return NextResponse.json(
        { error: "Bölüm ve mezuniyet yılı gerekli" },
        { status: 400 },
      );
    }

    // Email unique check
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanılıyor" },
        { status: 400 },
      );
    }

    // Phone unique check if provided
    let finalPhone = phoneNumber || "";
    if (finalPhone) {
      const existingPhone = await prisma.user.findFirst({
        where: { phoneNumber: finalPhone },
      });
      if (existingPhone) {
        return NextResponse.json(
          { error: "Bu telefon numarası zaten kullanılıyor" },
          { status: 400 },
        );
      }
    }

    const { hash } = await import("bcryptjs");
    const password = await hash("Ktumezun2024!", 10); // Standard default password

    let extraData: any = {
      moreinfo: {
        create: {
          firstName,
          lastName,
          email,
          phoneNumber: finalPhone,
          image: "",
          company: company || "",
          position: position || "",
          location: city || "",
          about: about || "",
          website: "",
          linkedin: "",
          github: "",
          twitter: "",
          instagram: "",
          youtube: "",
          facebook: "",
          telegram: "",
          discord: "",
          twitch: "",
          tiktok: "",
        },
      },
    };

    if (role === UserRole.ALUMNI) {
      extraData.alumni = {
        create: {
          department: department || "",
          graduationYear: graduationYear
            ? parseInt(graduationYear.toString(), 10)
            : new Date().getFullYear(),
          currentPosition: position || "",
          employmentSector: sector || "",
          employmentStatus: status || null,
        },
      };
    } else if (role === UserRole.STUDENT) {
      extraData.student = {
        create: {
          studentNo: studentNo || "",
          department: department || "",
          schoolEmail: studentNo ? `${studentNo}@aacomyo.edu.tr` : "",
          interests: [],
        },
      };
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role,
        password,
        phoneNumber: finalPhone || null,
        approvalStatus: "APPROVED",
        isActive: true,
        emailVerified: new Date(),
        ...extraData,
      },
    });

    return NextResponse.json(
      { message: "Kullanıcı başarıyla oluşturuldu", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Kullanıcı oluşturulurken hata meydan geldi" },
      { status: 500 },
    );
  }
}
