import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const educations = await prisma.education.findMany({
      where: { userId: session.user.id },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(educations);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching educations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { school, degree, fieldOfStudy, startDate, endDate, current, description } = body;

    const education = await prisma.education.create({
      data: {
        userId: session.user.id,
        school,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating education" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, school, degree, fieldOfStudy, startDate, endDate, current, description } = body;

    // Verify ownership
    const existing = await prisma.education.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const education = await prisma.education.update({
      where: { id },
      data: {
        school,
        degree,
        fieldOfStudy,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating education" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.education.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.education.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting education" },
      { status: 500 }
    );
  }
}
