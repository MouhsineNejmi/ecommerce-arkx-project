import { Injectable } from '@nestjs/common';
import { Billboard, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBillboardDto } from '../dto/billboard.dto';

@Injectable()
export class BillboardsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Billboard[]> {
    return await this.prismaService.billboard.findMany();
  }

  async findById(
    billboardId?: string,
    categoryId?: string,
  ): Promise<Billboard | null> {
    if (billboardId) {
      return await this.prismaService.billboard.findUnique({
        where: { id: billboardId },
      });
    }

    if (categoryId) {
      return await this.prismaService.billboard.findFirst({
        where: { category_id: categoryId },
      });
    }

    return null;
  }

  async createBillboard(data: CreateBillboardDto): Promise<Billboard> {
    return this.prismaService.billboard.create({
      data,
    });
  }

  async updateBillboard(params: {
    where: Prisma.BillboardWhereUniqueInput;
    data: Prisma.BillboardUpdateInput;
  }): Promise<Billboard> {
    const { where, data } = params;
    return this.prismaService.billboard.update({
      data,
      where,
    });
  }

  async deleteBillboard(
    where: Prisma.BillboardWhereUniqueInput,
  ): Promise<Billboard> {
    return this.prismaService.billboard.delete({
      where,
    });
  }
}
