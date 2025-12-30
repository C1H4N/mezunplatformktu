import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        alumni: true,
        moreinfo: true,
        skills: true,
        experiences: true,
        educations: true,
      },
    });

    if (!user || user.role !== "ALUMNI") {
      return NextResponse.json(
        { error: "Mezun bulunamadı" },
        { status: 404 }
      );
    }

    // Transform to frontend format
    const alumniProfile = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phoneNumber,
      department: user.alumni?.department || "Bilinmiyor",
      faculty: "Mühendislik Fakültesi", // Default or from data
      city: user.moreinfo?.location || "Bilinmiyor",
      jobTitle: user.moreinfo?.position || user.alumni?.currentPosition || "",
      company: user.moreinfo?.company || "",
      graduationYear: user.alumni?.graduationYear,
      linkedinUrl: user.moreinfo?.linkedin,
      websiteUrl: user.moreinfo?.website,
      profileImage: user.image || user.moreinfo?.image,
      bio: user.bio || user.moreinfo?.about || "",
      skills: user.skills.map((s) => s.name),
      competencies: user.alumni?.competencies || [],
      mentorshipTopics: user.alumni?.mentorshipTopics || [],
      experience: user.experiences.map((exp) => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        period: `${exp.startDate.getFullYear()} - ${exp.endDate ? exp.endDate.getFullYear() : "Günümüz"}`,
        description: exp.description || "",
      })),
      education: user.educations.map((edu) => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        period: `${edu.startDate.getFullYear()} - ${edu.endDate ? edu.endDate.getFullYear() : "Devam Ediyor"}`,
      })),
      socialLinks: {
        linkedin: user.moreinfo?.linkedin,
        github: user.moreinfo?.github,
        twitter: user.moreinfo?.twitter,
        website: user.moreinfo?.website,
      },
    };

    return NextResponse.json(alumniProfile);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu" },
      { status: 500 }
    );
  }
}

