import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { env } from "../../config/env.js";
import { AppError } from "../../common/http.js";
import { toPublicUser } from "../users/user.mapper.js";
import {
  findUserByEmail,
  findUserById,
  readUsers,
  writeUsers
} from "../users/users.repository.js";

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export async function registerUser(input) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError(409, "A user with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const vendorProfile =
    input.role === "vendor"
      ? {
          businessAddress: input.businessAddress || "",
          businessCity: input.businessCity || "",
          businessDescription: input.businessDescription || "",
          businessName: input.businessName,
          businessType: input.businessType,
          status: "pending"
        }
      : undefined;
  const user = {
    id: randomUUID(),
    name: input.name,
    email: input.email.toLowerCase(),
    phone: input.phone || "",
    role: input.role || "customer",
    passwordHash,
    ...(vendorProfile ? { vendorProfile } : {}),
    createdAt: new Date().toISOString()
  };

  const users = await readUsers();
  users.push(user);
  await writeUsers(users);

  return {
    user: toPublicUser(user),
    token: createToken(user)
  };
}

export async function loginUser(input) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  return {
    user: toPublicUser(user),
    token: createToken(user)
  };
}

export async function getUserFromToken(token) {
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await findUserById(payload.sub);

    if (!user) {
      throw new AppError(401, "User not found");
    }

    return toPublicUser(user);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
}

export async function requestPasswordReset(email) {
  const user = await findUserByEmail(email);

  // Local-only placeholder. Real email delivery can be added before deployment.
  return {
    exists: Boolean(user),
    message: "If this email exists, password reset instructions will be sent later."
  };
}
