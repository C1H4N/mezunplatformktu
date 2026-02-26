import { PrismaClient, UserRole, JobType, EventType } from "../app/generated/prisma";
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
    update: { approvalStatus: "APPROVED" as any, isActive: true },
    create: {
      email: "admin@ktu.edu.tr",
      firstName: "Admin",
      lastName: "AACOMYO",
      password,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      phoneNumber: "+905551234567",
      bio: "AACOMYO Mezun Platformu Yöneticisi",
      approvalStatus: "APPROVED" as any,
      isActive: true,
      admin: { create: {} },
    },
  });
  console.log(`   ✅ Admin: ${admin.email}`);

  // ============================================
  // 2. MODERATOR KULLANICI
  // ============================================
  console.log("🛡️ Creating Moderator user...");
  const moderator = await prisma.user.upsert({
    where: { email: "moderator@ktu.edu.tr" },
    update: {},
    create: {
      email: "moderator@ktu.edu.tr",
      firstName: "Moderatör",
      lastName: "AACOMYO",
      password,
      role: UserRole.MODERATOR,
      emailVerified: new Date(),
      phoneNumber: "+905551234568",
      moderator: { create: {} },
    },
  });
  console.log(`   ✅ Moderator: ${moderator.email}`);

  // ============================================
  // 3. BÖLÜM BAŞKANI
  // ============================================
  console.log("🎓 Creating Head of Department user...");
  const headOfDept = await prisma.user.upsert({
    where: { email: "bolumbaskan@ktu.edu.tr" },
    update: { approvalStatus: "APPROVED" as any, isActive: true },
    create: {
      email: "bolumbaskan@ktu.edu.tr",
      firstName: "Prof. Dr. Mehmet",
      lastName: "Yıldız",
      password,
      role: UserRole.HEAD_OF_DEPARTMENT,
      emailVerified: new Date(),
      phoneNumber: "+905551234569",
      bio: "Bilgisayar Teknolojileri Bölüm Başkanı",
      approvalStatus: "APPROVED" as any,
      isActive: true,
      headOfDepartment: {
        create: {
          department: "Bilgisayar Teknolojileri Bölümü",
          title: "Prof. Dr.",
        },
      },
    },
  });
  console.log(`   ✅ Head of Dept: ${headOfDept.email}`);

  // ============================================
  // 2.5. BÖLÜMLER & PROGRAMLAR
  // ============================================
  console.log("🏫 Creating Departments & Programs...");

  const deptBT = await prisma.department.upsert({
    where: { name: "Bilgisayar Teknolojileri Bölümü" },
    update: {},
    create: {
      name: "Bilgisayar Teknolojileri Bölümü",
      code: "BT",
      description: "Yazılım ve bilişim alanında nitelikli teknik eleman yetiştiren bölüm.",
      isActive: true,
      programs: {
        create: [
          { name: "Bilgisayar Programcılığı" },
          { name: "Bilişim Güvenliği Teknolojisi" },
        ],
      },
    },
  });
  console.log(`   ✅ Department: ${deptBT.name}`);

  const deptEO = await prisma.department.upsert({
    where: { name: "Elektronik ve Otomasyon Bölümü" },
    update: {},
    create: {
      name: "Elektronik ve Otomasyon Bölümü",
      code: "EO",
      description: "Elektronik, mekatronik ve otomasyon alanlarında yetkin mezunlar yetiştiren bölüm.",
      isActive: true,
      programs: {
        create: [
          { name: "Elektronik Teknolojisi" },
          { name: "Mekatronik" },
        ],
      },
    },
  });
  console.log(`   ✅ Department: ${deptEO.name}`);

  const deptYO = await prisma.department.upsert({
    where: { name: "Yönetim ve Organizasyon Bölümü" },
    update: {},
    create: {
      name: "Yönetim ve Organizasyon Bölümü",
      code: "YO",
      description: "İşletme yönetimi ve organizasyon alanında uzmanlaşmış bölüm.",
      isActive: true,
      programs: {
        create: [
          { name: "İşletme Yönetimi" },
          { name: "Lojistik" },
        ],
      },
    },
  });
  console.log(`   ✅ Department: ${deptYO.name}`);

  const deptMuh = await prisma.department.upsert({
    where: { name: "Mülkiyet Koruma ve Güvenlik Bölümü" },
    update: {},
    create: {
      name: "Mülkiyet Koruma ve Güvenlik Bölümü",
      code: "MKG",
      description: "İş güvenliği ve sivil savunma alanlarında eğitim veren bölüm.",
      isActive: true,
      programs: {
        create: [
          { name: "İş Sağlığı ve Güvenliği" },
        ],
      },
    },
  });
  console.log(`   ✅ Department: ${deptMuh.name}`);

  // ============================================
  // 2.6. DUYURULAR
  // ============================================
  console.log("📢 Creating Announcements...");

  await prisma.announcement.createMany({
    data: [
      {
        title: "2026 Yılı Mezunlar Buluşması Etkinliği",
        content: "Değerli mezunlarımız, geleneksel hale getirdiğimiz mezunlar buluşması etkinliğimiz bu yıl büyük bir katılımla gerçekleşecek. Yenilenen kampüsümüzde eski anıları tazelemek ve yeni mezun ağımızı güçlendirmek için hepinizi bekliyoruz. Etkinlik tarihi ve detayları yakında duyurulacaktır.",
        imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
        isPinned: true,
        authorId: admin.id,
      },
      {
        title: "Kariyer Platformu Rozet Sistemi Yayında!",
        content: "Mezun platformumuza entegre ettiğimiz yeni rozet sistemi sayesinde artık profilinize yetkinliklerinizi ve elde ettiğiniz başarıları ekleyebilirsiniz. Platform üzerinde aktif kalarak özel rozetler kazanabilirsiniz. Hemen profilinizi güncelleyin!",
        imageUrl: null,
        isPinned: false,
        authorId: admin.id,
      },
      {
        title: "Yazılımcılar İçin Özel Hackathon",
        content: "Üniversitemiz bilgisayar programcılığı bölümü mezunları ve öğrencileri için düzenlenecek olan kodlama yarışmasına (Hackathon) başvurular başladı. Büyük ödüller sizi bekliyor! Detaylar ve başvuru formu platform üzerinden paylaşılacaktır.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        isPinned: false,
        authorId: moderator.id,
      },
      {
        title: "Yeni Staj ve İş İlanları Eklendi",
        content: "Platformumuza 10'dan fazla yeni iş ve staj ilanı eklendi. Bilişim, elektronik ve yönetim alanlarında farklı pozisyonlarda fırsatlar sizi bekliyor. İlanları incelemek için Kariyer sayfasını ziyaret edin.",
        imageUrl: null,
        isPinned: false,
        authorId: admin.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log("   ✅ 4 Announcements created");

  // ============================================
  // 4. ÖĞRENCİ KULLANICILARI
  // ============================================
  console.log("🎓 Creating Student users...");

  const student1 = await prisma.user.upsert({
    where: { email: "ogrenci1@ktu.edu.tr" },
    update: {},
    create: {
      email: "ogrenci1@ktu.edu.tr",
      firstName: "Ali",
      lastName: "Demir",
      password,
      role: UserRole.STUDENT,
      emailVerified: new Date(),
      phoneNumber: "+905554567890",
      bio: "Bilgisayar Mühendisliği 4. sınıf öğrencisi. Yazılım geliştirme ve yapay zeka ile ilgileniyorum.",
      student: {
        create: {
          studentNo: "2020001",
          department: "Bilgisayar Teknolojileri Bölümü",
          interests: ["Yazılım", "Yapay Zeka", "Web Geliştirme"],
        },
      },
    },
    include: { student: true },
  });
  console.log(`   ✅ Student: ${student1.email}`);

  const student2 = await prisma.user.upsert({
    where: { email: "ogrenci2@ktu.edu.tr" },
    update: {},
    create: {
      email: "ogrenci2@ktu.edu.tr",
      firstName: "Zeynep",
      lastName: "Şahin",
      password,
      role: UserRole.STUDENT,
      emailVerified: new Date(),
      phoneNumber: "+905555678901",
      student: {
        create: {
          studentNo: "2021002",
          department: "Elektronik ve Otomasyon Bölümü",
          interests: ["Elektronik", "Otomasyon"],
        },
      },
    },
    include: { student: true },
  });
  console.log(`   ✅ Student: ${student2.email}`);

  // ============================================
  // 5. MEZUN KULLANICILARI
  // ============================================
  console.log("👨‍🎓 Creating Alumni users...");

  const alumniData = [
    {
      email: "ahmet.yilmaz@gmail.com",
      firstName: "Ahmet",
      lastName: "Yılmaz",
      phone: "+905556789012",
      city: "İstanbul",
      department: "Bilgisayar Teknolojileri Bölümü",
      position: "Kıdemli Yazılım Geliştirici",
      company: "Google",
      graduationYear: 2018,
      bio: "Google'da Backend Developer olarak çalışıyorum. AACOMYO'dan mezun olduktan sonra yüksek lisansımı tamamladım.",
      skills: ["Python", "Go", "Kubernetes", "GCP"],
    },
    {
      email: "elif.ozturk@outlook.com",
      firstName: "Elif",
      lastName: "Öztürk",
      phone: "+905557890123",
      city: "Ankara",
      department: "Bilgisayar Teknolojileri Bölümü",
      position: "Veri Bilimci",
      company: "Microsoft",
      graduationYear: 2019,
      bio: "Microsoft'ta AI ekibinde çalışıyorum.",
      skills: ["Python", "TensorFlow", "Azure ML", "SQL"],
    },
    {
      email: "can.arslan@yahoo.com",
      firstName: "Can",
      lastName: "Arslan",
      phone: "+905558901234",
      city: "Trabzon",
      department: "Elektronik ve Otomasyon Bölümü",
      position: "Üretim Mühendisi",
      company: "Ford Otosan",
      graduationYear: 2017,
      bio: "Ford Otosan'da üretim süreçleri yönetimi yapıyorum.",
      skills: ["AutoCAD", "SolidWorks", "Lean Manufacturing"],
    },
    {
      email: "selin.kaya@gmail.com",
      firstName: "Selin",
      lastName: "Kaya",
      phone: "+905559012345",
      city: "İzmir",
      department: "Yönetim ve Organizasyon Bölümü",
      position: "Finans Müdürü",
      company: "Garanti BBVA",
      graduationYear: 2016,
      bio: "10 yıllık finans deneyimim var.",
      skills: ["Finansal Analiz", "SAP", "Excel", "Risk Yönetimi"],
    },
  ];

  for (const data of alumniData) {
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
        phoneNumber: data.phone,
        bio: data.bio,
        alumni: {
          create: {
            graduationYear: data.graduationYear,
            department: data.department,
            currentPosition: data.position,
            competencies: data.skills,
            mentorshipTopics: ["Kariyer Danışmanlığı", "Teknik Mentorluk"],
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
            linkedin: `https://linkedin.com/in/${data.firstName.toLowerCase()}${data.lastName.toLowerCase()}`,
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
          create: data.skills.map((skill) => ({ name: skill })),
        },
      },
    });
    console.log(`   ✅ Alumni: ${alumni.email} (${data.company})`);
  }

  // ============================================
  // 6. İŞ İLANLARI
  // ============================================
  console.log("💼 Creating Job Advertisements...");

  const alumniUser1 = await prisma.user.findUnique({
    where: { email: alumniData[0].email },
  });
  const adminUser = await prisma.user.findUnique({
    where: { email: admin.email },
  });

  if (adminUser) {
    await prisma.jobAdvertisement.create({
      data: {
        title: "Junior Yazılım Geliştirici",
        description: `Tech Corp olarak ekibimize Junior Yazılım Geliştirici arıyoruz.

Aranan Özellikler:
- Bilgisayar Mühendisliği veya ilgili bölümlerden mezun
- JavaScript/TypeScript bilgisi
- React veya Vue.js deneyimi
- Git versiyon kontrolü bilgisi

Sunduğumuz İmkanlar:
- Rekabetçi maaş
- Uzaktan çalışma imkanı
- Yemek kartı ve özel sağlık sigortası
- Eğitim bütçesi`,
        location: "İstanbul / Uzaktan",
        type: JobType.JOB,
        publisherId: adminUser.id,
        status: "OPEN",
      },
    });

    await prisma.jobAdvertisement.create({
      data: {
        title: "Yazılım Stajyeri",
        description: `2024 Yaz dönemi için yazılım stajyeri arıyoruz.

Gereksinimler:
- Üniversite 3. veya 4. sınıf öğrencisi olmak
- Temel programlama bilgisi
- Öğrenmeye açık olmak

Staj Süresi: 2 ay (Tam zamanlı)
Ücret: 20.000 TL/ay`,
        location: "İstanbul",
        type: JobType.INTERNSHIP,
        publisherId: adminUser.id,
        status: "OPEN",
      },
    });
    console.log("   ✅ 2 Job created by Admin");
  }

  if (alumniUser1) {
    await prisma.jobAdvertisement.create({
      data: {
        title: "Veri Analisti",
        description: `Bünyemizde çalışacak Veri Analisti arıyoruz.

Aranan Nitelikler:
- İstatistik, Matematik veya Mühendislik mezunu
- SQL ve Python bilgisi
- Power BI veya Tableau deneyimi
- Finans sektörü deneyimi tercih sebebi`,
        location: "Ankara",
        type: JobType.JOB,
        publisherId: alumniUser1.id,
        status: "OPEN",
      },
    });
    console.log("   ✅ 1 Job created by Alumni");
  }

  // ============================================
  // 7. ETKİNLİKLER
  // ============================================
  console.log("📅 Creating Events...");

  // Gelecek tarihli etkinlikler oluştur
  const futureDate1 = new Date();
  futureDate1.setDate(futureDate1.getDate() + 7);

  const futureDate2 = new Date();
  futureDate2.setDate(futureDate2.getDate() + 14);

  const futureDate3 = new Date();
  futureDate3.setDate(futureDate3.getDate() + 30);

  await prisma.event.create({
    data: {
      title: "AACOMYO Kariyer Fuarı 2025",
      description: `AACOMYO Mezun Platformu olarak düzenlediğimiz Kariyer Fuarı'na davetlisiniz!

50+ şirketin katılımıyla gerçekleşecek fuarda:
- CV değerlendirme standları
- Birebir mülakat fırsatları
- Kariyer seminerleri
- Networking etkinlikleri

Tüm AACOMYO öğrenci ve mezunlarına açıktır.`,
      date: futureDate1,
      endDate: new Date(futureDate1.getTime() + 8 * 60 * 60 * 1000), // +8 saat
      location: "AACOMYO Konferans Salonu, Araklı",
      type: EventType.CAREER_FAIR,
      status: "UPCOMING",
      capacity: 500,
      organizerId: admin.id,
    },
  });

  await prisma.event.create({
    data: {
      title: "React & Next.js Workshop",
      description: `Modern web geliştirme teknolojileri üzerine pratik workshop.

İçerik:
- React Hooks derinlemesine
- Next.js App Router
- Server Components
- Tailwind CSS ile styling

Katılımcılar kendi laptoplarını getirmeli.
Ön gereksinim: Temel JavaScript bilgisi`,
      date: futureDate2,
      endDate: new Date(futureDate2.getTime() + 4 * 60 * 60 * 1000), // +4 saat
      location: "Online (Zoom)",
      type: EventType.WORKSHOP,
      status: "UPCOMING",
      capacity: 50,
      organizerId: moderator.id,
    },
  });

  await prisma.event.create({
    data: {
      title: "Mezunlar Buluşması - Trabzon",
      description: `Trabzon'daki AACOMYO mezunları olarak bir araya geliyoruz!

Akşam yemeği eşliğinde networking yapacağımız bu etkinlikte eski arkadaşlarınızla buluşabilir, yeni bağlantılar kurabilirsiniz.

Yer: Trabzon Şehir Kulübü
Katılım: Ücretsiz (Yemek dahil değil)`,
      date: futureDate3,
      location: "Trabzon Şehir Kulübü",
      type: EventType.MEETUP,
      status: "UPCOMING",
      capacity: 30,
      organizerId: admin.id,
    },
  });

  console.log("   ✅ 3 Events created");

  // ============================================
  // 8. ÖRNEK BAŞVURU
  // ============================================
  console.log("📝 Creating sample job application...");

  const studentRecord = await prisma.student.findUnique({
    where: { userId: student1.id },
  });
  const jobAd = await prisma.jobAdvertisement.findFirst({
    where: { title: "Junior Yazılım Geliştirici" },
  });

  if (studentRecord && jobAd) {
    await prisma.jobApplication.create({
      data: {
        jobId: jobAd.id,
        studentId: studentRecord.id,
        status: "PENDING",
        coverLetter: `Sayın Yetkili,

Tech Corp'un Junior Yazılım Geliştirici pozisyonu için başvuruda bulunmak istiyorum.

AACOMYO Bilgisayar Programcılığı öğrencisiyim. React ve Node.js ile kişisel projeler geliştirdim. GitHub profilimde çalışmalarımı inceleyebilirsiniz.

Saygılarımla,
Ali Demir`,
      },
    });
    console.log("   ✅ 1 Job Application created");
  }

  // ============================================
  // 9. ÖRNEK MESAJLAR
  // ============================================
  console.log("💬 Creating sample messages...");

  const alumni1 = await prisma.user.findUnique({
    where: { email: "ahmet.yilmaz@gmail.com" },
  });

  if (alumni1 && student1) {
    await prisma.message.create({
      data: {
        senderId: student1.id,
        receiverId: alumni1.id,
        content: "Merhaba Ahmet Bey, Google'daki deneyimleriniz hakkında bilgi alabilir miyim?",
      },
    });

    await prisma.message.create({
      data: {
        senderId: alumni1.id,
        receiverId: student1.id,
        content: "Merhaba Ali, tabii ki! Backend geliştirme ve sistem tasarımı konularında sorularını yanıtlayabilirim. Hangi konularda yardımcı olabilirim?",
      },
    });
    console.log("   ✅ 2 Messages created");
  }

  // ============================================
  // 10. ÖRNEK BİLDİRİMLER
  // ============================================
  console.log("🔔 Creating sample notifications...");

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "JOB_APPLICATION",
      title: "Başvurunuz Alındı",
      message: "Junior Yazılım Geliştirici pozisyonuna başvurunuz başarıyla alındı.",
      link: `/jobs/${jobAd?.id}`,
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "EVENT",
      title: "Yeni Etkinlik",
      message: "AACOMYO Kariyer Fuarı 2025 etkinliği oluşturuldu. Katılmak ister misiniz?",
      link: "/events",
      isRead: false,
    },
  });

  console.log("   ✅ 2 Notifications created");

  // ============================================
  // ÖZET
  // ============================================
  console.log("\n" + "=".repeat(50));
  console.log("✅ SEED TAMAMLANDI!");
  console.log("=".repeat(50));
  console.log("\n📋 TEST HESAPLARI (Şifre: Test123!):\n");
  console.log("   👑 Admin:     admin@ktu.edu.tr");
  console.log("   🛡️ Moderator: moderator@ktu.edu.tr");
  console.log("   🏫 Bölüm Bşk: bolumbaskan@ktu.edu.tr");

  console.log("   🎓 Öğrenci 1: ogrenci1@ktu.edu.tr");
  console.log("   🎓 Öğrenci 2: ogrenci2@ktu.edu.tr");
  console.log("   👨‍🎓 Mezun 1:   ahmet.yilmaz@gmail.com");
  console.log("   👨‍🎓 Mezun 2:   elif.ozturk@outlook.com");
  console.log("   👨‍🎓 Mezun 3:   can.arslan@yahoo.com");
  console.log("   👨‍🎓 Mezun 4:   selin.kaya@gmail.com");
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
