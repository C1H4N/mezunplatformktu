import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experiences = await prisma.experience.findMany({
      where: { userId: session.user.id },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching experiences" },
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
    const { title, company, location, startDate, endDate, current, description } = body;

    const experience = await prisma.experience.create({
      data: {
        userId: session.user.id,
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating experience" },
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
    const { id, title, company, location, startDate, endDate, current, description } = body;

    // Verify ownership
    const existing = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating experience" },
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
    const existing = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting experience" },
      { status: 500 }
    );
  }
}
