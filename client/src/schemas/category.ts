import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, { message: "Name field must not be empty" }),
  icon: z.string().min(1, { message: "Icon field must not be empty" }),
});

export type CategoryFormInput = z.infer<typeof categorySchema>;
