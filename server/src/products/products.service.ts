import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductDto, ProductFilters } from '../dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(params?: ProductFilters): Promise<Product[]> {
    const query: Prisma.ProductWhereInput = { is_archived: false };
    const { is_featured, is_archived, category_id, color_id, size_id } = params;

    if (is_featured) {
      query.is_featured = is_featured;
    }

    if (category_id) {
      query.category_id = category_id;
    }

    if (is_archived) {
      query.is_archived = is_archived;
    }

    if (color_id) {
      query.AND = {
        productVariant: {
          some: {
            color_id,
          },
        },
      };
    }

    if (size_id) {
      query.AND = {
        productVariant: {
          some: {
            size_id,
          },
        },
      };
    }

    return await this.prismaService.product.findMany({
      where: query,
      include: { category: true, productVariant: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        category: true,
        productVariant: true,
      },
    });
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const product = await this.prismaService.product.create({
      data,
    });

    return product;
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prismaService.product.update({
      data,
      where,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prismaService.product.delete({
      where,
    });
  }
}
