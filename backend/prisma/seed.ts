
import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@gmail.com";
  const password = "123456";

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin User",
      },
    });

    console.log("✅ Admin user created successfully!");
  } else {
    console.log("⚠️ Admin user already exists!");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
