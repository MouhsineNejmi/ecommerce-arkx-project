import * as z from 'zod';

export const UserValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

export const LoginValidation = z.object({
  username: z.string().min(2, {
    message: 'Username is required and must be at least 2 characters',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const ProfileValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  role: z.string().min(1, { message: 'Role is required' }),
});

export const CustomerValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});
