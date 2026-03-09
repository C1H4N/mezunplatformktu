import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { UserRole, EmploymentStatus } from "@/app/generated/prisma";

export async function GET(req: Request, context: any) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "MODERATOR"].includes(session.user.role || "")
    ) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const params = await context.params;
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { error: "Kullanıcı ID eksik" },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        alumni: true,
        student: true,
        moreinfo: true,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 },
      );

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  try {
    const session = await auth();

    // Sadece admin silebilir / güncelleyebilir tüm bilgileri
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const params = await context.params;
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { error: "Kullanıcı ID eksik" },
        { status: 400 },
      );

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
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

    // Check unique email logic
    const existingEmail = await prisma.user.findFirst({
      where: { email, NOT: { id } },
    });
    if (existingEmail)
      return NextResponse.json(
        { error: "Bu e-posta başka bir hesap tarafından kullanılıyor" },
        { status: 400 },
      );

    // Transaction for atomic updating across relations
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update basic User
      const baseUser = await tx.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          role,
          phoneNumber: phoneNumber || null,
        },
      });

      // Update Info
      await tx.info.upsert({
        where: { userId: id },
        create: {
          userId: id,
          firstName,
          lastName,
          email,
          phoneNumber: phoneNumber || "",
          location: city || "",
          position: position || "",
          company: company || "",
          about: about || "",
          image: "",
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
        update: {
          firstName,
          lastName,
          email,
          phoneNumber: phoneNumber || "",
          location: city || "",
          position: position || "",
          company: company || "",
          about: about || "",
        },
      });

      // Update Alumni/Student records based on role
      if (role === UserRole.ALUMNI) {
        await tx.alumni.upsert({
          where: { userId: id },
          create: {
            userId: id,
            department: department || "",
            graduationYear: graduationYear
              ? parseInt(graduationYear.toString(), 10)
              : new Date().getFullYear(),
            currentPosition: position || "",
            employmentSector: sector || "",
            employmentStatus: status ? (status as EmploymentStatus) : null,
          },
          update: {
            department: department || "",
            graduationYear: graduationYear
              ? parseInt(graduationYear.toString(), 10)
              : new Date().getFullYear(),
            currentPosition: position || "",
            employmentSector: sector || "",
            employmentStatus: status ? (status as EmploymentStatus) : null,
          },
        });
      } else if (role === UserRole.STUDENT) {
        await tx.student.upsert({
          where: { userId: id },
          create: {
            userId: id,
            studentNo: studentNo || "",
            department: department || "",
            schoolEmail: studentNo ? `${studentNo}@aacomyo.edu.tr` : "",
            interests: [],
          },
          update: {
            studentNo: studentNo || "",
            department: department || "",
            schoolEmail: studentNo ? `${studentNo}@aacomyo.edu.tr` : "",
          },
        });
      }
      return baseUser;
    });

    return NextResponse.json({
      message: "Kullanıcı başarıyla güncellendi",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating full user details:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenirken hata meydana geldi" },
      { status: 500 },
    );
  }
}
