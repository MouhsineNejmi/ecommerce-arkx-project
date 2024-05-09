import { Billboard } from "@/types/billboard.types";

export interface Category {
  id: string;
  name: string;
  billboard_id: string;
  store_id: string;
  billboard: Billboard;
  created_at: Date;
  updated_at?: Date;
}
