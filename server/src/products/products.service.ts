import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductDto } from '../dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(params?: Prisma.ProductWhereInput): Promise<Product[]> {
    const query: Prisma.ProductWhereInput = { is_archived: false };
    const { is_featured, is_archived } = params;

    if (is_featured) {
      query.is_featured = is_featured;
    }

    if (is_archived) {
      query.is_archived = is_archived;
    }

    return await this.prismaService.product.findMany({
      where: query,
      include: { category: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
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
