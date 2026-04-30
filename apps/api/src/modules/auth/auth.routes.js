import { Router } from "express";
import { sendError } from "../../common/http.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema
} from "./auth.schemas.js";
import {
  loginUser,
  registerUser,
  requestPasswordReset
} from "./auth.service.js";
import { requireAuth } from "./auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const input = registerSchema.parse(req.body);
    const result = await registerUser(input);
    return res.status(201).json(result);
  } catch (error) {
    return sendError(res, error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const input = loginSchema.parse(req.body);
    const result = await loginUser(input);
    return res.json(result);
  } catch (error) {
    return sendError(res, error);
  }
});

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const input = forgotPasswordSchema.parse(req.body);
    const result = await requestPasswordReset(input.email);
    return res.json(result);
  } catch (error) {
    return sendError(res, error);
  }
});

authRouter.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.user });
});
