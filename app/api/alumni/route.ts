import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const city = searchParams.get("city");
  const department = searchParams.get("department");
  const year = searchParams.get("year");

  try {
    const whereClause: Record<string, unknown> = {
      role: "ALUMNI",
    };

    // Search filter
    if (search) {
      whereClause.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { moreinfo: { company: { contains: search, mode: "insensitive" } } },
        { moreinfo: { position: { contains: search, mode: "insensitive" } } },
      ];
    }

    // City filter
    if (city && city !== "Tümü") {
      whereClause.moreinfo = {
        location: { contains: city, mode: "insensitive" },
      };
    }

    // Department filter
    if (department && department !== "Tümü") {
      whereClause.alumni = {
        ...(whereClause.alumni as Record<string, unknown> || {}),
        department: { contains: department, mode: "insensitive" },
      };
    }

    // Graduation Year filter
    if (year && year !== "Tümü") {
      whereClause.alumni = {
        ...(whereClause.alumni as Record<string, unknown> || {}),
        graduationYear: parseInt(year),
      };
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        alumni: true,
        moreinfo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to frontend format
    const alumni = users.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        department: user.alumni?.department || "Bilinmiyor",
        city: user.moreinfo?.location || "Bilinmiyor",
        jobTitle: user.moreinfo?.position || "",
        company: user.moreinfo?.company || "",
        graduationYear: user.alumni?.graduationYear,
        linkedinUrl: user.moreinfo?.linkedin,
        profileImage: user.image || user.moreinfo?.image,
      };
    });
    
    return NextResponse.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
