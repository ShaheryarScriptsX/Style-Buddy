import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z.string().trim().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["customer", "vendor"]).default("customer"),
    businessName: z.string().trim().optional(),
    businessType: z.string().trim().optional(),
    businessCity: z.string().trim().optional(),
    businessAddress: z.string().trim().optional(),
    businessDescription: z.string().trim().optional()
  })
  .superRefine((input, context) => {
    if (input.role !== "vendor") {
      return;
    }

    if (!input.businessName) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Business name is required",
        path: ["businessName"]
      });
    }

    if (!input.businessType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Business type is required",
        path: ["businessType"]
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address")
});
