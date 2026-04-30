import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const dataFilePath = path.resolve(dirname, "../../../data/users.json");

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, "[]", "utf8");
  }
}

export async function readUsers() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(raw);
}

export async function writeUsers(users) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id) {
  const users = await readUsers();
  return users.find((user) => user.id === id);
}
