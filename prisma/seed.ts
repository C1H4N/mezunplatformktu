import {
  PrismaClient,
  UserRole,
  ApprovalStatus,
  EmploymentStatus,
} from "../app/generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  const password = await hash("Test123!", 12); // Güçlü şifre kurallarına uygun

  // ============================================
  // 1. ADMIN KULLANICI
  // ============================================
  console.log("👑 Creating Admin user...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@ktu.edu.tr" },
    update: { approvalStatus: ApprovalStatus.APPROVED, isActive: true },
    create: {
      email: "admin@ktu.edu.tr",
      firstName: "Admin",
      lastName: "AACOMYO",
      password,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      phoneNumber: "+905551234567",
      bio: "AACOMYO Mezun Platformu Yöneticisi",
      approvalStatus: ApprovalStatus.APPROVED,
      isActive: true,
      admin: { create: {} },
    },
  });
  console.log(`   ✅ Admin: ${admin.email}`);

  // ============================================
  // 2. BÖLÜMLER & PROGRAMLAR
  // ============================================
  console.log("🏫 Creating Departments...");

  const departments = [
    {
      name: "Dijital Dönüşüm Elektroniği Programı",
      code: "DDE",
      description: "Dijital sistemler ve elektronik üzerine odaklanan program.",
    },
    {
      name: "İş Sağlığı ve Güvenliği Programı",
      code: "ISG",
      description:
        "İş güvenliği ve sivil savunma alanlarında eğitim veren program.",
    },
    {
      name: "Lojistik Programı",
      code: "LOJ",
      description: "Lojistik alanında uzman yetiştiren program.",
    },
    {
      name: "Yapay Zekâ Operatörlüğü Programı",
      code: "YZO",
      description:
        "Yapay zeka teknolojileri üzerine uygulamalı eğitim veren program.",
    },
    {
      name: "Bilgisayar Destekli Tasarım ve Animasyon Programı",
      code: "BDTA",
      description:
        "Tasarım ve animasyon yazılımları üzerine uzmanlaşmış program.",
    },
    {
      name: "İnsan Kaynakları Yönetimi Programı",
      code: "IKY",
      description:
        "İnsan kaynakları ve performans yönetimi üzerine eğitim veren program.",
    },
  ];

  for (const dept of departments) {
    const createdDept = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: {
        name: dept.name,
        code: dept.code,
        description: dept.description,
        isActive: true,
      },
    });
    console.log(`   ✅ Department: ${createdDept.name}`);
  }

  // ============================================
  // 3. MEZUN KULLANICILARI (Rapor Testleri İçin 60 Adet)
  // ============================================
  console.log("👨‍🎓 Creating 60 Alumni test users...");

  const mockCities = [
    "İstanbul",
    "Ankara",
    "İzmir",
    "Trabzon",
    "Bursa",
    "Antalya",
    "Kocaeli",
    "Adana",
    "Mersin",
    "Samsun",
  ];
  const mockSectors = [
    "Bilişim",
    "Savunma Sanayi",
    "Otomotiv",
    "Lojistik",
    "E-Ticaret",
    "Finans",
    "Sağlık",
    "Eğitim",
    "Üretim/İmalat",
    "Tekstil",
    "Turizm",
  ];
  const mockPositions = [
    "Uzman",
    "Mühendis",
    "Danışman",
    "Yönetici",
    "Geliştirici",
    "Planlama Uzmanı",
    "Analist",
    "Tasarımcı",
    "Teknisyen",
    "Operatör",
  ];
  const mockStatuses = [
    EmploymentStatus.EMPLOYED_OWN_SECTOR,
    EmploymentStatus.EMPLOYED_OTHER_SECTOR,
    EmploymentStatus.UNEMPLOYED,
    EmploymentStatus.STUDENT,
    EmploymentStatus.SELF_EMPLOYED,
  ];

  const randomItem = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const randomYear = () => Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010;

  const firstNames = [
    "Ahmet",
    "Mehmet",
    "Ayşe",
    "Fatma",
    "Ali",
    "Veli",
    "Kerem",
    "Zeynep",
    "Elif",
    "Burak",
    "Can",
    "Selin",
    "Deniz",
    "Ege",
    "Batu",
    "İrem",
    "Ceren",
    "Yiğit",
    "Mert",
    "Ozan",
  ];
  const lastNames = [
    "Yılmaz",
    "Demir",
    "Çelik",
    "Kaya",
    "Şahin",
    "Öztürk",
    "Kılıç",
    "Korkmaz",
    "Arslan",
    "Doğan",
    "Bulut",
    "Aktaş",
    "Eren",
    "Yıldız",
  ];

  const generatedAlumni = [];

  for (let i = 1; i <= 60; i++) {
    const fName = randomItem(firstNames);
    const lName = randomItem(lastNames);
    // Benzersiz e-posta ve tel üretelim
    const email = `mezun${i}_${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`;
    const dep = randomItem(departments).name;
    const city = randomItem(mockCities);
    const sector = randomItem(mockSectors);
    const position = randomItem(mockPositions);
    const mStatus = randomItem(mockStatuses);
    // 7 basamaklı random phone part
    const phonePart = String(Math.floor(Math.random() * 9999999)).padStart(
      7,
      "0",
    );
    const phone = `+90555${phonePart}`;

    generatedAlumni.push({
      email,
      firstName: fName,
      lastName: lName,
      city,
      department: dep,
      position,
      company: `Şirket ${i}`,
      sector,
      graduationYear: randomYear(),
      bio: `${dep} mezunuyum. Şu an ${city} ilinde çalışıyorum veya yaşamaktayım.`,
      skills: [sector, position, "İletişim", "Takım Çalışması"].slice(
        0,
        Math.floor(Math.random() * 4) + 1,
      ),
      status: mStatus,
      phone,
    });
  }

  for (let i = 0; i < generatedAlumni.length; i++) {
    const data = generatedAlumni[i];
    const alumni = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password,
        role: UserRole.ALUMNI,
        emailVerified: new Date(),
        approvalStatus: ApprovalStatus.APPROVED,
        phoneNumber: data.phone,
        bio: data.bio,
        alumni: {
          create: {
            graduationYear: data.graduationYear,
            department: data.department,
            currentPosition: data.position,
            employmentStatus: data.status,
            employmentSector: data.sector,
            competencies: data.skills,
            mentorshipTopics: ["Kariyer Danışmanlığı", "Sektör Bilgisi"],
          },
        },
        moreinfo: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phone,
            image: "",
            company: data.company,
            position: data.position,
            location: data.city,
            about: data.bio,
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
        skills: {
          create: data.skills.map((skill: string) => ({ name: skill })),
        },
      },
    });
    process.stdout.write(
      `\r   ✅ Creating Alumni: ${i + 1}/${generatedAlumni.length}`,
    );
  }
  console.log("\n");

  // ============================================
  // 4. ÖĞRENCİ KULLANICILARI (Test İçin 30 Adet)
  // ============================================
  console.log("🎓 Creating 30 Student test users...");

  const mockInterests = [
    "Yazılım",
    "Tasarım",
    "Proje Yönetimi",
    "Yapay Zeka",
    "Siber Güvenlik",
    "Mobil Uygulama",
    "İnsan Kaynakları",
    "Lojistik Süreçler",
  ];
  const generatedStudents = [];

  for (let i = 1; i <= 30; i++) {
    const fName = randomItem(firstNames);
    const lName = randomItem(lastNames);
    const email = `ogrenci${i}_${fName.toLowerCase()}.${lName.toLowerCase()}@ktu.edu.tr`;
    const dep = randomItem(departments).name;
    const phonePart = String(Math.floor(Math.random() * 9999999)).padStart(
      7,
      "1",
    );
    const phone = `+90554${phonePart}`;
    const studentNo = `2024${String(i).padStart(4, "0")}`;
    const schoolEmail = `${studentNo}@aacomyo.edu.tr`;

    generatedStudents.push({
      email,
      firstName: fName,
      lastName: lName,
      department: dep,
      studentNo,
      schoolEmail,
      phone,
      bio: `${dep} bölümünde öğrenciyim.`,
      interests: Array.from(
        new Set([randomItem(mockInterests), randomItem(mockInterests)]),
      ), // array with unique strings
    });
  }

  for (let i = 0; i < generatedStudents.length; i++) {
    const data = generatedStudents[i];
    await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password,
        role: UserRole.STUDENT,
        emailVerified: new Date(),
        approvalStatus: ApprovalStatus.APPROVED,
        phoneNumber: data.phone,
        bio: data.bio,
        student: {
          create: {
            studentNo: data.studentNo,
            department: data.department,
            schoolEmail: data.schoolEmail,
            interests: data.interests,
          },
        },
      },
    });
    process.stdout.write(
      `\r   ✅ Creating Student: ${i + 1}/${generatedStudents.length}`,
    );
  }
  console.log("\n");

  // ============================================
  // ÖZET
  // ============================================
  console.log("\n" + "=".repeat(50));
  console.log("✅ SEED TAMAMLANDI!");
  console.log("=".repeat(50));
  console.log("\n📋 TEST HESAPLARI (Şifre: Test123!):\n");
  console.log("   👑 Admin:     admin@ktu.edu.tr");
  console.log("   👨‍🎓 Alumni Count:   60 generated.");
  console.log("   🎓 Student Count:  30 generated.");
  console.log("\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
