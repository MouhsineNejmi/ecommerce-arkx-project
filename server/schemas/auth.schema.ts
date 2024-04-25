import { object, string } from "zod";

export const loginSchema = object({
  body: object({
    username: string({ required_error: "Username is required" }).min(
      1,
      "Invalid username or password"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Invalid username or password"
    ),
  }),
});
