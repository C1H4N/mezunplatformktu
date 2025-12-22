import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { firstName, lastName, phoneNumber, image, coverImage, email } = data;

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

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName,
        lastName,
        phoneNumber,
        image,
        coverImage,
        email,
      },
    });

    return NextResponse.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      coverImage: updatedUser.coverImage,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
