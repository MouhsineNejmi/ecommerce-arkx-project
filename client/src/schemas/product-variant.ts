import * as z from "zod";

export const productVariantSchema = z.object({
  product_id: z
    .string()
    .min(1, { message: "Product id field must not be empty" }),
  size_id: z.string(),
  color_id: z.string(),
});

export type ProductVariantFormInput = z.infer<typeof productVariantSchema>;
