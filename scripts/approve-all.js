const { PrismaClient } = require("../app/generated/prisma");
const p = new PrismaClient();

async function run() {
    const result = await p.user.updateMany({
        where: { approvalStatus: "PENDING" },
        data: { approvalStatus: "APPROVED", isActive: true },
    });
    console.log("Updated users to APPROVED:", result.count);
    await p.$disconnect();
}

run().catch(console.error);
