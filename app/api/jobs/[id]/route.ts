import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.jobAdvertisement.findUnique({
      where: { id },
      include: {
        publisher: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "İlan bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "İlan getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
