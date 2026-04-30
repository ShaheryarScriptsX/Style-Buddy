import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const dataDirectory = path.resolve(dirname, "../../../data");

const resourceFiles = {
  bookings: "bookings.json",
  categories: "categories.json",
  locations: "locations.json",
  offers: "offers.json",
  reviews: "reviews.json"
};

function getResourcePath(resource) {
  return path.join(dataDirectory, resourceFiles[resource]);
}

export const managedResources = Object.keys(resourceFiles);

export async function readResource(resource) {
  const filePath = getResourcePath(resource);
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, "[]", "utf8");
      return [];
    }

    throw error;
  }
}

export async function writeResource(resource, records) {
  const filePath = getResourcePath(resource);
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), "utf8");
}
