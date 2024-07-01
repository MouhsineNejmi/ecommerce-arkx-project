/* NEW */
export interface Billboard {
  id: string;
  label: string;
  image_url: string;
  category_id: string;
  user_id: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Size {
  id: string;
  name: string;
  value: string;
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
  description: string;
  price: number;
  category_id: string;
  images: string[];
  is_featured: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at?: Date;

  category: Category;
}

export interface ProductVariant {
  id: string;
  product_id?: string;
  size_id: string;
  color_id: string;
  created_at?: Date;
  updated_at?: Date;

  size?: Size;
  color?: Color;
}

export interface ProductFilters {
  is_featured?: boolean;
  is_archived?: boolean;
  category_id?: string;
  color_id?: string;
  size_id?: string;
}

/* OLD */
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

// export interface Billboard {
//   id: string;
//   label: string;
//   store_id: string;
//   image_url: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// export interface Category {
//   id: string;
//   name: string;
//   billboard_id: string;
//   store_id: string;
//   billboard: Billboard;
//   created_at: Date;
//   updated_at?: Date;
// }

// export interface Size {
//   id: string;
//   name: string;
//   value: string;
//   store_id: string;
//   created_at: Date;
//   updated_at?: Date;
// }

// export interface Color {
//   id: string;
//   name: string;
//   value: string;
//   store_id: string;
//   created_at: Date;
//   updated_at?: Date;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   size_ids: string[];
//   category: Category;
//   color_ids: string[];
//   images: string[];
//   is_featured: boolean;
//   is_archived: boolean;
//   created_at: Date;
//   updated_at?: Date;
//   colors?: Color[];
//   sizes?: Size[];
// }

export interface ProductSingle extends Product {
  colors: Color[];
  sizes: Size[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  amount: number;
  phone: string;
  address: string;
  status: string;
  items?: OrderItem[];
  created_at: Date;
  updated_at?: Date;
}

export interface OrderWithOrderItem {
  id: string;
  amount: number;
  phone: string;
  address: string;
  items: OrderItemWithProduct[];
  status: string;
  created_at: Date;
  updated_at?: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  quantity: number;
  product_id: string;
  product?: Product;
  created_at: Date;
  updated_at?: Date;
}

export interface OrderItemWithProduct {
  id: string;
  order_id: string;
  quantity: number;
  product_id: string;
  product: Product;
  created_at: Date;
  updated_at?: Date;
}
