import * as z from "zod";

export const sizeSchema = z.object({
  name: z.string().min(1, { message: "Name field must not be empty" }),
  value: z.string().min(1, { message: "Value field must not be empty" }),
});

export type SizeFormInput = z.infer<typeof sizeSchema>;
