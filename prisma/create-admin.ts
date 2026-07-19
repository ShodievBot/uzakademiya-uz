import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is not set");
}

const ADMIN_ROLES = ["SUPERADMIN", "EDITOR"] as const;
type LocalAdminRole = (typeof ADMIN_ROLES)[number];

const rawEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";
const fullName = process.env.ADMIN_NAME?.trim() || "Super Admin";
const roleInput = (process.env.ADMIN_ROLE?.trim().toUpperCase() || "SUPERADMIN") as string;

if (!rawEmail) {
  throw new Error("ADMIN_EMAIL is required");
}

if (!password || password.length < 8) {
  throw new Error("ADMIN_PASSWORD is required and must be at least 8 characters");
}

if (!ADMIN_ROLES.includes(roleInput as LocalAdminRole)) {
  throw new Error(`ADMIN_ROLE must be one of: ${ADMIN_ROLES.join(", ")}`);
}

const email = rawEmail;
const role = roleInput as LocalAdminRole;

function hashPassword(rawPassword: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(rawPassword, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = hashPassword(password);

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    const updated = await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        fullName,
        role: role as any,
        isActive: true,
      },
    });

    console.log("✅ Admin user updated:");
    console.log({
      id: updated.id,
      email: updated.email,
      role: updated.role,
      isActive: updated.isActive,
    });
    return;
  }

  const created = await prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName,
      role: role as any,
      isActive: true,
    },
  });

  console.log("✅ Admin user created:");
  console.log({
    id: created.id,
    email: created.email,
    role: created.role,
    isActive: created.isActive,
  });
}

main()
  .catch((error) => {
    console.error("❌ Failed to create admin user");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
