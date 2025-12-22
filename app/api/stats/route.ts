import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalAlumni = await prisma.user.count({
      where: { role: "ALUMNI" },
    });

    // Count distinct cities
    // Prisma doesn't support distinct count directly on related models easily in one go without groupBy
    // We can group by location in Info model where user is ALUMNI
    // But Info doesn't have role.
    // Let's just fetch all locations for ALUMNI users.
    
    const alumniInfos = await prisma.info.findMany({
      where: {
        user: {
          role: "ALUMNI",
        },
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    });

    const totalCities = alumniInfos.length;

    return NextResponse.json({
      totalAlumni,
      totalCities,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
