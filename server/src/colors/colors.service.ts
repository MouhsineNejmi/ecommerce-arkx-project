import { Injectable } from '@nestjs/common';
import { Prisma, Color } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateColorDto } from '../dto/color.dto';

@Injectable()
export class ColorsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Color[]> {
    return await this.prismaService.color.findMany();
  }

  async find(where: Prisma.ColorWhereInput): Promise<Color> {
    return await this.prismaService.color.findFirst({ where });
  }

  async findById(id: string): Promise<Color> {
    return this.prismaService.color.findUnique({ where: { id } });
  }

  async createColor(data: CreateColorDto): Promise<Color> {
    return this.prismaService.color.create({
      data,
    });
  }

  async updateColor(params: {
    where: Prisma.ColorWhereUniqueInput;
    data: Prisma.ColorUpdateInput;
  }): Promise<Color> {
    const { where, data } = params;
    return this.prismaService.color.update({
      data,
      where,
    });
  }

  async deleteColor(where: Prisma.ColorWhereUniqueInput): Promise<Color> {
    return this.prismaService.color.delete({
      where,
    });
  }
}
