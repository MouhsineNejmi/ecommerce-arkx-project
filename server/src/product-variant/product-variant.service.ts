import { Injectable } from '@nestjs/common';
import { ProductVariant } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import {
  CreateProductVariantDto,
  EditProductVariantDto,
} from '../dto/product-variant.dto';

@Injectable()
export class ProductVariantService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<ProductVariant[]> {
    return await this.prismaService.productVariant.findMany();
  }

  async findByProductId(productId: string): Promise<ProductVariant[]> {
    return this.prismaService.productVariant.findMany({
      where: { product_id: productId },
      include: { size: true, color: true },
    });
  }

  async createProductVariants(
    data: CreateProductVariantDto[],
  ): Promise<ProductVariant[]> {
    return this.prismaService.productVariant.createManyAndReturn({
      data,
    });
  }

  async editProductVariant(id: string, data: EditProductVariantDto) {
    return this.prismaService.productVariant.update({ where: { id }, data });
  }

  async deleteProductVariants(productVariantIds: string[]) {
    return this.prismaService.productVariant.deleteMany({
      where: { id: { in: productVariantIds } },
    });
  }
}
