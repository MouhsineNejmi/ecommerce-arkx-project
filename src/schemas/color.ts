import * as z from "zod";

export const colorSchema = z.object({
  label: z.string().min(2, { message: "Label field must not be empty" }),
  image_url: z.string().min(1),
});

export type ColorFormInput = z.infer<typeof colorSchema>;
