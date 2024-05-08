import * as z from "zod";

export const createBillboardSchema = z.object({
  label: z.string().min(2, { message: "Label field must not be empty" }),
  image_url: z.string().min(1),
});

export type BillboardFormInput = z.infer<typeof createBillboardSchema>;
