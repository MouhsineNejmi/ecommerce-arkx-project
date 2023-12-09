import * as z from 'zod';

export const CheckoutValidation = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z
    .string()
    .min(10)
    .max(10, { message: 'Phone number must be 10 characters' })
    .optional(),
  email: z.string().email().optional(),
  street_address: z.string({ message: 'Street Address is required' }),
  country: z.string({ message: 'Country is required' }),
  city: z.string({ message: 'City is required' }),
  state: z.string().optional(),
});
