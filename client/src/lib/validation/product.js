import * as z from 'zod';

const productSchema = z.object({
  product_name: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' })
    .max(50, { message: 'Must be 50 or fewer characters long' }),
  product_images: z.instanceof(File),
  category_id: z.string({ message: 'Category field is required' }),
  short_description: z
    .string()
    .min(1, { message: 'Short description field is required' }),
  long_description: z
    .string()
    .min(1, { message: 'Long description field is required' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  discount_price: z
    .number()
    .min(0)
    .max(
      z.lazy(() =>
        z.number().refine((value) => value <= productSchema.price, {
          message:
            'Discount price must be less than or equal to the regular price',
        })
      )
    ),
  options: z.array(z.string()),
});

export default productSchema;
