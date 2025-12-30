import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { ProfileVisibility } from "@/app/generated/prisma";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { 
      firstName, 
      lastName, 
      phoneNumber, 
      image, 
      coverImage, 
      email,
      bio,
      cvUrl,
      profileVisibility,
    } = data;

    // Check if email is being updated and if it's already taken
    if (email && email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Bu e-posta adresi zaten kullanımda." },
          { status: 400 }
        );
      }
    }

    // Prepare update data - only include defined fields
    const updateData: Record<string, unknown> = {};
    
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (image !== undefined) updateData.image = image;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (cvUrl !== undefined) updateData.cvUrl = cvUrl;
    if (profileVisibility !== undefined) {
      // Validate visibility value
      if (Object.values(ProfileVisibility).includes(profileVisibility)) {
        updateData.profileVisibility = profileVisibility;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      coverImage: updatedUser.coverImage,
      email: updatedUser.email,
      bio: updatedUser.bio,
      cvUrl: updatedUser.cvUrl,
      profileVisibility: updatedUser.profileVisibility,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Profil bilgilerini getir
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        skills: true,
        experiences: {
          orderBy: { startDate: "desc" },
        },
        educations: {
          orderBy: { startDate: "desc" },
        },
        student: true,
        alumni: true,
        employer: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
