const { PrismaClient } = require("../app/generated/prisma");
const p = new PrismaClient({ log: ["error"] });

async function test() {
    try {
        const notif = await p.notification.create({
            data: {
                userId: "nonexistent-id",
                type: "APPROVAL",
                title: "Test",
                message: "Test mesajı",
            },
        });
        console.log("✅ Notification type APPROVAL works:", notif.id);
    } catch (err) {
        console.error("❌ Notification APPROVAL error:", err.message?.substring(0, 200));
    }

    try {
        const notif2 = await p.notification.create({
            data: {
                userId: "nonexistent-id",
                type: "SYSTEM",
                title: "Test",
                message: "Test mesajı",
            },
        });
        console.log("✅ Notification type SYSTEM works:", notif2.id);
    } catch (err) {
        console.error("❌ Notification SYSTEM error:", err.message?.substring(0, 200));
    }

    await p.$disconnect();
}

test();
