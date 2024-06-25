import * as z from "zod";

export const billboardSchema = z.object({
  label: z.string().min(2, { message: "Label field must not be empty" }),
  image_url: z.string().min(1),
  user_id: z.string(),
});

export type BillboardFormInput = z.infer<typeof billboardSchema>;
