import { Color, Product, Size } from '@prisma/client';

export interface CreateCartItemDto {
  id: string;
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
}

export type UpdateCartItemDto = {
  quantity: number;
};
