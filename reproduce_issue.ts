
import { PrismaClient } from "./app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Attempting to fetch alumni...");
    const users = await prisma.user.findMany({
      where: {
        role: "ALUMNI",
      },
      include: {
        alumni: true,
        moreinfo: true,
      },
      take: 1,
    });
    console.log("Successfully fetched users:", users.length);
    if (users.length > 0) {
        console.log("First user alumni:", users[0].alumni);
    }
  } catch (error) {
    console.error("Error fetching alumni:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
