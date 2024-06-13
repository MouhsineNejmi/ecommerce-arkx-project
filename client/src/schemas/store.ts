import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(2, { message: "Name field must not be empty" }),
  user_id: z.string(),
});

export const editStoreSchema = z.object({
  name: z.string().min(2, { message: "Name field must not be empty" }),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type SettingsFormInput = z.infer<typeof editStoreSchema>;
