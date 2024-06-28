import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateProductDto } from '../dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      include: { category: true },
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
