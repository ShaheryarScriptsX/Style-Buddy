import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { sendError } from "./common/http.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.clientOrigin === "*" ? true : env.clientOrigin
    })
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      app: "style-buddy-api"
    });
  });

  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: `Route ${req.method} ${req.path} not found`
    });
  });

  app.use((error, _req, res, _next) => {
    return sendError(res, error);
  });

  return app;
}
