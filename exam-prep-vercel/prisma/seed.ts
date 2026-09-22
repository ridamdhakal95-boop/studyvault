import { PrismaClient, ContentStatus, ContentType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "change-this-immediately";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Administrator" },
  });

  const chapter = await prisma.chapter.upsert({
    where: { slug: "introduction-to-physics" },
    update: {},
    create: {
      title: "Introduction to Physics",
      slug: "introduction-to-physics",
      description: "A sample chapter showing how content is managed dynamically.",
      order: 1,
      published: true,
    },
  });

  await prisma.content.upsert({
    where: { slug: "sample-physics-question" },
    update: {},
    create: {
      title: "What is physics?",
      slug: "sample-physics-question",
      type: ContentType.QUESTION,
      status: ContentStatus.PUBLISHED,
      difficulty: "Easy",
      tags: ["definition", "basics"],
      body: "Define physics and state one area studied in physics.",
      chapterId: chapter.id,
      priority: 1,
    },
  });

  console.log(`Seeded admin: ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => prisma.$disconnect());
