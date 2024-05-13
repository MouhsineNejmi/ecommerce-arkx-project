export interface SignupUserInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface SessionUser {
  id?: string | null;
  role?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Store {
  id: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Billboard {
  id: string;
  label: string;
  store_id: string;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id: string;
  name: string;
  billboard_id: string;
  store_id: string;
  billboard: Billboard;
  created_at: Date;
  updated_at?: Date;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  store_id: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Color {
  id: string;
  name: string;
  value: string;
  store_id: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  size: Size[];
  category: Category;
  color: Color[];
  images: string[];
  is_featured: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at?: Date;
}
