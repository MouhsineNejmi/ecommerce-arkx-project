import { Injectable } from '@nestjs/common';

import { Size, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSizeDto } from '../dto/size.dto';

@Injectable()
export class SizesService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Size[]> {
    return await this.prismaService.size.findMany();
  }

  async find(where: Prisma.SizeWhereInput): Promise<Size> {
    return await this.prismaService.size.findFirst({ where });
  }

  async findById(id: string): Promise<Size> {
    return this.prismaService.size.findUnique({ where: { id } });
  }

  async createSize(data: CreateSizeDto): Promise<Size> {
    return this.prismaService.size.create({
      data,
    });
  }

  async updateSize(params: {
    where: Prisma.SizeWhereUniqueInput;
    data: Prisma.SizeUpdateInput;
  }): Promise<Size> {
    const { where, data } = params;
    return this.prismaService.size.update({
      data,
      where,
    });
  }

  async deleteSize(where: Prisma.SizeWhereUniqueInput): Promise<Size> {
    return this.prismaService.size.delete({
      where,
    });
  }
}
