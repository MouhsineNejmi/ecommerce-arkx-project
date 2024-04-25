import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({ required_error: "Username is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
    password: string({ required_error: "Password is required" })
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    role: string({ required_error: "Role is required" }),
  }),
});
