import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Invalid username or password"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Invalid username or password"),
});

export const signupSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
  role: z.enum(["store_owner", "admin", "manager"], {
    required_error: "Role is required",
  }),
});
