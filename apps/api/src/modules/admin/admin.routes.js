import { Router } from "express";
import { randomUUID } from "node:crypto";
import { AppError } from "../../common/http.js";
import { requireAuth, requireRole } from "../auth/auth.middleware.js";
import { readUsers, writeUsers } from "../users/users.repository.js";
import { toPublicUser } from "../users/user.mapper.js";
import { managedResources, readResource, writeResource } from "./admin.repository.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

function publicUsersByRole(users, role) {
  return users.filter((user) => user.role === role).map(toPublicUser);
}

function findById(records, id) {
  const record = records.find((item) => item.id === id);

  if (!record) {
    throw new AppError(404, "Record not found");
  }

  return record;
}

function getResourceFromRequest(req) {
  const { resource } = req.params;

  if (!managedResources.includes(resource)) {
    throw new AppError(404, "Admin resource not found");
  }

  return resource;
}

function singularResource(resource) {
  return resource === "categories" ? "category" : resource.slice(0, -1);
}

adminRouter.get("/summary", asyncHandler(async (_req, res) => {
  const users = await readUsers();
  const [bookings, categories, locations, offers, reviews] = await Promise.all([
    readResource("bookings"),
    readResource("categories"),
    readResource("locations"),
    readResource("offers"),
    readResource("reviews")
  ]);
  const vendors = publicUsersByRole(users, "vendor");

  res.json({
    customers: users.filter((user) => user.role === "customer").length,
    vendors: vendors.length,
    pendingVendors: vendors.filter(
      (vendor) => vendor.vendorProfile?.status === "pending"
    ).length,
    bookings: bookings.length,
    categories: categories.length,
    locations: locations.length,
    offers: offers.length,
    reviews: reviews.length
  });
}));

adminRouter.get("/customers", asyncHandler(async (_req, res) => {
  const users = await readUsers();
  res.json({ customers: publicUsersByRole(users, "customer") });
}));

adminRouter.patch("/customers/:id/status", asyncHandler(async (req, res) => {
  const users = await readUsers();
  const user = findById(users, req.params.id);

  if (user.role !== "customer") {
    throw new AppError(400, "User is not a customer");
  }

  user.status = normalizeText(req.body.status) || "active";
  user.updatedAt = new Date().toISOString();
  await writeUsers(users);

  res.json({ customer: toPublicUser(user) });
}));

adminRouter.get("/vendors", asyncHandler(async (_req, res) => {
  const users = await readUsers();
  res.json({ vendors: publicUsersByRole(users, "vendor") });
}));

adminRouter.patch("/vendors/:id/approval", asyncHandler(async (req, res) => {
  const users = await readUsers();
  const user = findById(users, req.params.id);

  if (user.role !== "vendor") {
    throw new AppError(400, "User is not a vendor");
  }

  const nextStatus = normalizeText(req.body.status);

  if (!["approved", "pending", "rejected"].includes(nextStatus)) {
    throw new AppError(400, "Vendor status must be approved, pending, or rejected");
  }

  user.vendorProfile = {
    ...(user.vendorProfile || {}),
    rejectionReason:
      nextStatus === "rejected" ? normalizeText(req.body.rejectionReason) || "" : "",
    status: nextStatus,
    updatedAt: new Date().toISOString()
  };

  if (typeof req.body.featured === "boolean") {
    user.vendorProfile.featured = req.body.featured;
  }

  if (nextStatus === "approved") {
    user.vendorProfile.approvedAt = new Date().toISOString();
  }

  if (nextStatus === "rejected") {
    user.vendorProfile.rejectedAt = new Date().toISOString();
  }

  await writeUsers(users);
  res.json({ vendor: toPublicUser(user) });
}));

adminRouter.get("/:resource", asyncHandler(async (req, res) => {
  const resource = getResourceFromRequest(req);
  const records = await readResource(resource);
  res.json({ [resource]: records });
}));

adminRouter.post("/:resource", asyncHandler(async (req, res) => {
  const resource = getResourceFromRequest(req);
  const records = await readResource(resource);
  const now = new Date().toISOString();
  const record = {
    id: randomUUID(),
    ...req.body,
    createdAt: now,
    updatedAt: now
  };

  records.push(record);
  await writeResource(resource, records);

  res.status(201).json({ [singularResource(resource)]: record });
}));

adminRouter.patch("/:resource/:id", asyncHandler(async (req, res) => {
  const resource = getResourceFromRequest(req);
  const records = await readResource(resource);
  const record = findById(records, req.params.id);

  Object.assign(record, req.body, { updatedAt: new Date().toISOString() });
  await writeResource(resource, records);

  res.json({ [singularResource(resource)]: record });
}));

adminRouter.delete("/:resource/:id", asyncHandler(async (req, res) => {
  const resource = getResourceFromRequest(req);
  const records = await readResource(resource);
  const nextRecords = records.filter((record) => record.id !== req.params.id);

  if (nextRecords.length === records.length) {
    throw new AppError(404, "Record not found");
  }

  await writeResource(resource, nextRecords);
  res.status(204).send();
}));
