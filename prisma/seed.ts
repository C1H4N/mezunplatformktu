import { PrismaClient, UserRole } from "../app/generated/prisma";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);

  const alumniData = [
    {
      firstName: "Ahmet",
      lastName: "Yılmaz",
      email: "ahmet.yilmaz@example.com",
      city: "İstanbul",
      department: "Bilgisayar Mühendisliği",
      jobTitle: "Kıdemli Yazılım Geliştirici",
      company: "Tech Corp",
      graduationYear: 2018,
    },
    {
      firstName: "Ayşe",
      lastName: "Kaya",
      email: "ayse.kaya@example.com",
      city: "Ankara",
      department: "Elektrik-Elektronik Mühendisliği",
      jobTitle: "Proje Yöneticisi",
      company: "Enerji A.Ş.",
      graduationYear: 2016,
    },
    {
      firstName: "Mehmet",
      lastName: "Demir",
      email: "mehmet.demir@example.com",
      city: "İzmir",
      department: "İşletme",
      jobTitle: "Finansal Analist",
      company: "Finans Bank",
      graduationYear: 2019,
    },
    {
      firstName: "Zeynep",
      lastName: "Şahin",
      email: "zeynep.sahin@example.com",
      city: "Trabzon",
      department: "Bilgisayar Mühendisliği",
      jobTitle: "Veri Bilimci",
      company: "Data Analytics Ltd.",
      graduationYear: 2020,
    },
    {
      firstName: "Can",
      lastName: "Öztürk",
      email: "can.ozturk@example.com",
      city: "Bursa",
      department: "Makine Mühendisliği",
      jobTitle: "Üretim Mühendisi",
      company: "Otomotiv A.Ş.",
      graduationYear: 2017,
    },
    {
      firstName: "Elif",
      lastName: "Çelik",
      email: "elif.celik@example.com",
      city: "Antalya",
      department: "Mimarlık",
      jobTitle: "Mimar",
      company: "Tasarım Atölyesi",
      graduationYear: 2015,
    },
    {
      firstName: "Burak",
      lastName: "Arslan",
      email: "burak.arslan@example.com",
      city: "İstanbul",
      department: "Hukuk",
      jobTitle: "Avukat",
      company: "Hukuk Bürosu",
      graduationYear: 2014,
    },
    {
      firstName: "Selin",
      lastName: "Yıldız",
      email: "selin.yildiz@example.com",
      city: "Ankara",
      department: "İktisat",
      jobTitle: "Ekonomist",
      company: "Merkez Bankası",
      graduationYear: 2019,
    },
  ];

  for (const data of alumniData) {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password,
        role: UserRole.ALUMNI,
        alumni: {
          create: {
            graduationYear: data.graduationYear,
            department: data.department,
            currentPosition: data.jobTitle,
            competencies: ["Java", "Python", "React"], // Dummy competencies
            mentorshipTopics: ["Kariyer", "Yazılım"], // Dummy topics
          },
        },
        moreinfo: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: "555" + Math.floor(Math.random() * 10000000),
            image: "",
            company: data.company,
            position: data.jobTitle,
            location: data.city,
            about: "KTÜ Mezunu",
            website: "",
            linkedin: "https://linkedin.com",
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
      },
    });
    console.log(`Created user: ${user.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
