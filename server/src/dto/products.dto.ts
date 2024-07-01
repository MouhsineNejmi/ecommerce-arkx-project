export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  images: string[];
  is_featured: boolean;
  is_archived: boolean;
  category_id: string;
}

export type EditProductDto = CreateProductDto;

export interface ProductFilters {
  is_featured?: boolean;
  is_archived?: boolean;
  category_id?: string;
  color_id?: string;
  size_id?: string;
}
