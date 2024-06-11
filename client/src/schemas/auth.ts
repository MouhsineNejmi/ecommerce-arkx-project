import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Invalid email or password"),
});

export const signupSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
  role: z.enum(["customer", "seller", "admin", "moderator"], {
    required_error: "Role is required",
  }),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof loginSchema>;
