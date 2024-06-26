import { Injectable } from '@nestjs/common';

import { Category, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from '../dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }

  async find(where: Prisma.CategoryWhereInput): Promise<Category> {
    return await this.prismaService.category.findFirst({ where });
  }

  async findById(id: string): Promise<Category> {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data,
    });
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prismaService.category.update({
      data,
      where,
    });
  }

  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    return this.prismaService.category.delete({
      where,
    });
  }
}
