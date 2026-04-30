import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { readUsers, writeUsers } from "../src/modules/users/users.repository.js";

const adminEmail = process.env.ADMIN_EMAIL || "admin@stylebuddy.com";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
const adminName = process.env.ADMIN_NAME || "Style Buddy Admin";

async function seedAdmin() {
  const users = await readUsers();
  const normalizedEmail = adminEmail.toLowerCase();
  const existingAdmin = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  if (existingAdmin) {
    existingAdmin.name = existingAdmin.name || adminName;
    existingAdmin.role = "admin";
    existingAdmin.passwordHash = passwordHash;
    await writeUsers(users);

    console.log(`Updated admin user: ${normalizedEmail}`);
    return;
  }

  users.push({
    id: randomUUID(),
    name: adminName,
    email: normalizedEmail,
    phone: "",
    role: "admin",
    passwordHash,
    createdAt: new Date().toISOString()
  });

  await writeUsers(users);
  console.log(`Created admin user: ${normalizedEmail}`);
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
