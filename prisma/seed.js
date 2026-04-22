// Plain JavaScript seed — tsx gerektirmez
"use strict";
const { PrismaClient, UserRole, ApprovalStatus, EmploymentStatus } = require("../app/generated/prisma");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...\n");

    const password = await hash("Test123!", 12);

    // 1. ADMIN
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

    // 2. BÖLÜMLER
    console.log("🏫 Creating Departments...");
    const departments = [
        { name: "Dijital Dönüşüm Elektroniği Programı", code: "DDE", description: "Dijital sistemler ve elektronik." },
        { name: "İş Sağlığı ve Güvenliği Programı", code: "ISG", description: "İş güvenliği ve sivil savunma." },
        { name: "Lojistik Programı", code: "LOJ", description: "Lojistik alanında uzman yetiştiren program." },
        { name: "Yapay Zekâ Operatörlüğü Programı", code: "YZO", description: "Yapay zeka teknolojileri." },
        { name: "Bilgisayar Destekli Tasarım ve Animasyon Programı", code: "BDTA", description: "Tasarım ve animasyon." },
        { name: "İnsan Kaynakları Yönetimi Programı", code: "IKY", description: "İnsan kaynakları yönetimi." },
    ];

    for (const dept of departments) {
        await prisma.department.upsert({
            where: { name: dept.name },
            update: {},
            create: { name: dept.name, code: dept.code, description: dept.description, isActive: true },
        });
        console.log(`   ✅ Department: ${dept.name}`);
    }

    // 3. 60 MEZUN
    console.log("👨‍🎓 Creating 60 Alumni...");
    const mockCities = ["İstanbul", "Ankara", "İzmir", "Trabzon", "Bursa", "Antalya", "Kocaeli", "Adana", "Mersin", "Samsun"];
    const mockSectors = ["Bilişim", "Savunma Sanayi", "Otomotiv", "Lojistik", "E-Ticaret", "Finans", "Sağlık", "Eğitim", "Üretim/İmalat", "Tekstil", "Turizm"];
    const mockPositions = ["Uzman", "Mühendis", "Danışman", "Yönetici", "Geliştirici", "Planlama Uzmanı", "Analist", "Tasarımcı", "Teknisyen", "Operatör"];
    const mockStatuses = [
        EmploymentStatus.EMPLOYED_OWN_SECTOR,
        EmploymentStatus.EMPLOYED_OTHER_SECTOR,
        EmploymentStatus.UNEMPLOYED,
        EmploymentStatus.STUDENT,
        EmploymentStatus.SELF_EMPLOYED,
    ];
    const firstNames = ["Ahmet", "Mehmet", "Ayşe", "Fatma", "Ali", "Veli", "Kerem", "Zeynep", "Elif", "Burak", "Can", "Selin", "Deniz", "Ege", "Batu", "İrem", "Ceren", "Yiğit", "Mert", "Ozan"];
    const lastNames = ["Yılmaz", "Demir", "Çelik", "Kaya", "Şahin", "Öztürk", "Kılıç", "Korkmaz", "Arslan", "Doğan", "Bulut", "Aktaş", "Eren", "Yıldız"];
    const ri = (arr) => arr[Math.floor(Math.random() * arr.length)];

    for (let i = 1; i <= 60; i++) {
        const fName = ri(firstNames), lName = ri(lastNames);
        const email = `mezun${i}_${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`;
        const phone = `+90555${String(Math.floor(Math.random() * 9999999)).padStart(7, "0")}`;
        const dep = ri(departments).name, sector = ri(mockSectors), position = ri(mockPositions);
        const skills = [sector, position, "İletişim", "Takım Çalışması"].slice(0, Math.floor(Math.random() * 4) + 1);
        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email, firstName: fName, lastName: lName, password,
                role: UserRole.ALUMNI, emailVerified: new Date(),
                approvalStatus: ApprovalStatus.APPROVED, phoneNumber: phone,
                bio: `${dep} mezunuyum.`,
                alumni: {
                    create: {
                        graduationYear: Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010,
                        department: dep, currentPosition: position,
                        employmentStatus: ri(mockStatuses), employmentSector: sector,
                        competencies: skills, mentorshipTopics: ["Kariyer Danışmanlığı", "Sektör Bilgisi"],
                    },
                },
                moreinfo: {
                    create: {
                        firstName: fName, lastName: lName, email, phoneNumber: phone, image: "",
                        company: `Şirket ${i}`, position, location: ri(mockCities),
                        about: `${dep} mezunuyum.`,
                        website: "", linkedin: "", github: "", twitter: "", instagram: "",
                        youtube: "", facebook: "", telegram: "", discord: "", twitch: "", tiktok: "",
                    },
                },
                skills: { create: skills.map((name) => ({ name })) },
            },
        });
        process.stdout.write(`\r   ✅ Alumni: ${i}/60`);
    }
    console.log("\n");

    // 4. 30 ÖĞRENCİ
    console.log("🎓 Creating 30 Students...");
    const mockInterests = ["Yazılım", "Tasarım", "Proje Yönetimi", "Yapay Zeka", "Siber Güvenlik", "Mobil Uygulama", "İnsan Kaynakları", "Lojistik Süreçler"];
    for (let i = 1; i <= 30; i++) {
        const fName = ri(firstNames), lName = ri(lastNames);
        const email = `ogrenci${i}_${fName.toLowerCase()}.${lName.toLowerCase()}@ktu.edu.tr`;
        const phone = `+90554${String(Math.floor(Math.random() * 9999999)).padStart(7, "1")}`;
        const studentNo = `2024${String(i).padStart(4, "0")}`;
        const dep = ri(departments).name;
        const interests = [...new Set([ri(mockInterests), ri(mockInterests)])];
        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email, firstName: fName, lastName: lName, password,
                role: UserRole.STUDENT, emailVerified: new Date(),
                approvalStatus: ApprovalStatus.APPROVED, phoneNumber: phone,
                bio: `${dep} bölümünde öğrenciyim.`,
                student: {
                    create: { studentNo, department: dep, schoolEmail: `${studentNo}@aacomyo.edu.tr`, interests },
                },
            },
        });
        process.stdout.write(`\r   ✅ Student: ${i}/30`);
    }
    console.log("\n");

    console.log("=".repeat(50));
    console.log("✅ SEED TAMAMLANDI!");
    console.log("📋 Admin: admin@ktu.edu.tr | Şifre: Test123!");
    console.log("=".repeat(50));
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
