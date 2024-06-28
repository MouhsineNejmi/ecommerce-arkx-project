export interface CreateProductVariantDto {
  product_id: string;
  size_id: string;
  color_id: string;
}

export type EditProductVariantDto = CreateProductVariantDto;
