import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, { message: "Product Name field must not be empty" }),
  description: z
    .string()
    .min(2, { message: "Product Description field must not be empty" }),
  images: z.array(z.string()),
  price: z.coerce.number().min(1),
  category_id: z.string().min(1),
  is_featured: z.boolean().default(false).optional(),
  is_archived: z.boolean().default(false).optional(),
});

export type ProductFormInput = z.infer<typeof productSchema>;
